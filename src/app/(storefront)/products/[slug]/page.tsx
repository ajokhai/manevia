'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Star, ChevronRight, Check, Sparkles, ShieldCheck, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [selectedLength, setSelectedLength] = useState('16"');
  const [selectedDensity, setSelectedDensity] = useState('180%');
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false);
  const [tryOnState, setTryOnState] = useState<'idle' | 'processing' | 'result'>('idle');
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: slug,
      name: "Ready to Go Blonde Highlight Water Wave Short Curly Bob Wig",
      price: 118.33,
      image: "/assets/hero_wig_curly_1778364916891.png",
      quantity: 1,
      variants: { length: selectedLength, density: selectedDensity }
    });
  };

  const lengths = ['14"', '16"', '20"', '24"'];
  const densities = ['150%', '180%', '250%'];

  const handleSimulateTryOn = () => {
    setTryOnState('processing');
    // Simulate AI pipeline delay (Nano Banana)
    setTimeout(() => {
      setTryOnState('result');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-8 flex items-center space-x-2">
        <Link href="/" className="hover:text-black">Home</Link> 
        <ChevronRight size={14} /> 
        <Link href="/collections/wigs" className="hover:text-black">Wigs</Link>
        <ChevronRight size={14} /> 
        <span className="text-black font-medium truncate w-48">Ready to Go Blonde Highlight Water Wave...</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Gallery */}
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-2xl overflow-hidden relative sticky top-24">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero_wig_curly_1778364916891.png')" }}></div>
            <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide">Ready to Go</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-2/5 flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
            Ready to Go Blonde Highlight Water Wave Short Curly Bob Wig Glueless Minimalist HD Lace
          </h1>
          
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex text-amber-500">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
            <a href="#reviews" className="text-sm font-medium underline text-gray-600">(131 Reviews)</a>
          </div>

          <div className="flex items-end space-x-4 mb-8 pb-8 border-b">
            <span className="text-3xl font-extrabold">$118.33</span>
            <span className="text-lg text-gray-400 line-through mb-1">$159.90</span>
            <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded mb-1.5">SAVE 26%</span>
          </div>

          {/* Variants */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3 flex justify-between">
              Length <span className="text-gray-500 font-normal">{selectedLength}</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {lengths.map((l) => (
                <button 
                  key={l}
                  onClick={() => setSelectedLength(l)}
                  className={`px-5 py-2.5 rounded-full border text-sm font-medium transition ${selectedLength === l ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="font-semibold mb-3 flex justify-between">
              Density <span className="text-gray-500 font-normal">{selectedDensity}</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {densities.map((d) => (
                <button 
                  key={d}
                  onClick={() => setSelectedDensity(d)}
                  className={`px-5 py-2.5 rounded-full border text-sm font-medium transition ${selectedDensity === d ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Virtual Try On CTA */}
          <button 
            onClick={() => setIsTryOnModalOpen(true)}
            className="w-full mb-4 bg-amber-50 border border-amber-200 text-amber-800 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-amber-100 transition shadow-sm"
          >
            <Sparkles className="mr-2 text-amber-500" size={20} />
            Virtual Try-On: See it on you
          </button>

          {/* Add to Cart */}
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg mb-6"
          >
            Add to Cart — $118.33
          </button>

          {/* Trust Badges */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
            <div className="flex items-center text-gray-700">
              <Check className="text-green-500 mr-3" size={18} /> 100% Virgin Human Hair
            </div>
            <div className="flex items-center text-gray-700">
              <ShieldCheck className="text-green-500 mr-3" size={18} /> 30-Day Free Returns
            </div>
            <div className="flex items-center text-gray-700">
              <Check className="text-green-500 mr-3" size={18} /> Free Fast Shipping Over $50
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Try-On Modal */}
      {isTryOnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">
            <button 
              onClick={() => { setIsTryOnModalOpen(false); setTryOnState('idle'); }} 
              className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white text-black"
            >
              X
            </button>
            <div className="p-8 text-center border-b">
              <Sparkles className="mx-auto text-amber-500 mb-4" size={32} />
              <h2 className="text-2xl font-bold mb-2">Virtual Try-On Studio</h2>
              <p className="text-gray-500">Upload a photo to see how this wig looks on you.</p>
            </div>
            
            <div className="bg-gray-50 p-12 text-center min-h-[400px] flex flex-col justify-center items-center">
              
              {tryOnState === 'idle' && (
                <div className="w-full">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 bg-white mb-6">
                    <button 
                      onClick={handleSimulateTryOn}
                      className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition"
                    >
                      Upload Photo
                    </button>
                    <p className="text-xs text-gray-400 mt-4">JPG or PNG, max 5MB</p>
                  </div>
                  <p className="text-sm text-gray-500">Or</p>
                  <button onClick={handleSimulateTryOn} className="mt-4 text-amber-600 font-semibold underline hover:text-amber-800 transition">
                    Use Camera
                  </button>
                </div>
              )}

              {tryOnState === 'processing' && (
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Nano Banana Engine Running...</h3>
                    <p className="text-gray-500 text-sm animate-pulse">Detecting hairline and blending lace...</p>
                  </div>
                </div>
              )}

              {tryOnState === 'result' && (
                <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
                  <div className="w-64 h-64 bg-gray-200 rounded-2xl overflow-hidden relative border-4 border-white shadow-xl mb-6">
                     {/* Mock Result Image */}
                     <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero_wig_curly_1778364916891.png')" }}></div>
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-2 flex items-center">
                    <CheckCircle className="mr-2" /> Flawless Fit!
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">The Nano Banana AI successfully blended the 16" Water Wave lace.</p>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setTryOnState('idle')}
                      className="px-6 py-3 border rounded-xl font-bold hover:bg-gray-100 transition"
                    >
                      Try Another Photo
                    </button>
                    <button 
                      onClick={() => { setIsTryOnModalOpen(false); handleAddToCart(); }}
                      className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
