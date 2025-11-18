import { NextRequest, NextResponse } from 'next/server';

import { productSchema } from './schema';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();

  return NextResponse.json(products, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validatedBody = productSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(
      { error: validatedBody.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
