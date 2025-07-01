import { CardData } from '@/types/card';
import { Mail, Phone, Globe, MapPin, Cpu, Zap, Binary } from 'lucide-react';

interface CyberpunkCardProps {
  data: CardData;
}

export default function CyberpunkCard({ data }: CyberpunkCardProps) {
  return (
    <div 
      className="w-96 h-64 rounded-lg shadow-2xl overflow-hidden relative"
      style={{ 
        backgroundColor: '#0d1117',
        border: `1px solid ${data.colors.primary}`,
        boxShadow: `0 0 30px ${data.colors.primary}30`
      }}
    >
      {/* Circuit pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(90deg, ${data.colors.primary} 1px, transparent 1px),
            linear-gradient(${data.colors.primary} 1px, transparent 1px),
            linear-gradient(45deg, ${data.colors.secondary} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 20px 20px, 10px 10px'
        }}
      />
      
      {/* Glitch effect bars */}
      <div 
        className="absolute top-8 left-0 w-full h-0.5 opacity-60"
        style={{ backgroundColor: data.colors.primary }}
      />
      <div 
        className="absolute bottom-12 left-0 w-full h-0.5 opacity-40"
        style={{ backgroundColor: data.colors.secondary }}
      />
      
      <div className="relative p-6 h-full flex flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ 
                backgroundColor: data.colors.primary,
                boxShadow: `0 0 10px ${data.colors.primary}`
              }}
            >
              <Cpu size={16} color="black" />
            </div>
            <h2 
              className="text-2xl font-bold tracking-wider font-mono"
              style={{ 
                fontFamily: 'monospace',
                textShadow: `0 0 10px ${data.colors.primary}`,
                color: data.colors.primary
              }}
            >
              {data.name.toUpperCase()}
            </h2>
          </div>
          
          <div 
            className="w-24 h-px mb-3"
            style={{ 
              backgroundColor: data.colors.primary,
              boxShadow: `0 0 5px ${data.colors.primary}`
            }}
          />
          
          <p 
            className="text-lg mb-2 font-mono"
            style={{ color: data.colors.secondary }}
          >
            {data.title}
          </p>
          <p 
            className="text-md font-medium font-mono"
            style={{ color: data.colors.primary }}
          >
            {data.company}
          </p>
        </div>
        
        <div 
          className="p-4 rounded border"
          style={{ 
            backgroundColor: `${data.colors.primary}10`,
            borderColor: data.colors.primary
          }}
        >
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: data.colors.primary,
                  boxShadow: `0 0 5px ${data.colors.primary}`
                }}
              />
              <span className="text-gray-300 break-all whitespace-normal">{data.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: data.colors.secondary,
                  boxShadow: `0 0 5px ${data.colors.secondary}`
                }}
              />
              <span className="text-gray-300 break-all whitespace-normal">{data.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: data.colors.primary,
                  boxShadow: `0 0 5px ${data.colors.primary}`
                }}
              />
              <span className="text-gray-300 break-all whitespace-normal">{data.website}</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: data.colors.secondary,
                  boxShadow: `0 0 5px ${data.colors.secondary}`
                }}
              />
              <span className="text-gray-300 break-all whitespace-normal">{data.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}