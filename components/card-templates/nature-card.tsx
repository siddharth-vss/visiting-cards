import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Leaf, TreePine, Flower } from 'lucide-react';

interface NatureCardProps {
  data: CardData;
}

export default function NatureCard({ data }: NatureCardProps) {
  return (
    <div 
      className="w-96 h-56 rounded-2xl shadow-xl overflow-hidden relative"
      style={{ 
        background: `linear-gradient(135deg, #f0f9ff, ${data.colors.background})`
      }}
    >
      {/* Nature elements */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <TreePine size={80} style={{ color: data.colors.primary }} className="absolute top-2 right-2" />
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-15">
        <Leaf size={60} style={{ color: data.colors.secondary }} className="absolute bottom-2 left-2" />
      </div>
      <div className="absolute top-1/2 left-1/3 opacity-8">
        <Flower size={40} style={{ color: data.colors.primary }} />
      </div>
      
      {/* Organic wave */}
      <div 
        className="absolute bottom-0 left-0 w-full h-16 opacity-20"
        style={{
          background: `linear-gradient(45deg, ${data.colors.primary}, ${data.colors.secondary})`,
          clipPath: 'polygon(0 100%, 100% 100%, 100% 60%, 80% 40%, 60% 50%, 40% 30%, 20% 40%, 0 60%)'
        }}
      />
      
      <div className="relative p-6 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${data.colors.primary}20` }}
            >
              <Leaf size={16} style={{ color: data.colors.primary }} />
            </div>
            <h2 
              className="text-2xl font-bold"
              style={{ color: data.colors.text, fontFamily: data.font }}
            >
              {data.name}
            </h2>
          </div>
          
          <div 
            className="w-20 h-1 rounded-full mb-3"
            style={{ backgroundColor: data.colors.primary }}
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
          className="p-4 rounded-2xl"
          style={{ backgroundColor: `${data.colors.primary}10` }}
        >
          <div className="grid grid-cols-2 gap-2 text-xs">
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