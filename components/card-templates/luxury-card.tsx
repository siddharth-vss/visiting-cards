import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Crown, Diamond } from 'lucide-react';

interface LuxuryCardProps {
  data: CardData;
}

export default function LuxuryCard({ data }: LuxuryCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-2xl shadow-2xl overflow-hidden relative border-2"
      style={{ 
        backgroundColor: data.colors.background,
        borderColor: `${data.colors.primary}40`
      }}
    >
      {/* Luxury pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${data.colors.primary} 2px, transparent 2px), radial-gradient(circle at 75% 75%, ${data.colors.secondary} 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      <div 
        className="absolute top-0 left-0 w-full h-2"
        style={{ 
          background: `linear-gradient(90deg, ${data.colors.primary}, gold, ${data.colors.primary})` 
        }}
      />
      
      <div className="relative p-8 h-full flex flex-col justify-center">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <Crown size={24} style={{ color: data.colors.primary }} className="mr-2" />
            <h2 
              className="text-2xl font-bold tracking-wide"
              style={{ color: data.colors.text, fontFamily: data.font }}
            >
              {data.name}
            </h2>
            <Diamond size={20} style={{ color: data.colors.secondary }} className="ml-2" />
          </div>
          
          <div 
            className="w-24 h-px mx-auto mb-3"
            style={{ backgroundColor: data.colors.primary }}
          />
          
          <p 
            className="text-lg font-medium mb-2"
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
          className="p-4 rounded-xl border"
          style={{ 
            backgroundColor: `${data.colors.primary}05`,
            borderColor: `${data.colors.primary}20`
          }}
        >
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: data.colors.primary }}
              >
                <Mail size={10} color="white" />
              </div>
              <span style={{ color: data.colors.text }}>{data.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: data.colors.primary }}
              >
                <Phone size={10} color="white" />
              </div>
              <span style={{ color: data.colors.text }}>{data.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: data.colors.primary }}
              >
                <Globe size={10} color="white" />
              </div>
              <span style={{ color: data.colors.text }}>{data.website}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: data.colors.primary }}
              >
                <MapPin size={10} color="white" />
              </div>
              <span style={{ color: data.colors.text }}>{data.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}