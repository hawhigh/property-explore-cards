
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

export const usePropertyActions = (refetch: () => void) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const createSampleProperty = async () => {
    console.log('Creating sample property...');
    
    const sampleProperty: Database['public']['Tables']['properties']['Insert'] = {
      title: 'Villa Lucilla - Luxury Cyprus Getaway',
      description: 'Beautiful 3-bedroom villa with private pool in Protaras, Cyprus',
      price: 185,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1500,
      address: 'Anthorina Gardens Resort',
      city: 'Protaras',
      state: 'Famagusta',
      zip_code: '5296',
      property_type: 'villa',
      status: 'active' as Database['public']['Enums']['property_status'],
      owner_id: user?.id,
      amenities: ['Private Pool', 'WiFi', 'Air Conditioning', 'Kitchen', 'Parking', 'Garden'],
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'
      ],
      featured: true
    };

    try {
      const { data, error } = await supabase
        .from('properties')
        .insert(sampleProperty)
        .select()
        .single();

      if (error) {
        console.error('Error creating sample property:', error);
        toast({
          title: "Error",
          description: "Failed to create sample property",
          variant: "destructive",
        });
      } else {
        console.log('Sample property created:', data);
        toast({
          title: "Success",
          description: "Sample property created successfully",
        });
        refetch();
      }
    } catch (error) {
      console.error('Error creating sample property:', error);
    }
  };

  const toggleFavorite = async (propertyId: string, isFavorited: boolean) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save favorites",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isFavorited) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', propertyId);
      } else {
        await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            property_id: propertyId
          });
      }
      
      refetch();
      toast({
        title: isFavorited ? "Removed from favorites" : "Added to favorites",
        description: isFavorited ? "Property removed from your favorites" : "Property saved to your favorites",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    }
  };

  return {
    createSampleProperty,
    toggleFavorite
  };
};
