import { DollarSign, ShoppingBag, Users, Activity } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold">$24,590.00</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-sm text-green-600 font-medium mt-4">+12.5% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Active Orders</p>
              <h3 className="text-2xl font-bold">142</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <ShoppingBag size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mt-4">24 orders require shipping</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Customers</p>
              <h3 className="text-2xl font-bold">1,429</h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <Users size={20} />
            </div>
          </div>
          <p className="text-sm text-green-600 font-medium mt-4">+5.2% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Try-On Conversion</p>
              <h3 className="text-2xl font-bold">18.4%</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Activity size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mt-4">Percentage of AI users who buy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border lg:col-span-2">
          <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="py-3 font-medium">Order ID</th>
                  <th className="py-3 font-medium">Customer</th>
                  <th className="py-3 font-medium">Date</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[1,2,3,4,5].map((i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 font-medium">#MAN-100{i}</td>
                    <td className="py-4">Jane Doe</td>
                    <td className="py-4 text-gray-500">May 9, 2026</td>
                    <td className="py-4">
                      {i === 1 ? (
                        <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded text-xs font-medium">Processing</span>
                      ) : (
                        <span className="bg-green-100 text-green-800 py-1 px-2 rounded text-xs font-medium">Shipped</span>
                      )}
                    </td>
                    <td className="py-4 text-right font-medium">$133.33</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-bold mb-4">Top Selling Wigs</h2>
          <div className="space-y-4">
            {[1,2,3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden relative">
                   <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero_wig_curly_1778364916891.png')" }}></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm line-clamp-1">Ready to Go Blonde Highlight Bob</h4>
                  <p className="text-xs text-gray-500">{42 - i*5} sold this week</p>
                </div>
                <span className="font-bold text-sm">${(118.33 * (42 - i*5)).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
