'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Lock, Crown } from 'lucide-react';

interface CardLimitData {
  cardCount: number;
  maxCards: number;
  remainingCards: number;
  canCreateMore: boolean;
}

export default function CardLimitIndicator() {
  const { user } = useAuth();
  const [limitData, setLimitData] = useState<CardLimitData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
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
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) return null;

  if (!limitData) return null;

  const progressValue = (limitData.cardCount / limitData.maxCards) * 100;
  const isNearLimit = limitData.cardCount >= limitData.maxCards - 1;
  const isAtLimit = limitData.cardCount >= limitData.maxCards;

  return (
    <Card className={`mb-6 ${isAtLimit ? 'border-red-200 bg-red-50' : isNearLimit ? 'border-yellow-200 bg-yellow-50' : 'border-blue-200 bg-blue-50'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CreditCard size={18} className={isAtLimit ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-blue-600'} />
            <span className="font-medium text-sm">Card Usage</span>
            <Badge variant="secondary" className="text-xs">
              Free Plan
            </Badge>
          </div>
          <div className="text-sm font-medium">
            {limitData.cardCount} / {limitData.maxCards}
          </div>
        </div>
        
        <Progress 
          value={progressValue} 
          className={`h-2 mb-2 ${isAtLimit ? '[&>div]:bg-red-500' : isNearLimit ? '[&>div]:bg-yellow-500' : '[&>div]:bg-blue-500'}`}
        />
        
        <div className="flex items-center justify-between text-xs">
          <span className={isAtLimit ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-blue-600'}>
            {isAtLimit ? (
              <>
                <Lock size={12} className="inline mr-1" />
                Card limit reached
              </>
            ) : (
              `${limitData.remainingCards} cards remaining`
            )}
          </span>
          <span className="text-gray-500 flex items-center gap-1">
            <Crown size={12} />
            Upgrade for unlimited
          </span>
        </div>
      </CardContent>
    </Card>
  );
}