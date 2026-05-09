import { put } from '@vercel/blob';
import { NextResponse } from 'next/response';

/**
 * ==============================================================================
 * ⚠️ AI ASSISTANT INSTRUCTION ⚠️
 * This API route handles image uploads via Vercel Blob. It is part of the 
 * Phase 1 MVP infrastructure. Do NOT modify this to use Cloudinary or S3 
 * unless explicitly requested by the client for Phase 2.
 * ==============================================================================
 */
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  // Ensure Vercel Blob is configured (Token injected automatically by Vercel)
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { 
        error: 'Vercel Blob is not configured. Please provision a Blob store in the Vercel Dashboard.' 
      }, 
      { status: 500 }
    );
  }

  try {
    // Requires request body to be a stream or buffer (FormData/File)
    const blob = await put(filename, request.body!, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Blob Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload image to Vercel Blob' }, { status: 500 });
  }
}
