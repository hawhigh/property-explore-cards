
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useBookingLogic } from '@/hooks/useBookingLogic';
import BookingForm from '@/components/BookingForm';
import BookingPricing from '@/components/BookingPricing';
import BookingButton from '@/components/BookingButton';
import ContactInfo from '@/components/ContactInfo';
import { Shield, Clock, CheckCircle } from 'lucide-react';

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

  const { data: availability = [], isLoading: isLoadingAvailability } = useQuery({
    queryKey: ['availability', propertyId],
    queryFn: async () => {
      // Check if we have a valid UUID format property ID
      const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(propertyId);
      
      if (!isValidUUID) {
        console.log('Invalid property ID format, returning sample unavailable dates');
        // Return some sample unavailable dates for demo
        const today = new Date();
        const sampleUnavailable = [];
        for (let i = 10; i < 15; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          sampleUnavailable.push({
            date: date.toISOString().split('T')[0],
            available: false
          });
        }
        return sampleUnavailable;
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
    <Card className="sticky top-4 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">Book Your Stay</CardTitle>
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
          <Shield className="h-4 w-4" />
          <span className="font-medium">No registration required</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="text-3xl font-bold text-blue-700 mb-2">
            €{pricePerNight}
            <span className="text-base font-normal text-gray-600">/night</span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Minimum 2-night stay</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Up to 6 guests</span>
            </div>
          </div>
        </div>

        {isLoadingAvailability && (
          <div className="text-center py-4">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <div className="text-sm text-gray-500">Loading availability...</div>
          </div>
        )}

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

        {/* Trust Indicators */}
        <div className="border-t pt-4 space-y-3">
          <div className="text-xs text-gray-500 text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Instant confirmation</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>No hidden fees</span>
              </div>
            </div>
            <p className="text-gray-400">
              Book directly without creating an account. We'll contact you within 24 hours to confirm your reservation.
            </p>
          </div>
        </div>

        <ContactInfo />
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
