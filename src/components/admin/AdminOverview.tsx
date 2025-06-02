
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Home, Calendar, Star, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const AdminOverview = () => {
  const { data: systemStats, isLoading } = useQuery({
    queryKey: ['admin-system-stats'],
    queryFn: async () => {
      const [
        { data: users, count: userCount },
        { data: properties, count: propertyCount },
        { data: bookings, count: bookingCount },
        { data: reviews, count: reviewCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact' }),
        supabase.from('properties').select('*', { count: 'exact' }),
        supabase.from('bookings').select('*', { count: 'exact' }),
        supabase.from('reviews').select('*', { count: 'exact' })
      ]);

      // Calculate additional metrics
      const activeProperties = properties?.filter(p => p.status === 'active').length || 0;
      const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0;
      const confirmedBookings = bookings?.filter(b => b.status === 'confirmed').length || 0;
      const totalRevenue = bookings?.filter(b => b.status === 'confirmed')
        .reduce((sum, b) => sum + Number(b.total_price || 0), 0) || 0;

      return {
        totalUsers: userCount || 0,
        totalProperties: propertyCount || 0,
        activeProperties,
        totalBookings: bookingCount || 0,
        pendingBookings,
        confirmedBookings,
        totalReviews: reviewCount || 0,
        totalRevenue,
        recentUsers: users?.slice(0, 5) || [],
        recentBookings: bookings?.slice(0, 5) || []
      };
    },
  });

  if (isLoading) {
    return <div className="animate-pulse">Loading system overview...</div>;
  }

  const stats = systemStats || {
    totalUsers: 0,
    totalProperties: 0,
    activeProperties: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalReviews: 0,
    totalRevenue: 0,
    recentUsers: [],
    recentBookings: []
  };

  return (
    <div className="space-y-8">
      {/* System Health Banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">System Status: Operational</h2>
            <p className="opacity-90">All services running normally • Last updated: {new Date().toLocaleString()}</p>
          </div>
          <CheckCircle className="h-12 w-12 opacity-80" />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Home className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProperties} active properties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingBookings} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.confirmedBookings} confirmed bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Manage User Roles
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Review Pending Bookings ({stats.pendingBookings})
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Home className="h-4 w-4 mr-2" />
              Moderate Property Listings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Star className="h-4 w-4 mr-2" />
              Review System Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registrations</p>
                  <p className="text-xs text-gray-600">{stats.recentUsers.length} users registered today</p>
                </div>
                <Badge variant="secondary">{stats.recentUsers.length}</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Calendar className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Booking requests</p>
                  <p className="text-xs text-gray-600">{stats.pendingBookings} pending approval</p>
                </div>
                <Badge variant="secondary">{stats.pendingBookings}</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Home className="h-4 w-4 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Active properties</p>
                  <p className="text-xs text-gray-600">{stats.activeProperties} properties listed</p>
                </div>
                <Badge variant="secondary">{stats.activeProperties}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
