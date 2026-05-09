import Link from 'next/link';
import { Filter, ChevronDown, Star } from 'lucide-react';

export default async function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  // Format category string (e.g., 'best-sellers' to 'Best Sellers')
  const title = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-black">Home</Link> / <span className="text-black">{title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <h2 className="font-bold text-xl mb-6">Filter By</h2>
          
          <div className="border-b py-4">
            <h3 className="font-semibold flex justify-between items-center cursor-pointer">
              Length <ChevronDown size={16} />
            </h3>
            <div className="mt-4 space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <span>Short (8"-14")</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <span>Medium (16"-20")</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <span>Long (22"-30")</span>
              </label>
            </div>
          </div>

          <div className="border-b py-4">
            <h3 className="font-semibold flex justify-between items-center cursor-pointer">
              Texture <ChevronDown size={16} />
            </h3>
            <div className="mt-4 space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <span>Straight</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <span>Body Wave</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <span>Curly</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <h1 className="text-3xl font-bold">{title} Wigs</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">24 Products</span>
              <select className="border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:border-amber-600">
                <option>Featured</option>
                <option>Best Selling</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
             {/* Mock Product Cards */}
             {[1,2,3,4,5,6].map((item) => (
                <Link key={item} href={`/products/mock-wig-${item}`} className="group">
                  <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition duration-500" style={{ backgroundImage: "url('/assets/hero_wig_straight_1778364904239.png')" }}></div>
                    {item === 1 && (
                      <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">BEST SELLER</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-amber-500 mb-1">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs text-gray-500 ml-1">(48)</span>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:underline">Premium HD Lace Glueless Wear & Go Wig</h3>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-base">$129.90</span>
                  </div>
                </Link>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
