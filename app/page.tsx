'use client';

import { useState } from 'react';
import { CardData } from '@/types/card';
import TemplateSelector from '@/components/template-selector';
import CardCustomizer from '@/components/card-customizer';
import CardPreview from '@/components/card-preview';
import SavedCards from '@/components/saved-cards';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, CreditCard, History, Sparkles } from 'lucide-react';

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
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('create');
  const [currentCard, setCurrentCard] = useState<CardData>(defaultCardData);
  const [isEditing, setIsEditing] = useState(false);

  const handleCardDataChange = (data: Partial<CardData>) => {
    setCurrentCard(prev => ({ ...prev, ...data }));
  };

  const handleTemplateSelect = (templateId: string) => {
    setCurrentCard(prev => ({ ...prev, template: templateId }));
  };

  const saveCard = async () => {
    try {
      const method = isEditing && currentCard._id ? 'PUT' : 'POST';
      const url = isEditing && currentCard._id ? `/api/cards/${currentCard._id}` : '/api/cards';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentCard),
      });

      if (response.ok) {
        const savedCard = await response.json();
        setCurrentCard(savedCard);
        setIsEditing(false);
        toast.success(`Card ${isEditing ? 'updated' : 'saved'} successfully!`);
      } else {
        toast.error(`Failed to ${isEditing ? 'update' : 'save'} card`);
      }
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error('Failed to save card');
    }
  };

  const startNewCard = () => {
    setCurrentCard(defaultCardData);
    setIsEditing(false);
    setActiveTab('create');
  };

  const editCard = (card: CardData) => {
    setCurrentCard(card);
    setIsEditing(true);
    setActiveTab('create');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CreditCard className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Business Card Generator
            </h1>
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create stunning, professional business cards with our easy-to-use designer. 
            Choose from beautiful templates and customize every detail.
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
              onClick={() => setActiveTab('saved')}
              className="flex items-center gap-2"
            >
              <History size={16} />
              Saved Cards
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
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <SavedCards onEditCard={editCard} />
          </div>
        )}
      </div>
    </div>
  );
}