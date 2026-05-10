'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Store } from 'lucide-react';

const DEMO_ACCOUNTS = [
  {
    role: 'Vendor',
    name: 'Luxe Hair Co.',
    email: 'vendor@luxehairco.com',
    password: 'vendor_demo_2026',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    badge: 'bg-emerald-500 text-white',
  },
  {
    role: 'New Vendor',
    name: 'Crown & Curls',
    email: 'hello@crownandcurls.com',
    password: 'vendor_new_2026',
    color: 'bg-purple-50 border-purple-200 text-purple-800',
    badge: 'bg-purple-500 text-white',
  },
];

export default function VendorLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Real auth — redirect to vendor dashboard
    setTimeout(() => router.push('/'), 900);
  };

  const selectAccount = (account: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* Left — Branded Panel */}
      <div className="hidden lg:flex flex-col justify-between p-14 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/assets/hero_wig_straight_1778364904239.png')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%)' }} />

        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Vendor Portal</p>
          <h1 className="text-4xl font-bold tracking-tight">Manevia</h1>
        </div>

        <div className="relative z-10 space-y-6">
          <p className="text-2xl font-light leading-snug text-white/70 max-w-sm">
            Manage your products, track your orders, and grow your brand.
          </p>
          <div className="flex gap-6 text-xs text-white/40 uppercase tracking-wider">
            <span>Zero upfront fees</span>
            <span>&bull;</span>
            <span>Weekly payouts</span>
            <span>&bull;</span>
            <span>AI Try-On included</span>
          </div>
        </div>

        <div className="relative z-10 flex gap-6">
          <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition uppercase tracking-widest">
            &larr; Back to Store
          </Link>
          <Link href="/vendors/apply" className="text-xs text-amber-500/70 hover:text-amber-400 transition uppercase tracking-widest">
            Apply to Sell &rarr;
          </Link>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-20 bg-white">
        <div className="w-full max-w-sm mx-auto">

          <div className="lg:hidden mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">Vendor Portal</p>
            <h1 className="text-3xl font-bold">Manevia</h1>
          </div>

          <h2 className="text-2xl font-bold mb-1">Vendor Sign In</h2>
          <p className="text-sm text-gray-400 mb-8">Manage your storefront and products.</p>

          {/* Demo Account Cards */}
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-3 flex items-center gap-1.5">
              <Store size={12} /> Demo Accounts — click to autofill
            </p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map(account => (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => selectAccount(account)}
                  className={`w-full flex items-center justify-between px-4 py-3 border rounded-xl text-sm transition hover:shadow-sm ${account.color} ${email === account.email ? 'ring-2 ring-offset-1 ring-black/20' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${account.badge}`}>{account.role}</span>
                    <div className="text-left">
                      <p className="font-medium">{account.name}</p>
                      <p className="text-xs opacity-60">{account.email}</p>
                    </div>
                  </div>
                  <span className="text-xs opacity-60">Click to use</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbrand.com"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors bg-gray-50/50"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs text-gray-400 hover:text-black transition">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors bg-gray-50/50 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-black text-white py-4 rounded-xl font-semibold text-sm tracking-wide hover:bg-gray-900 transition-all shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center space-y-2">
            <p className="text-xs text-gray-400">
              Don't have a vendor account?{' '}
              <Link href="/vendors/apply" className="text-amber-600 font-semibold hover:text-amber-800 transition">Apply to Sell</Link>
            </p>
            <p className="text-xs text-gray-300 lg:hidden">
              <Link href="/" className="hover:text-black transition">&larr; Back to Storefront</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
