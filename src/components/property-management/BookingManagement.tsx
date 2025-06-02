
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, User, Phone, Mail, DollarSign, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

const BookingManagement = () => {
  const { user } = useAuth();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['owner-bookings', user?.id],
    queryFn: async () => {
      if (!user) return [];

      // First get user's properties
      const { data: properties } = await supabase
        .from('properties')
        .select('id')
        .eq('owner_id', user.id);

      if (!properties || properties.length === 0) return [];

      // Then get bookings for those properties
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select(`
          *,
          properties (
            title,
            city,
            state,
            address
          )
        `)
        .in('property_id', properties.map(p => p.id))
        .order('created_at', { ascending: false });

      if (error) throw error;
      return bookings;
    },
    enabled: !!user,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading bookings...</div>;
  }

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{booking.properties?.title}</CardTitle>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{booking.properties?.city}, {booking.properties?.state}</span>
            </div>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Guest Information */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Guest Information</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span>{booking.guest_name}</span>
              </div>
              {booking.guest_email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{booking.guest_email}</span>
                </div>
              )}
              {booking.guest_phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{booking.guest_phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Check-in:</span>
              <p className="font-medium">{format(new Date(booking.start_date), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <span className="text-gray-600">Check-out:</span>
              <p className="font-medium">{format(new Date(booking.end_date), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <span className="text-gray-600">Guests:</span>
              <p className="font-medium">{booking.guest_count}</p>
            </div>
            <div>
              <span className="text-gray-600">Total:</span>
              <p className="font-medium text-green-600">€{Number(booking.total_price).toLocaleString()}</p>
            </div>
          </div>

          {booking.special_requests && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Special Requests:</span>
              <p className="text-sm text-gray-600 mt-1">{booking.special_requests}</p>
            </div>
          )}

          {/* Actions */}
          {booking.status === 'pending' && (
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                Confirm Booking
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Decline
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
        <p className="text-gray-600">Manage reservations for your properties</p>
      </div>

      {/* Booking Tabs by Status */}
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed ({statusCounts.confirmed})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({statusCounts.completed})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({statusCounts.cancelled})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.filter(b => b.status === 'pending').map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="confirmed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.filter(b => b.status === 'confirmed').map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.filter(b => b.status === 'completed').map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.filter(b => b.status === 'cancelled').map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {bookings.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
            <p className="text-gray-600">Bookings for your properties will appear here</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingManagement;
