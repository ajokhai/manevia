'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Edit, CheckCircle } from 'lucide-react';

const PAGES = [
  { key: 'about', label: 'About Us', path: '/pages/about', description: 'Your brand story, mission, and values.' },
  { key: 'contact', label: 'Contact Us', path: '/pages/contact', description: 'Support email, phone, business hours.' },
  { key: 'faqs', label: 'Shopping FAQs', path: '/pages/faqs', description: 'Frequently asked customer questions.' },
  { key: 'returns', label: 'Returns & Exchanges', path: '/pages/returns', description: '30-day return policy and eligibility.' },
  { key: 'shipping', label: 'Shipping Policy', path: '/pages/shipping', description: 'Delivery times, rates, and tracking.' },
  { key: 'privacy', label: 'Privacy Policy', path: '/pages/privacy', description: 'Data collection, usage, and rights.' },
  { key: 'terms', label: 'Terms & Conditions', path: '/pages/terms', description: 'Legal terms of use for the store.' },
  { key: 'cookies', label: 'Cookie Policy', path: '/pages/cookies', description: 'Cookie types and opt-out options.' },
];

const DEFAULT_CONTENT: Record<string, string> = {
  about: `Manevia was founded to make premium, natural-looking hair accessible to every woman — with the technology to prove it before you buy.\n\nEvery wig is crafted from 100% Virgin Human Hair and can be tried on virtually using our Nano Banana AI engine.`,
  returns: `Items may be returned within 30 days of delivery for a full refund or exchange.\n\nItems must be unworn, unaltered, and in their original packaging. Email returns@manevia.com to start your return.`,
  shipping: `Orders are processed within 1-2 business days.\n\nStandard shipping (5-7 days): Free over $99, otherwise $7.99.\nExpress shipping (2-3 days): $14.99.`,
  faqs: `FAQ content is managed automatically from the FAQs page component. Contact your developer to add or remove individual questions.`,
  contact: `support@manevia.com\n+1 (800) 555-0192\nMon–Fri: 9am–6pm EST`,
  privacy: `We collect your name, email, and order details to fulfill purchases and provide support. We do not sell your data.`,
  terms: `By purchasing from Manevia, you agree to our terms of service. All prices are in USD. We reserve the right to cancel orders at our discretion.`,
  cookies: `We use essential, analytics, and marketing cookies. You can opt out via your browser settings.`,
};

export default function AdminPages() {
  const [editing, setEditing] = useState<string | null>(null);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [saved, setSaved] = useState<string | null>(null);

  const handleSave = (key: string) => {
    setSaved(key);
    setEditing(null);
    setTimeout(() => setSaved(null), 2500);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Store Pages</h1>
        <p className="text-sm text-gray-500 mt-1">Manage the content for your legal and informational pages.</p>
      </div>

      <div className="space-y-4">
        {PAGES.map((page) => (
          <div key={page.key} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{page.label}</p>
                    {saved === page.key && (
                      <span className="text-xs text-green-600 flex items-center gap-1 font-medium">
                        <CheckCircle size={12} /> Saved
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{page.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={page.path}
                  target="_blank"
                  className="text-sm text-gray-400 hover:text-black flex items-center gap-1 transition"
                >
                  <ExternalLink size={14} /> Preview
                </Link>
                <button
                  onClick={() => setEditing(editing === page.key ? null : page.key)}
                  className="inline-flex items-center text-sm font-medium bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition"
                >
                  <Edit size={14} className="mr-1.5" /> Edit Content
                </button>
              </div>
            </div>

            {editing === page.key && (
              <div className="border-t bg-gray-50 p-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Page Content</p>
                <textarea
                  rows={6}
                  value={content[page.key]}
                  onChange={(e) => setContent({ ...content, [page.key]: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-mono"
                />
                <p className="text-xs text-gray-400 mt-2 mb-4">Changes here will update the live page content when connected to the database.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSave(page.key)}
                    className="bg-black text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="border px-5 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
