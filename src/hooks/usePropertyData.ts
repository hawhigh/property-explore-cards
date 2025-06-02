
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePropertyData = (propertyId?: string) => {
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', propertyId || '1'],
    queryFn: async () => {
      if (propertyId) {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', propertyId)
          .single();

        if (error) {
          console.log('Error fetching property:', error);
          throw error;
        }
        return data;
      }

      // Return default Villa Lucilla data if no propertyId
      return {
        id: '1',
        title: 'Villa Lucilla - Anthorina Gardens Resort',
        description: 'Our beautiful 3 bedroom villa at Anthorina Gardens resort offers the perfect Mediterranean getaway. With 2 bedrooms featuring comfortable double beds and 1 bedroom with 2 single beds, the villa comfortably accommodates up to 6 guests. Located in a peaceful resort setting, Villa Lucilla provides modern amenities and authentic charm for an unforgettable vacation experience.',
        price: 1850000,
        pricePerNight: 650,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2800,
        address: 'Anthorina Gardens Resort',
        city: 'Mediterranean Coast',
        state: 'Coastal Region',
        country: 'Greece',
        images: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop'
        ],
        property_type: 'Resort Villa',
        amenities: [
          'Resort Pool Access',
          'Air Conditioning',
          'WiFi Throughout',
          'Private Terrace',
          'Fully Equipped Kitchen',
          'Resort Facilities',
          'Garden Views',
          'Private Parking',
          'Beach Access',
          'Cleaning Service',
          'Resort Security',
          'Outdoor Furniture'
        ],
        year_built: 2010,
        renovated: 2022,
        rating: 4.8,
        reviews: 89,
        maxGuests: 6,
        poolSize: 'Resort Pool',
        groundsSize: 'Resort Grounds'
      };
    },
  });

  return { property, isLoading, error };
};
