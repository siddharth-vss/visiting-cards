import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Palette } from 'lucide-react';

interface ArtisticCardProps {
  data: CardData;
}

export default function ArtisticCard({ data }: ArtisticCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-3xl shadow-2xl overflow-hidden relative transform rotate-1"
      style={{ backgroundColor: data.colors.background }}
    >
      {/* Decorative circles */}
      <div 
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20"
        style={{ backgroundColor: data.colors.primary }}
      />
      <div 
        className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-15"
        style={{ backgroundColor: data.colors.secondary }}
      />
      <div 
        className="absolute top-1/2 right-8 w-12 h-12 rounded-full opacity-10"
        style={{ backgroundColor: data.colors.primary }}
      />
      
      <div className="relative p-6 h-full flex flex-col justify-center">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: data.colors.primary }}
            >
              <Palette size={16} color="white" />
            </div>
            <h2 
              className="text-2xl font-bold"
              style={{ color: data.colors.text, fontFamily: data.font }}
            >
              {data.name}
            </h2>
          </div>
          
          <div 
            className="w-20 h-1 mx-auto mb-3 rounded-full"
            style={{ backgroundColor: data.colors.primary }}
          />
          
          <p 
            className="text-lg italic mb-2"
            style={{ color: data.colors.secondary }}
          >
            {data.title}
          </p>
          <p 
            className="text-md font-medium"
            style={{ color: data.colors.primary }}
          >
            {data.company}
          </p>
        </div>
        
        <div className="flex justify-center space-x-6 text-xs">
          <div className="text-center">
            <Mail size={14} style={{ color: data.colors.primary }} className="mx-auto mb-1" />
            <div style={{ color: data.colors.text }}>{data.email}</div>
          </div>
          <div className="text-center">
            <Phone size={14} style={{ color: data.colors.primary }} className="mx-auto mb-1" />
            <div style={{ color: data.colors.text }}>{data.phone}</div>
          </div>
          <div className="text-center">
            <Globe size={14} style={{ color: data.colors.primary }} className="mx-auto mb-1" />
            <div style={{ color: data.colors.text }}>{data.website}</div>
          </div>
        </div>
      </div>
    </div>
  );
}