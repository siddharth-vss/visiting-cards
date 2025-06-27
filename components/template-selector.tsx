'use client';

import { useState } from 'react';
import { cardTemplates } from './card-templates';
import { CardData } from '@/types/card';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  cardData: CardData;
}

export default function TemplateSelector({
  selectedTemplate,
  onTemplateSelect,
  cardData,
}: TemplateSelectorProps) {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(cardTemplates.map(t => t.category)))];
  
  // Filter templates by category
  const filteredTemplates = categoryFilter === 'all' 
    ? cardTemplates 
    : cardTemplates.filter(t => t.category === categoryFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Choose a Template</h3>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const TemplateComponent = template.component;
          const isSelected = selectedTemplate === template.id;
          const isHovered = hoveredTemplate === template.id;

          return (
            <Card
              key={template.id}
              className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              onClick={() => onTemplateSelect(template.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-lg">{template.name}</h4>
                  <Badge variant="secondary" className="mt-1">
                    {template.category}
                  </Badge>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center mb-3">
                <div className="transform scale-[0.7]  origin-center">
                  <TemplateComponent data={cardData} />
                </div>
              </div>

              <Button
                variant={isSelected ? "default" : "outline"}
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onTemplateSelect(template.id);
                }}
              >
                {isSelected ? 'Selected' : 'Select Template'}
              </Button>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No templates found for the selected category.</p>
        </div>
      )}
    </div>
  );
}