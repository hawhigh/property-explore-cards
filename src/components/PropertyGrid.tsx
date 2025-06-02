
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PropertyCard from './PropertyCard';
import { useAuth } from '@/hooks/useAuth';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

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
  
  // Villa Lucilla data
  const villaLucilla = {
    id: 'villa-lucilla',
    title: 'Villa Lucilla - Anthorina Gardens Resort',
    price: 1850,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 256,
    address: 'Konnou street 17, Anthorina Gardens Resort',
    city: 'Protaras',
    state: 'Famagusta District',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    property_type: 'Resort Villa',
    amenities: [
      'Private Swimming Pool',
      'Air Conditioning',
      'Walking Distance Beaches',
      'Free Parking',
      'Wi-Fi',
      'Barbecue Area'
    ],
    is_favorited: false
  };
  
  const { data: dbProperties = [], isLoading, refetch } = useQuery({
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

  // Combine Villa Lucilla with database properties
  const allProperties = [villaLucilla, ...dbProperties];

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
      {allProperties.map((property) => (
        <div key={property.id} className="relative">
          <Link to={property.id === 'villa-lucilla' ? '/single' : `/property-view/${property.id}`}>
            <PropertyCard 
              property={{
                ...property,
                propertyType: property.property_type
              }} 
            />
          </Link>
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
