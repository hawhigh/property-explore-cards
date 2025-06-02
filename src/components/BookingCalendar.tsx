
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays } from 'date-fns';

interface BookingCalendarProps {
  propertyId: string;
  pricePerNight: number;
}

const BookingCalendar = ({ propertyId, pricePerNight }: BookingCalendarProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDates, setSelectedDates] = useState<{ from?: Date; to?: Date }>({});
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  const { data: availability = [] } = useQuery({
    queryKey: ['availability', propertyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_availability')
        .select('*')
        .eq('property_id', propertyId);

      if (error) throw error;
      return data;
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const { error } = await supabase
        .from('bookings')
        .insert(bookingData);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability', propertyId] });
      toast({
        title: "Booking Created",
        description: "Your booking request has been submitted successfully.",
      });
      setSelectedDates({});
      setSpecialRequests('');
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const calculateTotal = () => {
    if (!selectedDates.from || !selectedDates.to) return 0;
    const nights = differenceInDays(selectedDates.to, selectedDates.from);
    return nights * pricePerNight;
  };

  const handleBooking = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to make a booking.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDates.from || !selectedDates.to) {
      toast({
        title: "Select Dates",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      property_id: propertyId,
      user_id: user.id,
      start_date: selectedDates.from.toISOString().split('T')[0],
      end_date: selectedDates.to.toISOString().split('T')[0],
      total_price: calculateTotal(),
      guest_count: guestCount,
      special_requests: specialRequests,
    };

    createBookingMutation.mutate(bookingData);
  };

  const unavailableDates = availability
    .filter(a => !a.available)
    .map(a => new Date(a.date));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Stay</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Select Dates</Label>
          <Calendar
            mode="range"
            selected={selectedDates.from && selectedDates.to ? { from: selectedDates.from, to: selectedDates.to } : undefined}
            onSelect={(range) => setSelectedDates(range || {})}
            disabled={unavailableDates}
            className="rounded-md border"
          />
        </div>

        <div>
          <Label htmlFor="guests">Number of Guests</Label>
          <Input
            id="guests"
            type="number"
            min="1"
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value))}
          />
        </div>

        <div>
          <Label htmlFor="requests">Special Requests</Label>
          <Textarea
            id="requests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Any special requests or notes..."
          />
        </div>

        {selectedDates.from && selectedDates.to && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Total ({differenceInDays(selectedDates.to, selectedDates.from)} nights)</span>
              <span className="font-bold">${calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        )}

        <Button 
          onClick={handleBooking} 
          className="w-full"
          disabled={createBookingMutation.isPending || !selectedDates.from || !selectedDates.to}
        >
          {createBookingMutation.isPending ? 'Booking...' : 'Book Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
