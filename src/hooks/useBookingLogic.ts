
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface UseBookingLogicProps {
  propertyId: string;
  pricePerNight: number;
}

export const useBookingLogic = ({ propertyId, pricePerNight }: UseBookingLogicProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>();
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

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

  return {
    selectedDates,
    setSelectedDates,
    guestCount,
    setGuestCount,
    specialRequests,
    setSpecialRequests,
    createBookingMutation,
    calculateNights,
    calculateTotal,
    handleBooking,
  };
};
