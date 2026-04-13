export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  prestations: string[];
  image: string;
  gallery: string[];
  order: number;
  status: 'active' | 'inactive';
}

export interface Realization {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  location: string;
  date: string;
  status: 'active' | 'inactive';
}

export interface Message {
  id: string;
  name: string;
  phone: string;
  service: string;
  message: string;
  createdAt: any;
}

export interface Category {
  id: string;
  name: string;
}

export interface Settings {
  whatsappNumber: string;
  whatsappText: string;
  whatsappPosition: 'left' | 'right';
  whatsappActive: boolean;
}
