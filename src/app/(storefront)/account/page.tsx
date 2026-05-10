import Link from 'next/link';
import { User, Package, Heart, MapPin, LogIn } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl font-bold mb-2">My Account</h1>
      <p className="text-sm text-gray-500 mb-10">Sign in to view your orders, wishlist, and saved addresses.</p>

      {/* Sign In Prompt */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center mb-10">
        <User size={40} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-lg font-bold mb-2">You&apos;re not signed in</h2>
        <p className="text-sm text-gray-500 mb-6">Create an account or sign in to manage your profile.</p>
        <div className="flex gap-4 justify-center">
          <button className="bg-black text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition">
            Sign In
          </button>
          <button className="border border-gray-300 px-8 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition">
            Create Account
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/pages/track-order" className="flex items-center gap-3 p-5 border rounded-2xl hover:border-amber-300 hover:bg-amber-50/30 transition">
          <Package size={20} className="text-gray-400" />
          <div>
            <p className="font-semibold text-sm">Track Order</p>
            <p className="text-xs text-gray-400">Check your shipment status</p>
          </div>
        </Link>
        <Link href="/collections/best-sellers" className="flex items-center gap-3 p-5 border rounded-2xl hover:border-amber-300 hover:bg-amber-50/30 transition">
          <Heart size={20} className="text-gray-400" />
          <div>
            <p className="font-semibold text-sm">Wishlist</p>
            <p className="text-xs text-gray-400">Your saved items</p>
          </div>
        </Link>
        <Link href="/pages/shipping" className="flex items-center gap-3 p-5 border rounded-2xl hover:border-amber-300 hover:bg-amber-50/30 transition">
          <MapPin size={20} className="text-gray-400" />
          <div>
            <p className="font-semibold text-sm">Addresses</p>
            <p className="text-xs text-gray-400">Manage shipping info</p>
          </div>
        </Link>
        <Link href="/vendors/login" className="flex items-center gap-3 p-5 border rounded-2xl hover:border-amber-300 hover:bg-amber-50/30 transition">
          <LogIn size={20} className="text-gray-400" />
          <div>
            <p className="font-semibold text-sm">Vendor Portal</p>
            <p className="text-xs text-gray-400">Sign in as a seller</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
