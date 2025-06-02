
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
  
  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
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

  // Add a function to create sample data if no properties exist
  const createSampleProperty = async () => {
    console.log('Creating sample property...');
    
    const sampleProperty = {
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
      status: 'active',
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  // Show empty state with option to create sample data
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
          <p className="text-gray-600 mb-6">
            There are currently no active properties in the system.
          </p>
          {user && (
            <div className="space-y-3">
              <Button 
                onClick={createSampleProperty}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Sample Villa Property
              </Button>
              <p className="text-sm text-gray-500">
                This will create a sample Villa Lucilla property for testing
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="relative">
          <Link to={`/property-view/${property.id}`}>
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
