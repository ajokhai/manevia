import PolicyPage from '@/components/storefront/PolicyPage';
export default function Cookies() {
  return <PolicyPage
    title="Cookie Policy"
    subtitle="How We Use Cookies"
    lastUpdated="May 1, 2026"
    sections={[
      { heading: 'What Are Cookies', body: 'Cookies are small text files placed on your device when you visit our website. They help us remember your preferences, keep your cart intact between visits, and understand how you use our site.' },
      { heading: 'Types of Cookies We Use', body: 'Essential cookies (required for site function), Preference cookies (remember your language and currency), Analytics cookies (track usage patterns via tools like Google Analytics), and Marketing cookies (enable relevant ads and retargeting).' },
      { heading: 'Managing Cookies', body: 'You can control and delete cookies via your browser settings. Note that disabling essential cookies may affect site functionality such as cart persistence.' },
      { heading: 'Third-Party Cookies', body: 'Some third-party services we use (e.g., payment providers, analytics tools) may set their own cookies. We do not control these cookies and recommend reviewing their respective privacy policies.' },
    ]}
  />;
}
