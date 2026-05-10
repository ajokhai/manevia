'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ChevronRight, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import TryOnModal from '@/components/storefront/TryOnModal';

export default function ProductClient({ slug }: { slug: string }) {
  const [selectedLength, setSelectedLength] = useState('16"');
  const [selectedDensity, setSelectedDensity] = useState('180%');
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false);
  
  const mockImages = [
    '/assets/hero_wig_curly_1778364916891.png',
    '/assets/hero_wig_straight_1778364904239.png',
    '/assets/vendor_preview_1_1778364930415.png',
    '/assets/vendor_preview_2_1778364945413.png'
  ];
  const [activeImage, setActiveImage] = useState(mockImages[0]);
  
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: slug,
      name: "Ready to Go Blonde Highlight Water Wave Short Curly Bob Wig",
      price: 118.33,
      image: activeImage,
      quantity: 1,
      variants: { length: selectedLength, density: selectedDensity }
    });
  };

  const lengths = ['14"', '16"', '20"', '24"'];
  const densities = ['150%', '180%', '250%'];


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
          <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-300" style={{ backgroundImage: `url('${activeImage}')` }}></div>
            <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide">Ready to Go</span>
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {mockImages.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-xl overflow-hidden relative border-2 transition-all ${activeImage === img ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-transparent hover:opacity-80'}`}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }}></div>
              </button>
            ))}
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

      <TryOnModal
        isOpen={isTryOnModalOpen}
        onClose={() => setIsTryOnModalOpen(false)}
        onAddToCart={handleAddToCart}
        wigImageUrl={activeImage}
        wigName="Ready to Go Blonde Highlight Water Wave Bob Wig"
      />
    </div>
  );
}
