'use client';

import { useUserStore, User } from '@/store/userStore';
import { Search, LogIn, User as UserIcon, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminUsers() {
  const router = useRouter();
  const impersonate = useUserStore((state) => state.impersonate);

  const mockUsers: User[] = [
    { id: 'usr-001', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'CUSTOMER' },
    { id: 'usr-002', name: 'Alice Smith', email: 'alice.smith@example.com', role: 'CUSTOMER' },
    { id: 'usr-003', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'CUSTOMER' },
  ];

  const handleImpersonate = (user: User) => {
    impersonate(user);
    // Redirect to the storefront homepage to view it as the user
    router.push('/');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">View customer profiles and troubleshoot accounts.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b flex items-center bg-gray-50">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="pl-10 pr-4 py-2 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-500 bg-white">
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Troubleshooting</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        <UserIcon size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{user.role}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs font-medium">Active</span>
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      href={`/admin/users/${user.id}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition mr-3"
                    >
                      View Profile <ExternalLink size={14} className="ml-1" />
                    </Link>
                    <button 
                      onClick={() => handleImpersonate(user)}
                      className="inline-flex items-center text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition"
                      title="Log in as this user to troubleshoot"
                    >
                      <LogIn size={16} className="mr-2" />
                      Run As User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
