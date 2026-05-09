import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-amber-50 overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-amber-50 p-12 md:p-24 flex flex-col justify-center">
            <span className="text-amber-600 font-semibold tracking-wider mb-4">NEW ARRIVALS</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-6">
              The Glueless <br />Revolution.
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Discover premium, 100% human hair wigs that are ready to wear right out of the box. No skills required.
            </p>
            <div className="flex gap-4">
              <Link href="/collections/glueless" className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition rounded-full">
                Shop Glueless
              </Link>
              <Link href="/collections/best-sellers" className="border-2 border-black text-black px-8 py-4 font-semibold hover:bg-black hover:text-white transition rounded-full flex items-center">
                Explore All <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
          <div className="w-1/2 relative">
            {/* Try to use the dummy hero image if it exists, fallback to a CSS block for now */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero_wig_straight_1778364904239.png')" }}></div>
          </div>
        </div>
      </section>

      {/* Try-On Banner */}
      <section className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">See It Before You Buy It.</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Introducing Manevia's AI Virtual Try-On Studio. Upload a selfie and our AI will seamlessly blend the wig onto your head.
        </p>
        <Link href="/collections/best-sellers" className="inline-block bg-amber-500 text-black px-8 py-3 rounded-full font-bold hover:bg-amber-400 transition">
          Try It Now ✨
        </Link>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Texture</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Straight', 'Body Wave', 'Deep Wave', 'Kinky Curly'].map((texture) => (
            <Link key={texture} href={`/collections/${texture.toLowerCase().replace(' ', '-')}`} className="group block">
              <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-2xl overflow-hidden mb-4 relative">
                 {/* Placeholder for real images */}
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-105 transition duration-500">
                    [Image: {texture}]
                 </div>
              </div>
              <h3 className="text-lg font-semibold text-center group-hover:text-amber-600 transition">{texture}</h3>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Best Sellers Preview */}
      <section className="bg-amber-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Luvme Best Sellers</h2>
              <p className="text-gray-600 mt-2">Loved by thousands of women worldwide.</p>
            </div>
            <Link href="/collections/best-sellers" className="font-semibold underline hover:text-amber-600">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Mock Product Cards */}
             {[1,2,3].map((item) => (
                <div key={item} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero_wig_curly_1778364916891.png')" }}></div>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-500 mb-2">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <span className="text-xs text-gray-500 ml-1">(124)</span>
                  </div>
                  <h3 className="font-semibold text-lg line-clamp-2 mb-2">Ready to Go Blonde Highlight Water Wave Bob Wig</h3>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">$118.33</span>
                    <span className="text-sm text-gray-400 line-through">$159.90</span>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
