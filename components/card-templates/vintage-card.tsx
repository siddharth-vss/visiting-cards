import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Crown, Feather } from 'lucide-react';

interface VintageCardProps {
  data: CardData;
}

export default function VintageCard({ data }: VintageCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-lg shadow-xl overflow-hidden relative border-4"
      style={{ 
        backgroundColor: '#f8f6f0',
        borderColor: data.colors.primary
      }}
    >
      {/* Vintage pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${data.colors.primary} 0px, ${data.colors.primary} 2px, transparent 2px, transparent 10px)`
        }}
      />
      
      {/* Decorative corners */}
      <div 
        className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2"
        style={{ borderColor: data.colors.primary }}
      />
      <div 
        className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2"
        style={{ borderColor: data.colors.primary }}
      />
      <div 
        className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2"
        style={{ borderColor: data.colors.primary }}
      />
      <div 
        className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2"
        style={{ borderColor: data.colors.primary }}
      />
      
      <div className="relative p-8 h-full flex flex-col justify-center text-center">
        <div className="mb-6">
          <div className="flex items-center justify-center mb-3">
            <Feather size={20} style={{ color: data.colors.primary }} className="mr-2" />
            <h2 
              className="text-2xl font-serif font-bold"
              style={{ color: data.colors.text, fontFamily: 'serif' }}
            >
              {data.name}
            </h2>
            <Crown size={18} style={{ color: data.colors.secondary }} className="ml-2" />
          </div>
          
          <div 
            className="w-32 h-px mx-auto mb-3"
            style={{ backgroundColor: data.colors.primary }}
          />
          
          <p 
            className="text-lg italic mb-2"
            style={{ color: data.colors.secondary }}
          >
            {data.title}
          </p>
          <p 
            className="text-md font-semibold tracking-wide"
            style={{ color: data.colors.primary }}
          >
            {data.company}
          </p>
        </div>
        
        <div 
          className="p-4 rounded-lg border-2 border-dashed"
          style={{ borderColor: data.colors.primary }}
        >
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center">
              <Mail size={12} style={{ color: data.colors.primary }} className="mx-auto mb-1" />
              <div style={{ color: data.colors.text }}>{data.email}</div>
            </div>
            <div className="text-center">
              <Phone size={12} style={{ color: data.colors.primary }} className="mx-auto mb-1" />
              <div style={{ color: data.colors.text }}>{data.phone}</div>
            </div>
            <div className="text-center">
              <Globe size={12} style={{ color: data.colors.primary }} className="mx-auto mb-1" />
              <div style={{ color: data.colors.text }}>{data.website}</div>
            </div>
            <div className="text-center">
              <MapPin size={12} style={{ color: data.colors.primary }} className="mx-auto mb-1" />
              <div style={{ color: data.colors.text }}>{data.address}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}