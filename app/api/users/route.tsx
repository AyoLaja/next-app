import { NextRequest, NextResponse } from 'next/server';

import { userSchema } from './schema';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validatedBody = userSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(
      { error: validatedBody.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Get the user by email
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(user, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json({ error: 'Id is required' }, { status: 400 });
  }

  return NextResponse.json(body, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json({ error: 'Id is required' }, { status: 400 });
  }

  return NextResponse.json(body, { status: 200 });
}
