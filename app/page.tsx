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
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, CreditCard, History, Sparkles, Lock } from 'lucide-react';

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

export default function Home() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('create');
  const [currentCard, setCurrentCard] = useState<CardData>(defaultCardData);
  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

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

      if (response.ok) {
        const savedCard = await response.json();
        setCurrentCard(savedCard);
        setIsEditing(false);
        toast.success(`Card ${isEditing ? 'updated' : 'saved'} successfully!`);
      } else {
        const error = await response.json();
        toast.error(error.error || `Failed to ${isEditing ? 'update' : 'save'} card`);
      }
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error('Failed to save card');
    }
  };

  const startNewCard = () => {
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
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </>
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

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'create' ? 'default' : 'outline'}
              onClick={() => setActiveTab('create')}
              className="flex items-center gap-2"
            >

              <Plus size={16} />
              Create Card 
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
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'create' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Templates & Customization */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {isEditing ? 'Edit Card' : 'Create New Card'}
                    </h2>
                    <p className="text-gray-600">
                      {isEditing ? 'Update your existing card' : 'Design your perfect business card'}
                    </p>
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Badge variant="secondary">Editing</Badge>
                      <Button variant="outline" onClick={startNewCard}>
                        New Card
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
                  />
                  {!user && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 text-center">
                        <Lock size={14} className="inline mr-1" />
                        Sign in to save and share your cards
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        ) : user ? (
          <div className="max-w-4xl mx-auto">
            <SavedCards onEditCard={editCard} />
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