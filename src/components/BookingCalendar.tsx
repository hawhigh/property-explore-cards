
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
import { Calendar as CalendarIcon, Users, Wifi, Phone, Mail } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface BookingCalendarProps {
  propertyId: string;
  pricePerNight: number;
}

const BookingCalendar = ({ propertyId, pricePerNight }: BookingCalendarProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>();
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  const { data: availability = [] } = useQuery({
    queryKey: ['availability', propertyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_availability')
        .select('*')
        .eq('property_id', propertyId);

      if (error) {
        console.log('Error fetching availability:', error);
        return [];
      }
      return data;
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      console.log('Creating booking with data:', bookingData);
      const { error } = await supabase
        .from('bookings')
        .insert(bookingData);

      if (error) {
        console.log('Booking error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability', propertyId] });
      toast({
        title: "Booking Request Submitted",
        description: "Your booking request has been submitted. We'll contact you soon to confirm.",
      });
      setSelectedDates(undefined);
      setSpecialRequests('');
    },
    onError: (error) => {
      console.log('Booking mutation error:', error);
      toast({
        title: "Booking Failed",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const calculateNights = () => {
    if (!selectedDates?.from || !selectedDates?.to) return 0;
    return Math.max(1, differenceInDays(selectedDates.to, selectedDates.from));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const subtotal = nights * pricePerNight;
    const cleaningFee = 50;
    const serviceFee = 25;
    return subtotal + cleaningFee + serviceFee;
  };

  const handleBooking = () => {
    console.log('Booking attempt - User:', user, 'Dates:', selectedDates);
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to make a booking.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDates?.from || !selectedDates?.to) {
      toast({
        title: "Select Dates",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    const nights = calculateNights();
    if (nights < 2) {
      toast({
        title: "Minimum Stay Required",
        description: "Villa Lucilla requires a minimum 2-night stay.",
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

  const nights = calculateNights();

  return (
    <Card className="sticky top-4 shadow-lg">
      <CardHeader>
        <CardTitle>Book Your Stay at Villa Lucilla</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            €{pricePerNight}/night
          </div>
          <div className="text-sm text-gray-600">
            Minimum 2-night stay • Up to 6 guests
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Select Dates</Label>
          <Calendar
            mode="range"
            selected={selectedDates}
            onSelect={setSelectedDates}
            disabled={unavailableDates}
            className="rounded-md border w-full"
            numberOfMonths={1}
          />
        </div>

        <div>
          <Label htmlFor="guests" className="text-sm font-medium mb-2 block">Number of Guests</Label>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <Input
              id="guests"
              type="number"
              min="1"
              max="6"
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-gray-500">max 6</span>
          </div>
        </div>

        <div>
          <Label htmlFor="requests" className="text-sm font-medium mb-2 block">Special Requests</Label>
          <Textarea
            id="requests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="Airport transfer, early check-in, special arrangements..."
            className="resize-none"
            rows={3}
          />
        </div>

        {selectedDates?.from && selectedDates?.to && nights > 0 && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>€{pricePerNight} × {nights} nights</span>
              <span>€{pricePerNight * nights}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cleaning fee</span>
              <span>€50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service fee</span>
              <span>€25</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Total</span>
              <span>€{calculateTotal()}</span>
            </div>
          </div>
        )}

        <Button 
          onClick={handleBooking} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          size="lg"
          disabled={createBookingMutation.isPending || !selectedDates?.from || !selectedDates?.to}
        >
          <CalendarIcon className="h-4 w-4 mr-2" />
          {createBookingMutation.isPending ? 'Submitting...' : 'Book Villa Lucilla'}
        </Button>

        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            Direct booking confirmation
          </p>
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Phone className="h-3 w-3" />
              <span>+357 96 555 154</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Mail className="h-3 w-3" />
              <span>booking@villalucilla.eu</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            <Wifi className="h-3 w-3 inline mr-1" />
            Free WiFi • Private Pool • Beach Access
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
