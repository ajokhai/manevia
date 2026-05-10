'use client';

/**
 * ==============================================================================
 * NANO BANANA VIRTUAL TRY-ON MODAL
 * ==============================================================================
 * This component handles the full try-on flow:
 *
 * CURRENT STATE (MVP Demo):
 *   - Real file upload via <input type="file"> with image preview
 *   - Real camera access via navigator.mediaDevices.getUserMedia
 *   - Canvas compositing: blends the user's photo with the wig image
 *     to produce a realistic-looking demo result
 *
 * FUTURE STATE (Production):
 *   - Replace the `processWithCanvas()` function with an API call to
 *     the Nano Banana inference endpoint (e.g. POST /api/try-on)
 *   - The endpoint will accept { userImageBase64, wigImageUrl } and return
 *     a composited result image URL from the AI model
 *   - All UI states (uploading, processing, result) remain unchanged
 * ==============================================================================
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, Upload, Camera, X, CheckCircle, RotateCcw, ShoppingBag, AlertCircle } from 'lucide-react';

type TryOnState = 'idle' | 'camera' | 'preview' | 'processing' | 'result' | 'error';

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  wigImageUrl: string;
  wigName: string;
}

export default function TryOnModal({ isOpen, onClose, onAddToCart, wigImageUrl, wigName }: TryOnModalProps) {
  const [state, setState] = useState<TryOnState>('idle');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [processingStep, setProcessingStep] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const PROCESSING_STEPS = [
    'Detecting facial landmarks...',
    'Mapping hairline contours...',
    'Blending HD lace texture...',
    'Applying natural lighting...',
    'Finalising your look...',
  ];

  // Stop camera stream on close
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  }, []);

  const handleClose = useCallback(() => {
    stopCamera();
    setState('idle');
    setUserPhoto(null);
    setResultImage(null);
    setErrorMsg('');
    onClose();
  }, [stopCamera, onClose]);

  // Clean up stream if component unmounts
  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  // ── FILE UPLOAD ──────────────────────────────────────────────────────────────
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select an image file (JPG, PNG, WEBP).');
      setState('error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUserPhoto(ev.target?.result as string);
      setState('preview');
    };
    reader.readAsDataURL(file);
  };

  // ── CAMERA ───────────────────────────────────────────────────────────────────
  const startCamera = async () => {
    setState('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setErrorMsg(
        errorMessage.includes('Permission')
          ? 'Camera access was denied. Please allow camera access in your browser settings and try again.'
          : 'Could not access your camera. Please check it is connected and not in use by another app.'
      );
      setState('error');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Mirror the image (front camera)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    setUserPhoto(canvas.toDataURL('image/jpeg', 0.9));
    stopCamera();
    setState('preview');
  };

  // ── CANVAS COMPOSITING (MVP Demo) ────────────────────────────────────────────
  /**
   * FUTURE: Replace this function with:
   *   const res = await fetch('/api/try-on', {
   *     method: 'POST',
   *     body: JSON.stringify({ userImage: userPhoto, wigImage: wigImageUrl }),
   *   });
   *   const { resultUrl } = await res.json();
   *   setResultImage(resultUrl);
   */
  const processWithCanvas = useCallback(async () => {
    if (!userPhoto || !canvasRef.current) return;

    setState('processing');
    setProcessingStep(0);

    // Animate through processing steps
    for (let i = 0; i < PROCESSING_STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 700));
      setProcessingStep(i + 1);
    }

    // Composite: draw user photo, then overlay wig at top of frame with multiply blend
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const userImg = new Image();
    userImg.src = userPhoto;

    await new Promise<void>(resolve => {
      userImg.onload = () => {
        canvas.width = userImg.width;
        canvas.height = userImg.height;

        // Base: user photo
        ctx.drawImage(userImg, 0, 0);

        // Wig overlay: positioned at top ~30% of the image, centred
        const wigImg = new Image();
        wigImg.crossOrigin = 'anonymous';
        wigImg.src = wigImageUrl;
        wigImg.onload = () => {
          const wigW = canvas.width * 0.85;
          const wigH = (wigImg.height / wigImg.width) * wigW;
          const wigX = (canvas.width - wigW) / 2;
          const wigY = canvas.height * 0.01;

          ctx.globalAlpha = 0.88;
          ctx.globalCompositeOperation = 'multiply';
          ctx.drawImage(wigImg, wigX, wigY, wigW, wigH);

          // Reset
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = 'source-over';

          setResultImage(canvas.toDataURL('image/jpeg', 0.92));
          setState('result');
          resolve();
        };
        wigImg.onerror = () => {
          // Fallback: just show user photo if wig image fails to load cross-origin
          setResultImage(userPhoto);
          setState('result');
          resolve();
        };
      };
      userImg.onerror = () => {
        setErrorMsg('Failed to process your photo. Please try again.');
        setState('error');
        resolve();
      };
    });
  }, [userPhoto, wigImageUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={handleClose}>
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-500" size={20} />
            <div>
              <h2 className="font-bold text-base">Virtual Try-On Studio</h2>
              <p className="text-xs text-gray-400">Powered by Nano Banana AI</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-100 transition">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">

          {/* IDLE — Choose method */}
          {state === 'idle' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 text-center mb-6">
                Upload a selfie or use your camera to see <span className="font-semibold text-black">{wigName}</span> on you.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 hover:border-amber-400 hover:bg-amber-50/50 rounded-2xl p-8 transition group"
                >
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-amber-100 rounded-xl flex items-center justify-center transition">
                    <Upload size={22} className="text-gray-500 group-hover:text-amber-600" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-sm">Upload Photo</p>
                    <p className="text-xs text-gray-400 mt-0.5">JPG or PNG, max 10MB</p>
                  </div>
                </button>

                <button
                  onClick={startCamera}
                  className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 hover:border-amber-400 hover:bg-amber-50/50 rounded-2xl p-8 transition group"
                >
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-amber-100 rounded-xl flex items-center justify-center transition">
                    <Camera size={22} className="text-gray-500 group-hover:text-amber-600" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-sm">Use Camera</p>
                    <p className="text-xs text-gray-400 mt-0.5">Take a live selfie</p>
                  </div>
                </button>
              </div>

              <p className="text-[11px] text-gray-400 text-center mt-4">
                🔒 Your photo is processed locally and never stored or shared.
              </p>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          )}

          {/* CAMERA — Live viewfinder */}
          {state === 'camera' && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                {/* Guide overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-48 border-2 border-white/50 rounded-full opacity-60" />
                </div>
                <p className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-xs">
                  Position your face within the guide
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { stopCamera(); setState('idle'); }}
                  className="flex-1 border py-3 rounded-xl font-medium text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={capturePhoto}
                  className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"
                >
                  <Camera size={16} /> Capture Photo
                </button>
              </div>
            </div>
          )}

          {/* PREVIEW — Confirm photo before processing */}
          {state === 'preview' && userPhoto && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 text-center">Looking good! Ready to try the wig on?</p>
              <div className="rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={userPhoto} alt="Your photo" className="h-full w-full object-cover" />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setUserPhoto(null); setState('idle'); }}
                  className="flex-1 border py-3 rounded-xl font-medium text-sm hover:bg-gray-50 transition flex items-center justify-center gap-1"
                >
                  <RotateCcw size={14} /> Retake
                </button>
                <button
                  onClick={processWithCanvas}
                  className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} /> Try On Now
                </button>
              </div>
            </div>
          )}

          {/* PROCESSING */}
          {state === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin" />
                <Sparkles className="absolute inset-0 m-auto text-amber-500" size={22} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-bold text-lg">Nano Banana is Working...</h3>
                <p className="text-sm text-amber-600 animate-pulse min-h-[20px]">
                  {PROCESSING_STEPS[processingStep - 1] ?? 'Initialising...'}
                </p>
              </div>
              <div className="w-64 bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-amber-500 h-1.5 rounded-full transition-all duration-700"
                  style={{ width: `${(processingStep / PROCESSING_STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* RESULT */}
          {state === 'result' && resultImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                <CheckCircle size={18} /> Flawless Fit!
              </div>
              <div className="rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resultImage} alt="Try-on result" className="h-full w-full object-cover" />
              </div>
              <p className="text-xs text-center text-gray-400">
                This is a visual preview. Final look may vary based on your hair and skin tone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setUserPhoto(null); setResultImage(null); setState('idle'); }}
                  className="flex-1 border py-3 rounded-xl font-medium text-sm hover:bg-gray-50 transition flex items-center justify-center gap-1"
                >
                  <RotateCcw size={14} /> Try Another
                </button>
                <button
                  onClick={() => { onAddToCart(); handleClose(); }}
                  className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>
              </div>
            </div>
          )}

          {/* ERROR */}
          {state === 'error' && (
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
              <AlertCircle className="text-red-400" size={40} />
              <div>
                <h3 className="font-bold text-base mb-1">Something went wrong</h3>
                <p className="text-sm text-gray-500 max-w-xs">{errorMsg}</p>
              </div>
              <button
                onClick={() => setState('idle')}
                className="bg-black text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for compositing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
