import { CardTemplate } from '@/types/card';
import ModernCard from './modern-card';

import ElegantCard from './elegant-card';
import MinimalistCard from './minimalist-card';
import GradientCard from './gradient-card';
import CorporateCard from './corporate-card';
import ArtisticCard from './artistic-card';
import TechCard from './tech-card';
import LuxuryCard from './luxury-card';
import GeometricCard from './geometric-card';
import NeonCard from './neon-card';
import VintageCard from './vintage-card';
import GlassCard from './glass-card';
import NatureCard from './nature-card';
import CyberpunkCard from './cyberpunk-card';
import WatercolorCard from './watercolor-card';
import OrigamiCard from './origami-card';

export const cardTemplates: CardTemplate[] = [
  {
    id: 'modern',
    name: 'Modern',
    category: 'Professional',
    preview: '/templates/modern-preview.png',
    component: ModernCard,
  },
  
  {
    id: 'elegant',
    name: 'Elegant',
    category: 'Luxury',
    preview: '/templates/elegant-preview.png',
    component: ElegantCard,
  },
  
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'Clean',
    preview: '/templates/minimalist-preview.png',
    component: MinimalistCard,
  },
  {
    id: 'gradient',
    name: 'Gradient',
    category: 'Modern',
    preview: '/templates/gradient-preview.png',
    component: GradientCard,
  },
  {
    id: 'corporate',
    name: 'Corporate',
    category: 'Business',
    preview: '/templates/corporate-preview.png',
    component: CorporateCard,
  },
  {
    id: 'artistic',
    name: 'Artistic',
    category: 'Creative',
    preview: '/templates/artistic-preview.png',
    component: ArtisticCard,
  },
  {
    id: 'tech',
    name: 'Tech',
    category: 'Technology',
    preview: '/templates/tech-preview.png',
    component: TechCard,
  },
  {
    id: 'luxury',
    name: 'Luxury',
    category: 'Premium',
    preview: '/templates/luxury-preview.png',
    component: LuxuryCard,
  },
  {
    id: 'geometric',
    name: 'Geometric',
    category: 'Modern',
    preview: '/templates/geometric-preview.png',
    component: GeometricCard,
  },
  {
    id: 'neon',
    name: 'Neon',
    category: 'Futuristic',
    preview: '/templates/neon-preview.png',
    component: NeonCard,
  },
  {
    id: 'vintage',
    name: 'Vintage',
    category: 'Classic',
    preview: '/templates/vintage-preview.png',
    component: VintageCard,
  },
  {
    id: 'glass',
    name: 'Glass',
    category: 'Modern',
    preview: '/templates/glass-preview.png',
    component: GlassCard,
  },
  {
    id: 'nature',
    name: 'Nature',
    category: 'Organic',
    preview: '/templates/nature-preview.png',
    component: NatureCard,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'Futuristic',
    preview: '/templates/cyberpunk-preview.png',
    component: CyberpunkCard,
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    category: 'Artistic',
    preview: '/templates/watercolor-preview.png',
    component: WatercolorCard,
  },
  {
    id: 'origami',
    name: 'Origami',
    category: 'Creative',
    preview: '/templates/origami-preview.png',
    component: OrigamiCard,
  },
];

export { 
  ModernCard, 
  ElegantCard, 
  MinimalistCard,
  GradientCard,
  CorporateCard,
  ArtisticCard,
  TechCard,
  LuxuryCard,
  GeometricCard,
  NeonCard,
  VintageCard,
  GlassCard,
  NatureCard,
  CyberpunkCard,
  WatercolorCard,
  OrigamiCard
};