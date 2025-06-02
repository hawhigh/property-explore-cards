
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Calendar, Heart, Plus, Settings } from 'lucide-react';
import UserProfile from '@/components/UserProfile';
import MyBookings from '@/components/MyBookings';
import MyFavorites from '@/components/MyFavorites';
import MyProperties from '@/components/MyProperties';
import AdminPanel from '@/components/AdminPanel';
import Header from '@/components/Header';
import PropertyStats from '@/components/PropertyStats';
import QuickActions from '@/components/QuickActions';
import RecentActivity from '@/components/RecentActivity';
import PropertyOwnerDashboard from '@/components/property-management/PropertyOwnerDashboard';
import PropertyPerformanceChart from '@/components/property-management/PropertyPerformanceChart';
import PropertyListingManagement from '@/components/property-management/PropertyListingManagement';
import BookingManagement from '@/components/property-management/BookingManagement';

const Dashboard = () => {
  const { user, loading } = useAuth();

  // Check if user is admin
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (loading || profileLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property Management Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.email || 'User'}!</p>
              {isAdmin && (
                <p className="text-red-600 font-semibold mt-1">Administrator Access</p>
              )}
            </div>
          </div>

          <Tabs defaultValue="owner-dashboard" className="w-full">
            <TabsList className={`grid grid-cols-1 ${isAdmin ? 'md:grid-cols-7 lg:w-[700px]' : 'md:grid-cols-6 lg:w-[600px]'}`}>
              <TabsTrigger value="owner-dashboard">Owner Hub</TabsTrigger>
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="booking-mgmt">Bookings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
            </TabsList>

            <TabsContent value="owner-dashboard" className="mt-6">
              <div className="space-y-8">
                {/* Property Owner Dashboard */}
                <PropertyOwnerDashboard />
                
                {/* Performance Charts */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Performance Analytics</h3>
                  <PropertyPerformanceChart />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="listings" className="mt-6">
              <PropertyListingManagement />
            </TabsContent>

            <TabsContent value="booking-mgmt" className="mt-6">
              <BookingManagement />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="space-y-8">
                {/* Property Statistics */}
                <PropertyStats />

                {/* Performance Charts */}
                <PropertyPerformanceChart />

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <RecentActivity />
                  
                  {/* Property Performance Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-blue-900">Top Performing</p>
                            <p className="text-sm text-blue-700">Villa Lucilla</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-900">€1,850</p>
                            <p className="text-xs text-blue-600">This month</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 border rounded-lg">
                            <p className="text-2xl font-bold text-green-600">89%</p>
                            <p className="text-xs text-gray-600">Occupancy Rate</p>
                          </div>
                          <div className="text-center p-3 border rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">4.8</p>
                            <p className="text-xs text-gray-600">Avg Rating</p>
                          </div>
                        </div>

                        <Button 
                          onClick={() => window.location.href = '/property-management'}
                          className="w-full"
                          variant="outline"
                        >
                          <Home className="h-4 w-4 mr-2" />
                          Manage All Properties
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="properties" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>My Properties</CardTitle>
                    <Button onClick={() => window.location.href = '/property-management'}>
                      <Plus className="h-4 w-4 mr-2" />
                      Manage Properties
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <MyProperties />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="favorites">
              <MyFavorites />
            </TabsContent>

            {isAdmin && (
              <TabsContent value="admin">
                <AdminPanel />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
