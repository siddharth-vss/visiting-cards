import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Sparkles, Diamond } from 'lucide-react';

interface GlassCardProps {
  data: CardData;
}

export default function GlassCard({ data }: GlassCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-3xl shadow-2xl overflow-hidden relative backdrop-blur-md border"
      style={{ 
        background: `linear-gradient(135deg, ${data.colors.background}80, ${data.colors.primary}20)`,
        borderColor: `${data.colors.primary}40`,
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      
      {/* Floating elements */}
      <div 
        className="absolute top-4 right-4 w-6 h-6 rounded-full opacity-30"
        style={{ backgroundColor: data.colors.primary }}
      />
      <div 
        className="absolute bottom-8 left-8 w-4 h-4 rounded-full opacity-20"
        style={{ backgroundColor: data.colors.secondary }}
      />
      <div 
        className="absolute top-1/2 right-8 w-3 h-3 rounded-full opacity-25"
        style={{ backgroundColor: data.colors.primary }}
      />
      
      <div className="relative p-8 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{ backgroundColor: `${data.colors.primary}30` }}
            >
              <Diamond size={18} style={{ color: data.colors.primary }} />
            </div>
            <div>
              <h2 
                className="text-2xl font-bold"
                style={{ color: data.colors.text, fontFamily: data.font }}
              >
                {data.name}
              </h2>
            </div>
          </div>
          
          <div 
            className="w-24 h-1 rounded-full mb-4"
            style={{ backgroundColor: `${data.colors.primary}60` }}
          />
          
          <p 
            className="text-lg mb-2"
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
        
        <div 
          className="p-4 rounded-2xl backdrop-blur-sm"
          style={{ backgroundColor: `${data.colors.background}40` }}
        >
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${data.colors.primary}30` }}
              >
                <Mail size={10} style={{ color: data.colors.primary }} />
              </div>
              <span style={{ color: data.colors.text }}>{data.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${data.colors.primary}30` }}
              >
                <Phone size={10} style={{ color: data.colors.primary }} />
              </div>
              <span style={{ color: data.colors.text }}>{data.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${data.colors.primary}30` }}
              >
                <Globe size={10} style={{ color: data.colors.primary }} />
              </div>
              <span style={{ color: data.colors.text }}>{data.website}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${data.colors.primary}30` }}
              >
                <MapPin size={10} style={{ color: data.colors.primary }} />
              </div>
              <span style={{ color: data.colors.text }}>{data.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}