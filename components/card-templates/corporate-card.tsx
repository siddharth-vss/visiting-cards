import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Building2 } from 'lucide-react';

interface CorporateCardProps {
  data: CardData;
}

export default function CorporateCard({ data }: CorporateCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-lg shadow-xl overflow-hidden relative border"
      style={{ 
        backgroundColor: data.colors.background,
        borderColor: data.colors.primary
      }}
    >
      <div 
        className="h-3 w-full"
        style={{ backgroundColor: data.colors.primary }}
      />
      
      <div className="p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 
              className="text-xl font-bold mb-1"
              style={{ color: data.colors.text, fontFamily: data.font }}
            >
              {data.name}
            </h2>
            <p 
              className="text-md mb-2"
              style={{ color: data.colors.secondary }}
            >
              {data.title}
            </p>
          </div>
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${data.colors.primary}15` }}
          >
            <Building2 size={20} style={{ color: data.colors.primary }} />
          </div>
        </div>
        
        <div 
          className="mb-4 p-2 rounded"
          style={{ backgroundColor: `${data.colors.secondary}10` }}
        >
          <p 
            className="text-sm font-semibold"
            style={{ color: data.colors.primary }}
          >
            {data.company}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail size={12} style={{ color: data.colors.primary }} />
              <span style={{ color: data.colors.text }}>{data.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={12} style={{ color: data.colors.primary }} />
              <span style={{ color: data.colors.text }}>{data.phone}</span>
            </div>
          </div>
          <div className="space-y-2">
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
    </div>
  );
}