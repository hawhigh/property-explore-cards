
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePropertyData = (propertyId?: string) => {
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', propertyId || 'villa-lucilla'],
    queryFn: async () => {
      // First try to fetch any property from the database
      const { data: properties, error: fetchError } = await supabase
        .from('properties')
        .select('*')
        .limit(1);

      let propertyData = null;

      if (!fetchError && properties && properties.length > 0) {
        // Use the first property found
        propertyData = properties[0];
        console.log('Property fetched from database:', propertyData.title);
      } else {
        console.log('No properties found in database, using fallback data');
      }

      // Return fallback data if no property found or use the fetched property
      return propertyData || {
        id: 'villa-lucilla',
        title: 'Villa Lucilla - Anthorina Gardens Resort',
        description: 'Our 3 bedroom villa at Anthorina Gardens resort consists of 2 bedrooms each with a double bed, 1 bedroom with 2 single beds, accommodating up to 6 people (another two at inflatable double bed). A large kitchen/dinner/living room, 1 main bathroom with bath and shower, 1 en-suite shower room and a ground floor toilet. The Villa Lucilla is the right choice for visitors who are searching for a combination of charm and a convenient position from where to explore surroundings.',
        price: 1850,
        pricePerNight: 185,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 256,
        address: 'Konnou street 17, Anthorina Gardens Resort',
        city: 'Protaras',
        state: 'Famagusta District',
        country: 'Cyprus',
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
          'Private Swimming Pool',
          'Air Conditioning',
          'Walking Distance Beaches',
          'Free Parking',
          'Wi-Fi',
          'Barbecue Area',
          'Washing Machine',
          'Hair Dryer',
          'Towels & Slippers',
          'Kitchen/Dining/Living Room',
          'Terrace',
          'Heating'
        ],
        year_built: 2010,
        renovated: 2022,
        rating: 4.8,
        reviews: 89,
        maxGuests: 6,
        poolSize: 'Private Pool',
        groundsSize: 'Resort Grounds',
        bedType: '2x King size bed, 2x Single bed',
        size: '256m²'
      };
    },
  });

  return { property, isLoading, error };
};
