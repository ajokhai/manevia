import PolicyPage from '@/components/storefront/PolicyPage';
export default function Privacy() {
  return <PolicyPage
    title="Privacy Policy"
    subtitle="Your Data"
    lastUpdated="May 1, 2026"
    sections={[
      { heading: 'Information We Collect', body: 'We collect information you provide directly, such as your name, email address, shipping address, and payment information when you make a purchase. We also collect usage data, such as pages visited and products viewed, to improve our service.' },
      { heading: 'How We Use Your Information', body: 'Your information is used to process orders, send transactional emails (order confirmations, shipping updates), provide customer support, and send marketing communications if you have opted in.' },
      { heading: 'Data Sharing', body: 'We do not sell your personal information. We may share data with trusted service providers (e.g., payment processors, shipping couriers) strictly to fulfill your order. All partners are bound by confidentiality agreements.' },
      { heading: 'Cookies', body: 'We use cookies to personalise your experience, remember your cart, and measure site analytics. See our Cookie Policy for full details and opt-out options.' },
      { heading: 'Your Rights', body: 'You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact privacy@manevia.com.' },
      { heading: 'Contact', body: 'For any privacy-related queries, email us at privacy@manevia.com.' },
    ]}
  />;
}
