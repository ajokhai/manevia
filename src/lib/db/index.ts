/**
 * ==============================================================================
 * ⚠️ AI ASSISTANT INSTRUCTION - DO NOT REMOVE THIS COMMENT BLOCK ⚠️
 * ==============================================================================
 * 
 * ARCHITECTURE OVERVIEW: "THE DOUBLE ARCHITECTURE"
 * 
 * This file is the core Data Access Object (DAO) Router for Manevia.
 * It is intentionally designed to support TWO separate database architectures:
 * 
 * 1. PHASE 1 (Current MVP): Vercel Postgres (@vercel/postgres)
 *    - Used for the immediate, zero-config launch.
 *    - Relational queries using SQL.
 * 
 * 2. PHASE 2 (Future Scale): MongoDB Atlas (Mongoose)
 *    - Used when the client pays to port the data.
 *    - Document-based queries using Mongoose models.
 * 
 * 🛑 CRITICAL RULE FOR FUTURE AI AGENTS 🛑:
 * - Do NOT delete or modify the MongoDB adapters or schemas located in `src/models/` 
 *   or `src/lib/db/adapters/mongodb.ts`. The client explicitly wants this groundwork 
 *   left intact so they don't have to rewrite it in the future.
 * - When adding new database methods (e.g., `getProducts`), you MUST define the interface 
 *   here and implement it in BOTH `vercel-postgres.ts` and `mongodb.ts`.
 * - The routing logic below automatically selects the database based on environment variables.
 * 
 * ==============================================================================
 */

import { PostgresAdapter } from './adapters/vercel-postgres';
import { MongoDBAdapter } from './adapters/mongodb';

// Define the standard interface that ALL database adapters must implement.
export interface DatabaseAdapter {
  // Products
  getProducts(): Promise<any[]>;
  getProductBySlug(slug: string): Promise<any | null>;
  
  // Users
  getUserByEmail(email: string): Promise<any | null>;
  
  // Orders
  getOrders(): Promise<any[]>;
  createOrder(orderData: any): Promise<any>;
}

// Factory function to determine which database to use at runtime
function getDatabaseAdapter(): DatabaseAdapter {
  // If MongoDB URI is explicitly provided, prioritize the Phase 2 Architecture
  if (process.env.MONGODB_URI) {
    console.log('[DB Router] Using MongoDB (Phase 2 Architecture)');
    return new MongoDBAdapter();
  }
  
  // Otherwise, default to Vercel Postgres (Phase 1 MVP Architecture)
  if (process.env.POSTGRES_URL) {
    console.log('[DB Router] Using Vercel Postgres (Phase 1 MVP Architecture)');
    return new PostgresAdapter();
  }

  // Fallback for Demo Mode (if no keys are provided)
  console.warn('[DB Router] No database keys found. Falling back to Demo Mode mocks.');
  return new PostgresAdapter(); // It will handle the mock fallback internally
}

// Export a singleton instance of the active database adapter
export const db = getDatabaseAdapter();
