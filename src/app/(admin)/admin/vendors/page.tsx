import { Users, Search, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminVendors() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Vendor Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage approved vendors and review applications.</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-800 transition">
          Invite Vendor
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search vendors by name..." 
              className="pl-10 pr-4 py-2 border rounded-lg w-80 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Vendors Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-500 bg-white">
                <th className="p-4 font-medium">Store Name</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Products Listed</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[1,2,3].map((i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold">
                        V{i}
                      </div>
                      <p className="font-semibold text-gray-900">Luxe Hair Boutique {i}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-gray-600">
                      <Mail size={14} className="mr-2" /> vendor{i}@example.com
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs font-medium">Active</span>
                  </td>
                  <td className="p-4 text-gray-600 font-medium">
                    {i * 12} items
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      href={`/admin/vendors/v${i}`}
                      className="text-amber-600 hover:text-amber-800 font-medium text-xs bg-amber-50 px-3 py-1.5 rounded inline-flex items-center"
                    >
                      View Profile <ExternalLink size={14} className="ml-1" />
                    </Link>
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
