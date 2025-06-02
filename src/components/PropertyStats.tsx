
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Calendar, Heart, DollarSign } from 'lucide-react';

const PropertyStats = () => {
  const { user } = useAuth();

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['property-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;

      console.log('Fetching property stats for user:', user.id);

      // Get property counts by status
      const { data: properties, error: propertiesError } = await supabase
        .from('properties')
        .select('id, status, price')
        .eq('owner_id', user.id);

      if (propertiesError) {
        console.error('Error fetching properties:', propertiesError);
        throw propertiesError;
      }

      console.log('Found properties:', properties?.length || 0);

      // Get bookings count - only if we have properties
      let bookings = [];
      if (properties && properties.length > 0) {
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('id, total_price, status')
          .in('property_id', properties.map(p => p.id));

        if (bookingsError) {
          console.error('Error fetching bookings:', bookingsError);
          // Don't throw here, just log the error
        } else {
          bookings = bookingsData || [];
        }
      }

      // Get favorites count - only if we have properties
      let favorites = [];
      if (properties && properties.length > 0) {
        const { data: favoritesData, error: favoritesError } = await supabase
          .from('favorites')
          .select('id')
          .in('property_id', properties.map(p => p.id));

        if (favoritesError) {
          console.error('Error fetching favorites:', favoritesError);
          // Don't throw here, just log the error
        } else {
          favorites = favoritesData || [];
        }
      }

      const activeProperties = properties?.filter(p => p.status === 'active').length || 0;
      const totalBookings = bookings?.length || 0;
      const totalRevenue = bookings?.reduce((sum, b) => sum + Number(b.total_price || 0), 0) || 0;
      const totalFavorites = favorites?.length || 0;

      const statsData = {
        activeProperties,
        totalProperties: properties?.length || 0,
        totalBookings,
        totalRevenue,
        totalFavorites,
        pendingBookings: bookings?.filter(b => b.status === 'pending').length || 0,
        confirmedBookings: bookings?.filter(b => b.status === 'confirmed').length || 0,
      };

      console.log('Calculated stats:', statsData);
      return statsData;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    console.error('PropertyStats error:', error);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-600 text-sm">Error loading stats</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 text-sm">No data available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Home className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{stats.activeProperties}</p>
              <p className="text-sm text-gray-600">Active Properties</p>
              <p className="text-xs text-gray-500">of {stats.totalProperties} total</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{stats.totalBookings}</p>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-xs text-gray-500">{stats.pendingBookings} pending</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            <div>
              <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-xs text-gray-500">{stats.confirmedBookings} confirmed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-2xl font-bold">{stats.totalFavorites}</p>
              <p className="text-sm text-gray-600">Total Favorites</p>
              <p className="text-xs text-gray-500">across all properties</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyStats;
