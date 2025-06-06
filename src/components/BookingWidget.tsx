
import { useState } from 'react';
import { Calendar, Users, MapPin, Search, Heart, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const BookingWidget = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [isSearching, setIsSearching] = useState(false);

  // Query to get basic availability info for display
  const { data: availabilityInfo } = useQuery({
    queryKey: ['availability-overview'],
    queryFn: async () => {
      try {
        // Get any active property for demo
        const { data: properties, error: propError } = await supabase
          .from('properties')
          .select('id')
          .eq('status', 'active')
          .limit(1);

        if (propError || !properties || properties.length === 0) {
          return { availableNextWeek: 7, totalBookings: 0, nextAvailableDate: new Date() };
        }

        const propertyId = properties[0].id;

        // Get bookings for next 30 days
        const today = new Date();
        const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

        const { data: bookings } = await supabase
          .from('bookings')
          .select('start_date, end_date')
          .eq('property_id', propertyId)
          .gte('start_date', today.toISOString().split('T')[0])
          .lte('start_date', thirtyDaysFromNow.toISOString().split('T')[0])
          .eq('status', 'confirmed');

        const bookedDays = new Set();
        (bookings || []).forEach(booking => {
          const start = new Date(booking.start_date);
          const end = new Date(booking.end_date);
          const current = new Date(start);
          
          while (current <= end) {
            bookedDays.add(current.toISOString().split('T')[0]);
            current.setDate(current.getDate() + 1);
          }
        });

        // Calculate next 7 days availability
        let availableNextWeek = 0;
        for (let i = 0; i < 7; i++) {
          const checkDate = new Date(today);
          checkDate.setDate(today.getDate() + i);
          if (!bookedDays.has(checkDate.toISOString().split('T')[0])) {
            availableNextWeek++;
          }
        }

        // Find next available date
        let nextAvailableDate = new Date(today);
        while (bookedDays.has(nextAvailableDate.toISOString().split('T')[0]) && 
               nextAvailableDate < thirtyDaysFromNow) {
          nextAvailableDate.setDate(nextAvailableDate.getDate() + 1);
        }

        return {
          availableNextWeek,
          totalBookings: (bookings || []).length,
          nextAvailableDate
        };
      } catch (error) {
        console.error('Error fetching availability info:', error);
        return { availableNextWeek: 7, totalBookings: 0, nextAvailableDate: new Date() };
      }
    },
  });

  // Query to check availability for selected dates
  const { data: availability, refetch: checkAvailability } = useQuery({
    queryKey: ['villa-availability', checkIn, checkOut],
    queryFn: async () => {
      if (!checkIn || !checkOut) return null;

      console.log('Checking availability for dates:', checkIn, 'to', checkOut);
      
      // Get any active property for demo
      const { data: properties, error: propError } = await supabase
        .from('properties')
        .select('id')
        .eq('status', 'active')
        .limit(1);

      if (propError || !properties || properties.length === 0) {
        throw new Error('No properties available');
      }

      const propertyId = properties[0].id;

      // Check for existing bookings in the date range
      const { data: bookings, error: bookingError } = await supabase
        .from('bookings')
        .select('*')
        .eq('property_id', propertyId)
        .or(`start_date.lte.${checkOut},end_date.gte.${checkIn}`)
        .eq('status', 'confirmed');

      if (bookingError) {
        console.error('Error checking bookings:', bookingError);
        throw new Error('Unable to check availability');
      }

      const isAvailable = !bookings || bookings.length === 0;
      
      return {
        propertyId,
        isAvailable,
        conflictingBookings: bookings || []
      };
    },
    enabled: false // Only run when manually triggered
  });

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "🗓️ Pick Your Dates",
        description: "Let's start by selecting when you'd like to visit us!",
        variant: "destructive",
      });
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      toast({
        title: "📅 Oops! Date Mix-up",
        description: "Your check-out should be after your check-in. Let's fix that!",
        variant: "destructive",
      });
      return;
    }

    if (guests < 1 || guests > 6) {
      toast({
        title: "👥 Guest Count",
        description: "Villa Lucilla welcomes 1-6 guests. Perfect for any group size!",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    console.log('Checking availability...', { checkIn, checkOut, guests });

    try {
      const result = await checkAvailability();
      
      if (result?.data?.isAvailable) {
        toast({
          title: "🎉 Amazing! Dates are Available!",
          description: `Your dream dates ${new Date(checkIn).toLocaleDateString()} to ${new Date(checkOut).toLocaleDateString()} are free!`,
        });
        
        // Navigate to the single property page for booking
        navigate('/single', { 
          state: { 
            selectedDates: { from: new Date(checkIn), to: new Date(checkOut) },
            guestCount: guests 
          }
        });
      } else {
        toast({
          title: "😔 Those dates are taken",
          description: "But don't worry! Try different dates - we'd love to host you!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Availability check failed:', error);
      toast({
        title: "🔄 Let's try that again",
        description: "Something went wrong. Could you give it another try?",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-shadow duration-300">
      <CardContent className="p-6 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Your Cyprus Adventure Starts Here</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Check Availability
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            🌟 Select your perfect dates and let's make some unforgettable memories together!
          </p>

          {/* Real-time Availability Status */}
          {availabilityInfo && (
            <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-200">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                Live Availability Status
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/80 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-semibold">Next Week</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {availabilityInfo.availableNextWeek}/7 days
                  </div>
                  <div className="text-gray-600">available</div>
                </div>
                <div className="bg-white/80 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                    <span className="font-semibold">Bookings</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    {availabilityInfo.totalBookings}
                  </div>
                  <div className="text-gray-600">this month</div>
                </div>
                <div className="bg-white/80 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold">Next Available</span>
                  </div>
                  <div className="text-sm font-bold text-blue-600">
                    {availabilityInfo.nextAvailableDate.toLocaleDateString()}
                  </div>
                  <div className="text-gray-600">ready for you!</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced responsive grid */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-6 md:p-8 mb-6">
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {/* Check-in & Check-out */}
            <div className="grid grid-cols-2 gap-4 md:contents">
              <div className="md:lg:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Calendar className="inline h-4 w-4 mr-2 text-blue-600" />
                  When do you arrive?
                </label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl text-lg font-medium hover:border-blue-300 transition-colors"
                  min={today}
                />
              </div>

              <div className="md:lg:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Calendar className="inline h-4 w-4 mr-2 text-blue-600" />
                  When do you leave?
                </label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl text-lg font-medium hover:border-blue-300 transition-colors"
                  min={checkIn || today}
                />
              </div>
            </div>

            {/* Guests */}
            <div className="md:lg:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <Users className="inline h-4 w-4 mr-2 text-blue-600" />
                How many guests?
              </label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="6"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl text-lg font-medium hover:border-blue-300 transition-colors pl-4 pr-20"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full font-medium">
                  max 6
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:lg:col-span-1 md:flex md:items-end">
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 text-lg hover:scale-105 transform"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                    Checking magic...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-3" />
                    <span className="hidden md:inline">Find My Perfect Dates</span>
                    <span className="md:hidden">Check Now</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Villa Info with Availability */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-700">
              <div className="flex items-center gap-2 font-medium">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>🏖️ Protaras, Cyprus</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span className="font-semibold">€185/night</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⭐ Minimum 2 magical nights</span>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="text-xs text-gray-500 mb-1">💝 Special for you</div>
              <div className="font-bold text-green-600">Free cancellation • No upfront payment</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingWidget;
