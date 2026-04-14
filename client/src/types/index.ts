export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: 'client' | 'admin' | 'staff';
  company?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  category: 'tent' | 'chairs' | 'lowering-device' | 'artificial-grass' | 'drapes' | 'sound-system' | 'cctv' | 'other';
  basePrice: number;
  unit: 'item' | 'per-100' | 'per-sqm' | 'per-hour';
  image?: string;
  available: boolean;
  totalQuantity: number;
  currentlyRented: number;
  createdAt: string;
  updatedAt: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  items: {
    equipmentId: string;
    quantity: number;
  }[];
  image?: string;
  popular?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  clientId: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'setup' | 'collected' | 'cancelled' | 'completed';
  funeralDate: string;
  funeralTime: string;
  cemetery: {
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  items: {
    equipmentId: string;
    quantity: number;
    price: number;
  }[];
  packages?: {
    packageId: string;
    quantity: number;
    price: number;
  }[];
  deliveryFee: number;
  totalAmount: number;
  depositPaid?: number;
  balancePaid?: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
  assignedStaff?: {
    driver?: string;
    setupCrew?: string[];
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quote {
  id: string;
  clientId: string;
  items: Booking['items'];
  packages?: Booking['packages'];
  deliveryFee: number;
  totalAmount: number;
  expiresAt: string;
  createdAt: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
    radius: number; // in km
  };
  baseFee: number;
  perKmFee: number;
  active: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}
