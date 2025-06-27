import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Code, Zap } from 'lucide-react';

interface TechCardProps {
  data: CardData;
}

export default function TechCard({ data }: TechCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-xl shadow-xl overflow-hidden relative"
      style={{ backgroundColor: data.colors.background }}
    >
      {/* Tech pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 grid-rows-6 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div 
              key={i} 
              className="border-r border-b"
              style={{ borderColor: data.colors.primary }}
            />
          ))}
        </div>
      </div>
      
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ 
          background: `linear-gradient(90deg, ${data.colors.primary}, ${data.colors.secondary}, ${data.colors.primary})` 
        }}
      />
      
      <div className="relative p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code size={20} style={{ color: data.colors.primary }} />
              <h2 
                className="text-xl font-bold"
                style={{ color: data.colors.text, fontFamily: data.font }}
              >
                {data.name}
              </h2>
            </div>
            <p 
              className="text-md mb-1"
              style={{ color: data.colors.secondary }}
            >
              {data.title}
            </p>
            <p 
              className="text-sm font-medium"
              style={{ color: data.colors.primary }}
            >
              {data.company}
            </p>
          </div>
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: data.colors.primary }}
          >
            <Zap size={20} color="white" />
          </div>
        </div>
        
        <div 
          className="mb-4 p-3 rounded-lg border-l-4"
          style={{ 
            backgroundColor: `${data.colors.primary}08`,
            borderLeftColor: data.colors.primary
          }}
        >
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
        
        <div 
          className="text-xs text-center py-1 rounded"
          style={{ 
            backgroundColor: data.colors.secondary,
            color: 'white'
          }}
        >
          INNOVATIVE • RELIABLE • CUTTING-EDGE
        </div>
      </div>
    </div>
  );
}