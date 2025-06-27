import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Star } from 'lucide-react';

interface CreativeCardProps {
  data: CardData;
}

export default function CreativeCard({ data }: CreativeCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-2xl shadow-xl overflow-hidden relative transform transition-all duration-300 hover:rotate-1"
      style={{ backgroundColor: data.colors.background }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-2"
        style={{ backgroundColor: data.colors.primary }}
      />
      
      <div className="relative p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 
              className="text-2xl font-bold mb-1"
              style={{ color: data.colors.text, fontFamily: data.font }}
            >
              {data.name}
            </h2>
            <p 
              className="text-lg mb-2"
              style={{ color: data.colors.secondary }}
            >
              {data.title}
            </p>
          </div>
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: data.colors.primary }}
          >
            <Star size={20} color="white" fill="white" />
          </div>
        </div>
        
        <div 
          className="mb-4 p-3 rounded-lg"
          style={{ backgroundColor: `${data.colors.primary}15` }}
        >
          <p 
            className="text-md font-medium"
            style={{ color: data.colors.primary }}
          >
            {data.company}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: data.colors.secondary }}
            >
              <Mail size={12} color="white" />
            </div>
            <span className="text-sm" style={{ color: data.colors.text }}>
              {data.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: data.colors.secondary }}
            >
              <Phone size={12} color="white" />
            </div>
            <span className="text-sm" style={{ color: data.colors.text }}>
              {data.phone}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: data.colors.secondary }}
            >
              <Globe size={12} color="white" />
            </div>
            <span className="text-sm" style={{ color: data.colors.text }}>
              {data.website}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}