import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Section { heading: string; body: string; }

export default function PolicyPage({
  title,
  subtitle,
  lastUpdated,
  sections,
}: {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/" className="text-sm text-gray-400 hover:text-black flex items-center gap-1 mb-10 transition">
        <ArrowLeft size={14} /> Back to Store
      </Link>
      <p className="text-xs uppercase tracking-widest text-amber-600 mb-2">{subtitle}</p>
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-400 mb-12 pb-12 border-b">Last updated: {lastUpdated}</p>
      <div className="space-y-10 text-gray-700 leading-relaxed text-sm">
        {sections.map((s, i) => (
          <div key={i}>
            {s.heading && <h2 className="text-lg font-bold text-black mb-3">{s.heading}</h2>}
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
