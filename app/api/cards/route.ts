import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { CardData } from '@/types/card';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('visitingcards');
    
    // Only return cards belonging to the authenticated user
    const cards = await db.collection('cards')
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('visitingcards');
    
    // Check current card count for the user
    const currentCardCount = await db.collection('cards').countDocuments({ userId: user._id });
    
    // Enforce 3 card limit for free users
    if (currentCardCount >= 3) {
      return NextResponse.json({ 
        error: 'Card limit reached. Free users can create up to 3 cards only.',
        code: 'CARD_LIMIT_REACHED'
      }, { status: 403 });
    }

    const cardData: CardData = await request.json();
    
    // Remove _id if present to avoid type conflict with MongoDB's ObjectId
    const { _id, ...cardDataWithoutId } = cardData;

    const newCard = {
      ...cardDataWithoutId,
      userId: user._id, // Associate card with user
      isPublic: true, // Cards are public by default for sharing
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection('cards').insertOne(newCard);
    
    return NextResponse.json({ ...newCard, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json({ error: 'Failed to create card' }, { status: 500 });
  }
}