
export const usePropertyData = () => {
  // Villa Lucilla inspired property data
  const property = {
    id: '1',
    title: 'Villa Lucilla - Luxury Mediterranean Retreat',
    description: 'Escape to this magnificent Mediterranean villa nestled in the heart of Tuscany. Villa Lucilla offers breathtaking panoramic views of rolling hills and vineyards, featuring authentic Italian architecture with modern luxury amenities. The villa boasts spacious terraces, a stunning infinity pool, and beautifully landscaped gardens with olive trees and lavender. Perfect for families and groups seeking an authentic Italian experience with world-class comfort and privacy.',
    price: 2850000,
    pricePerNight: 850,
    bedrooms: 6,
    bathrooms: 5,
    sqft: 4500,
    address: 'Via delle Colline 47',
    city: 'Montalcino',
    state: 'Tuscany',
    country: 'Italy',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', // Luxury villa exterior
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', // Modern luxury interior
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop', // Pool area
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', // Villa bedroom
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', // Kitchen/dining
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop'  // Garden view
    ],
    propertyType: 'Luxury Villa',
    amenities: [
      'Private Infinity Pool',
      'Panoramic Terrace',
      'Wine Cellar',
      'Olive Grove',
      'Professional Kitchen',
      'Air Conditioning',
      'WiFi Throughout',
      'Private Parking',
      'Fireplace',
      'Garden & Grounds',
      'Pool House',
      'Outdoor Dining'
    ],
    yearBuilt: 1850,
    renovated: 2020,
    rating: 4.9,
    reviews: 127,
    maxGuests: 12,
    poolSize: '15m x 7m',
    groundsSize: '2.5 hectares'
  };

  return { property };
};
