
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
      
      // Check if we have a valid property ID
      const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(propertyId);
      let actualPropertyId = propertyId;
      
      if (!isValidUUID) {
        // Create or get a demo property for Villa Lucilla
        console.log('Invalid property ID, creating/getting demo property...');
        
        const { data: existingProperties, error: propError } = await supabase
          .from('properties')
          .select('id')
          .eq('title', 'Villa Lucilla - Anthorina Gardens Resort')
          .limit(1);

        if (propError) {
          console.error('Error checking properties:', propError);
        }

        if (!existingProperties || existingProperties.length === 0) {
          console.log('Creating demo property for Villa Lucilla...');
          const { data: newProperty, error: createError } = await supabase
            .from('properties')
            .insert({
              title: 'Villa Lucilla - Anthorina Gardens Resort',
              address: 'Konnou street 17, Anthorina Gardens Resort',
              city: 'Protaras',
              state: 'Famagusta District',
              zip_code: '5290',
              property_type: 'Villa',
              price: 185,
              bedrooms: 3,
              bathrooms: 2,
              description: 'Beautiful villa in Cyprus with stunning sea views and private pool.',
              status: 'active',
              images: ['/placeholder.svg'],
              amenities: ['Pool', 'WiFi', 'Air Conditioning', 'Kitchen', 'Parking']
            })
            .select('id')
            .single();

          if (createError) {
            console.error('Error creating demo property:', createError);
            throw new Error('Unable to create booking. Please contact support.');
          }

          actualPropertyId = newProperty.id;
          console.log('Created demo property with ID:', actualPropertyId);
        } else {
          actualPropertyId = existingProperties[0].id;
          console.log('Using existing property ID:', actualPropertyId);
        }
      }

      // Create the booking - this will work with our new RLS policy for anonymous inserts
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          property_id: actualPropertyId,
          start_date: bookingData.start_date,
          end_date: bookingData.end_date,
          total_price: bookingData.total_price,
          guest_count: bookingData.guest_count,
          special_requests: bookingData.special_requests,
          guest_name: bookingData.guest_name,
          guest_email: bookingData.guest_email,
          guest_phone: bookingData.guest_phone,
          status: 'pending',
          user_id: null // Allow anonymous bookings
        })
        .select()
        .single();

      if (bookingError) {
        console.error('Booking creation error:', bookingError);
        throw new Error('Failed to create booking. Please try again.');
      }

      console.log('Booking created successfully:', booking);
      return booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability', propertyId] });
      toast({
        title: "Booking Request Submitted Successfully!",
        description: "Your booking request has been submitted. We'll contact you within 24 hours to confirm your reservation.",
      });
      // Reset form
      setSelectedDates(undefined);
      setSpecialRequests('');
      setGuestName('');
      setGuestEmail('');
      setGuestPhone('');
      setGuestCount(1);
    },
    onError: (error) => {
      console.error('Booking mutation error:', error);
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "There was an issue submitting your booking. Please try again or contact support.",
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
