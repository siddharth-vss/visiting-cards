import { CardTemplate } from '@/types/card';
import ModernCard from './modern-card';
import ClassicCard from './classic-card';
import ElegantCard from './elegant-card';
import CreativeCard from './creative-card';
import MinimalistCard from './minimalist-card';
import GradientCard from './gradient-card';
import CorporateCard from './corporate-card';
import ArtisticCard from './artistic-card';
import TechCard from './tech-card';
import LuxuryCard from './luxury-card';
import GeometricCard from './geometric-card';

export const cardTemplates: CardTemplate[] = [
  {
    id: 'modern',
    name: 'Modern',
    category: 'Professional',
    preview: '/templates/modern-preview.png',
    component: ModernCard,
  },
  {
    id: 'classic',
    name: 'Classic',
    category: 'Traditional',
    preview: '/templates/classic-preview.png',
    component: ClassicCard,
  },
  {
    id: 'elegant',
    name: 'Elegant',
    category: 'Luxury',
    preview: '/templates/elegant-preview.png',
    component: ElegantCard,
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'Artistic',
    preview: '/templates/creative-preview.png',
    component: CreativeCard,
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
];

export { 
  ModernCard, 
  ClassicCard, 
  ElegantCard, 
  CreativeCard,
  MinimalistCard,
  GradientCard,
  CorporateCard,
  ArtisticCard,
  TechCard,
  LuxuryCard,
  GeometricCard
};