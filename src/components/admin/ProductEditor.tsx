'use client';

import { useState } from 'react';
import { ArrowLeft, UploadCloud, Save, Sparkles, Trash2, Plus, GripVertical, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProductEditor({ isNew = false, productId = '' }: { isNew?: boolean, productId?: string }) {
  const [activeTab, setActiveTab] = useState('general');
  const [lengths, setLengths] = useState(['14"', '16"', '20"', '24"']);
  const [densities, setDensities] = useState(['150%', '180%', '250%']);

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/admin/products" className="text-sm font-medium text-gray-500 hover:text-black flex items-center transition">
          <ArrowLeft size={16} className="mr-1" /> Back to Products
        </Link>
        <div className="flex space-x-3">
          {!isNew && (
            <button className="flex items-center text-sm font-medium border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 bg-white shadow-sm transition">
              <Trash2 size={16} className="mr-2" /> Delete Product
            </button>
          )}
          <button className="flex items-center text-sm font-bold bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 shadow-sm transition">
            <Save size={16} className="mr-2" /> Save {isNew ? 'Product' : 'Changes'}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{isNew ? 'Create New Product' : `Editing: ${productId}`}</h1>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('general')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${activeTab === 'general' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
          >
            General & Variants
          </button>
          <button 
            onClick={() => setActiveTab('media')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${activeTab === 'media' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
          >
            Media & AI Try-On
          </button>
        </div>
      </div>

      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-bold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Product Title</label>
                  <input type="text" defaultValue={isNew ? '' : 'Ready to Go Blonde Highlight Water Wave Bob'} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500" placeholder="e.g. Glueless HD Lace Front Wig..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                  <textarea rows={4} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500" placeholder="Describe the hair texture, lace type, and origin..."></textarea>
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-bold mb-4">Product Variants</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Lengths Available</label>
                    <button className="text-xs font-medium text-amber-600 flex items-center hover:text-amber-800"><Plus size={14} className="mr-1" /> Add Length</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lengths.map((l) => (
                      <div key={l} className="flex items-center bg-gray-50 border rounded-lg pl-3 pr-2 py-1.5">
                        <span className="text-sm font-medium mr-2">{l}</span>
                        <button className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Densities Available</label>
                    <button className="text-xs font-medium text-amber-600 flex items-center hover:text-amber-800"><Plus size={14} className="mr-1" /> Add Density</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {densities.map((d) => (
                      <div key={d} className="flex items-center bg-gray-50 border rounded-lg pl-3 pr-2 py-1.5">
                        <span className="text-sm font-medium mr-2">{d}</span>
                        <button className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-bold mb-4">Pricing & Inventory</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Base Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input type="number" defaultValue={isNew ? '' : 118.33} className="w-full border rounded-lg pl-8 pr-4 py-2 focus:ring-2 focus:ring-amber-500" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Compare at Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input type="number" defaultValue={isNew ? '' : 159.90} className="w-full border rounded-lg pl-8 pr-4 py-2 focus:ring-2 focus:ring-amber-500" placeholder="0.00" />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium mb-1 text-gray-700">SKU</label>
                  <input type="text" defaultValue={isNew ? '' : productId} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                  <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 bg-white">
                    <option value="active">Active (Live on Store)</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-bold mb-4">Organization</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Collection</label>
                  <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 bg-white">
                    <option>Wigs</option>
                    <option>Bundles</option>
                    <option>Closures</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Texture</label>
                  <select defaultValue="Water Wave" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 bg-white">
                    <option value="Straight">Straight</option>
                    <option value="Body Wave">Body Wave</option>
                    <option value="Water Wave">Water Wave</option>
                    <option value="Deep Curly">Deep Curly</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'media' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start">
            <Sparkles className="text-amber-500 mr-4 flex-shrink-0 mt-1" size={24} />
            <div>
              <h2 className="text-amber-900 font-bold mb-1">Nano Banana Try-On Requirements</h2>
              <p className="text-sm text-amber-800 mb-3">To enable the AI Virtual Try-On feature for this product, you must upload a perfectly cropped, transparent PNG of the wig with no mannequin head visible.</p>
              <a href="/admin/vendor-onboarding" className="text-xs font-bold underline text-amber-900 hover:text-black">View the full Image Guidelines</a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Storefront Images */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-bold mb-1">Storefront Gallery</h2>
              <p className="text-sm text-gray-500 mb-4">These images are shown on the product page.</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer mb-6">
                <UploadCloud size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="font-medium text-sm">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>

              {!isNew && (
                <div className="space-y-3">
                  <div className="flex items-center p-3 border rounded-lg bg-gray-50">
                    <GripVertical size={16} className="text-gray-400 mr-3 cursor-move" />
                    <div className="w-10 h-10 bg-white rounded border overflow-hidden relative flex-shrink-0 mr-3">
                       <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero_wig_curly_1778364916891.png')" }}></div>
                    </div>
                    <span className="text-sm font-medium flex-1 truncate">hero_wig_curly.png</span>
                    <span className="text-xs bg-black text-white px-2 py-1 rounded mx-3">Primary</span>
                    <button className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
              )}
            </div>

            {/* AI Assets */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-bold mb-1 flex items-center"><Sparkles size={18} className="text-amber-500 mr-2" /> AI Source Assets (3D)</h2>
              <p className="text-sm text-gray-500 mb-4">Upload multiple angles to allow the Nano Banana Engine to map the wig in 3D space.</p>
              
              {!isNew && (
                <div className="space-y-3 mb-6">
                  {/* Front Angle */}
                  <div className="flex items-center p-3 border border-green-200 rounded-lg bg-green-50">
                    <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden relative flex-shrink-0 mr-4 opacity-80" style={{ backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=')"}}>
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero_wig_curly_1778364916891.png')" }}></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-green-800 flex items-center"><CheckCircle size={14} className="mr-1" /> Front Angle Validated</p>
                      <p className="text-xs text-green-700">Ready for Virtual Try-On</p>
                    </div>
                    <button className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>

                  {/* Left Profile */}
                  <div className="flex items-center p-3 border border-dashed border-gray-300 rounded-lg bg-white">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mr-4 border border-dashed border-gray-300 text-gray-400">
                      <UploadCloud size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Left Profile (Required)</p>
                      <p className="text-xs text-amber-600 font-medium cursor-pointer hover:underline">Click to upload PNG</p>
                    </div>
                  </div>

                  {/* Right Profile */}
                  <div className="flex items-center p-3 border border-dashed border-gray-300 rounded-lg bg-white">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mr-4 border border-dashed border-gray-300 text-gray-400">
                      <UploadCloud size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Right Profile (Required)</p>
                      <p className="text-xs text-amber-600 font-medium cursor-pointer hover:underline">Click to upload PNG</p>
                    </div>
                  </div>
                </div>
              )}

              {isNew && (
                <div className="border-2 border-dashed border-amber-300 bg-amber-50/30 rounded-xl p-8 text-center hover:bg-amber-50 transition cursor-pointer">
                  <UploadCloud size={32} className="mx-auto text-amber-500 mb-3" />
                  <p className="font-medium text-sm text-amber-900">Upload 3 Angles (Front, Left, Right)</p>
                  <p className="text-xs text-amber-700/70 mt-1">Must be transparent PNGs.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
