'use client';

import { ArrowLeft, User as UserIcon, Mail, Key, ShieldAlert, LogIn, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { use, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

export default function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const impersonate = useUserStore((state) => state.impersonate);
  
  const [accountStatus, setAccountStatus] = useState<'active' | 'disabled'>('active');
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Extract a number for the mock
  const userNum = id.replace('usr-', '') || '001';

  const mockUser = {
    id,
    name: userNum === '001' ? 'Jane Doe' : userNum === '002' ? 'Alice Smith' : 'Sarah Johnson',
    email: userNum === '001' ? 'jane.doe@example.com' : userNum === '002' ? 'alice.smith@example.com' : 'sarah.j@example.com',
    role: 'CUSTOMER'
  };

  const handleImpersonate = () => {
    impersonate(mockUser);
    router.push('/');
  };

  const handlePasswordReset = () => {
    setResetSent(true);
    setTimeout(() => setResetSent(false), 3000);
  };

  const executeDisable = () => {
    setAccountStatus('disabled');
    setShowDisableModal(false);
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <Link href="/admin/users" className="text-sm font-medium text-gray-500 hover:text-black flex items-center transition">
          <ArrowLeft size={16} className="mr-1" /> Back to Users
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center text-gray-400 mb-4 shadow-inner">
              <UserIcon size={40} />
            </div>
            <h1 className="text-2xl font-bold">{mockUser.name}</h1>
            <p className="text-gray-500 text-sm mb-4">{mockUser.email}</p>
            
            {accountStatus === 'active' ? (
              <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-bold">Active Customer</span>
            ) : (
              <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-xs font-bold">Account Disabled</span>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Account Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Total Orders</span>
                <span className="font-bold">{(Number(userNum) * 3)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Total Spent</span>
                <span className="font-bold text-green-600">${(Number(userNum) * 412).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Member Since</span>
                <span className="font-medium">Jan 12, 2026</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center">
              <ShoppingCart size={16} className="mr-2" /> View Order History
            </button>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Troubleshooting */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50 font-bold text-sm">Troubleshooting & Support</div>
            <div className="p-6 space-y-6">
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold mb-1 flex items-center"><LogIn size={18} className="mr-2 text-amber-600" /> Run As User</h3>
                  <p className="text-sm text-gray-500 max-w-md">Securely log into the storefront as this customer to reproduce bugs or verify their account state. A persistent banner will allow you to return to the admin panel.</p>
                </div>
                <button 
                  onClick={handleImpersonate}
                  disabled={accountStatus === 'disabled'}
                  className="bg-amber-100 text-amber-800 hover:bg-amber-200 px-4 py-2 rounded-lg font-bold text-sm transition disabled:opacity-50"
                >
                  Impersonate
                </button>
              </div>

              <div className="border-t pt-6 flex items-start justify-between">
                <div>
                  <h3 className="font-bold mb-1 flex items-center"><Key size={18} className="mr-2 text-blue-600" /> Password Reset</h3>
                  <p className="text-sm text-gray-500 max-w-md">Send a secure, one-time password reset link to the customer's email address via Resend.</p>
                </div>
                <button 
                  onClick={handlePasswordReset}
                  className="bg-white border text-black hover:bg-gray-50 px-4 py-2 rounded-lg font-bold text-sm transition relative"
                >
                  {resetSent ? 'Email Sent!' : 'Send Reset Email'}
                </button>
              </div>

            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
            <div className="p-4 border-b border-red-100 bg-red-50/50 font-bold text-sm text-red-800">Danger Zone</div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-red-600 mb-1 flex items-center"><ShieldAlert size={18} className="mr-2" /> Disable Account</h3>
                  <p className="text-sm text-gray-500 max-w-md">Immediately block this user from logging in or making purchases. Active sessions will be terminated.</p>
                </div>
                <button 
                  onClick={() => setShowDisableModal(true)}
                  disabled={accountStatus === 'disabled'}
                  className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-lg font-bold text-sm transition disabled:opacity-50"
                >
                  {accountStatus === 'disabled' ? 'Account Disabled' : 'Disable Account'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Disable Modal */}
      {showDisableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold flex items-center text-red-600"><ShieldAlert className="mr-2" /> Disable Customer Account</h2>
              <p className="text-sm text-gray-500 mt-1">Are you absolutely sure you want to disable {mockUser.name}'s account?</p>
            </div>
            <div className="p-6 space-y-4 bg-gray-50">
              <p className="text-sm text-gray-700">This will:</p>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Log the user out of all active devices.</li>
                <li>Prevent any future logins.</li>
                <li>Prevent the email from being used to create a new account.</li>
              </ul>
            </div>
            <div className="p-4 border-t flex justify-end space-x-3 bg-white">
              <button onClick={() => setShowDisableModal(false)} className="px-4 py-2 border rounded-lg font-medium hover:bg-gray-50 transition text-sm">
                Cancel
              </button>
              <button onClick={executeDisable} className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition text-sm shadow-md">
                Confirm & Disable
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
