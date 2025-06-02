
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
          .limit(1);

        if (fetchError) throw fetchError;
        return properties && properties.length > 0 ? properties[0] : null;
      }

      // Try to fetch the specific property by ID
      const { data: specificProperty, error: specificError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (specificError) {
        // If property not found, try to get any property as fallback
        const { data: fallbackProperties, error: fallbackError } = await supabase
          .from('properties')
          .select('*')
          .limit(1);

        if (fallbackError) throw fallbackError;
        return fallbackProperties && fallbackProperties.length > 0 ? fallbackProperties[0] : null;
      }

      return specificProperty;
    },
  });

  return { property, isLoading, error };
};
