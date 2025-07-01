'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { CardData } from '@/types/card';
import TemplateSelector from '@/components/template-selector';
import CardCustomizer from '@/components/card-customizer';
import CardPreview from '@/components/card-preview';
import SavedCards from '@/components/saved-cards';
import Header from '@/components/header';
import AuthModal from '@/components/auth/auth-modal';
import CardLimitIndicator from '@/components/card-limit-indicator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Plus, CreditCard, History, Sparkles, Lock, AlertTriangle } from 'lucide-react';

const defaultCardData: CardData = {
  name: 'John Doe',
  title: 'Software Engineer',
  company: 'Tech Corp',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  website: 'www.johndoe.com',
  address: '123 Main St, San Francisco, CA 94102',
  template: 'modern',
  colors: {
    primary: '#3B82F6',
    secondary: '#1E40AF',
    text: '#1F2937',
    background: '#FFFFFF',
  },
  font: 'Inter, sans-serif',
  userId: '',
};

interface CardLimitData {
  cardCount: number;
  maxCards: number;
  remainingCards: number;
  canCreateMore: boolean;
}

export default function Home() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('create');
  const [currentCard, setCurrentCard] = useState<CardData>(defaultCardData);
  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [limitData, setLimitData] = useState<CardLimitData | null>(null);
  const [savingCard, setSavingCard] = useState(false);

  useEffect(() => {
    if (user) {
      setCurrentCard(prev => ({ ...prev, userId: user._id }));
      fetchCardLimit();
    }
  }, [user]);

  const fetchCardLimit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/cards/count', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setLimitData(data);
      }
    } catch (error) {
      console.error('Error fetching card limit:', error);
    }
  };

  const handleCardDataChange = (data: Partial<CardData>) => {
    setCurrentCard(prev => ({ ...prev, ...data }));
  };

  const handleTemplateSelect = (templateId: string) => {
    setCurrentCard(prev => ({ ...prev, template: templateId }));
  };

  const saveCard = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Check if user can create more cards (only for new cards)
    if (!isEditing && limitData && !limitData.canCreateMore) {
      toast.error('Card limit reached! Free users can create up to 3 cards only.');
      return;
    }

    setSavingCard(true);

    try {
      const token = localStorage.getItem('token');
      const method = isEditing && currentCard._id ? 'PUT' : 'POST';
      const url = isEditing && currentCard._id ? `/api/cards/${currentCard._id}` : '/api/cards';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(currentCard),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentCard(data);
        setIsEditing(false);
        toast.success(`Card ${isEditing ? 'updated' : 'saved'} successfully!`);
        
        // Refresh card limit data
        if (!isEditing) {
          fetchCardLimit();
        }
      } else {
        if (data.code === 'CARD_LIMIT_REACHED') {
          toast.error('Card limit reached! Free users can create up to 3 cards only.');
        } else {
          toast.error(data.error || `Failed to ${isEditing ? 'update' : 'save'} card`);
        }
      }
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error('Failed to save card');
    } finally {
      setSavingCard(false);
    }
  };

  const startNewCard = () => {
    if (limitData && !limitData.canCreateMore) {
      toast.error('Card limit reached! Free users can create up to 3 cards only.');
      return;
    }
    
    setCurrentCard({ ...defaultCardData, userId: user?._id || '' });
    setIsEditing(false);
    setActiveTab('create');
  };

  const editCard = (card: CardData) => {
    setCurrentCard(card);
    setIsEditing(true);
    setActiveTab('create');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onAuthClick={() => setShowAuthModal(true)} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {user ? (
              <>Welcome back, <span className="font-semibold text-blue-600">{user.name}</span>! Create stunning, professional business cards with our easy-to-use designer.</>
            ) : (
              <>Create stunning, professional business cards with our easy-to-use designer. Choose from beautiful templates and customize every detail.</>
            )}
          </p>
        </div>

        {/* Card Limit Indicator */}
        {user && <CardLimitIndicator />}

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'create' ? 'default' : 'outline'}
              onClick={() => setActiveTab('create')}
              className="flex items-center gap-2"
              disabled={!user && activeTab !== 'create'}
            >
              <Plus size={16} />
              Create Card
              {limitData && !limitData.canCreateMore && !isEditing && (
                <Lock size={14} className="text-red-500" />
              )}
            </Button>
            <Button
              variant={activeTab === 'saved' ? 'default' : 'outline'}
              onClick={() => {
                if (!user) {
                  setShowAuthModal(true);
                  return;
                }
                setActiveTab('saved');
              }}
              className="flex items-center gap-2"
            >
              <History size={16} />
              My Cards
              {!user && <Lock size={14} />}
              {limitData && (
                <Badge variant="secondary" className="ml-1">
                  {limitData.cardCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'create' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Templates & Customization */}
            <div className="lg:col-span-2 space-y-8">
              {/* Card Limit Warning */}
              {user && limitData && !limitData.canCreateMore && !isEditing && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Card limit reached!</strong> You've created {limitData.cardCount} out of {limitData.maxCards} free cards. 
                    Upgrade to create unlimited cards or edit your existing ones.
                  </AlertDescription>
                </Alert>
              )}

              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {isEditing ? 'Edit Card' : 'Create New Card'}
                    </h2>
                    <p className="text-gray-600">
                      {isEditing ? 'Update your existing card' : 'Design your perfect business card'}
                    </p>
                    {user && limitData && !isEditing && (
                      <p className="text-sm text-blue-600 mt-1">
                        {limitData.remainingCards} of {limitData.maxCards} free cards remaining
                      </p>
                    )}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Badge variant="secondary">Editing</Badge>
                      <Button 
                        variant="outline" 
                        onClick={startNewCard}
                        disabled={!!(limitData && !limitData.canCreateMore)}
                      >
                        New Card
                        {limitData && !limitData.canCreateMore && (
                          <Lock size={14} className="ml-1 text-red-500" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                <Tabs defaultValue="templates" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="customize">Customize</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="templates" className="mt-6">
                    <TemplateSelector
                      selectedTemplate={currentCard.template}
                      onTemplateSelect={handleTemplateSelect}
                      cardData={currentCard}
                    />
                  </TabsContent>
                  
                  <TabsContent value="customize" className="mt-6">
                    <CardCustomizer
                      cardData={currentCard}
                      onDataChange={handleCardDataChange}
                    />
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            {/* Right Column - Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="p-6">
                  <CardPreview
                    cardData={currentCard}
                    onSave={saveCard}
                    saving={savingCard}
                    canSave={user && (isEditing || (limitData?.canCreateMore ?? false))}
                  />
                  {!user && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 text-center">
                        <Lock size={14} className="inline mr-1" />
                        Sign in to save and share your cards
                      </p>
                    </div>
                  )}
                  {user && limitData && !limitData.canCreateMore && !isEditing && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800 text-center">
                        <Lock size={14} className="inline mr-1" />
                        Card limit reached. Upgrade for unlimited cards.
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        ) : user ? (
          <div className="max-w-4xl mx-auto">
            <SavedCards onEditCard={editCard} onCardDeleted={fetchCardLimit} />
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <Card className="p-8 text-center">
              <Lock size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Sign In Required</h3>
              <p className="text-gray-600 mb-6">
                Please sign in to view your saved cards and access all features.
              </p>
              <Button onClick={() => setShowAuthModal(true)}>
                Sign In to Continue
              </Button>
            </Card>
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}