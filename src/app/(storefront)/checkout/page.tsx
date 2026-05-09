'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { Lock, CreditCard, Apple, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = getCartTotal();
  const shipping = total > 50 ? 0 : 15;
  const grandTotal = total + shipping;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate Paystack/Stripe integration delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep(3);
    clearCart();
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center">
        <CheckCircle className="text-green-500 w-24 h-24 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">Thank you for your order. We are preparing your luxury wig for shipment.</p>
        <Link href="/" className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition">
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
      {/* Checkout Form */}
      <div className="w-full lg:w-3/5">
        <h1 className="text-3xl font-bold mb-8">Checkout Securely</h1>
        
        {/* Express Checkout Options */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-center text-gray-500 mb-4">Express checkout</p>
          <div className="grid grid-cols-2 gap-4">
             <button className="bg-black text-white py-3 rounded-lg flex justify-center items-center font-bold hover:bg-gray-800"><Apple size={20} className="mr-2" /> Pay</button>
             <button className="bg-[#5a31f4] text-white py-3 rounded-lg flex justify-center items-center font-bold hover:bg-[#4b27cc]">Shop Pay</button>
          </div>
          <div className="flex items-center my-6">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <input type="email" placeholder="Email Address" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          
          <h2 className="text-xl font-semibold mt-8">Shipping Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <input type="text" placeholder="Last Name" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <input type="text" placeholder="Address" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="City" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 col-span-1" />
            <select className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 col-span-1 bg-white">
              <option>State</option>
              <option>CA</option>
              <option>NY</option>
            </select>
            <input type="text" placeholder="ZIP Code" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 col-span-1" />
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing || items.length === 0}
            className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition disabled:opacity-50 flex justify-center items-center"
          >
            {isProcessing ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <Lock size={18} className="mr-2" /> Pay ${grandTotal.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-2/5 bg-gray-50 p-8 rounded-2xl h-fit sticky top-24">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-white rounded-lg border overflow-hidden relative mr-4">
                   <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}></div>
                   <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center z-10">{item.quantity}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm line-clamp-1 max-w-[200px]">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.variants.length} / {item.variants.density}</p>
                </div>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-3 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-black">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            {shipping === 0 ? (
              <span className="font-medium text-green-600">FREE</span>
            ) : (
              <span className="font-medium text-black">${shipping.toFixed(2)}</span>
            )}
          </div>
        </div>

        <div className="border-t mt-4 pt-4 flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
