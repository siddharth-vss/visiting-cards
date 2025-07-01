'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { CardData } from '@/types/card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cardTemplates } from './card-templates';
import { Trash2, Edit, Copy, Download, Share2, ExternalLink, QrCode, Crown } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import Link from 'next/link';
import QRCodeGenerator from './qr-code-generator';

interface SavedCardsProps {
  onEditCard: (card: CardData) => void;
  onCardDeleted?: () => void;
}

export default function SavedCards({ onEditCard, onCardDeleted }: SavedCardsProps) {
  const { user } = useAuth();
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCardForQR, setSelectedCardForQR] = useState<CardData | null>(null);

  useEffect(() => {
    if (user) {
      fetchCards();
    }
  }, [user]);

  const fetchCards = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/cards', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Ensure we only show cards belonging to the current user
        const userCards = data.filter((card: CardData) => card.userId === user?._id);
        setCards(userCards);
      } else {
        toast.error('Failed to load cards');
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
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCards(cards.filter(card => card._id !== cardId));
        toast.success('Card deleted successfully');
        // Notify parent component to refresh card count
        if (onCardDeleted) {
          onCardDeleted();
        }
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
          <p className="text-gray-600 mb-4">Create your first business card to see it here!</p>
          <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
            <Crown size={16} className="inline mr-1" />
            Free users can create up to 3 cards
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Cards</h2>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{cards.length} / 3 cards</Badge>
          <Badge variant="outline" className="text-blue-600">
            <Crown size={12} className="mr-1" />
            Free Plan
          </Badge>
        </div>
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
                      <Badge variant="outline" className="text-xs text-green-600">
                        Your Card
                      </Badge>
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

      {/* Upgrade Prompt */}
      {cards.length >= 3 && (
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="text-center">
            <Crown size={32} className="mx-auto mb-3 text-blue-600" />
            <h3 className="text-lg font-semibold mb-2">Ready for More?</h3>
            <p className="text-gray-600 mb-4">
              You've reached your free limit of 3 cards. Upgrade to create unlimited business cards!
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Crown size={16} className="mr-2" />
              Upgrade to Pro
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}