
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePropertyData = (propertyId?: string) => {
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      if (!propertyId) {
        // If no propertyId is provided, get the first property from the database
        const { data: properties, error: fetchError } = await supabase
          .from('properties')
          .select('*')
          .eq('status', 'active')
          .limit(1);

        if (fetchError) {
          console.error('Error fetching properties:', fetchError);
          throw fetchError;
        }
        return properties && properties.length > 0 ? properties[0] : null;
      }

      // Validate that propertyId is a valid UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(propertyId)) {
        console.log('Invalid property ID format, fetching first available property');
        const { data: fallbackProperties, error: fallbackError } = await supabase
          .from('properties')
          .select('*')
          .eq('status', 'active')
          .limit(1);

        if (fallbackError) {
          console.error('Error fetching fallback properties:', fallbackError);
          throw fallbackError;
        }
        return fallbackProperties && fallbackProperties.length > 0 ? fallbackProperties[0] : null;
      }

      // Try to fetch the specific property by ID
      const { data: specificProperty, error: specificError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (specificError) {
        console.error('Error fetching specific property:', specificError);
        // If property not found, try to get any property as fallback
        const { data: fallbackProperties, error: fallbackError } = await supabase
          .from('properties')
          .select('*')
          .eq('status', 'active')
          .limit(1);

        if (fallbackError) {
          console.error('Error fetching fallback properties:', fallbackError);
          throw fallbackError;
        }
        return fallbackProperties && fallbackProperties.length > 0 ? fallbackProperties[0] : null;
      }

      return specificProperty;
    },
  });

  return { property, isLoading, error };
};
