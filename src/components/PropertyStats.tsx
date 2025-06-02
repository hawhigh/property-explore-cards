
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
      if (!user?.id) {
        console.log('No user ID available for stats query');
        return {
          activeProperties: 0,
          totalProperties: 0,
          totalBookings: 0,
          totalRevenue: 0,
          totalFavorites: 0,
          pendingBookings: 0,
          confirmedBookings: 0,
        };
      }

      console.log('Fetching property stats for user:', user.id);

      try {
        // Get property counts by status
        const { data: properties, error: propertiesError } = await supabase
          .from('properties')
          .select('id, status, price')
          .eq('owner_id', user.id);

        if (propertiesError) {
          console.error('Error fetching properties for stats:', propertiesError);
          throw propertiesError;
        }

        console.log('Properties found for stats:', properties?.length || 0);

        const propertyIds = properties?.map(p => p.id) || [];
        
        // Initialize default values
        let bookings: any[] = [];
        let favorites: any[] = [];

        // Get bookings and favorites only if we have properties
        if (propertyIds.length > 0) {
          // Get bookings
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select('id, total_price, status')
            .in('property_id', propertyIds);

          if (bookingsError) {
            console.warn('Error fetching bookings for stats:', bookingsError);
          } else {
            bookings = bookingsData || [];
          }

          // Get favorites
          const { data: favoritesData, error: favoritesError } = await supabase
            .from('favorites')
            .select('id')
            .in('property_id', propertyIds);

          if (favoritesError) {
            console.warn('Error fetching favorites for stats:', favoritesError);
          } else {
            favorites = favoritesData || [];
          }
        }

        const activeProperties = properties?.filter(p => p.status === 'active').length || 0;
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.total_price || 0), 0);
        const totalFavorites = favorites.length;
        const pendingBookings = bookings.filter(b => b.status === 'pending').length;
        const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

        const statsData = {
          activeProperties,
          totalProperties: properties?.length || 0,
          totalBookings,
          totalRevenue,
          totalFavorites,
          pendingBookings,
          confirmedBookings,
        };

        console.log('Calculated stats:', statsData);
        return statsData;
      } catch (error) {
        console.error('Stats calculation error:', error);
        throw error;
      }
    },
    enabled: !!user?.id,
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
                <div>
                  <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Show error state
  if (error) {
    console.error('PropertyStats error:', error);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Home className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-600 text-sm">Unable to load stats</p>
            <p className="text-red-500 text-xs mt-1">Please try refreshing</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show default stats if no data
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Home className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">No data available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.activeProperties}</p>
              <p className="text-sm text-gray-600">Active Properties</p>
              <p className="text-xs text-gray-500">of {stats.totalProperties} total</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-xs text-gray-500">{stats.pendingBookings} pending</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">€{stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-xs text-gray-500">{stats.confirmedBookings} confirmed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Heart className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalFavorites}</p>
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
