import PolicyPage from '@/components/storefront/PolicyPage';
export default function Terms() {
  return <PolicyPage
    title="Terms & Conditions"
    subtitle="Legal"
    lastUpdated="May 1, 2026"
    sections={[
      { heading: 'Acceptance of Terms', body: 'By accessing or purchasing from Manevia, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our service.' },
      { heading: 'Products & Pricing', body: 'All prices are listed in USD and are subject to change without notice. We reserve the right to limit quantities and refuse orders at our discretion. Product images are for illustrative purposes; slight color variations may occur.' },
      { heading: 'Payment', body: 'We accept major credit/debit cards, Apple Pay, and PayPal. Payment is charged at the time of order. All transactions are encrypted via SSL.' },
      { heading: 'Intellectual Property', body: 'All content on this site — including product images, text, logos, and the Nano Banana AI Try-On interface — is the exclusive property of Manevia and may not be reproduced without written permission.' },
      { heading: 'Limitation of Liability', body: 'Manevia is not liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our maximum liability is limited to the value of your order.' },
      { heading: 'Governing Law', body: 'These terms are governed by the laws of the State of [Your State], USA. Any disputes shall be resolved in the courts of [Your State].' },
    ]}
  />;
}
