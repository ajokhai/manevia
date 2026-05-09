import mongoose from 'mongoose';

const VariantSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  length: { type: String },
  density: { type: String },
  capSize: { type: String },
  priceAdjustment: { type: Number, default: 0 },
  stockCount: { type: Number, default: 0 }
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  basePrice: { type: Number, required: true },
  compareAtPrice: { type: Number },
  images: [{
    url: String,
    altText: String,
    isPrimary: { type: Boolean, default: false }
  }],
  texture: { 
    type: String, 
    enum: ['Straight', 'Body Wave', 'Deep Wave', 'Water Wave', 'Curly', 'Kinky Straight', 'Yaki', 'Other'] 
  },
  color: { 
    type: String, 
    enum: ['Natural Black', 'Blonde', 'Ombre', 'Highlight', 'Colored', 'Other'] 
  },
  laceDesign: { 
    type: String, 
    enum: ['Glueless', '5x5 Closure', '13x4 Frontal', '13x6 Frontal', 'Full Lace', 'U-Part', 'V-Part', 'Other'] 
  },
  style: { 
    type: String, 
    enum: ['Bob', 'Layered', 'Bangs', 'Braided', 'Other'] 
  },
  variants: [VariantSchema],
  tags: [String],
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
