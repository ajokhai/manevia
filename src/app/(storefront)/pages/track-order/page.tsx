import Link from 'next/link';
import { ArrowLeft, Package } from 'lucide-react';
export default function TrackOrder() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/" className="text-sm text-gray-400 hover:text-black flex items-center gap-1 mb-10 transition"><ArrowLeft size={14} /> Back to Store</Link>
      <p className="text-xs uppercase tracking-widest text-amber-600 mb-2">Delivery</p>
      <h1 className="text-4xl font-bold mb-3">Track My Order</h1>
      <p className="text-sm text-gray-500 mb-10">Enter your order number and email below to see your current delivery status.</p>
      <form className="space-y-5 bg-gray-50 p-8 rounded-2xl">
        <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Order Number</label><input type="text" placeholder="e.g. MNV-12345" className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black" /></div>
        <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label><input type="email" placeholder="The email used at checkout" className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black" /></div>
        <button type="submit" className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"><Package size={16} /> Track Order</button>
      </form>
      <p className="text-center mt-8 text-xs text-gray-400">Need further help? <Link href="/pages/contact" className="underline hover:text-black">Contact Us</Link></p>
    </div>
  );
}
