import { NextRequest, NextResponse } from 'next/server';

import { userSchema } from '../schema';
import prisma from '@/lib/prisma';

interface UserProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: UserProps) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: UserProps) {
  const body = await request.json();

  const validatedBody = userSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(
      { error: validatedBody.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { id } = await params;

  // Check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Update the user
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: UserProps) {
  const { id } = await params;

  // Check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Delete the user
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(deletedUser, { status: 200 });
}
