import type { Metadata } from 'next';
import ProductClient from './ProductClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // Format slug to readable name
  const productName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${productName} Wig`,
    description: `Buy the ${productName} wig. 100% Virgin Human Hair with HD Lace. Use our Virtual Try-On to see it on yourself before buying!`,
    openGraph: {
      title: `${productName} | Manevia`,
      description: `Shop the premium ${productName} wig at Manevia.`,
      images: ['/assets/hero_wig_curly_1778364916891.png'],
      type: 'website',
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return <ProductClient slug={slug} />;
}
