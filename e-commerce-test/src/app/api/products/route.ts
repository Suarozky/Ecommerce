import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/constants/products';

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  return NextResponse.json(PRODUCTS);
}