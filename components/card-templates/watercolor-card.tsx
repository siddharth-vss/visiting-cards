import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Palette, Brush, Heart } from 'lucide-react';

interface WatercolorCardProps {
  data: CardData;
}

export default function WatercolorCard({ data }: WatercolorCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-3xl shadow-xl overflow-hidden relative"
      style={{ backgroundColor: data.colors.background }}
    >
      {/* Watercolor splash effects */}
      <div 
        className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: data.colors.primary }}
      />
      <div 
        className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-15 blur-xl"
        style={{ backgroundColor: data.colors.secondary }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full opacity-10 blur-lg transform -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: data.colors.primary }}
      />
      
      {/* Soft gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${data.colors.primary}20 0%, transparent 50%), radial-gradient(circle at 70% 70%, ${data.colors.secondary}20 0%, transparent 50%)`
        }}
      />
      
      <div className="relative p-8 h-full flex flex-col justify-center">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: `${data.colors.primary}30` }}
            >
              <Palette size={20} style={{ color: data.colors.primary }} />
            </div>
            <h2 
              className="text-2xl font-bold"
              style={{ color: data.colors.text, fontFamily: data.font }}
            >
              {data.name}
            </h2>
            <Heart size={18} style={{ color: data.colors.secondary }} className="ml-3" />
          </div>
          
          <div 
            className="w-28 h-1 mx-auto mb-4 rounded-full"
            style={{ backgroundColor: `${data.colors.primary}60` }}
          />
          
          <p 
            className="text-lg italic mb-2"
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
          className="p-5 rounded-3xl backdrop-blur-sm"
          style={{ backgroundColor: `${data.colors.background}80` }}
        >
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${data.colors.primary}40` }}
              >
                <Mail size={10} style={{ color: data.colors.primary }} />
              </div>
              <span style={{ color: data.colors.text }}>{data.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${data.colors.primary}40` }}
              >
                <Phone size={10} style={{ color: data.colors.primary }} />
              </div>
              <span style={{ color: data.colors.text }}>{data.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${data.colors.primary}40` }}
              >
                <Globe size={10} style={{ color: data.colors.primary }} />
              </div>
              <span style={{ color: data.colors.text }}>{data.website}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${data.colors.primary}40` }}
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