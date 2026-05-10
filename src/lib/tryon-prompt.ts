/**
 * ==============================================================================
 * NANO BANANA AI PROMPT CONFIGURATION
 * ==============================================================================
 *
 * THIS IS THE SINGLE SOURCE OF TRUTH FOR ALL AI PROMPTS used by the
 * Virtual Try-On feature. Prompts are structured here so they can be:
 *   1. Edited by developers in code (current approach)
 *   2. Edited by admins via the Admin Panel → Try-On Settings (stored in DB)
 *
 * HOW IT WORKS RIGHT NOW:
 *   - The try-on is canvas-based (client-side). No AI model is called.
 *   - These prompts are STAGED and ready for when you connect a real model.
 *
 * HOW TO CONNECT A REAL MODEL:
 *   - In `src/app/api/try-on/generate/route.ts`, call your model of choice
 *     (Gemini Vision, Stable Diffusion, Replicate, etc.) using the prompts below.
 *   - The admin panel at /admin/try-on lets you edit these live without
 *     redeploying the app (once wired to the DB adapter).
 *
 * PROMPT ENGINEERING TIPS:
 *   - Be extremely specific about WHAT the model should NOT change
 *     (face, skin tone, background) vs. WHAT it should replace (hair).
 *   - Use negative prompts to suppress artifacts (floating hair, two heads, etc.)
 *   - "Lace" and "hairline" keywords dramatically improve edge blending.
 *   - Test with diverse skin tones. HD lace prompts behave differently on
 *     lighter vs. darker complexions.
 * ==============================================================================
 */

export interface TryOnPromptConfig {
  version: string;
  systemPrompt: string;
  negativePrompt: string;
  guidanceScale: number;   // How closely model follows prompt (1-20). ~7 is balanced.
  strength: number;        // How much to transform input image (0-1). ~0.75 for hair-only.
  notes: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

/**
 * ACTIVE PROMPT — Edit this to tune the model's behaviour.
 * Changes here take effect immediately on next deployment.
 * For live editing without redeploy, use the Admin Panel → Try-On Settings
 * which will override this value from the database.
 */
export const ACTIVE_TRY_ON_PROMPT: TryOnPromptConfig = {
  version: '1.0.0',

  systemPrompt: `You are a professional hair styling AI. Your task is to place a luxury wig onto the person in the image. 
The wig should sit naturally on their head, following the natural hairline and crown shape.
The lace front of the wig must blend seamlessly with the person's skin tone — no visible lace lines.
The original face, skin tone, makeup, clothing, and background must remain completely unchanged.
Lighting on the wig should match the lighting in the original photo.
The result should look like a professional photography editorial shot, not a composited image.`,

  negativePrompt: `two faces, two heads, floating hair, visible lace, unnatural hairline, hair covering face, 
changed skin tone, changed facial features, changed background, blurry face, deformed ears, 
extra limbs, bad anatomy, watermark, text, signature`,

  guidanceScale: 7.5,
  strength: 0.72,

  notes: `v1.0.0: Initial staging prompt. Not yet connected to a live model.
  Tuned for photorealistic lace blending on diverse skin tones.
  Strength set to 0.72 to preserve face while replacing hair region.`,

  lastUpdatedBy: 'system',
  lastUpdatedAt: new Date().toISOString(),
};

/**
 * Prompt history — keep old versions here for rollback reference.
 * When you update ACTIVE_TRY_ON_PROMPT, move the old version here.
 */
export const PROMPT_HISTORY: Omit<TryOnPromptConfig, 'notes'>[] = [
  // Example:
  // { version: '0.9.0', systemPrompt: '...', negativePrompt: '...', ... }
];
