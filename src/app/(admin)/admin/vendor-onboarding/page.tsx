'use client';

import { useState } from 'react';
import { Store, CreditCard, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function VendorOnboarding() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Welcome to Manevia, Vendor!</h1>
        <p className="text-gray-500">Let's get your store set up so you can start selling luxury wigs.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between relative mb-16">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
        <div className={`absolute top-1/2 left-0 h-1 bg-amber-500 -z-10 -translate-y-1/2 transition-all duration-500`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
        
        <div className={`flex flex-col items-center ${step >= 1 ? 'text-amber-600' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 1 ? 'bg-amber-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <span className="text-sm font-semibold">Store Profile</span>
        </div>
        <div className={`flex flex-col items-center ${step >= 2 ? 'text-amber-600' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 2 ? 'bg-amber-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>2</div>
          <span className="text-sm font-semibold">Payouts</span>
        </div>
        <div className={`flex flex-col items-center ${step >= 3 ? 'text-amber-600' : 'text-gray-400'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 3 ? 'bg-amber-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>3</div>
          <span className="text-sm font-semibold">Nano Banana</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border min-h-[400px] flex flex-col">
        {step === 1 && (
          <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <Store className="text-amber-500" size={28} />
              <h2 className="text-2xl font-bold">Set up your Storefront</h2>
            </div>
            <p className="text-gray-600 mb-6">Your brand is everything. Let customers know who you are and what makes your wigs premium.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Brand Name</label>
                <input type="text" placeholder="e.g., Luxe Hair Co." className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Brand Story (Bio)</label>
                <textarea placeholder="Tell your customers about your quality standards..." rows={4} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"></textarea>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button onClick={() => setStep(2)} className="bg-black text-white px-6 py-3 rounded-lg font-bold flex items-center hover:bg-gray-800 transition">
                Next Step <ArrowRight className="ml-2" size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <CreditCard className="text-[#5a31f4]" size={28} />
              <h2 className="text-2xl font-bold">Connect Payouts (Paystack)</h2>
            </div>
            <p className="text-gray-600 mb-6">We use Paystack Subaccounts to automatically split payments. You'll receive your funds directly when a customer orders your wig.</p>
            
            <div className="bg-[#f4f2ff] border border-[#5a31f4]/20 p-6 rounded-xl flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#5a31f4]">Create Paystack Subaccount</h3>
                <p className="text-sm text-gray-600 mt-1">You will be redirected to Paystack to verify your identity.</p>
              </div>
              <button className="bg-[#5a31f4] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#4b27cc] transition shadow-md">
                Connect Paystack
              </button>
            </div>

            <div className="mt-auto pt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="text-gray-500 font-medium hover:text-black transition">Back</button>
              <button onClick={() => setStep(3)} className="bg-black text-white px-6 py-3 rounded-lg font-bold flex items-center hover:bg-gray-800 transition">
                Next Step <ArrowRight className="ml-2" size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="text-amber-500" size={28} />
              <h2 className="text-2xl font-bold">The Nano Banana AI Rules</h2>
            </div>
            <p className="text-gray-600 mb-6">Manevia's "Virtual Try-On" feature uses advanced AI to superimpose your wigs onto a customer's selfie. To ensure your wigs look flawless, you <strong>must</strong> follow these photo rules:</p>
            
            <div className="space-y-4">
              <div className="flex items-start bg-amber-50 p-4 rounded-lg">
                <CheckCircle2 className="text-green-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-bold">Transparent PNGs Only</h4>
                  <p className="text-sm text-gray-600">The "AI Source Image" you upload must be a .PNG file with the background completely removed. Do not upload JPGs for the AI asset.</p>
                </div>
              </div>
              <div className="flex items-start bg-amber-50 p-4 rounded-lg">
                <CheckCircle2 className="text-green-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-bold">Ghost Mannequin</h4>
                  <p className="text-sm text-gray-600">Remove any mannequin faces from the inside of the wig cap in post-production. The AI needs empty space to place the user's face.</p>
                </div>
              </div>
              <div className="flex items-start bg-amber-50 p-4 rounded-lg">
                <CheckCircle2 className="text-green-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-bold">Zero-Degree Angle</h4>
                  <p className="text-sm text-gray-600">Shoot the wig dead straight-on with flat studio lighting. Harsh shadows ruin the AI blending effect.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="text-gray-500 font-medium hover:text-black transition">Back</button>
              <Link href="/admin/products" className="bg-amber-500 text-white px-6 py-3 rounded-lg font-bold flex items-center hover:bg-amber-600 transition shadow-lg">
                I Understand, Let's Add a Wig!
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
