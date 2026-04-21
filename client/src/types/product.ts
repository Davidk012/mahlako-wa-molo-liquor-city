export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  brand?: string;
  volume?: string;
  alcoholPercentage?: number;
  inStock: boolean;
  featured?: boolean;
  specialPrice?: number;
  specialUntil?: Date;
}

export type ProductCategory = 
  | 'whiskey'
  | 'wine'
  | 'beer'
  | 'spirits'
  | 'ciders'
  | 'specials';

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  name: string;
  contactNumber: string;
  collectionTime: 'ASAP' | 'Later Tonight' | 'Tomorrow';
  items: CartItem[];
  total: number;
  address: string;
}

export interface StoreHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}
