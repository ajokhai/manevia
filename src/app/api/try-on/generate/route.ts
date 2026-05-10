import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Part } from '@google/genai';
import { ACTIVE_TRY_ON_PROMPT } from '@/lib/tryon-prompt';

/**
 * ==============================================================================
 * NANO BANANA AI GENERATION ENDPOINT
 * ==============================================================================
 *
 * REQUIRED ENV VARS:
 *   GEMINI_API_KEY  — Get from https://aistudio.google.com/app/apikey
 *                     Add to Vercel: Settings → Environment Variables
 *
 * MODEL:
 *   gemini-2.0-flash-exp-image-generation
 *   This model accepts multimodal input (text + images) and can output images.
 *   It is currently the best Gemini model for image editing tasks.
 *
 * HOW IT WORKS:
 *   1. Client sends: user's selfie (base64) + wig product image URL
 *   2. Server fetches the wig image and converts to base64
 *   3. Both images + the active prompt are sent to Gemini
 *   4. Gemini returns a composited result image
 *   5. Server returns the result as base64 to the client
 *
 * FALLBACK:
 *   If GEMINI_API_KEY is not set, returns { mode: 'canvas' }
 *   and the client falls back to canvas compositing automatically.
 *
 * PROMPT MANAGEMENT:
 *   Edit prompts and parameters at: /admin/try-on
 *   Or directly in: src/lib/tryon-prompt.ts
 * ==============================================================================
 */

// Helper: fetch a remote image and return as base64
async function urlToBase64(url: string): Promise<{ data: string; mimeType: string }> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${url}`);
  const buffer = await res.arrayBuffer();
  const mimeType = res.headers.get('content-type') ?? 'image/jpeg';
  const base64 = Buffer.from(buffer).toString('base64');
  return { data: base64, mimeType };
}

export async function POST(req: NextRequest) {
  // ── GUARD: API key required ────────────────────────────────────────────────
  if (!process.env.GEMINI_API_KEY) {
    // No key configured — tell client to fall back to canvas
    return NextResponse.json({ mode: 'canvas' }, { status: 200 });
  }

  try {
    const body = await req.json();
    const { userImageBase64, userImageMimeType, wigImageUrl } = body as {
      userImageBase64: string;
      userImageMimeType: string;
      wigImageUrl: string;
    };

    if (!userImageBase64 || !wigImageUrl) {
      return NextResponse.json({ error: 'Missing required fields: userImageBase64, wigImageUrl' }, { status: 400 });
    }

    // Fetch wig image server-side (avoids CORS issues with external CDN)
    const wigImage = await urlToBase64(wigImageUrl);

    // ── GEMINI CALL ────────────────────────────────────────────────────────────
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = ACTIVE_TRY_ON_PROMPT.systemPrompt;
    const negativeHint = `Avoid: ${ACTIVE_TRY_ON_PROMPT.negativePrompt}`;

    const parts: Part[] = [
      {
        inlineData: {
          mimeType: userImageMimeType ?? 'image/jpeg',
          data: userImageBase64,
        },
      },
      {
        inlineData: {
          mimeType: wigImage.mimeType,
          data: wigImage.data,
        },
      },
      {
        text: `${prompt}\n\n${negativeHint}\n\nThe first image is the person. The second image is the wig. Place the wig on the person naturally.`,
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: [{ role: 'user', parts }],
      config: {
        responseModalities: ['image', 'text'],
        temperature: 1,
      },
    });

    // ── EXTRACT RESULT IMAGE ───────────────────────────────────────────────────
    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(
      (p: Part) => p.inlineData?.mimeType?.startsWith('image/')
    );

    if (!imagePart?.inlineData) {
      console.error('[TryOn] Gemini returned no image part. Full response:', JSON.stringify(response, null, 2));
      return NextResponse.json(
        { error: 'Model did not return an image. Try adjusting the prompt in Admin → Try-On AI.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      mode: 'ai',
      resultBase64: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType,
    });

  } catch (err: unknown) {
    console.error('[TryOn] Generation error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';

    // Surface quota/auth errors clearly
    if (message.includes('API_KEY_INVALID') || message.includes('PERMISSION_DENIED')) {
      return NextResponse.json(
        { error: 'Invalid GEMINI_API_KEY. Please check your Vercel environment variables.' },
        { status: 401 }
      );
    }
    if (message.includes('RESOURCE_EXHAUSTED') || message.includes('quota')) {
      return NextResponse.json(
        { mode: 'canvas', reason: 'quota_exceeded' },
        { status: 200 }
      );
    }

    return NextResponse.json({ mode: 'canvas', reason: 'api_error' }, { status: 200 });
  }
}
