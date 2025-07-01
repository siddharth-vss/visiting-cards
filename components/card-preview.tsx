'use client';

import { useRef } from 'react';
import { CardData } from '@/types/card';
import { cardTemplates } from './card-templates';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Save, Share2, QrCode, ExternalLink } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import Link from 'next/link';

interface CardPreviewProps {
  cardData: CardData;
  saving : boolean ;
  canSave : boolean ;
  onSave?: () => void;
}

export default function CardPreview({ cardData, onSave }: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const template = cardTemplates.find(t => t.id === cardData.template);
  const TemplateComponent = template?.component;

  const downloadAsPNG = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `${cardData.name || 'business-card'}.png`;
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
        format: [85.6, 53.98], // Standard business card size
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 53.98);
      pdf.save(`${cardData.name || 'business-card'}.pdf`);
    }
  };

  const shareCard = async () => {
    if (cardData._id) {
      const url = `${window.location.origin}/card/${cardData._id}`;
      
      if (typeof window !== 'undefined' && navigator.share) {
        try {
          await navigator.share({
            title: `${cardData.name}'s Business Card`,
            text: `Check out ${cardData.name}'s business card`,
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
    } else {
      toast.error('Please save the card first to share it');
    }
  };

  if (!TemplateComponent) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No template selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Card Preview</h2>
        <p className="text-gray-600">Live preview of your business card</p>
      </div>

      <Card className="p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex items-center justify-center">
          <div ref={cardRef} className="transform transition-all duration-300 hover:scale-105">
            <TemplateComponent data={cardData} />
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3 justify-center">
        {onSave && (
          <Button onClick={onSave} className="flex items-center gap-2">
            <Save size={16} />
            Save Card
          </Button>
        )}
        
        <Button variant="outline" onClick={downloadAsPNG} className="flex items-center gap-2">
          <Download size={16} />
          Download PNG
        </Button>
        
        <Button variant="outline" onClick={downloadAsPDF} className="flex items-center gap-2">
          <Download size={16} />
          Download PDF
        </Button>
        
        {cardData._id && (
          <>
            <Button variant="outline" onClick={shareCard} className="flex items-center gap-2">
              <Share2 size={16} />
              Share Link
            </Button>
            
            <Link href={`/card/${cardData._id}`} target="_blank">
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink size={16} />
                View Card
              </Button>
            </Link>
          </>
        )}
      </div>

      {cardData._id && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-center">
            <p className="text-sm text-blue-800 mb-2">
              <strong>Shareable Link:</strong>
            </p>
            <p className="text-xs text-blue-600 break-all font-mono bg-white px-2 py-1 rounded">
              {typeof window !== 'undefined' ? `${window.location.origin}/card/${cardData._id}` : ''}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}