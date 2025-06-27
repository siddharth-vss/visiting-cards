'use client';

import { useState, useEffect } from 'react';
import { CardData } from '@/types/card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cardTemplates } from './card-templates';
import { Trash2, Edit, Copy, Download, Share2, ExternalLink, QrCode } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import Link from 'next/link';
import QRCodeGenerator from './qr-code-generator';

interface SavedCardsProps {
  onEditCard: (card: CardData) => void;
}

export default function SavedCards({ onEditCard }: SavedCardsProps) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCardForQR, setSelectedCardForQR] = useState<CardData | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch('/api/cards');
      if (response.ok) {
        const data = await response.json();
        setCards(data);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast.error('Failed to load saved cards');
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (cardId: string) => {
    try {
      const response = await fetch(`/api/cards/${cardId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCards(cards.filter(card => card._id !== cardId));
        toast.success('Card deleted successfully');
      } else {
        toast.error('Failed to delete card');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Failed to delete card');
    }
  };

  const duplicateCard = async (card: CardData) => {
    const duplicatedCard = {
      ...card,
      name: `${card.name} (Copy)`,
      _id: undefined,
    };
    onEditCard(duplicatedCard);
    toast.success('Card duplicated! You can now edit it.');
  };

  const shareCard = async (card: CardData) => {
    if (card._id) {
      const url = `${window.location.origin}/card/${card._id}`;
      
      if (typeof window !== 'undefined' && navigator.share) {
        try {
          await navigator.share({
            title: `${card.name}'s Business Card`,
            text: `Check out ${card.name}'s business card`,
            url: url,
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      } else {
        try {
          await navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard!');
        } catch (error) {
          toast.error('Failed to copy link');
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <Card className="text-center p-8">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">No saved cards yet</h3>
          <p className="text-gray-600">Create your first business card to see it here!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Saved Cards</h2>
        <Badge variant="secondary">{cards.length} cards</Badge>
      </div>

      <div className="grid gap-4">
        {cards.map((card) => {
          const template = cardTemplates.find(t => t.id === card.template);
          const TemplateComponent = template?.component;

          return (
            <Card key={card._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{card.name}</CardTitle>
                    <p className="text-sm text-gray-600">{card.title} at {card.company}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{template?.name}</Badge>
                      <Badge variant="secondary">{template?.category}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditCard(card)}
                      title="Edit Card"
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => duplicateCard(card)}
                      title="Duplicate Card"
                    >
                      <Copy size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareCard(card)}
                      title="Share Card"
                    >
                      <Share2 size={14} />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCardForQR(card)}
                          title="Show QR Code"
                        >
                          <QrCode size={14} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>QR Code for {card.name}</DialogTitle>
                        </DialogHeader>
                        {selectedCardForQR && (
                          <QRCodeGenerator 
                            url={`${typeof window !== 'undefined' ? window.location.origin : ''}/card/${card._id}`}
                            cardName={card.name}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Link href={`/card/${card._id}`} target="_blank">
                      <Button
                        variant="outline"
                        size="sm"
                        title="View Card"
                      >
                        <ExternalLink size={14} />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" title="Delete Card">
                          <Trash2 size={14} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Card</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{card.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteCard(card._id!)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                  {TemplateComponent && (
                    <div className="transform scale-40 origin-center">
                      <TemplateComponent data={card} />
                    </div>
                  )}
                </div>
                
                {/* Shareable Link Display */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-800 font-medium mb-1">Shareable Link:</p>
                  <p className="text-xs text-blue-600 break-all font-mono">
                    {typeof window !== 'undefined' ? `${window.location.origin}/card/${card._id}` : ''}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}