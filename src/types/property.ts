
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  property_type: string;
  year_built: number;
  amenities: string[];
  images: string[];
  status: 'active' | 'pending' | 'sold' | 'rented';
}

export interface PropertyFormData {
  title: string;
  description: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  property_type: string;
  year_built: string;
  amenities: string;
  images: string;
  status: 'active' | 'pending' | 'sold' | 'rented';
}
