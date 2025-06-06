
import { useState } from 'react';
import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Home, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Settings,
  BarChart3,
  Plus,
  Eye
} from 'lucide-react';
import PropertyOperationsPanel from './PropertyOperationsPanel';
import PropertyAnalytics from './PropertyAnalytics';

const EnhancedPropertyOwnerDashboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [activeTab, setActiveTab] = useState('overview');

  const { data: properties = [], isLoading: propertiesLoading } = useQuery({
    queryKey: ['owner-properties', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }
      return data || [];
    },
    enabled: !!user,
  });

  const { data: dashboardStats } = useQuery({
    queryKey: ['dashboard-stats', user?.id, properties],
    queryFn: async () => {
      if (!user || properties.length === 0) return null;

      // Get total bookings and revenue for all user properties
      const propertyIds = properties.map(p => p.id);
      
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('total_price, status, created_at')
        .in('property_id', propertyIds);

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
      }

      const totalRevenue = bookings?.reduce((sum, booking) => {
        return booking.status === 'confirmed' ? sum + Number(booking.total_price || 0) : sum;
      }, 0) || 0;
      
      const totalBookings = bookings?.length || 0;
      const confirmedBookings = bookings?.filter(b => b.status === 'confirmed').length || 0;

      // Calculate occupancy rate (simplified)
      const occupancyRate = properties.length > 0 ? Math.round((confirmedBookings / properties.length) * 10) : 0;

      return {
        totalProperties: properties.length,
        totalBookings,
        totalRevenue,
        averageRating: 4.8,
        occupancyRate: Math.min(occupancyRate, 100)
      };
    },
    enabled: !!user && properties.length > 0,
  });

  // Set first property as default when properties load
  React.useEffect(() => {
    if (properties.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(properties[0].id);
    }
  }, [properties, selectedPropertyId]);

  const selectedProperty = properties.find(p => p.id === selectedPropertyId) || properties[0];

  const handlePropertyUpdate = () => {
    // Invalidate and refetch all related queries
    queryClient.invalidateQueries({ queryKey: ['owner-properties', user?.id] });
    queryClient.invalidateQueries({ queryKey: ['dashboard-stats', user?.id] });
    queryClient.invalidateQueries({ queryKey: ['property', selectedPropertyId] });
    queryClient.invalidateQueries({ queryKey: ['property-analytics', selectedPropertyId] });
  };

  if (propertiesLoading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
  }

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Yet</h3>
          <p className="text-gray-600 mb-6">Add your first property to start managing bookings and revenue.</p>
          <Button onClick={() => window.location.href = '/property-management'}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Property
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Property Management Dashboard</h2>
          <p className="text-gray-600">Manage your properties, bookings, and revenue</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select a property" />
            </SelectTrigger>
            <SelectContent>
              {properties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => window.location.href = '/property-management'}>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      {dashboardStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Properties</p>
                  <p className="text-2xl font-bold">{dashboardStats.totalProperties}</p>
                </div>
                <Home className="h-5 w-5 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">{dashboardStats.totalBookings}</p>
                </div>
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">€{dashboardStats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Rating</p>
                  <p className="text-2xl font-bold">{dashboardStats.averageRating}</p>
                </div>
                <TrendingUp className="h-5 w-5 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Occupancy</p>
                  <p className="text-2xl font-bold">{dashboardStats.occupancyRate}%</p>
                </div>
                <Users className="h-5 w-5 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Property Management Tabs */}
      {selectedProperty && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Overview - {selectedProperty.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <img 
                          src={selectedProperty.images?.[0] || '/placeholder.svg'} 
                          alt={selectedProperty.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-medium">{selectedProperty.city}, {selectedProperty.state}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Property Type</p>
                          <p className="font-medium">{selectedProperty.property_type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Price per Night</p>
                          <p className="font-medium text-green-600">€{selectedProperty.price}</p>
                        </div>
                        <div className="flex gap-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Listing
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Edit Property
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { guest: 'John Smith', dates: 'Mar 15-22', amount: 1295, status: 'confirmed' },
                        { guest: 'Sarah Johnson', dates: 'Mar 25-30', amount: 925, status: 'pending' },
                        { guest: 'Mike Davis', dates: 'Apr 2-9', amount: 1295, status: 'confirmed' }
                      ].map((booking, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{booking.guest}</p>
                            <p className="text-sm text-gray-600">{booking.dates}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">€{booking.amount}</p>
                            <p className="text-sm text-gray-600">{booking.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Month Revenue</span>
                      <span className="font-bold text-green-600">€2,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Upcoming Bookings</span>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Occupancy Rate</span>
                      <span className="font-bold">82%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Rating</span>
                      <span className="font-bold">4.8★</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Revenue up 15% this month</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Above market average pricing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">High guest satisfaction</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="mt-6">
            <PropertyOperationsPanel 
              property={selectedProperty}
              onPropertyUpdate={handlePropertyUpdate}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <PropertyAnalytics property={selectedProperty} />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Advanced property settings and configuration options will be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default EnhancedPropertyOwnerDashboard;
