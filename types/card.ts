export interface CardData {
  _id?: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  template: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  font: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId : string; 
}

export interface CardTemplate {
  id: string;
  name: string;
  category: string;
  preview: string;
  component: React.ComponentType<{ data: CardData }>;
}
