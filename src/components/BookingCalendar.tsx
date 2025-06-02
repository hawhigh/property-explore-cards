
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useBookingLogic } from '@/hooks/useBookingLogic';
import BookingForm from '@/components/BookingForm';
import BookingPricing from '@/components/BookingPricing';
import BookingButton from '@/components/BookingButton';
import ContactInfo from '@/components/ContactInfo';

interface BookingCalendarProps {
  propertyId: string;
  pricePerNight: number;
}

const BookingCalendar = ({ propertyId, pricePerNight }: BookingCalendarProps) => {
  const {
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
  } = useBookingLogic({ propertyId, pricePerNight });

  const { data: availability = [] } = useQuery({
    queryKey: ['availability', propertyId],
    queryFn: async () => {
      // Only fetch availability if we have a valid UUID format property ID
      const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(propertyId);
      
      if (!isValidUUID) {
        console.log('Invalid property ID format, skipping availability query');
        return [];
      }

      try {
        const { data, error } = await supabase
          .from('property_availability')
          .select('*')
          .eq('property_id', propertyId);

        if (error) {
          console.log('Error fetching availability:', error);
          return [];
        }
        
        return data || [];
      } catch (err) {
        console.log('Availability query failed:', err);
        return [];
      }
    },
  });

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

        <BookingForm
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          guestCount={guestCount}
          setGuestCount={setGuestCount}
          specialRequests={specialRequests}
          setSpecialRequests={setSpecialRequests}
          unavailableDates={unavailableDates}
          guestName={guestName}
          setGuestName={setGuestName}
          guestEmail={guestEmail}
          setGuestEmail={setGuestEmail}
          guestPhone={guestPhone}
          setGuestPhone={setGuestPhone}
        />

        <BookingPricing
          pricePerNight={pricePerNight}
          nights={nights}
          total={calculateTotal()}
        />

        <BookingButton
          onBooking={handleBooking}
          isPending={createBookingMutation.isPending}
          isDisabled={!selectedDates?.from || !selectedDates?.to || !guestName.trim() || !guestEmail.trim() || !guestPhone.trim()}
        />

        <ContactInfo />
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
