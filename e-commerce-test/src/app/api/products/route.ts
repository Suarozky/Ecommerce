import { NextResponse } from "next/server";
import { PRODUCTS } from "@/constants/products";

export async function GET() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 5000));

    if (!PRODUCTS) {
      throw new Error("Products not found");
    }

    return NextResponse.json(PRODUCTS);
  } catch (error) {
    return NextResponse.json({ error: error}, { status: 500 });
  }
}
