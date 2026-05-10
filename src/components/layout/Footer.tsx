import Link from 'next/link';
import { Instagram, Youtube, Twitter } from 'lucide-react';

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
              <a href="#" className="text-white/40 hover:text-white transition"><Instagram size={18} /></a>
              <a href="#" className="text-white/40 hover:text-white transition"><Youtube size={18} /></a>
              <a href="#" className="text-white/40 hover:text-white transition"><Twitter size={18} /></a>
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
