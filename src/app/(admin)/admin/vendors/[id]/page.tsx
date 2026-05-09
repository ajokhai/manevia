import { Store, Mail, MapPin, Calendar, CheckCircle, Package, DollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function VendorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Extract number from id like 'v1' -> '1'
  const vendorNum = id.replace('v', '') || '1';

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <Link href="/admin/vendors" className="text-sm font-medium text-gray-500 hover:text-black flex items-center transition">
          <ArrowLeft size={16} className="mr-1" /> Back to Directory
        </Link>
      </div>

      {/* Header Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-amber-100 to-orange-50"></div>
        
        <div className="relative flex items-end space-x-6 mt-12">
          <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border flex items-center justify-center text-3xl font-bold text-amber-600">
            V{vendorNum}
          </div>
          <div className="flex-1 pb-2">
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-3xl font-bold">Luxe Hair Boutique {vendorNum}</h1>
              <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs font-bold flex items-center">
                <CheckCircle size={12} className="mr-1" /> Verified
              </span>
            </div>
            <p className="text-gray-500 font-medium">Premium Human Hair & Glueless Lace Specialist</p>
          </div>
          <div className="pb-2">
            <button className="bg-white border text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition text-sm">
              Suspend Vendor
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-bold mb-4">Contact Information</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-3 text-gray-400" /> vendor{vendorNum}@example.com
              </div>
              <div className="flex items-center text-gray-600">
                <Store size={16} className="mr-3 text-gray-400" /> +1 (555) 123-456{vendorNum}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-3 text-gray-400" /> Atlanta, GA, USA
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-3 text-gray-400" /> Joined May 2026
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-bold mb-4">Payout Status</h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Paystack Subaccount</p>
              <div className="flex items-center text-green-600 font-medium text-sm">
                <CheckCircle size={14} className="mr-1.5" /> Connected & Active
              </div>
              <p className="text-xs text-gray-500 mt-2">ACCT_8f92js83k{vendorNum}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Products & Stats */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Listings</p>
                <p className="text-2xl font-bold">{Number(vendorNum) * 12}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales (30d)</p>
                <p className="text-2xl font-bold">${(Number(vendorNum) * 3420).toLocaleString()}.00</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-bold mb-4">Top Performing Products</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition border border-transparent hover:border-gray-100">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                     <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero_wig_curly_1778364916891.png')" }}></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm line-clamp-1">Premium Raw Donor Hair Wig - {i}</p>
                    <p className="text-xs text-gray-500">SKU: VEN{vendorNum}-WIG-{i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">$189.99</p>
                    <p className="text-xs text-green-600 font-medium">{45 - i*7} sold</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition">
              View All {Number(vendorNum) * 12} Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
