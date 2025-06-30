'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CardData } from '@/types/card';
import { cardTemplates } from '@/components/card-templates';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Download, Share2, QrCode } from 'lucide-react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import QRCodeGenerator from '@/components/qr-code-generator';
import { useRef } from 'react';

export default function CardViewPage() {
  const params = useParams();
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.id) {
      fetchCard(params.id as string);
    }
  }, [params.id]);

  const fetchCard = async (cardId: string) => {
    try {
      const response = await fetch(`/api/cards/${cardId}`);
      if (response.ok) {
        const cardData = await response.json();
        setCard(cardData);
      } else {
        toast.error('Card not found');
      }
    } catch (error) {
      console.error('Error fetching card:', error);
      toast.error('Failed to load card');
    } finally {
      setLoading(false);
    }
  };

  const downloadAsPNG = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `${card?.name || 'business-card'}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const downloadAsPDF = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.6, 53.98],
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 53.98);
      pdf.save(`${card?.name || 'business-card'}.pdf`);
    }
  };

  const shareCard = async () => {
    const url = window.location.href;
    
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${card?.name}'s Business Card`,
          text: `Check out ${card?.name}'s business card`,
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy link');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-8" />
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Card Not Found</h1>
          <p className="text-gray-600 mb-6">The business card you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>
              <ArrowLeft size={16} className="mr-2" />
              Go Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const template = cardTemplates.find(t => t.id === card.template);
  const TemplateComponent = template?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft size={16} className="mr-2" />
                Back to Generator
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowQR(!showQR)}>
                <QrCode size={16} className="mr-2" />
                {showQR ? 'Hide QR' : 'Show QR'}
              </Button>
              <Button variant="outline" onClick={shareCard}>
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Card Display */}
            <div>
              <Card className="p-8 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="flex items-center justify-center">
                  <div ref={cardRef} className="transform transition-all duration-300 hover:scale-105">
                    {TemplateComponent && <TemplateComponent data={card} />}
                  </div>
                </div>
              </Card>

              {/* Download Actions */}
              <div className="flex gap-3 justify-center mt-6">
                <Button variant="outline" onClick={downloadAsPNG}>
                  <Download size={16} className="mr-2" />
                  Download PNG
                </Button>
                <Button variant="outline" onClick={downloadAsPDF}>
                  <Download size={16} className="mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Card Info & QR Code */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{card.name}</h1>
                    <p className="text-xl text-gray-600 mb-2">{card.title}</p>
                    <p className="text-lg text-blue-600 font-medium">{card.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{template?.name}</Badge>
                    <Badge variant="secondary">{template?.category}</Badge>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="ml-2">{card.email}</span>
                  </div>
                  <div> 
                    <a href={`https://wa.me${card.phone}`}>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <span className="ml-2">{card.phone}</span>
                    </a>
                  </div>
                  <div>
                    <a href={card.website}>
                      <span className="font-medium text-gray-700">Website:</span>
                      <span className="ml-2">{card.website}</span>
                    </a>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Address:</span>
                    <span className="ml-2">{card.address}</span>
                  </div>
                </div>
              </Card>

              {/* QR Code Section */}
              {showQR && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Share via QR Code</h3>
                  <QRCodeGenerator 
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                    cardName={card.name}
                  />
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}