import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'Are the wigs 100% human hair?', a: 'Yes. Every Manevia wig is crafted from 100% Virgin Human Hair, meaning the hair has never been chemically processed. This ensures longevity, a natural appearance, and the ability to heat-style.' },
  { q: 'What does "glueless" mean?', a: 'Glueless wigs are designed to be secured without any adhesive. They feature adjustable straps and/or a built-in elastic band that holds the wig securely in place for an all-day comfortable wear.' },
  { q: 'How does the Virtual Try-On work?', a: 'Our Nano Banana AI engine uses advanced machine learning to map the wig onto your uploaded selfie in real time. Simply upload a front-facing photo in good lighting and our AI will blend the lace seamlessly onto your hairline.' },
  { q: 'What is HD Lace and why does it matter?', a: 'HD (High Definition) Lace is an ultra-thin, undetectable lace material that melts into any skin tone. Unlike standard lace, HD Lace creates a virtually invisible hairline for the most natural-looking result possible.' },
  { q: 'Can I dye or color my wig?', a: 'Yes, because our wigs are 100% human hair, they can be colored. However, we recommend consulting a professional stylist, especially for lighter colors. Bleaching or heavy coloring may void your return eligibility.' },
  { q: 'How do I measure my head for the right cap size?', a: 'Use a soft measuring tape to measure your head circumference, starting at your natural hairline above your forehead, going behind your ears, and around the nape of your neck. Our standard cap fits heads between 21-23 inches.' },
  { q: 'How long will my order take to arrive?', a: 'Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available at checkout. All orders are processed within 1-2 business days. See our Shipping Policy for full details.' },
  { q: 'How do I initiate a return?', a: 'Email returns@manevia.com with your order number. We will send you a free prepaid return label within 24 hours. Items must be unworn and in original packaging. See our Returns Policy for full eligibility criteria.' },
];

export default function FAQs() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/" className="text-sm text-gray-400 hover:text-black flex items-center gap-1 mb-10 transition"><ArrowLeft size={14} /> Back to Store</Link>
      <p className="text-xs uppercase tracking-widest text-amber-600 mb-2">Help Center</p>
      <h1 className="text-4xl font-bold mb-12">Shopping FAQs</h1>
      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <details key={i} className="group border rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-sm list-none hover:bg-gray-50 transition">
              {faq.q}
              <ChevronDown size={16} className="text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t bg-gray-50">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
      <div className="mt-16 bg-amber-50 rounded-2xl p-8 text-center">
        <h2 className="font-bold text-lg mb-2">Still have questions?</h2>
        <p className="text-sm text-gray-500 mb-4">Our team is available Mon-Fri, 9am-6pm EST</p>
        <Link href="/pages/contact" className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition">Contact Us</Link>
      </div>
    </div>
  );
}
