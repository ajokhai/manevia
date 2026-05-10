import Link from 'next/link';
import { ArrowRight, Star, Sparkles } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Ready to Go Blonde Highlight Water Wave Short Curly Bob Wig Glueless Minimalist HD Lace',
    price: 118.33,
    compare: 159.90,
    reviews: 131,
    badge: 'BEST SELLER',
    img: 'https://shop.luvmehair.com/cdn/shop/files/1897611135524360195bB5SyHThsztL7VqR.webp?v=1772592125',
    slug: 'blonde-water-wave-bob',
  },
  {
    id: 2,
    name: 'Glueless Straight 13x4 HD Lace Front Wig Pre-Cut Pre-Bleached Knots Ready To Wear',
    price: 139.00,
    compare: 185.00,
    reviews: 98,
    badge: 'NEW IN',
    img: 'https://shop.luvmehair.com/cdn/shop/files/2036701831643627520ZFOG08Vj6oZcaieB.jpg?v=1774422608&width=1024',
    slug: 'glueless-straight-13x4',
  },
  {
    id: 3,
    name: 'Ombre Brown Body Wave 5x5 Lace Closure Wig 200% Density Human Hair',
    price: 154.90,
    compare: 199.90,
    reviews: 74,
    badge: null,
    img: 'https://shop.luvmehair.com/cdn/shop/files/1917108797004963840DYB717MSjBIX9LZI_5d9afdb5-66d9-4efc-88eb-2a4e847c6c26.jpg?v=1773744679',
    slug: 'ombre-body-wave-5x5',
  },
  {
    id: 4,
    name: 'Natural Black Kinky Curly 7x6 PartingMax Glueless Wig Pre-Bleached Zero Skill',
    price: 168.00,
    compare: 219.00,
    reviews: 212,
    badge: 'TOP RATED',
    img: 'https://shop.luvmehair.com/cdn/shop/files/1942518174742327298Ug7xge3yCSqm039n_cecf3b4d-9c9e-4b23-9000-6876634e8c9a.jpg?v=1778208049',
    slug: 'kinky-curly-partingmax',
  },
  {
    id: 5,
    name: 'Loose Deep Wave 13x6 HD Lace Front Wig Undetectable Lace 180% Density',
    price: 145.00,
    compare: 193.00,
    reviews: 56,
    badge: null,
    img: 'https://shop.luvmehair.com/cdn/shop/files/1930914224976986112bOP7drmqB47YYv3S.webp?v=1773999101',
    slug: 'loose-deep-wave-13x6',
  },
  {
    id: 6,
    name: 'Highlight Honey Blonde Straight Bob 4x4 Lace Closure Wig Pre-Plucked',
    price: 108.00,
    compare: 148.00,
    reviews: 163,
    badge: 'SALE',
    img: 'https://shop.luvmehair.com/cdn/shop/files/1881890570524241920UD5PNx9pqaV0JSRk_540af72d-22d0-4f33-9b43-3f22cec81f3a.png?v=1772433115',
    slug: 'highlight-blonde-bob',
  },
  {
    id: 7,
    name: 'Water Wave Salt & Pepper Grey 13x4 HD Lace Front Wig 150% Density',
    price: 129.00,
    compare: 169.00,
    reviews: 41,
    badge: 'NEW IN',
    img: 'https://shop.luvmehair.com/cdn/shop/files/2022268973827039232SJGq8iVkiVGPOCdM_85b3fb95-4138-4ed7-88e6-5fb3be99f390.jpg?v=1774088805&width=1024',
    slug: 'salt-pepper-water-wave',
  },
  {
    id: 8,
    name: 'Deep Curly Minimalist Lace Glueless Wig 250% High Density Wear & Go',
    price: 178.00,
    compare: 229.00,
    reviews: 88,
    badge: 'HOT',
    img: 'https://shop.luvmehair.com/cdn/shop/files/2046127413712224256kl6OuPnTaUxKrNaR.png?v=1776669855&width=1024',
    slug: 'deep-curly-minimalist',
  },
];

