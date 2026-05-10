'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('admin@manevia.com');
  const [password, setPassword] = useState('manevia_admin_2026');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => router.push('/admin'), 900);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* Left — Branded Panel */}
      <div className="hidden lg:flex flex-col justify-between p-14 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/assets/hero_wig_curly_1778364916891.png')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%)' }} />

        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Admin Portal</p>
          <h1 className="text-4xl font-bold tracking-tight">Manevia</h1>
        </div>

        <div className="relative z-10">
          <p className="text-2xl font-light leading-snug text-white/70 max-w-sm">
            "Luxury is in each detail."
          </p>
          <p className="text-xs text-white/30 mt-4 uppercase tracking-widest">— Hubert de Givenchy</p>
        </div>

        <div className="relative z-10">
          <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition uppercase tracking-widest">
            ← Back to Storefront
          </Link>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-20 bg-white">
        <div className="w-full max-w-sm mx-auto">

          <div className="lg:hidden mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">Admin Portal</p>
            <h1 className="text-3xl font-bold">Manevia</h1>
          </div>

          <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
          <p className="text-sm text-gray-400 mb-10">Sign in to manage your store.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              disabled={isLoading}
              className="w-full bg-black text-white py-4 rounded-xl font-semibold text-sm tracking-wide hover:bg-gray-900 transition-all shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-10 text-xs text-gray-300 lg:hidden">
            <Link href="/" className="hover:text-black transition">← Back to Storefront</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
