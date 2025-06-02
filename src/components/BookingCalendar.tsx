
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
    createBookingMutation,
    calculateNights,
    calculateTotal,
    handleBooking,
  } = useBookingLogic({ propertyId, pricePerNight });

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
        />

        <BookingPricing
          pricePerNight={pricePerNight}
          nights={nights}
          total={calculateTotal()}
        />

        <BookingButton
          onBooking={handleBooking}
          isPending={createBookingMutation.isPending}
          isDisabled={!selectedDates?.from || !selectedDates?.to}
        />

        <ContactInfo />
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
