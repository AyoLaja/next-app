import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

// Schema for registering a new user
const registerSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

// Register a new user
export async function POST(request: NextRequest) {
  const body = await request.json();

  const validatedBody = registerSchema.safeParse(body);

  // If the body is not valid, return a 400 error
  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.flatten().fieldErrors, {
      status: 400,
    });
  }

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  // If the user already exists, return a 400 error
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // Create the user
  const user = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword: hashedPassword,
    },
  });

  // If the user is not created, return a 500 error
  if (!user) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }

  // Return the user's email
  return NextResponse.json({ email: user.email }, { status: 201 });
}
