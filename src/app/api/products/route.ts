import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Parse URL parameters for filtering
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    
    // Build query object
    const query: any = {};
    if (category && category !== 'all') {
      // In a real app, map category string to texture/style/laceDesign fields
      // For now, a simple keyword search across fields or just fetch all
    }

    const products = await Product.find(query).limit(limit).lean();

    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // In a real app, verify admin session here before allowing creation
    await dbConnect();
    
    const body = await request.json();
    const newProduct = await Product.create(body);
    
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create product' },
      { status: 400 }
    );
  }
}
