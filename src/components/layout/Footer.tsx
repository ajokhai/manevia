import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Get 10% Off Your First Order</h3>
            <p className="text-sm text-white/50">Subscribe for exclusive deals, new arrivals & hair tips.</p>
          </div>
          <div className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500 rounded-l-xl"
            />
            <button className="bg-amber-500 text-black px-6 py-3 text-sm font-bold hover:bg-amber-400 transition rounded-r-xl">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold tracking-tighter mb-4">MANEVIA</h2>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              The premier destination for luxury human hair and glueless wigs, with our revolutionary AI Virtual Try-On Studio.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-white transition" aria-label="Instagram">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition" aria-label="YouTube">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition" aria-label="TikTok">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">Shop</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/collections/best-sellers" className="hover:text-white transition">Best Sellers</Link></li>
              <li><Link href="/collections/new-arrivals" className="hover:text-white transition">New Arrivals</Link></li>
              <li><Link href="/collections/glueless" className="hover:text-white transition">Glueless Wigs</Link></li>
              <li><Link href="/collections/lace-front" className="hover:text-white transition">Lace Front Wigs</Link></li>
              <li><Link href="/collections/body-wave" className="hover:text-white transition">Body Wave</Link></li>
              <li><Link href="/collections/straight" className="hover:text-white transition">Straight Wigs</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">Support</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/pages/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/pages/faqs" className="hover:text-white transition">Shopping FAQs</Link></li>
              <li><Link href="/pages/shipping" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link href="/pages/returns" className="hover:text-white transition">Returns & Exchanges</Link></li>
              <li><Link href="/pages/track-order" className="hover:text-white transition">Track My Order</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/pages/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/pages/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/pages/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link href="/pages/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">We Accept</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'].map((m) => (
                <span key={m} className="text-[10px] border border-white/20 text-white/50 px-2 py-1 rounded">{m}</span>
              ))}
            </div>
            <div className="space-y-2 text-xs text-white/40">
              <p>✓ Free shipping over $99</p>
              <p>✓ 30-day free returns</p>
              <p>✓ 100% Virgin human hair</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Manevia Luxury Hair. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/pages/privacy" className="hover:text-white/60 transition">Privacy</Link>
            <Link href="/pages/terms" className="hover:text-white/60 transition">Terms</Link>
            <Link href="/pages/cookies" className="hover:text-white/60 transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
