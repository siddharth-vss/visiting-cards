import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface ModernCardProps {
  data: CardData;
}

export default function ModernCard({ data }: ModernCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-2xl shadow-xl overflow-hidden relative transform transition-all duration-300 hover:scale-105"
      style={{ backgroundColor: data.colors.background }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
      
      <div className="relative p-6 h-full flex flex-col justify-between">
        <div>
          <h2 
            className="text-2xl font-bold mb-1"
            style={{ color: data.colors.text, fontFamily: data.font }}
          >
            {data.name}
          </h2>
          <p 
            className="text-lg mb-2 opacity-90"
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
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail size={14} style={{ color: data.colors.primary }} />
            <span className="text-sm" style={{ color: data.colors.text }}>
              {data.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} style={{ color: data.colors.primary }} />
            <span className="text-sm" style={{ color: data.colors.text }}>
              {data.phone}
            </span>
          </div>
          <div className="flex items-center gap-2">
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