
import { useState, useEffect } from 'react';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Home, Calendar, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from './ProtectedRoute';

const SecureAdminPanel = () => {
  const { isAdmin, user } = useSecureAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalBookings: 0,
    pendingBookings: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    if (!isAdmin || !user) return;

    const fetchAdminStats = async () => {
      try {
        // Fetch user count
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id', { count: 'exact' });

        if (profilesError) throw profilesError;

        // Fetch properties count
        const { data: properties, error: propertiesError } = await supabase
          .from('properties')
          .select('id', { count: 'exact' });

        if (propertiesError) throw propertiesError;

        // Fetch bookings count
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('id, status', { count: 'exact' });

        if (bookingsError) throw bookingsError;

        setStats({
          totalUsers: profiles?.length || 0,
          totalProperties: properties?.length || 0,
          totalBookings: bookings?.length || 0,
          pendingBookings: bookings?.filter(b => b.status === 'pending').length || 0
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        toast({
          title: "Error",
          description: "Failed to load admin statistics",
          variant: "destructive",
        });
      }
    };

    fetchAdminStats();
  }, [isAdmin, user, toast]);

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <Badge variant="destructive">Restricted Access</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalProperties}</p>
                  <p className="text-sm text-gray-600">Total Properties</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.pendingBookings}</p>
                  <p className="text-sm text-gray-600">Pending Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Security Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">
                <strong>Admin Access:</strong> You have administrative privileges. 
                All actions are logged and monitored. Use these permissions responsibly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default SecureAdminPanel;
