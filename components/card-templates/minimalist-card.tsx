import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface MinimalistCardProps {
  data: CardData;
}

export default function MinimalistCard({ data }: MinimalistCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-lg shadow-lg overflow-hidden relative"
      style={{ backgroundColor: data.colors.background }}
    >
      <div className="p-8 h-full flex flex-col justify-center">
        <div className="text-center mb-6">
          <h2 
            className="text-2xl font-light tracking-wider mb-2"
            style={{ color: data.colors.text, fontFamily: data.font }}
          >
            {data.name.toUpperCase()}
          </h2>
          <div 
            className="w-12 h-px mx-auto mb-3"
            style={{ backgroundColor: data.colors.primary }}
          />
          <p 
            className="text-sm uppercase tracking-wide mb-1"
            style={{ color: data.colors.secondary }}
          >
            {data.title}
          </p>
          <p 
            className="text-xs uppercase tracking-wider"
            style={{ color: data.colors.primary }}
          >
            {data.company}
          </p>
        </div>
        
        <div className="space-y-1 text-center">
          <div className="text-xs" style={{ color: data.colors.text }}>
            {data.email}
          </div>
          <div className="text-xs" style={{ color: data.colors.text }}>
            {data.phone}
          </div>
          <div className="text-xs" style={{ color: data.colors.text }}>
            {data.website}
          </div>
        </div>
      </div>
    </div>
  );
}