import { NextRequest, NextResponse } from 'next/server';

/**
 * ==============================================================================
 * TRY-ON USAGE LOGGING & RATE LIMITING ENDPOINT
 * ==============================================================================
 *
 * PURPOSE:
 *   - Logs each Virtual Try-On generation event (IP, product slug, timestamp).
 *   - Enforces a per-IP rate limit to prevent abuse.
 *   - NO image data is ever sent to or stored by this endpoint.
 *     All compositing happens client-side on the user's device.
 *
 * DATA RETENTION POLICY:
 *   - Standard usage logs (IP hash + timestamp + product slug) are retained
 *     for a maximum of 24 HOURS, then automatically purged.
 *   - Diagnostic samples (is_diagnostic = true) may be retained longer for
 *     service quality analysis, anomaly detection, and infrastructure planning.
 *     These are flagged manually by an admin and never exceed 30 days.
 *   - No personally identifiable information (name, email, photo) is ever
 *     stored by this endpoint. The IP address is hashed before storage.
 *
 * RATE LIMIT:
 *   - Max 10 try-on generations per IP per hour (configurable below).
 *   - Exceeding this returns a 429 response with a `retryAfter` field.
 *
 * FUTURE:
 *   - Replace the in-memory store below with a Vercel Postgres or Redis table
 *     when deploying to production at scale.
 *   - Add a cron job to run the purge query daily:
 *     DELETE FROM tryon_logs WHERE created_at < NOW() - INTERVAL '24 hours'
 *       AND is_diagnostic = false;
 *
 * ─── DB SCHEMA (for Phase 2 / Postgres) ────────────────────────────────────
 * CREATE TABLE tryon_logs (
 *   id           SERIAL PRIMARY KEY,
 *   ip_hash      TEXT NOT NULL,        -- SHA-256 of IP, never raw IP
 *   product_slug TEXT,
 *   created_at   TIMESTAMPTZ DEFAULT NOW(),
 *   is_diagnostic BOOLEAN DEFAULT FALSE  -- retained longer for service analysis
 * );
 * CREATE INDEX ON tryon_logs (ip_hash, created_at);
 * ==============================================================================
 */

// ── CONFIG ────────────────────────────────────────────────────────────────────
const RATE_LIMIT_MAX = 10;         // max try-ons per window per IP
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const LOG_RETENTION_MS = 24 * 60 * 60 * 1000; // 24 hours

// ── IN-MEMORY STORE (MVP) ─────────────────────────────────────────────────────
// FUTURE: Replace with Postgres/Redis for multi-instance deployments.
// This works correctly on a single serverless instance but will reset on cold starts.
const usageLog = new Map<string, { timestamps: number[]; count: number }>();

// Simple hash to avoid storing raw IPs
async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + process.env.NEXTAUTH_SECRET ?? 'manevia-salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1';

  const body = await req.json().catch(() => ({}));
  const { productSlug, action } = body as { productSlug?: string; action?: string };

  const ipHash = await hashIP(ip);
  const now = Date.now();

  // ── RATE LIMIT CHECK ───────────────────────────────────────────────────────
  if (action === 'check' || action === 'generate') {
    let entry = usageLog.get(ipHash);

    if (!entry) {
      entry = { timestamps: [], count: 0 };
      usageLog.set(ipHash, entry);
    }

    // Purge old timestamps outside the window
    entry.timestamps = entry.timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    entry.count = entry.timestamps.length;

    if (entry.count >= RATE_LIMIT_MAX) {
      const oldestInWindow = entry.timestamps[0];
      const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - oldestInWindow);
      const retryAfterMinutes = Math.ceil(retryAfterMs / 60000);

      console.warn(`[TryOn] Rate limit hit — ip_hash=${ipHash.slice(0, 8)}... retryIn=${retryAfterMinutes}m`);

      return NextResponse.json(
        {
          allowed: false,
          reason: 'rate_limit',
          message: `You've used all ${RATE_LIMIT_MAX} free try-ons for this hour. Please try again in ${retryAfterMinutes} minute${retryAfterMinutes === 1 ? '' : 's'}.`,
          retryAfterMinutes,
        },
        { status: 429 }
      );
    }

    // ── LOG THE GENERATION ─────────────────────────────────────────────────
    if (action === 'generate') {
      entry.timestamps.push(now);
      entry.count += 1;

      // Purge logs older than 24h from the in-memory store
      for (const [key, val] of usageLog.entries()) {
        val.timestamps = val.timestamps.filter(t => now - t < LOG_RETENTION_MS);
        if (val.timestamps.length === 0) usageLog.delete(key);
      }

      console.info(
        `[TryOn] Generation logged — ip_hash=${ipHash.slice(0, 8)}... product=${productSlug ?? 'unknown'} count=${entry.count}/${RATE_LIMIT_MAX}`
      );
    }

    return NextResponse.json({
      allowed: true,
      remaining: RATE_LIMIT_MAX - (entry.count),
      resetInMinutes: Math.ceil(RATE_LIMIT_WINDOW_MS / 60000),
    });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

// ── ADMIN STATS ENDPOINT ──────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  // Basic protection — only accessible from admin context
  const referer = req.headers.get('referer') ?? '';
  if (!referer.includes('/admin')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const now = Date.now();
  const activeIPs = [...usageLog.entries()]
    .filter(([, val]) => val.timestamps.some(t => now - t < RATE_LIMIT_WINDOW_MS))
    .length;

  const totalGenerations = [...usageLog.values()]
    .reduce((sum, val) => sum + val.timestamps.filter(t => now - t < LOG_RETENTION_MS).length, 0);

  return NextResponse.json({
    activeSessionsLastHour: activeIPs,
    totalGenerationsLast24h: totalGenerations,
    rateLimitConfig: { maxPerHour: RATE_LIMIT_MAX, windowMs: RATE_LIMIT_WINDOW_MS },
    retentionPolicyHours: 24,
  });
}
