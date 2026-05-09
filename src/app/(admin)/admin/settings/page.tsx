'use client';

import { useState } from 'react';
import { Settings, Save, Shield, CreditCard, Bell, Key, RefreshCcw, LineChart } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Platform Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Configure global store preferences and integrations.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Sidebar Tabs */}
          <div className="border-r bg-gray-50 p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center text-left px-3 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'general' ? 'bg-white shadow-sm text-amber-600' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
            >
              <Settings size={16} className="mr-2" /> General
            </button>
            <button 
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center text-left px-3 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'payments' ? 'bg-white shadow-sm text-amber-600' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
            >
              <CreditCard size={16} className="mr-2" /> Payments
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center text-left px-3 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'security' ? 'bg-white shadow-sm text-amber-600' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
            >
              <Shield size={16} className="mr-2" /> Security
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center text-left px-3 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'notifications' ? 'bg-white shadow-sm text-amber-600' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
            >
              <Bell size={16} className="mr-2" /> Notifications
            </button>
            <button 
              onClick={() => setActiveTab('tracking')}
              className={`w-full flex items-center text-left px-3 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'tracking' ? 'bg-white shadow-sm text-amber-600' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
            >
              <LineChart size={16} className="mr-2" /> Tracking & SEO
            </button>
          </div>

          {/* Content */}
          <div className="col-span-3 p-8">
            {activeTab === 'general' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-lg font-bold mb-6">General Settings</h2>
                <div className="space-y-8">
                  <div className="space-y-6 pb-6 border-b">
                    <div>
                      <label className="block text-sm font-medium mb-1">Store Name</label>
                      <input type="text" defaultValue="Manevia" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Support Email</label>
                      <input type="email" defaultValue="support@manevia.com" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">AI Try-On Engine Status</label>
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                        </div>
                        <span className="text-sm text-gray-600 font-medium">Nano Banana Pipeline Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Brand Assets */}
                  <div>
                    <h3 className="text-md font-bold mb-4">Brand Assets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div className="border rounded-xl p-6 bg-white text-center">
                        <h4 className="text-sm font-medium mb-2">Favicon</h4>
                        <div className="w-16 h-16 bg-black text-white rounded-lg mx-auto flex items-center justify-center text-2xl font-bold mb-4 shadow-sm">
                          M
                        </div>
                        <button className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition w-full">
                          Upload New Favicon
                        </button>
                        <p className="text-[10px] text-gray-400 mt-2">Recommended: 32x32px PNG or SVG</p>
                      </div>

                      <div className="border rounded-xl p-6 bg-white text-center">
                        <h4 className="text-sm font-medium mb-2">Default Social Share Image</h4>
                        <div className="w-full h-24 bg-gray-100 rounded-lg mx-auto mb-4 overflow-hidden border relative">
                           <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero_wig_straight_1778364904239.png')" }}></div>
                        </div>
                        <button className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition w-full">
                          Upload Thumbnail
                        </button>
                        <p className="text-[10px] text-gray-400 mt-2">Recommended: 1200x630px JPG/PNG</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-lg font-bold mb-6">Payment Gateways</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold flex items-center text-[#5a31f4]"><CreditCard size={18} className="mr-2" /> Paystack Integration</h3>
                      <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs font-bold">Connected</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Public Key</label>
                        <input type="text" defaultValue="pk_live_************************" readOnly className="w-full border rounded-lg px-4 py-2 bg-white text-gray-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Secret Key</label>
                        <input type="password" defaultValue="sk_live_************************" readOnly className="w-full border rounded-lg px-4 py-2 bg-white text-gray-500 text-sm" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Vendor Payout Schedule</label>
                    <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 bg-white">
                      <option>Automatic (Daily)</option>
                      <option>Weekly (Fridays)</option>
                      <option>Manual Only</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-lg font-bold mb-6">Security & Access</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Two-Factor Authentication (2FA)</label>
                    <p className="text-xs text-gray-500 mb-3">Require all admin users to use an authenticator app.</p>
                    <button className="bg-white border text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition text-sm flex items-center">
                      <Key size={16} className="mr-2" /> Enable 2FA
                    </button>
                  </div>
                  <div className="pt-4 border-t">
                    <label className="block text-sm font-medium mb-1">Admin Session Timeout</label>
                    <select defaultValue="24 Hours" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 bg-white">
                      <option>1 Hour</option>
                      <option>4 Hours</option>
                      <option>24 Hours</option>
                      <option>Never</option>
                    </select>
                  </div>
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-red-600 mb-2">Danger Zone</h3>
                    <button className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition text-sm flex items-center">
                      <RefreshCcw size={16} className="mr-2" /> Force Logout All Devices
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-lg font-bold mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                    <div>
                      <p className="font-medium text-sm">New Order Alerts</p>
                      <p className="text-xs text-gray-500">Receive an email immediately when a customer completes a purchase.</p>
                    </div>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                    <div>
                      <p className="font-medium text-sm">New Vendor Applications</p>
                      <p className="text-xs text-gray-500">Receive an email when a new vendor applies to join Manevia.</p>
                    </div>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                    <input type="checkbox" className="mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                    <div>
                      <p className="font-medium text-sm">Low Inventory Warnings</p>
                      <p className="text-xs text-gray-500">Weekly digest of products with less than 5 items in stock.</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'tracking' && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-lg font-bold mb-6">Tracking Pixels & Custom Scripts</h2>
                <p className="text-sm text-gray-500 mb-6">Inject custom JavaScript for analytics, Meta Pixels, Google Tag Manager, or live chat widgets directly into the storefront without modifying code.</p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Global &lt;head&gt; Scripts</label>
                    <p className="text-xs text-gray-400 mb-2">These scripts execute immediately when the page starts loading. Ideal for Meta Pixels and Google Analytics.</p>
                    <textarea 
                      rows={5} 
                      placeholder="<!-- Paste your Meta Pixel Code Here -->&#10;<script>&#10;  ...&#10;</script>" 
                      className="w-full border rounded-lg px-4 py-3 font-mono text-xs focus:ring-2 focus:ring-amber-500 bg-gray-50" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Global &lt;body&gt; Scripts</label>
                    <p className="text-xs text-gray-400 mb-2">Ideal for Google Tag Manager (noscript) or deferred live chat widgets.</p>
                    <textarea 
                      rows={5} 
                      placeholder="<!-- Paste your GTM (noscript) code here -->" 
                      className="w-full border rounded-lg px-4 py-3 font-mono text-xs focus:ring-2 focus:ring-amber-500 bg-gray-50" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Default Meta Description</label>
                    <textarea 
                      rows={2} 
                      defaultValue="Shop the finest virgin human hair, glueless minimalist lace, and premium wigs. Try on wigs instantly with Manevia’s AI Virtual Try-On Studio." 
                      className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500" 
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 mt-8 border-t flex justify-end">
              <button className="bg-black text-white px-6 py-2 rounded-lg font-bold flex items-center hover:bg-gray-800 transition">
                <Save size={16} className="mr-2" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
