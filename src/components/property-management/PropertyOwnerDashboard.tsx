
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Users, 
  Star,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const PropertyOwnerDashboard = () => {
  const { user } = useAuth();

  const { data: ownerStats, isLoading } = useQuery({
    queryKey: ['owner-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;

      // Get properties count and total revenue
      const { data: properties } = await supabase
        .from('properties')
        .select('id, price, status')
        .eq('owner_id', user.id);

      // Get bookings for revenue calculation
      const { data: bookings } = await supabase
        .from('bookings')
        .select('total_price, status, property_id')
        .in('property_id', properties?.map(p => p.id) || []);

      const totalRevenue = bookings
        ?.filter(b => b.status === 'confirmed')
        ?.reduce((sum, b) => sum + Number(b.total_price), 0) || 0;

      const occupancyRate = Math.round(
        (bookings?.filter(b => b.status === 'confirmed').length || 0) / 
        Math.max(properties?.length || 1, 1) * 100
      );

      return {
        totalProperties: properties?.length || 0,
        activeProperties: properties?.filter(p => p.status === 'active').length || 0,
        totalRevenue,
        occupancyRate,
        totalBookings: bookings?.length || 0,
        confirmedBookings: bookings?.filter(b => b.status === 'confirmed').length || 0
      };
    },
    enabled: !!user,
  });

  if (isLoading) {
    return <div className="animate-pulse">Loading dashboard...</div>;
  }

  const stats = ownerStats || {
    totalProperties: 0,
    activeProperties: 0,
    totalRevenue: 0,
    occupancyRate: 0,
    totalBookings: 0,
    confirmedBookings: 0
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Property Owner Dashboard</h2>
        <p className="opacity-90">Manage your properties, track performance, and grow your rental business</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Home className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant={stats.activeProperties > 0 ? 'default' : 'secondary'} className="text-xs">
                {stats.activeProperties} active
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.confirmedBookings} confirmed bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              Average across all properties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.confirmedBookings} confirmed, {stats.totalBookings - stats.confirmedBookings} pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Property Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => window.location.href = '/property-management'}
              className="w-full"
            >
              Manage All Properties
            </Button>
            <div className="text-sm text-gray-600">
              Add, edit, or remove property listings
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline"
              onClick={() => {
                window.location.href = '/dashboard';
                setTimeout(() => {
                  const bookingsTab = document.querySelector('[data-state="inactive"][value="bookings"]') as HTMLElement;
                  bookingsTab?.click();
                }, 100);
              }}
              className="w-full"
            >
              View All Bookings
            </Button>
            <div className="text-sm text-gray-600">
              Manage reservations and availability
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Analytics & Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              View Analytics
            </Button>
            <div className="text-sm text-gray-600">
              Track performance and earnings
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Eye className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Villa Lucilla viewed</p>
                <p className="text-xs text-gray-600">Property viewed by potential guest</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Calendar className="h-4 w-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">New booking received</p>
                <p className="text-xs text-gray-600">Booking request for next month</p>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Star className="h-4 w-4 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">New review posted</p>
                <p className="text-xs text-gray-600">5-star review for Villa Lucilla</p>
              </div>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyOwnerDashboard;
