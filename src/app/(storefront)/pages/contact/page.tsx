import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Clock } from 'lucide-react';
export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/" className="text-sm text-gray-400 hover:text-black flex items-center gap-1 mb-10 transition"><ArrowLeft size={14} /> Back to Store</Link>
      <p className="text-xs uppercase tracking-widest text-amber-600 mb-2">We're Here to Help</p>
      <h1 className="text-4xl font-bold mb-12">Contact Us</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0"><Mail size={18} className="text-amber-600" /></div>
            <div><p className="font-semibold mb-1">Email Us</p><p className="text-sm text-gray-500">support@manevia.com</p><p className="text-xs text-gray-400">We reply within 24 hours</p></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0"><Phone size={18} className="text-amber-600" /></div>
            <div><p className="font-semibold mb-1">Call Us</p><p className="text-sm text-gray-500">+1 (800) 555-0192</p><p className="text-xs text-gray-400">Mon–Fri, 9am–6pm EST</p></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0"><Clock size={18} className="text-amber-600" /></div>
            <div><p className="font-semibold mb-1">Business Hours</p><p className="text-sm text-gray-500">Monday – Friday: 9:00 AM – 6:00 PM EST</p><p className="text-sm text-gray-500">Saturday: 10:00 AM – 3:00 PM EST</p></div>
          </div>
        </div>
        <form className="space-y-5 bg-gray-50 p-8 rounded-2xl">
          <h2 className="font-bold text-lg mb-2">Send Us a Message</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">First Name</label><input type="text" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Last Name</label><input type="text" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black" /></div>
          </div>
          <div><label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Email</label><input type="email" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black" /></div>
          <div><label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Order # (optional)</label><input type="text" placeholder="e.g. MNV-12345" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black" /></div>
          <div><label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Message</label><textarea rows={4} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"></textarea></div>
          <button type="submit" className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition">Send Message</button>
        </form>
      </div>
    </div>
  );
}
