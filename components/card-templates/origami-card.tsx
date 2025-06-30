import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Triangle, Square, Hexagon } from 'lucide-react';

interface OrigamiCardProps {
  data: CardData;
}

export default function OrigamiCard({ data }: OrigamiCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-2xl shadow-xl overflow-hidden relative"
      style={{ backgroundColor: data.colors.background }}
    >
      {/* Origami fold effects */}
      <div 
        className="absolute top-0 left-0 w-0 h-0 border-l-16 border-b-16 border-l-transparent"
        style={{ borderBottomColor: `${data.colors.primary}40` }}
      />
      <div 
        className="absolute top-0 right-0 w-0 h-0 border-r-20 border-b-20 border-r-transparent"
        style={{ borderBottomColor: `${data.colors.secondary}30` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-0 h-0 border-l-24 border-t-24 border-l-transparent"
        style={{ borderTopColor: `${data.colors.primary}20` }}
      />
      
      {/* Geometric shapes */}
      <div 
        className="absolute top-6 right-6 w-8 h-8 transform rotate-45 opacity-30"
        style={{ backgroundColor: data.colors.primary }}
      />
      <div 
        className="absolute bottom-8 right-8 w-6 h-6 transform rotate-12 opacity-25"
        style={{ backgroundColor: data.colors.secondary }}
      />
      <div 
        className="absolute top-1/2 left-8 w-4 h-4 transform rotate-45 opacity-20"
        style={{ backgroundColor: data.colors.primary }}
      />
      
      <div className="relative p-6 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 transform rotate-45 flex items-center justify-center"
              style={{ backgroundColor: `${data.colors.primary}20` }}
            >
              <Triangle size={16} style={{ color: data.colors.primary }} className="transform -rotate-45" />
            </div>
            <h2 
              className="text-2xl font-bold"
              style={{ color: data.colors.text, fontFamily: data.font }}
            >
              {data.name}
            </h2>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-16 h-1 transform -skew-x-12"
              style={{ backgroundColor: data.colors.primary }}
            />
            <div 
              className="w-8 h-1 transform skew-x-12"
              style={{ backgroundColor: data.colors.secondary }}
            />
          </div>
          
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
          className="p-4 transform -skew-y-1"
          style={{ backgroundColor: `${data.colors.primary}08` }}
        >
          <div className="grid grid-cols-2 gap-3 text-xs transform skew-y-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 transform rotate-45"
                style={{ backgroundColor: data.colors.primary }}
              />
              <span style={{ color: data.colors.text }}>{data.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 transform rotate-12"
                style={{ backgroundColor: data.colors.secondary }}
              />
              <span style={{ color: data.colors.text }}>{data.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 transform -rotate-12"
                style={{ backgroundColor: data.colors.primary }}
              />
              <span style={{ color: data.colors.text }}>{data.website}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 transform rotate-45"
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