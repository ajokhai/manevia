import MegaMenu from '@/components/layout/MegaMenu';
import Footer from '@/components/layout/Footer';
import SlideOutCart from '@/components/cart/SlideOutCart';
import ImpersonationBanner from '@/components/layout/ImpersonationBanner';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <ImpersonationBanner />
      <MegaMenu />
      <SlideOutCart />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
