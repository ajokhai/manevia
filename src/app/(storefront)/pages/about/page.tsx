import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export default function About() {
  return (
    <div className="bg-white">
      <div className="bg-[#0a0a0a] text-white py-24 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-amber-500 mb-3">Our Story</p>
        <h1 className="text-5xl font-bold tracking-tight mb-6">Born From a Love of Luxury Hair</h1>
        <p className="text-white/60 max-w-xl mx-auto text-base leading-relaxed">Manevia was founded to make premium, natural-looking hair accessible to every woman — with the technology to prove it before you buy.</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10 text-gray-700 leading-relaxed text-sm">
        <div>
          <h2 className="text-xl font-bold text-black mb-3">Why Manevia?</h2>
          <p>We started Manevia after noticing the same problem repeated across the industry: buying wigs online was a gamble. You could spend hundreds of dollars on a wig that looked nothing like the model in the photos. We built Manevia to fix that — with the Nano Banana AI Try-On Studio at the center of the experience.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-black mb-3">Our Hair</h2>
          <p>Every wig in our catalog is crafted from 100% Virgin Human Hair — hair that has never been chemically processed. We work directly with ethical suppliers to ensure quality, traceability, and fair practices at every step of the supply chain.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-black mb-3">The Nano Banana Technology</h2>
          <p>Our proprietary AI engine, Nano Banana, allows customers to upload a selfie and see any wig placed seamlessly onto their head in under 3 seconds. No filters. No tricks. Just an honest preview of how a wig will look on your specific hairline, skin tone, and face shape.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-black mb-3">Our Commitment</h2>
          <p>We stand behind every product we sell with a 30-day free return policy and a dedicated support team available 6 days a week. If you are not completely happy with your purchase, neither are we.</p>
        </div>
        <div className="text-center pt-6">
          <Link href="/collections/best-sellers" className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition">Shop Our Collection</Link>
        </div>
      </div>
    </div>
  );
}
