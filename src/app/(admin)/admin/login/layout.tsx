// This layout intentionally bypasses the AdminSidebar layout.
// The login page is standalone and should render without the admin shell.
export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
