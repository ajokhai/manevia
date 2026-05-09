'use client';

import { useCartStore } from '@/store/cartStore';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function SlideOutCart() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getCartTotal } = useCartStore();

  if (!isOpen) return null;

  const total = getCartTotal();

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={toggleCart}
      />

      {/* Cart Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2" /> Your Cart ({items.length})
          </h2>
          <button onClick={toggleCart} className="text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Your cart is empty.</p>
              <button onClick={toggleCart} className="mt-6 text-amber-600 font-semibold underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                    {/* Placeholder image logic */}
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image || '/assets/hero_wig_straight_1778364904239.png'})` }}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-sm line-clamp-2 pr-4">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.variants.length} / {item.variants.density}
                    </p>
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border rounded-md">
                        <button 
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-4 text-center">Shipping & taxes calculated at checkout</p>
            <Link href="/checkout" onClick={toggleCart} className="block w-full bg-black text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition">
              Checkout Securely
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
