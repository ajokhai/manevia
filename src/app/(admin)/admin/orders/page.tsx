import { Search, Filter, Eye, Truck, CheckCircle } from 'lucide-react';

export default function AdminOrders() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Order Fulfillment Hub</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, process, and track customer shipments.</p>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex space-x-4 mb-6">
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">All Orders (142)</button>
        <button className="bg-white border text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50">Pending Payment (12)</button>
        <button className="bg-amber-100 text-amber-800 border-amber-200 border px-4 py-2 rounded-full text-sm font-medium">Processing / To Ship (24)</button>
        <button className="bg-white border text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50">Shipped (106)</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID, email, or name..." 
              className="pl-10 pr-4 py-2 border rounded-lg w-80 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button className="flex items-center text-sm font-medium text-gray-700 bg-white border px-3 py-2 rounded-lg hover:bg-gray-50">
            <Filter size={16} className="mr-2" /> Filter
          </button>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-500 bg-white">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium">Fulfillment Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[1,2,3,4,5,6].map((i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-semibold text-black">#MAN-100{i}</td>
                  <td className="p-4 text-gray-500">May 9, 2026<br/><span className="text-xs">10:42 AM</span></td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900">Jane Doe</p>
                    <p className="text-xs text-gray-500">jane@example.com</p>
                  </td>
                  <td className="p-4 font-medium">$133.33</td>
                  <td className="p-4">
                    <span className="inline-flex items-center text-xs font-medium bg-green-100 text-green-800 py-1 px-2 rounded">
                      <CheckCircle size={12} className="mr-1" /> Paid
                    </span>
                  </td>
                  <td className="p-4">
                    {i <= 2 ? (
                      <span className="inline-flex items-center text-xs font-medium bg-amber-100 text-amber-800 py-1 px-2 rounded">
                        Processing
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded">
                        <Truck size={12} className="mr-1" /> Shipped
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium mr-4 text-xs bg-blue-50 px-2 py-1 rounded">
                      View Details
                    </button>
                    {i <= 2 && (
                      <button className="text-white bg-black hover:bg-gray-800 font-medium text-xs px-2 py-1 rounded">
                        Fulfill
                      </button>
                    )}
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
