import Link from 'next/link';
import { ChevronDown, Star } from 'lucide-react';
import type { Metadata } from 'next';

const COLLECTION_PRODUCTS = [
  {
    slug: 'blonde-water-wave-bob',
    name: 'Ready to Go Blonde Highlight Water Wave Short Curly Bob Wig',
    price: 118.33,
    compare: 159.90,
    reviews: 131,
    badge: 'BEST SELLER',
    img: 'https://shop.luvmehair.com/cdn/shop/files/1897611135524360195bB5SyHThsztL7VqR.webp?v=1772592125',
  },
  {
    slug: 'glueless-straight-13x4',
    name: 'Glueless Straight 13x4 HD Lace Front Wig Pre-Cut Pre-Bleached',
    price: 139.00,
    compare: 185.00,
    reviews: 98,
    badge: 'NEW IN',
    img: 'https://shop.luvmehair.com/cdn/shop/files/2036701831643627520ZFOG08Vj6oZcaieB.jpg?v=1774422608&width=1024',
  },
  {
    slug: 'ombre-brown-body-wave',
    name: 'Ombre Brown Body Wave 5x5 Lace Closure Wig 200% Density Human Hair',
    price: 154.90,
    compare: 199.90,
    reviews: 74,
    badge: null,
    img: 'https://shop.luvmehair.com/cdn/shop/files/1917108797004963840DYB717MSjBIX9LZI_5d9afdb5-66d9-4efc-88eb-2a4e847c6c26.jpg?v=1773744679',
  },
  {
    slug: 'kinky-curly-parting-max',
    name: 'Natural Black Kinky Curly 7x6 PartingMax Glueless Wig Pre-Everything',
    price: 168.00,
    compare: 219.00,
    reviews: 212,
    badge: 'TOP RATED',
    img: 'https://shop.luvmehair.com/cdn/shop/files/1942518174742327298Ug7xge3yCSqm039n_cecf3b4d-9c9e-4b23-9000-6876634e8c9a.jpg?v=1778208049',
  },
  {
    slug: 'loose-deep-wave-13x6',
    name: 'Loose Deep Wave 13x6 HD Lace Front Wig Undetectable Natural Hairline',
    price: 145.00,
    compare: 193.00,
    reviews: 56,
    badge: null,
    img: 'https://shop.luvmehair.com/cdn/shop/files/1897611135524360195bB5SyHThsztL7VqR.webp?v=1772592125',
  },
  {
    slug: 'deep-curly-minimalist',
    name: 'Deep Curly Minimalist Lace Wig HD Transparent Lace Natural Look',
    price: 132.50,
    compare: 175.00,
    reviews: 89,
    badge: 'SALE',
    img: 'https://shop.luvmehair.com/cdn/shop/files/2036701831643627520ZFOG08Vj6oZcaieB.jpg?v=1774422608&width=1024',
  },
];

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const title = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `${title} Wigs`,
    description: `Shop our exclusive collection of ${title} wigs. Find the perfect length, density, and texture to match your style.`,
    openGraph: {
      title: `${title} Wigs | Manevia Collection`,
      description: `Explore Manevia's top-rated ${title} wigs with HD lace and 100% Virgin Human Hair.`,
      type: 'website',
    }
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
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
                <span>Short (8&quot;-14&quot;)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <span>Medium (16&quot;-20&quot;)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <span>Long (22&quot;-30&quot;)</span>
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
              <span className="text-sm text-gray-500">{COLLECTION_PRODUCTS.length} Products</span>
              <select className="border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:border-amber-600 bg-white">
                <option>Featured</option>
                <option>Best Selling</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
             {COLLECTION_PRODUCTS.map((product) => {
               const discount = Math.round((1 - product.price / product.compare) * 100);
               return (
                 <Link key={product.slug} href={`/products/${product.slug}`} className="group flex flex-col">
                   <div className="h-80 w-full bg-gray-100 rounded-2xl mb-3 overflow-hidden relative flex-shrink-0">
                     <div
                       className="absolute inset-0 bg-cover bg-top group-hover:scale-105 transition duration-500"
                       style={{ backgroundImage: `url('${product.img}')` }}
                     />
                     {product.badge && (
                       <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
                         ${product.badge === 'SALE' ? 'bg-red-500 text-white' :
                           product.badge === 'NEW IN' ? 'bg-black text-white' :
                           product.badge === 'TOP RATED' ? 'bg-amber-500 text-black' :
                           'bg-white text-black border'}`}>
                         {product.badge}
                       </span>
                     )}
                     <span className="absolute top-3 right-3 text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                       -{discount}%
                     </span>
                   </div>
                   <div className="flex items-center gap-1">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} size={12} fill="currentColor" className="text-amber-500" />
                     ))}
                     <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                   </div>
                   <h3 className="font-semibold text-sm line-clamp-2 mt-1 mb-1.5 group-hover:text-amber-600 transition flex-1 leading-snug">{product.name}</h3>
                   <div className="flex items-center gap-2">
                     <span className="font-bold text-base">${product.price.toFixed(2)}</span>
                     <span className="text-sm text-gray-400 line-through">${product.compare.toFixed(2)}</span>
                   </div>
                 </Link>
               );
             })}
          </div>
        </div>
      </div>
    </div>
  );
}
