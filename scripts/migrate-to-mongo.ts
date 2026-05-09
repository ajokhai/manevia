/**
 * ==============================================================================
 * ⚠️ MANEVIA DATA PORTING SCRIPT (Phase 1 -> Phase 2) ⚠️
 * ==============================================================================
 * 
 * This script is designed to run ONCE when the client is ready to upgrade from
 * the Vercel Postgres MVP infrastructure to the production MongoDB Atlas cluster.
 * 
 * It connects to both databases simultaneously, reads all records from Vercel Postgres,
 * transforms the relational data into document schemas, and inserts them into MongoDB.
 * 
 * HOW TO RUN:
 * 1. Ensure both `POSTGRES_URL` and `MONGODB_URI` are set in your local .env
 * 2. Run: `npx tsx scripts/migrate-to-mongo.ts`
 */

import { sql } from '@vercel/postgres';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

// Mongoose Placeholder Models (Ensure these match src/models in production)
const userSchema = new mongoose.Schema({ email: String, name: String, role: String }, { strict: false });
const productSchema = new mongoose.Schema({ slug: String, name: String, price: Number }, { strict: false });
const orderSchema = new mongoose.Schema({ customerId: String, total: Number, status: String }, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

async function migrateData() {
  console.log('🚀 Starting Data Migration: Vercel Postgres -> MongoDB Atlas');

  if (!process.env.POSTGRES_URL || !process.env.MONGODB_URI) {
    console.error('❌ ERROR: Both POSTGRES_URL and MONGODB_URI must be present in your .env file.');
    process.exit(1);
  }

  try {
    // 1. Connect to MongoDB
    console.log('📦 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB.');

    // 2. Migrate Users
    console.log('\n⏳ Migrating Users...');
    const users = await sql`SELECT * FROM users`;
    if (users.rowCount > 0) {
      await User.insertMany(users.rows);
      console.log(`✅ Migrated ${users.rowCount} users.`);
    } else {
      console.log('ℹ️ No users to migrate.');
    }

    // 3. Migrate Products
    console.log('\n⏳ Migrating Products...');
    const products = await sql`SELECT * FROM products`;
    if (products.rowCount > 0) {
      await Product.insertMany(products.rows);
      console.log(`✅ Migrated ${products.rowCount} products.`);
    } else {
      console.log('ℹ️ No products to migrate.');
    }

    // 4. Migrate Orders
    console.log('\n⏳ Migrating Orders...');
    const orders = await sql`SELECT * FROM orders`;
    if (orders.rowCount > 0) {
      await Order.insertMany(orders.rows);
      console.log(`✅ Migrated ${orders.rowCount} orders.`);
    } else {
      console.log('ℹ️ No orders to migrate.');
    }

    console.log('\n🎉 MIGRATION COMPLETE! 🎉');
    console.log('You can now switch NEXT_PUBLIC_APP_MODE to "production" to utilize MongoDB natively.');

  } catch (error) {
    console.error('\n❌ MIGRATION FAILED:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

migrateData();
