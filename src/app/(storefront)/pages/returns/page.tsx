import PolicyPage from '@/components/storefront/PolicyPage';
export default function Returns() {
  return <PolicyPage
    title="Returns & Exchanges"
    subtitle="Our Policy"
    lastUpdated="May 1, 2026"
    sections={[
      { heading: 'Our 30-Day Guarantee', body: 'We want you to love your Manevia purchase. If you are not completely satisfied, you may return eligible items within 30 days of delivery for a full refund or exchange — no questions asked.' },
      { heading: 'Eligibility', body: 'Items must be unworn, unaltered, and in their original packaging with all tags attached. For hygiene reasons, wigs that have been worn, cut, colored, or chemically processed are not eligible for return.' },
      { heading: 'How to Start a Return', body: 'Email our support team at returns@manevia.com with your order number and reason for return. We will send you a prepaid return shipping label within 24 hours.' },
      { heading: 'Refund Processing', body: 'Once your return is received and inspected (1-2 business days), your refund will be processed to your original payment method within 5-7 business days.' },
      { heading: 'Exchanges', body: 'To exchange a product for a different length or texture, follow the return process above and note your preferred replacement item. Exchanges are subject to stock availability.' },
    ]}
  />;
}
