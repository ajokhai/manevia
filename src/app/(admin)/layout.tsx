import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <header className="bg-white border-b h-16 flex items-center justify-end px-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">A</div>
            <span className="text-sm font-medium">Admin User</span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
