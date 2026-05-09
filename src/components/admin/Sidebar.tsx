'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Users, ShoppingCart, Settings, LayoutDashboard, LogOut } from 'lucide-react';
import clsx from 'clsx';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Vendors', href: '/admin/vendors', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold tracking-tighter">MANEVIA</h1>
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Admin Portal</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.name}
              href={item.href} 
              className={clsx(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition",
                isActive 
                  ? "bg-amber-50 text-amber-700" 
                  : "text-gray-900 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon size={18} className={clsx("mr-3", isActive ? "text-amber-500" : "text-gray-500")} />
              {item.name}
            </Link>
          );
        })}

        <Link 
          href="/admin/vendor-onboarding" 
          className={clsx(
            "flex items-center px-4 py-3 text-sm font-medium rounded-lg border mt-4 transition",
            pathname === '/admin/vendor-onboarding'
              ? "bg-amber-50 text-amber-700 border-amber-300"
              : "hover:bg-amber-50 text-amber-700 border-amber-200"
          )}
        >
          <Settings size={18} className="mr-3 text-amber-500" />
          Onboarding Setup
        </Link>
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-red-50 text-red-600 w-full transition">
          <LogOut size={18} className="mr-3" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
