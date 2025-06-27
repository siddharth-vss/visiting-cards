'use client';

import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Copy, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeGeneratorProps {
  url: string;
  cardName: string;
}

export default function QRCodeGenerator({ url, cardName }: QRCodeGeneratorProps) {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (url) {
      generateQRCode();
    }
  }, [url]);

  const generateQRCode = async () => {
    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, url, {
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        
        const dataURL = canvas.toDataURL();
        setQrCodeDataURL(dataURL);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Failed to generate QR code');
    }
  };

  const downloadQRCode = () => {
    if (qrCodeDataURL) {
      const link = document.createElement('a');
      link.download = `${cardName}-qr-code.png`;
      link.href = qrCodeDataURL;
      link.click();
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const shareQRCode = async () => {
    if (typeof window !== 'undefined' && navigator.share && qrCodeDataURL) {
      try {
        // Convert data URL to blob
        const response = await fetch(qrCodeDataURL);
        const blob = await response.blob();
        const file = new File([blob], `${cardName}-qr-code.png`, { type: 'image/png' });
        
        await navigator.share({
          title: `${cardName}'s Business Card QR Code`,
          text: `Scan this QR code to view ${cardName}'s business card`,
          files: [file],
        });
      } catch (error) {
        console.error('Error sharing QR code:', error);
        // Fallback to copying link
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <canvas 
            ref={canvasRef}
            className="max-w-full h-auto"
          />
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Scan this QR code to view the business card
        </p>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline" size="sm" onClick={copyLink}>
            <Copy size={14} className="mr-2" />
            Copy Link
          </Button>
          
          <Button variant="outline" size="sm" onClick={downloadQRCode}>
            <Download size={14} className="mr-2" />
            Download QR
          </Button>
          
          {typeof window !== 'undefined' && navigator.share && (
            <Button variant="outline" size="sm" onClick={shareQRCode}>
              <Share2 size={14} className="mr-2" />
              Share QR
            </Button>
          )}
        </div>
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        <p className="break-all">{url}</p>
      </div>
    </div>
  );
}