import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Zap, Star } from 'lucide-react';

interface NeonCardProps {
  data: CardData;
}

export default function NeonCard({ data }: NeonCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-2xl shadow-2xl overflow-hidden relative"
      style={{ 
        backgroundColor: '#0a0a0a',
        border: `2px solid ${data.colors.primary}`,
        boxShadow: `0 0 20px ${data.colors.primary}40`
      }}
    >
      {/* Neon glow effects */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${data.colors.primary}40 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${data.colors.secondary}40 0%, transparent 50%)`
        }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${data.colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${data.colors.primary} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="relative p-6 h-full flex flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: data.colors.primary,
                boxShadow: `0 0 15px ${data.colors.primary}`
              }}
            >
              <Zap size={16} color="white" />
            </div>
            <h2 
              className="text-2xl font-bold tracking-wide"
              style={{ 
                fontFamily: data.font,
                textShadow: `0 0 10px ${data.colors.primary}`
              }}
            >
              {data.name}
            </h2>
          </div>
          
          <div 
            className="w-20 h-0.5 mb-3"
            style={{ 
              backgroundColor: data.colors.primary,
              boxShadow: `0 0 8px ${data.colors.primary}`
            }}
          />
          
          <p 
            className="text-lg mb-2"
            style={{ color: data.colors.secondary }}
          >
            {data.title}
          </p>
          <p 
            className="text-md font-medium"
            style={{ 
              color: data.colors.primary,
              textShadow: `0 0 5px ${data.colors.primary}`
            }}
          >
            {data.company}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Mail size={12} style={{ color: data.colors.primary }} />
            <span className="text-gray-300">{data.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={12} style={{ color: data.colors.primary }} />
            <span className="text-gray-300">{data.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={12} style={{ color: data.colors.primary }} />
            <span className="text-gray-300">{data.website}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={12} style={{ color: data.colors.primary }} />
            <span className="text-gray-300">{data.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}