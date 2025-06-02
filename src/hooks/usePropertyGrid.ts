
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Property {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  address: string;
  city: string;
  state: string;
  images: string[];
  property_type: string;
  amenities: string[];
  is_favorited?: boolean;
}

interface UsePropertyGridProps {
  filters?: any;
}

export const usePropertyGrid = ({ filters }: UsePropertyGridProps) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async (): Promise<Property[]> => {
      console.log('PropertyGrid: Fetching properties with filters:', filters);
      
      let query = supabase
        .from('properties')
        .select('*')
        .eq('status', 'active');

      if (filters?.priceRange) {
        query = query
          .gte('price', filters.priceRange[0])
          .lte('price', filters.priceRange[1]);
      }

      if (filters?.bedrooms) {
        query = query.gte('bedrooms', filters.bedrooms);
      }

      if (filters?.bathrooms) {
        query = query.gte('bathrooms', filters.bathrooms);
      }

      if (filters?.propertyType && filters.propertyType !== 'all') {
        query = query.eq('property_type', filters.propertyType);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('PropertyGrid: Error fetching properties:', error);
        throw error;
      }

      console.log('PropertyGrid: Properties fetched:', data?.length || 0, data);

      // Get user favorites if logged in
      if (user) {
        const { data: favorites } = await supabase
          .from('favorites')
          .select('property_id')
          .eq('user_id', user.id);

        const favoriteIds = favorites?.map(f => f.property_id) || [];
        
        return data.map(property => ({
          ...property,
          is_favorited: favoriteIds.includes(property.id)
        }));
      }

      return data.map(property => ({ ...property, is_favorited: false }));
    },
  });
};
