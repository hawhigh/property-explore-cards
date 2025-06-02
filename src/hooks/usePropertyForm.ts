
import { useState, useEffect } from 'react';
import { Property, PropertyFormData } from '@/types/property';

export const usePropertyForm = (property?: Property) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    property_type: '',
    year_built: '',
    amenities: '',
    images: '',
    status: 'active' as 'active' | 'pending' | 'sold' | 'rented',
  });

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        description: property.description || '',
        price: property.price?.toString() || '',
        bedrooms: property.bedrooms?.toString() || '',
        bathrooms: property.bathrooms?.toString() || '',
        sqft: property.sqft?.toString() || '',
        address: property.address || '',
        city: property.city || '',
        state: property.state || '',
        zip_code: property.zip_code || '',
        property_type: property.property_type || '',
        year_built: property.year_built?.toString() || '',
        amenities: property.amenities?.join(', ') || '',
        images: property.images?.join(', ') || '',
        status: property.status || 'active',
      });
    }
  }, [property]);

  return { formData, setFormData };
};
