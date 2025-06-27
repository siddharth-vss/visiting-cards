import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { CardData } from '@/types/card';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('visitingcards');
    const card = await db.collection('cards').findOne({ _id: new ObjectId(params.id) });
    
    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }
    
    return NextResponse.json(card);
  } catch (error) {
    console.error('Error fetching card:', error);
    return NextResponse.json({ error: 'Failed to fetch card' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cardData: CardData = await request.json();
    
    const client = await clientPromise;
    const db = client.db('visitingcards');
    
    const updatedCard = {
      ...cardData,
      updatedAt: new Date(),
    };
    
    const result = await db.collection('cards').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updatedCard }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }
    
    return NextResponse.json({ ...updatedCard, _id: params.id });
  } catch (error) {
    console.error('Error updating card:', error);
    return NextResponse.json({ error: 'Failed to update card' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('visitingcards');
    
    const result = await db.collection('cards').deleteOne({ _id: new ObjectId(params.id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 });
  }
}