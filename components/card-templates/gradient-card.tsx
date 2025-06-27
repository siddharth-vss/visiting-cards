import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Sparkles } from 'lucide-react';

interface GradientCardProps {
  data: CardData;
}

export default function GradientCard({ data }: GradientCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-2xl shadow-2xl overflow-hidden relative"
      style={{ 
        background: `linear-gradient(135deg, ${data.colors.primary}, ${data.colors.secondary})` 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="absolute top-4 right-4">
        <Sparkles size={24} color="white" className="opacity-30" />
      </div>
      
      <div className="relative p-6 h-full flex flex-col justify-between text-white">
        <div>
          <h2 
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: data.font }}
          >
            {data.name}
          </h2>
          <p className="text-lg opacity-90 mb-1">
            {data.title}
          </p>
          <p className="text-md font-medium opacity-80">
            {data.company}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Mail size={14} />
            <span>{data.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Phone size={14} />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Globe size={14} />
            <span>{data.website}</span>
          </div>
        </div>
      </div>
    </div>
  );
}