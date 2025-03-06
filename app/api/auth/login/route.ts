import { NextResponse } from 'next/server';
import { User } from '@/app/types';

// Mock user database
const users: { [key: string]: User } = {
  'admin@tryalma.ai': {
    id: '1',
    email: 'admin@tryalma.ai',
    name: 'Admin User',
    role: 'ADMIN',
  },
};

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Mock authentication (in production, use proper authentication)
  const user = users[email];
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  // In production, verify password hash and use proper session management
  return NextResponse.json(user);
} 