/**
 * ==============================================================================
 * ⚠️ AI ASSISTANT INSTRUCTION ⚠️
 * This is the Phase 1 MVP Database Adapter using Vercel Postgres.
 * Do not replace this with MongoDB. Both must co-exist.
 * ==============================================================================
 */

import { sql } from '@vercel/postgres';
import { DatabaseAdapter } from '../index';

export class PostgresAdapter implements DatabaseAdapter {
  
  async getProducts() {
    try {
      if (!process.env.POSTGRES_URL) return this._getMockProducts();
      
      const { rows } = await sql`SELECT * FROM products ORDER BY created_at DESC`;
      return rows;
    } catch (error) {
      console.error('Postgres error:', error);
      return this._getMockProducts(); // Graceful fallback for Demo Mode
    }
  }

  async getProductBySlug(slug: string) {
    try {
      if (!process.env.POSTGRES_URL) return this._getMockProducts()[0];
      
      const { rows } = await sql`SELECT * FROM products WHERE slug = ${slug} LIMIT 1`;
      return rows[0] || null;
    } catch (error) {
      console.error('Postgres error:', error);
      return this._getMockProducts()[0];
    }
  }

  async getUserByEmail(email: string) {
    if (!process.env.POSTGRES_URL) return { id: 'usr-1', email, name: 'Demo User' };
    
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
    return rows[0] || null;
  }

  async getOrders() {
    if (!process.env.POSTGRES_URL) return [];
    
    const { rows } = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    return rows;
  }

  async createOrder(orderData: any) {
    if (!process.env.POSTGRES_URL) return { id: 'mock-order-id', ...orderData };
    
    // In a real implementation, you would INSERT here. 
    // Simplified for MVP.
    const { rows } = await sql`
      INSERT INTO orders (customer_id, total, status) 
      VALUES (${orderData.customerId}, ${orderData.total}, 'pending') 
      RETURNING *
    `;
    return rows[0];
  }

  // --- Fallback Mocks for Demo Mode ---
  private _getMockProducts() {
    return [
      {
        id: 'wig-001',
        slug: 'blonde-water-wave',
        name: 'Ready to Go Blonde Highlight Water Wave Bob',
        price: 118.33,
        image: '/assets/hero_wig_curly_1778364916891.png',
        status: 'active'
      }
    ];
  }
}
