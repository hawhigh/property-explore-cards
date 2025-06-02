
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
      
      // For Villa Lucilla demo, use a default property ID if none exists
      let actualPropertyId = propertyId;
      
      // Check if we need to get or create a property for demo purposes
      const { data: existingProperties, error: propError } = await supabase
        .from('properties')
        .select('id')
        .limit(1);

      if (propError) {
        console.error('Error checking properties:', propError);
      }

      // If no properties exist, create a demo property for Villa Lucilla
      if (!existingProperties || existingProperties.length === 0) {
        console.log('No properties found, creating demo property...');
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
            description: 'Beautiful villa in Cyprus',
            status: 'active'
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

      // Create guest booking
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          ...bookingData,
          property_id: actualPropertyId,
          user_id: null, // Guest booking
        })
        .select()
        .single();

      if (error) {
        console.error('Booking creation error:', error);
        throw error;
      }

      console.log('Booking created successfully:', data);
      return data;
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
        description: "There was an issue submitting your booking. Please try again or contact support.",
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
      status: 'pending'
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
