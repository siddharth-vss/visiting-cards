'use client';

import { CardData } from '@/types/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Palette, Type, User, Building, Mail, Phone, Globe, MapPin } from 'lucide-react';

interface CardCustomizerProps {
  cardData: CardData;
  onDataChange: (data: Partial<CardData>) => void;
}

const fontOptions = [
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Poppins, sans-serif', label: 'Poppins' },
  { value: 'Playfair Display, serif', label: 'Playfair Display' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
];

const colorPresets = [
  { primary: '#3B82F6', secondary: '#1E40AF', text: '#1F2937', background: '#FFFFFF' },
  { primary: '#10B981', secondary: '#059669', text: '#1F2937', background: '#F9FAFB' },
  { primary: '#F59E0B', secondary: '#D97706', text: '#1F2937', background: '#FFFBEB' },
  { primary: '#EF4444', secondary: '#DC2626', text: '#1F2937', background: '#FEF2F2' },
  { primary: '#8B5CF6', secondary: '#7C3AED', text: '#1F2937', background: '#FAF5FF' },
  { primary: '#1F2937', secondary: '#374151', text: '#FFFFFF', background: '#111827' },
];

export default function CardCustomizer({ cardData, onDataChange }: CardCustomizerProps) {
  const handleColorChange = (colorType: keyof CardData['colors'], color: string) => {
    onDataChange({
      colors: {
        ...cardData.colors,
        [colorType]: color,
      },
    });
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    onDataChange({ colors: preset });
  };

  const ColorPicker = ({ 
    color, 
    onChange, 
    label 
  }: { 
    color: string; 
    onChange: (color: string) => void; 
    label: string; 
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-10 px-3 justify-start"
          >
            <div
              className="w-6 h-6 rounded-md border mr-2"
              style={{ backgroundColor: color }}
            />
            {color}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={color} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div className="w-full max-w-md space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <User size={16} />
            Content
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette size={16} />
            Colors
          </TabsTrigger>
          <TabsTrigger value="style" className="flex items-center gap-2">
            <Type size={16} />
            Style
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={18} />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={cardData.name}
                  onChange={(e) => onDataChange({ name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={cardData.title}
                  onChange={(e) => onDataChange({ title: e.target.value })}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={cardData.company}
                  onChange={(e) => onDataChange({ company: e.target.value })}
                  placeholder="Tech Corp"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone size={18} />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={cardData.email}
                  onChange={(e) => onDataChange({ email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={cardData.phone}
                  onChange={(e) => onDataChange({ phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={cardData.website}
                  onChange={(e) => onDataChange({ website: e.target.value })}
                  placeholder="www.example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={cardData.address}
                  onChange={(e) => onDataChange({ address: e.target.value })}
                  placeholder="123 Main St, City, State 12345"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Color Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyColorPreset(preset)}
                    className="w-full h-12 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors flex"
                  >
                    <div className="flex-1" style={{ backgroundColor: preset.primary }} />
                    <div className="flex-1" style={{ backgroundColor: preset.secondary }} />
                    <div className="flex-1" style={{ backgroundColor: preset.background }} />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorPicker
                color={cardData.colors.primary}
                onChange={(color) => handleColorChange('primary', color)}
                label="Primary Color"
              />
              <ColorPicker
                color={cardData.colors.secondary}
                onChange={(color) => handleColorChange('secondary', color)}
                label="Secondary Color"
              />
              <ColorPicker
                color={cardData.colors.text}
                onChange={(color) => handleColorChange('text', color)}
                label="Text Color"
              />
              <ColorPicker
                color={cardData.colors.background}
                onChange={(color) => handleColorChange('background', color)}
                label="Background Color"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="font">Font Family</Label>
                <Select value={cardData.font} onValueChange={(value) => onDataChange({ font: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}