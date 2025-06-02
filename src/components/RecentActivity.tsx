
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Home, Heart, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const RecentActivity = () => {
  const { user } = useAuth();

  const { data: activities, isLoading } = useQuery({
    queryKey: ['recent-activity', user?.id],
    queryFn: async () => {
      if (!user) return [];

      // Get user's properties for filtering
      const { data: properties } = await supabase
        .from('properties')
        .select('id')
        .eq('owner_id', user.id);

      const propertyIds = properties?.map(p => p.id) || [];

      // Get recent bookings
      const { data: bookings } = await supabase
        .from('bookings')
        .select(`
          id,
          created_at,
          status,
          guest_name,
          total_price,
          properties (title)
        `)
        .in('property_id', propertyIds)
        .order('created_at', { ascending: false })
        .limit(5);

      // Get recent favorites on user's properties
      const { data: favorites } = await supabase
        .from('favorites')
        .select(`
          id,
          created_at,
          properties (title)
        `)
        .in('property_id', propertyIds)
        .order('created_at', { ascending: false })
        .limit(3);

      const activities = [
        ...(bookings || []).map(booking => ({
          id: booking.id,
          type: 'booking' as const,
          title: `New booking for ${booking.properties?.title}`,
          description: `${booking.guest_name} booked for $${booking.total_price}`,
          timestamp: booking.created_at,
          status: booking.status,
        })),
        ...(favorites || []).map(favorite => ({
          id: favorite.id,
          type: 'favorite' as const,
          title: `Property favorited`,
          description: `Someone favorited ${favorite.properties?.title}`,
          timestamp: favorite.created_at,
          status: 'active',
        })),
      ];

      return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 animate-pulse rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking': return Calendar;
      case 'favorite': return Heart;
      case 'property': return Home;
      default: return User;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities && activities.length > 0 ? (
          <div className="space-y-4">
            {activities.slice(0, 5).map((activity) => {
              const IconComponent = getIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <IconComponent className="h-5 w-5 mt-0.5 text-gray-600" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No recent activity</p>
            <p className="text-sm text-gray-400">Activity will appear here as guests interact with your properties</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
