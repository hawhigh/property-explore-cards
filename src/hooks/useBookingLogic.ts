
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface UseBookingLogicProps {
  propertyId: string;
  pricePerNight: number;
}

export const useBookingLogic = ({ propertyId, pricePerNight }: UseBookingLogicProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>();
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      console.log('Creating guest booking with data:', bookingData);
      
      // Check if property ID is a valid UUID, if not, get the actual property ID from database
      const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(propertyId);
      let actualPropertyId = propertyId;

      if (!isValidUUID) {
        // Try to get the first available property from the database
        const { data: properties, error: propError } = await supabase
          .from('properties')
          .select('id')
          .limit(1);

        if (!propError && properties && properties.length > 0) {
          actualPropertyId = properties[0].id;
          console.log('Using database property ID:', actualPropertyId);
        } else {
          throw new Error('No valid property found in database. Please contact support.');
        }
      }

      const { error } = await supabase
        .from('bookings')
        .insert({
          ...bookingData,
          property_id: actualPropertyId,
          user_id: null, // No user ID for guest bookings
        });

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
      // Reset form
      setSelectedDates(undefined);
      setSpecialRequests('');
      setGuestName('');
      setGuestEmail('');
      setGuestPhone('');
    },
    onError: (error) => {
      console.log('Booking mutation error:', error);
      toast({
        title: "Booking Failed",
        description: "Failed to create booking. Please try again or contact support.",
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
    console.log('Guest booking attempt - Dates:', selectedDates, 'Guest:', guestName, guestEmail);
    
    if (!selectedDates?.from || !selectedDates?.to) {
      toast({
        title: "Select Dates",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
      toast({
        title: "Guest Details Required",
        description: "Please fill in all guest details (name, email, and phone).",
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
      start_date: selectedDates.from.toISOString().split('T')[0],
      end_date: selectedDates.to.toISOString().split('T')[0],
      total_price: calculateTotal(),
      guest_count: guestCount,
      special_requests: specialRequests,
      guest_name: guestName,
      guest_email: guestEmail,
      guest_phone: guestPhone,
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
    guestName,
    setGuestName,
    guestEmail,
    setGuestEmail,
    guestPhone,
    setGuestPhone,
    createBookingMutation,
    calculateNights,
    calculateTotal,
    handleBooking,
  };
};
