import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Building } from 'lucide-react';

interface ClassicCardProps {
  data: CardData;
}

export default function ClassicCard({ data }: ClassicCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-lg shadow-lg border-2 overflow-hidden relative"
      style={{ 
        backgroundColor: data.colors.background,
        borderColor: data.colors.primary
      }}
    >
      <div 
        className="h-20 w-full"
        style={{ backgroundColor: data.colors.primary }}
      />
      
      <div className="relative p-6 -mt-6">
        <div 
          className="bg-white rounded-lg p-4 shadow-md border-2 mb-4"
          style={{ borderColor: data.colors.primary }}
        >
          <h2 
            className="text-xl font-bold mb-1"
            style={{ color: data.colors.primary, fontFamily: data.font }}
          >
            {data.name}
          </h2>
          <p 
            className="text-md mb-2"
            style={{ color: data.colors.secondary }}
          >
            {data.title}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <Building size={14} style={{ color: data.colors.primary }} />
            <span className="text-sm font-medium" style={{ color: data.colors.text }}>
              {data.company}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Mail size={12} style={{ color: data.colors.primary }} />
            <span style={{ color: data.colors.text }}>{data.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={12} style={{ color: data.colors.primary }} />
            <span style={{ color: data.colors.text }}>{data.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={12} style={{ color: data.colors.primary }} />
            <span style={{ color: data.colors.text }}>{data.website}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={12} style={{ color: data.colors.primary }} />
            <span style={{ color: data.colors.text }}>{data.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}