import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hashPassword, generateToken } from '@/lib/auth';
import { User } from '@/types/user';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('visitingcards');

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const newUser: User = {
      name,
      email,
      cards: 0, // Initialize cards count
      test: password,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('users').insertOne(newUser);
    
    const user = {
      _id: result.insertedId.toString(),
      name,
      email,
    };

    const token = generateToken(user);

    return NextResponse.json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}