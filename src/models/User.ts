import mongoose from 'mongoose';

const TryOnHistorySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  createdAt: { type: Date, default: Date.now }
});

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  isDefault: { type: Boolean, default: false }
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String }, // Optional if using OAuth
  firstName: String,
  lastName: String,
  role: { 
    type: String, 
    enum: ['CUSTOMER', 'ADMIN', 'VENDOR_MANAGER'],
    default: 'CUSTOMER'
  },
  savedAddresses: [AddressSchema],
  tryOnHistory: [TryOnHistorySchema],
  loyaltyPoints: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
