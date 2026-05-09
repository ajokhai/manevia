export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 tracking-tighter">MANEVIA</h3>
            <p className="text-sm text-gray-600">The world's premier destination for luxury human hair and glueless wigs, featuring our revolutionary Virtual Try-On Studio.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">SHOP</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-amber-600">Best Sellers</a></li>
              <li><a href="#" className="hover:text-amber-600">New Arrivals</a></li>
              <li><a href="#" className="hover:text-amber-600">Glueless Wigs</a></li>
              <li><a href="#" className="hover:text-amber-600">Lace Front Wigs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-amber-600">Track Order</a></li>
              <li><a href="#" className="hover:text-amber-600">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-amber-600">Return & Exchange</a></li>
              <li><a href="#" className="hover:text-amber-600">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">NEWSLETTER</h4>
            <p className="text-sm text-gray-600 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="w-full border px-4 py-2 text-sm focus:outline-none focus:border-amber-600" />
              <button className="bg-black text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800">SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Manevia Luxury Hair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
