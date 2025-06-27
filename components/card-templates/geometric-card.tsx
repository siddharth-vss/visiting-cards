import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Triangle, Square, Circle } from 'lucide-react';

interface GeometricCardProps {
  data: CardData;
}

export default function GeometricCard({ data }: GeometricCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-2xl shadow-xl overflow-hidden relative"
      style={{ backgroundColor: data.colors.background }}
    >
      {/* Geometric shapes */}
      <div 
        className="absolute top-4 right-4 w-16 h-16 transform rotate-45 opacity-20"
        style={{ backgroundColor: data.colors.primary }}
      />
      <div 
        className="absolute bottom-6 left-6 w-12 h-12 rounded-full opacity-15"
        style={{ backgroundColor: data.colors.secondary }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 rotate-12 opacity-10"
        style={{ backgroundColor: data.colors.primary }}
      />
      
      <div 
        className="absolute top-0 left-0 w-20 h-full opacity-10"
        style={{ 
          background: `linear-gradient(45deg, ${data.colors.primary} 25%, transparent 25%, transparent 75%, ${data.colors.primary} 75%)`,
          backgroundSize: '8px 8px'
        }}
      />
      
      <div className="relative p-6 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-3 h-3 transform rotate-45"
              style={{ backgroundColor: data.colors.primary }}
            />
            <h2 
              className="text-2xl font-bold"
              style={{ color: data.colors.text, fontFamily: data.font }}
            >
              {data.name}
            </h2>
          </div>
          
          <div 
            className="w-16 h-1 mb-3"
            style={{ backgroundColor: data.colors.secondary }}
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
          className="p-4 rounded-lg"
          style={{ backgroundColor: `${data.colors.primary}08` }}
        >
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: data.colors.primary }}
              />
              <span style={{ color: data.colors.text }}>{data.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2"
                style={{ backgroundColor: data.colors.secondary }}
              />
              <span style={{ color: data.colors.text }}>{data.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: data.colors.primary }}
              />
              <span style={{ color: data.colors.text }}>{data.website}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 transform rotate-45"
                style={{ backgroundColor: data.colors.secondary }}
              />
              <span style={{ color: data.colors.text }}>{data.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}