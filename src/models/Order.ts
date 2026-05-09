import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  sku: { type: String },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  pricePaid: { type: Number, required: true },
  selectedVariants: {
    length: String,
    density: String,
    capSize: String
  }
});

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestEmail: { type: String },
  status: { 
    type: String, 
    enum: ['PENDING_PAYMENT', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'],
    default: 'PENDING_PAYMENT'
  },
  items: [OrderItemSchema],
  shippingAddress: {
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  shippingMethod: {
    name: String,
    cost: Number,
    estimatedDays: String
  },
  paymentDetails: {
    gateway: { type: String, default: 'Paystack' },
    referenceId: String,
    status: { type: String, default: 'Pending' }
  },
  subtotal: { type: Number, required: true },
  shippingTotal: { type: Number, required: true },
  taxTotal: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  trackingNumber: String
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