const CATEGORIES = [
  { label: 'Glueless', href: '/collections/glueless', img: 'https://shop.luvmehair.com/cdn/shop/files/1897611135524360195bB5SyHThsztL7VqR.webp?v=1772592125' },
  { label: 'Straight', href: '/collections/straight', img: 'https://shop.luvmehair.com/cdn/shop/files/2036701831643627520ZFOG08Vj6oZcaieB.jpg?v=1774422608&width=1024' },
  { label: 'Body Wave', href: '/collections/body-wave', img: 'https://shop.luvmehair.com/cdn/shop/files/1917108797004963840DYB717MSjBIX9LZI_5d9afdb5-66d9-4efc-88eb-2a4e847c6c26.jpg?v=1773744679' },
  { label: 'Curly', href: '/collections/curly', img: 'https://shop.luvmehair.com/cdn/shop/files/1942518174742327298Ug7xge3yCSqm039n_cecf3b4d-9c9e-4b23-9000-6876634e8c9a.jpg?v=1778208049' },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={12} fill="currentColor" className="text-amber-500" />
      ))}
      <span className="text-xs text-gray-400 ml-1">({count})</span>
    </div>
  );
}

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const discount = Math.round((1 - product.price / product.compare) * 100);
  return (
    <Link href={`/products/${product.slug}`} className="group flex-shrink-0 w-64 sm:w-72">
      <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-3">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
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
      <StarRating count={product.reviews} />
      <h3 className="text-sm font-medium text-gray-900 mt-1 mb-1.5 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
        {product.name}
      </h3>
      <div className="flex items-center gap-2">
        <span className="font-bold text-base">${product.price.toFixed(2)}</span>
        <span className="text-sm text-gray-400 line-through">${product.compare.toFixed(2)}</span>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative h-[88vh] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2">
          {/* Left copy */}
          <div className="bg-[#fdf6ee] flex flex-col justify-center px-12 md:px-20 lg:px-28">
            <span className="text-amber-600 text-xs font-bold uppercase tracking-[0.25em] mb-5">New Season Arrivals</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-gray-900 leading-[1.05] mb-6">
              The Glueless<br />Revolution.
            </h1>
            <p className="text-gray-500 text-base mb-10 max-w-xs leading-relaxed">
              Premium 100% human hair wigs. Ready to wear. Zero glue, zero effort, infinite confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/collections/glueless"
                className="bg-black text-white px-8 py-3.5 font-semibold text-sm rounded-full hover:bg-gray-800 transition">
                Shop Glueless
              </Link>
              <Link href="/collections/best-sellers"
                className="border border-black text-black px-8 py-3.5 font-semibold text-sm rounded-full hover:bg-black hover:text-white transition flex items-center gap-2">
                Best Sellers <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          {/* Right image */}
          <div className="relative">
            <div className="absolute inset-0 bg-cover bg-top"
              style={{ backgroundImage: "url('/assets/hero_wig_straight_1778364904239.png')" }} />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-black text-white text-xs tracking-widest uppercase flex items-center justify-center gap-12 py-3.5">
        <span>Free Shipping Over $99</span>
        <span className="opacity-30">|</span>
        <span>30-Day Free Returns</span>
        <span className="opacity-30">|</span>
        <span>100% Virgin Human Hair</span>
        <span className="opacity-30">|</span>
        <span>AI Virtual Try-On ✨</span>
      </div>

      {/* Best Sellers — horizontal scroll */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Our Favourites</p>
              <h2 className="text-3xl font-bold">Best Sellers</h2>
            </div>
            <Link href="/collections/best-sellers" className="text-sm font-semibold underline underline-offset-4 hover:text-amber-600 transition flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {PRODUCTS.slice(0, 5).map((p) => (
              <div key={p.id} className="snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try-On Banner */}
      <section className="bg-[#0a0a0a] text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "url('/assets/hero_wig_curly_1778364916891.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Sparkles className="mx-auto text-amber-400 mb-4" size={32} />
          <h2 className="text-3xl font-bold mb-3">See It Before You Buy It.</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Our Nano Banana AI Try-On Studio places any wig seamlessly onto your selfie in under 3 seconds. No filters, no tricks — just your real look.
          </p>
          <Link href="/collections/best-sellers"
            className="inline-block bg-amber-500 text-black px-10 py-3.5 rounded-full font-bold text-sm hover:bg-amber-400 transition">
            Try It Now ✨
          </Link>
        </div>
      </section>

      {/* Shop by Texture */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Find Your Style</p>
            <h2 className="text-3xl font-bold">Shop by Texture</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href} className="group block">
                <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative mb-3">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${cat.img}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white font-bold text-lg">{cat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals — horizontal scroll */}
      <section className="py-20 bg-[#fdf6ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-600 mb-1">Just Landed</p>
              <h2 className="text-3xl font-bold">New Arrivals</h2>
            </div>
            <Link href="/collections/new-arrivals" className="text-sm font-semibold underline underline-offset-4 hover:text-amber-600 transition flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {PRODUCTS.slice(3).map((p) => (
              <div key={p.id} className="snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="py-16 border-t">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" className="text-amber-500" />
            ))}
          </div>
          <p className="text-xl font-semibold mb-2">"Literally the best wig I've ever worn. Put it on in 2 minutes, no glue."</p>
          <p className="text-sm text-gray-400">— @beautybytrish · 12,400 followers</p>
        </div>
      </section>

    </div>
  );
}
