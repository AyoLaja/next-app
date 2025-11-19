import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// Get the token
export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  // If the token is not found, return a 401 error
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Return the token
  return NextResponse.json(token);
}
