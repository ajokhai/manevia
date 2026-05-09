import { Plus, Search, Filter, MoreVertical, Edit, Trash } from 'lucide-react';

export default function AdminProducts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Product Information Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your wig catalog, pricing, and variants.</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg font-medium flex items-center hover:bg-gray-800 transition">
          <Plus size={18} className="mr-2" /> Add New Wig
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products by name or SKU..." 
              className="pl-10 pr-4 py-2 border rounded-lg w-80 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button className="flex items-center text-sm font-medium text-gray-700 bg-white border px-3 py-2 rounded-lg hover:bg-gray-50">
            <Filter size={16} className="mr-2" /> Filter
          </button>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-500 bg-white">
                <th className="p-4 font-medium w-12">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Inventory</th>
                <th className="p-4 font-medium">Texture</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[1,2,3,4,5].map((i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50 group">
                  <td className="p-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                         <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero_wig_straight_1778364904239.png')" }}></div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 line-clamp-1">Ready to Go Blonde Highlight Water Wave Short Curly Bob Wig</p>
                        <p className="text-xs text-gray-500">SKU: WIG-{1000+i}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs font-medium">Active</span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {i === 3 ? <span className="text-red-500 font-medium">2 in stock</span> : `${45 * i} in stock`}
                  </td>
                  <td className="p-4 text-gray-600">Water Wave</td>
                  <td className="p-4 font-medium text-gray-900">$118.33</td>
                  <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-black p-1"><Edit size={16} /></button>
                    <button className="text-gray-400 hover:text-red-600 p-1 ml-2"><Trash size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Mock) */}
        <div className="p-4 border-t flex justify-between items-center text-sm text-gray-500">
          <span>Showing 1 to 5 of 24 entries</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border rounded bg-black text-white">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
