'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, PartyPopper } from 'lucide-react';

const PERKS = [
  'Reach thousands of engaged hair enthusiasts every month',
  'Zero upfront fees — we only earn when you do',
  'Your own branded storefront within the Manevia marketplace',
  'Full support from our vendor success team',
  'AI-powered Virtual Try-On for your products at no extra cost',
  'Weekly payouts directly to your bank account',
];

export default function VendorApply() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to /api/vendors/apply when DB is wired
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-[#0a0a0a] text-white py-20 px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-amber-500 mb-3">Partner With Us</p>
        <h1 className="text-5xl font-bold tracking-tight mb-5">Sell on Manevia</h1>
        <p className="text-white/60 max-w-lg mx-auto text-base leading-relaxed">
          Join a curated luxury marketplace built for premium hair brands. Bring your products to thousands of customers who are ready to buy.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/" className="text-sm text-gray-400 hover:text-black flex items-center gap-1 mb-12 transition">
          <ArrowLeft size={14} /> Back to Store
        </Link>

        {submitted ? (
          /* ── SUCCESS STATE ────────────────────────────────────────── */
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <PartyPopper size={28} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Application Received!</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Thank you for your interest in selling on Manevia. Our vendor success team will review your application and get back to you within <strong>3–5 business days</strong>.
            </p>
            <p className="text-sm text-gray-400 mb-10">
              Keep an eye on your inbox — we'll send next steps and onboarding instructions to the email you provided.
            </p>
            <Link
              href="/"
              className="inline-block bg-black text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-gray-800 transition"
            >
              Back to Store
            </Link>
          </div>
        ) : (
          /* ── FORM STATE ───────────────────────────────────────────── */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left — Perks */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Why sell on Manevia?</h2>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                We're building the UK and US's most trusted destination for luxury hair. Partner with us and grow your brand.
              </p>
              <ul className="space-y-4">
                {PERKS.map((perk, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 leading-relaxed">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Application Form */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Apply Now</h2>
              <p className="text-sm text-gray-500 mb-8">We review all applications within 3–5 business days.</p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">First Name</label>
                    <input type="text" required className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Last Name</label>
                    <input type="text" required className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Brand / Business Name</label>
                  <input type="text" required placeholder="e.g. Luxe Hair Co." className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input type="email" required className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Website or Instagram (optional)</label>
                  <input type="text" placeholder="https:// or @handle" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">What products do you sell?</label>
                  <select required className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition bg-white">
                    <option value="">Select a category</option>
                    <option>Human Hair Wigs</option>
                    <option>Lace Front Wigs</option>
                    <option>Hair Extensions</option>
                    <option>Hair Care & Accessories</option>
                    <option>Multiple Categories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Tell us about your brand</label>
                  <textarea rows={4} placeholder="Where do you source your hair? What makes your products unique?" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition resize-none" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm hover:bg-gray-800 transition"
                >
                  Submit Application
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By applying you agree to our{' '}
                  <Link href="/pages/terms" className="underline hover:text-black">Terms & Conditions</Link>{' '}and{' '}
                  <Link href="/pages/privacy" className="underline hover:text-black">Privacy Policy</Link>.
                </p>
              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
