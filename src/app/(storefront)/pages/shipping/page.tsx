import PolicyPage from '@/components/storefront/PolicyPage';
export default function Shipping() {
  return <PolicyPage
    title="Shipping Policy"
    subtitle="Delivery Info"
    lastUpdated="May 1, 2026"
    sections={[
      { heading: 'Processing Time', body: 'All orders are processed within 1-2 business days. Orders placed on weekends or public holidays will be processed on the next business day.' },
      { heading: 'Standard Shipping (5-7 Business Days)', body: 'Free on all orders over $99. A flat fee of $7.99 applies to orders under $99. Available for all domestic addresses.' },
      { heading: 'Express Shipping (2-3 Business Days)', body: 'Available for $14.99. Select Express at checkout. Orders must be placed before 12:00 PM EST to qualify for same-day dispatch.' },
      { heading: 'International Shipping', body: 'We ship worldwide. International delivery typically takes 7-14 business days depending on your location and customs. Import duties and taxes are the responsibility of the recipient.' },
      { heading: 'Tracking', body: 'Once your order is dispatched, you will receive a shipping confirmation email with a tracking number. You can track your order at any time via our Track My Order page.' },
    ]}
  />;
}
