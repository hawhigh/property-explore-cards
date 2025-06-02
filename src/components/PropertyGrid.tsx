
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PropertyCard from './PropertyCard';
import { useAuth } from '@/hooks/useAuth';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

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

interface PropertyGridProps {
  filters?: any;
}

const PropertyGrid = ({ filters }: PropertyGridProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
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
      
      if (error) throw error;

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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="relative">
          <PropertyCard 
            property={{
              ...property,
              propertyType: property.property_type
            }} 
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 ${property.is_favorited ? 'text-red-500' : 'text-gray-400'}`}
            onClick={() => toggleFavorite(property.id, property.is_favorited || false)}
          >
            <Heart className={`h-5 w-5 ${property.is_favorited ? 'fill-current' : ''}`} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;
