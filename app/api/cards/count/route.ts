import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('visitingcards');
    
    // Get current card count for the user
    const cardCount = await db.collection('cards').countDocuments({ userId: user._id });
    const maxCards = 3; // Free tier limit
    const remainingCards = Math.max(0, maxCards - cardCount);
    
    return NextResponse.json({ 
      cardCount, 
      maxCards, 
      remainingCards,
      canCreateMore: cardCount < maxCards
    });
  } catch (error) {
    console.error('Error fetching card count:', error);
    return NextResponse.json({ error: 'Failed to fetch card count' }, { status: 500 });
  }
}