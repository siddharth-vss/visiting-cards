import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { CardData } from '@/types/card';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('visitingcards');
    const cards = await db.collection('cards').find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cardData: CardData = await request.json();
    
    const client = await clientPromise;
    const db = client.db('visitingcards');
    
    // Remove _id if present to avoid type conflict with MongoDB's ObjectId
    const { _id, ...cardDataWithoutId } = cardData;

    const newCard = {
      ...cardDataWithoutId,
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