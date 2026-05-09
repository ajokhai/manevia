'use client';

import { ArrowLeft, CheckCircle, Clock, Truck, Package, Printer, MapPin, CreditCard, XCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { use, useState } from 'react';

export default function OrderDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  // Fake initial state based on the id ending number to show either processing or shipped
  const initialProcessing = id.endsWith('1') || id.endsWith('2');
  
  const [orderStatus, setOrderStatus] = useState<'processing' | 'shipped' | 'canceled' | 'refunded'>(initialProcessing ? 'processing' : 'shipped');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('FedEx');
  
  // Modal states
  const [activeModal, setActiveModal] = useState<'none' | 'cancel' | 'refund'>('none');
  const [cancelReason, setCancelReason] = useState('Out of Stock');
  const [notifyCustomer, setNotifyCustomer] = useState(true);
  const [notifyFulfillment, setNotifyFulfillment] = useState(true);

  const handleFulfill = () => {
    if (!trackingNumber) return alert('Please enter a tracking number.');
    setOrderStatus('shipped');
  };

  const executeCancel = () => {
    setOrderStatus('canceled');
    setActiveModal('none');
  };

  const executeRefund = () => {
    setOrderStatus('refunded');
    setActiveModal('none');
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/admin/orders" className="text-sm font-medium text-gray-500 hover:text-black flex items-center transition">
          <ArrowLeft size={16} className="mr-1" /> Back to Orders
        </Link>
        <button className="flex items-center text-sm font-medium border px-4 py-2 rounded-lg hover:bg-gray-50 bg-white shadow-sm">
          <Printer size={16} className="mr-2" /> Print Packing Slip
        </button>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Order #{id}</h1>
          <p className="text-gray-500 text-sm">Placed on May 9, 2026 at 10:42 AM</p>
        </div>
        <div className="flex items-center space-x-3">
          {orderStatus === 'refunded' ? (
            <span className="inline-flex items-center text-xs font-bold bg-gray-100 text-gray-800 py-1.5 px-3 rounded-full">
              <RefreshCcw size={14} className="mr-1.5" /> Refunded
            </span>
          ) : orderStatus === 'canceled' ? (
            <span className="inline-flex items-center text-xs font-bold bg-red-100 text-red-800 py-1.5 px-3 rounded-full">
              <XCircle size={14} className="mr-1.5" /> Canceled
            </span>
          ) : (
            <>
              <span className="inline-flex items-center text-xs font-bold bg-green-100 text-green-800 py-1.5 px-3 rounded-full">
                <CheckCircle size={14} className="mr-1.5" /> Payment Secured
              </span>
              {orderStatus === 'processing' ? (
                <span className="inline-flex items-center text-xs font-bold bg-amber-100 text-amber-800 py-1.5 px-3 rounded-full">
                  <Clock size={14} className="mr-1.5" /> Processing
                </span>
              ) : (
                <span className="inline-flex items-center text-xs font-bold bg-blue-100 text-blue-800 py-1.5 px-3 rounded-full">
                  <Truck size={14} className="mr-1.5" /> Shipped
                </span>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50 font-bold text-sm">Items Ordered (1)</div>
            <div className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero_wig_curly_1778364916891.png')" }}></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Ready to Go Blonde Highlight Water Wave Bob</h3>
                  <p className="text-xs text-gray-500 mb-2">Variant: 16" Length • 180% Density</p>
                  <p className="text-xs text-amber-600 font-medium">SKU: VEN1-WIG-442</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">$118.33</p>
                  <p className="text-xs text-gray-500">Qty: 1</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">$118.33</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Shipping (Express)</span>
                <span className="font-medium">$15.00</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t mt-2">
                <span>Total Paid</span>
                <span>$133.33</span>
              </div>
            </div>
          </div>

          {/* Fulfillment Section */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50 font-bold text-sm flex items-center">
              <Package size={16} className="mr-2" /> Fulfillment Status
            </div>
            <div className="p-6">
              {orderStatus === 'canceled' || orderStatus === 'refunded' ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                  <XCircle size={32} className="mx-auto text-red-500 mb-3" />
                  <h3 className="font-bold text-red-900 mb-2">Order Terminated</h3>
                  <p className="text-sm text-red-700">Fulfillment has been halted due to cancellation.</p>
                </div>
              ) : orderStatus === 'processing' ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                  <Clock size={32} className="mx-auto text-amber-500 mb-3" />
                  <h3 className="font-bold text-amber-900 mb-2">Ready to Fulfill</h3>
                  <p className="text-sm text-amber-700 mb-6">This order has been paid and is waiting for tracking information.</p>
                  
                  <div className="max-w-xs mx-auto space-y-4">
                    <input 
                      type="text" 
                      placeholder="Enter Tracking Number" 
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500" 
                    />
                    <select 
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                      className="w-full border rounded-lg px-4 py-2 text-sm bg-white"
                    >
                      <option value="FedEx">FedEx</option>
                      <option value="UPS">UPS</option>
                      <option value="USPS">USPS</option>
                      <option value="DHL">DHL</option>
                    </select>
                    
                    <label className="flex items-center space-x-2 text-left cursor-pointer pt-2">
                      <input 
                        type="checkbox" 
                        checked={notifyFulfillment}
                        onChange={(e) => setNotifyFulfillment(e.target.checked)}
                        className="rounded border-amber-300 text-black focus:ring-black" 
                      />
                      <span className="text-xs text-amber-800 font-medium">Email tracking to customer</span>
                    </label>

                    <button 
                      onClick={handleFulfill}
                      className="w-full bg-black text-white font-bold py-2.5 rounded-lg hover:bg-gray-800 transition shadow-md mt-2"
                    >
                      Mark as Shipped
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4 p-4 border rounded-xl bg-blue-50/50 border-blue-100">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Shipped via {carrier}</h3>
                    <p className="text-sm text-gray-500">Tracking: <span className="text-blue-600 font-medium">{trackingNumber || 'FDX-99382711200'}</span></p>
                  </div>
                  <div className="ml-auto text-right text-xs text-gray-500">
                    Updated<br/>Just now
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Customer Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50 font-bold text-sm">Customer Details</div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact</h4>
                <p className="font-medium">Jane Doe</p>
                <p className="text-sm text-blue-600">jane.doe@example.com</p>
                <p className="text-sm text-gray-600">+1 (404) 555-0198</p>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                  <MapPin size={12} className="mr-1" /> Shipping Address
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Jane Doe<br/>
                  123 Peachtree Street NW<br/>
                  Suite 400<br/>
                  Atlanta, GA 30303<br/>
                  United States
                </p>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                  <CreditCard size={12} className="mr-1" /> Payment Method
                </h4>
                <p className="text-sm text-gray-700">Apple Pay (via Paystack)</p>
                <p className="text-xs text-gray-500 mt-1">Transaction: txn_3948572</p>
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50 font-bold text-sm">Administrative Actions</div>
            <div className="p-4 space-y-3">
              <button 
                onClick={() => setActiveModal('cancel')}
                disabled={orderStatus === 'canceled' || orderStatus === 'refunded'}
                className="w-full flex items-center justify-center py-2 border rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <XCircle size={16} className="mr-2" /> Cancel Order
              </button>
              <button 
                onClick={() => setActiveModal('refund')}
                disabled={orderStatus === 'refunded'}
                className="w-full flex items-center justify-center py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <RefreshCcw size={16} className="mr-2" /> Refund Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modals */}
      {activeModal === 'cancel' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold flex items-center text-red-600"><XCircle className="mr-2" /> Cancel Order</h2>
              <p className="text-sm text-gray-500 mt-1">Are you sure you want to cancel this order? This action cannot be undone.</p>
            </div>
            <div className="p-6 space-y-4 bg-gray-50">
              <div>
                <label className="block text-sm font-medium mb-1">Reason for Cancellation</label>
                <select 
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-red-500"
                >
                  <option>Customer Requested</option>
                  <option>Out of Stock / Inventory Error</option>
                  <option>Suspected Fraud</option>
                  <option>Other</option>
                </select>
              </div>
              <label className="flex items-start space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-100 bg-white">
                <input 
                  type="checkbox" 
                  checked={notifyCustomer}
                  onChange={(e) => setNotifyCustomer(e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <div>
                  <p className="font-medium text-sm">Notify Customer</p>
                  <p className="text-xs text-gray-500">Send an automated email via Resend explaining the cancellation.</p>
                </div>
              </label>
            </div>
            <div className="p-4 border-t flex justify-end space-x-3 bg-white">
              <button onClick={() => setActiveModal('none')} className="px-4 py-2 border rounded-lg font-medium hover:bg-gray-50 transition text-sm">
                Abort
              </button>
              <button onClick={executeCancel} className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition text-sm shadow-md">
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'refund' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold flex items-center text-gray-900"><RefreshCcw className="mr-2" /> Issue Refund</h2>
              <p className="text-sm text-gray-500 mt-1">Return funds to the customer's Apple Pay via Paystack.</p>
            </div>
            <div className="p-6 space-y-4 bg-gray-50">
              <div>
                <label className="block text-sm font-medium mb-1">Refund Amount</label>
                <div className="flex space-x-3">
                  <button className="flex-1 py-2 border-2 border-black rounded-lg font-bold text-sm bg-black text-white">Full ($133.33)</button>
                  <button className="flex-1 py-2 border rounded-lg font-medium text-sm bg-white text-gray-600 hover:bg-gray-50">Partial</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Resolution Note</label>
                <textarea 
                  rows={3} 
                  placeholder="Explain why this refund is being issued..." 
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-black"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">This note will be included in the refund email sent to the customer.</p>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-3 bg-white">
              <button onClick={() => setActiveModal('none')} className="px-4 py-2 border rounded-lg font-medium hover:bg-gray-50 transition text-sm">
                Abort
              </button>
              <button onClick={executeRefund} className="px-4 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition text-sm shadow-md">
                Process $133.33 Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
