import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface ElegantCardProps {
  data: CardData;
}

export default function ElegantCard({ data }: ElegantCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-xl shadow-2xl overflow-hidden relative"
      style={{ backgroundColor: data.colors.background }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div 
          className="w-full h-full rounded-full transform translate-x-8 -translate-y-8"
          style={{ backgroundColor: data.colors.primary }}
        />
      </div>
      
      <div className="relative p-8 h-full flex flex-col justify-center">
        <div className="text-center mb-6">
          <h2 
            className="text-3xl font-light tracking-wide mb-2"
            style={{ color: data.colors.text, fontFamily: data.font }}
          >
            {data.name}
          </h2>
          <div 
            className="w-16 h-0.5 mx-auto mb-3"
            style={{ backgroundColor: data.colors.primary }}
          />
          <p 
            className="text-lg italic mb-1"
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
        
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Mail size={14} style={{ color: data.colors.primary }} />
            <span className="text-sm" style={{ color: data.colors.text }}>
              {data.email}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone size={14} style={{ color: data.colors.primary }} />
            <span className="text-sm" style={{ color: data.colors.text }}>
              {data.phone}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Globe size={14} style={{ color: data.colors.primary }} />
            <span className="text-sm" style={{ color: data.colors.text }}>
              {data.website}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}