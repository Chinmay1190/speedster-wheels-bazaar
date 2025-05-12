
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  imageUrl: string;
  galleryImages?: string[];
  specs: {
    engine: string;
    power: string;
    torque: string;
    weight: string;
    fuelCapacity: string;
    topSpeed: string;
  };
  colors: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  items: { 
    productId: string; 
    name: string;
    price: number;
    quantity: number; 
  }[];
  status: OrderStatus;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
}

export interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
}

export type Theme = "light" | "dark";
