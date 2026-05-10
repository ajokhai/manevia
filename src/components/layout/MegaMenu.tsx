'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      {/* Top Banner */}
      <div className="bg-black text-white text-xs text-center py-2">
        FREE SHIPPING ON ORDERS OVER $50 | 30-DAY RETURNS
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              MANEVIA
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 h-full">
            <Link href="/collections/best-sellers" className="text-sm font-semibold hover:text-amber-600 py-5 transition">BEST SELLERS</Link>
            
            {/* Mega Menu Trigger - Texture */}
            <div className="group relative">
              <button className="text-sm font-semibold hover:text-amber-600 py-5 transition">TEXTURE</button>
              <div className="absolute left-0 w-48 bg-white border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 top-full">
                <div className="py-2">
                  <Link href="/collections/straight" className="block px-4 py-2 text-sm hover:bg-amber-50">Straight</Link>
                  <Link href="/collections/body-wave" className="block px-4 py-2 text-sm hover:bg-amber-50">Body Wave</Link>
                  <Link href="/collections/deep-wave" className="block px-4 py-2 text-sm hover:bg-amber-50">Deep Wave</Link>
                  <Link href="/collections/kinky-curly" className="block px-4 py-2 text-sm hover:bg-amber-50">Kinky Curly</Link>
                </div>
              </div>
            </div>

            {/* Mega Menu Trigger - Lace Design */}
            <div className="group relative">
              <button className="text-sm font-semibold hover:text-amber-600 py-5 transition">LACE DESIGN</button>
              <div className="absolute left-0 w-48 bg-white border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 top-full">
                <div className="py-2">
                  <Link href="/collections/glueless" className="block px-4 py-2 text-sm hover:bg-amber-50">Glueless Wear Go</Link>
                  <Link href="/collections/13x4-frontal" className="block px-4 py-2 text-sm hover:bg-amber-50">13x4 Lace Front</Link>
                  <Link href="/collections/5x5-closure" className="block px-4 py-2 text-sm hover:bg-amber-50">5x5 Closure</Link>
                </div>
              </div>
            </div>

            <Link href="/collections/new-arrivals" className="text-sm font-semibold hover:text-amber-600 py-5 transition">NEW IN</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-900 hover:text-amber-600"><Search size={20} /></button>
            <Link href="/account" className="text-gray-900 hover:text-amber-600"><User size={20} /></Link>
            <button onClick={toggleCart} className="text-gray-900 hover:text-amber-600 relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4">
          <Link href="/collections/best-sellers" onClick={() => setIsOpen(false)} className="block font-semibold">BEST SELLERS</Link>
          <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider pt-2">Texture</p>
          <Link href="/collections/straight" onClick={() => setIsOpen(false)} className="block text-sm pl-2 text-gray-700">Straight</Link>
          <Link href="/collections/body-wave" onClick={() => setIsOpen(false)} className="block text-sm pl-2 text-gray-700">Body Wave</Link>
          <Link href="/collections/deep-wave" onClick={() => setIsOpen(false)} className="block text-sm pl-2 text-gray-700">Deep Wave</Link>
          <Link href="/collections/kinky-curly" onClick={() => setIsOpen(false)} className="block text-sm pl-2 text-gray-700">Kinky Curly</Link>
          <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider pt-2">Lace Design</p>
          <Link href="/collections/glueless" onClick={() => setIsOpen(false)} className="block text-sm pl-2 text-gray-700">Glueless Wear Go</Link>
          <Link href="/collections/13x4-frontal" onClick={() => setIsOpen(false)} className="block text-sm pl-2 text-gray-700">13x4 Lace Front</Link>
          <Link href="/collections/5x5-closure" onClick={() => setIsOpen(false)} className="block text-sm pl-2 text-gray-700">5x5 Closure</Link>
          <Link href="/collections/new-arrivals" onClick={() => setIsOpen(false)} className="block font-semibold pt-2">NEW IN</Link>
        </div>
      )}
    </header>
  );
}
