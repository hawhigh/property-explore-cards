import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserProfile from '@/components/UserProfile';
import MyBookings from '@/components/MyBookings';
import MyFavorites from '@/components/MyFavorites';
import MyProperties from '@/components/MyProperties';
import AdminPanel from '@/components/AdminPanel';
import Header from '@/components/Header';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import CardHeader from '@/components/CardHeader';
import CardTitle from '@/components/CardTitle';
import Button from '@/components/Button';
import Home from '@/components/icons/Home';
import Calendar from '@/components/icons/Calendar';
import Heart from '@/components/icons/Heart';
import Plus from '@/components/icons/Plus';

const Dashboard = () => {
  const { user, loading, profile } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {profile?.full_name || 'User'}!</p>
            </div>
            <UserProfile />
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-5 lg:w-[500px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              {profile?.role === 'admin' && (
                <TabsTrigger value="admin">Admin</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Home className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">3</p>
                        <p className="text-sm text-gray-600">Active Properties</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-gray-600">Total Bookings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="text-2xl font-bold">8</p>
                        <p className="text-sm text-gray-600">Saved Favorites</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button 
                        onClick={() => window.location.href = '/property-management'}
                        className="h-20 flex flex-col items-center justify-center"
                      >
                        <Home className="h-6 w-6 mb-2" />
                        Manage Properties
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center"
                      >
                        <Calendar className="h-6 w-6 mb-2" />
                        View Bookings
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center"
                      >
                        <Heart className="h-6 w-6 mb-2" />
                        My Favorites
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
            
            <TabsContent value="bookings">
              <MyBookings />
            </TabsContent>
            
            <TabsContent value="favorites">
              <MyFavorites />
            </TabsContent>
            
            <TabsContent value="admin">
              <AdminPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
