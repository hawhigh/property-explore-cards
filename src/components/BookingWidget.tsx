
import { useState } from 'react';
import { Calendar, Users, MapPin, Search, Heart, Sparkles } from 'lucide-react';
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

  // Query to check availability for Villa Lucilla
  const { data: availability, refetch: checkAvailability } = useQuery({
    queryKey: ['villa-availability', checkIn, checkOut],
    queryFn: async () => {
      if (!checkIn || !checkOut) return null;

      console.log('Checking availability for dates:', checkIn, 'to', checkOut);
      
      // Get or create Villa Lucilla property
      let { data: properties, error: propError } = await supabase
        .from('properties')
        .select('id')
        .eq('title', 'Villa Lucilla - Anthorina Gardens Resort')
        .limit(1);

      if (propError) {
        console.error('Error fetching property:', propError);
        throw new Error('Unable to check availability');
      }

      let propertyId;
      if (!properties || properties.length === 0) {
        // Create Villa Lucilla property if it doesn't exist
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
          console.error('Error creating property:', createError);
          throw new Error('Unable to check availability');
        }
        propertyId = newProperty.id;
      } else {
        propertyId = properties[0].id;
      }

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
    console.log('Checking Villa Lucilla availability...', { checkIn, checkOut, guests });

    try {
      const result = await checkAvailability();
      
      if (result?.data?.isAvailable) {
        toast({
          title: "🎉 Amazing! Villa Lucilla is Available!",
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
            Check Villa Lucilla Availability
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            🌟 Select your perfect dates and let's make some unforgettable memories together!
          </p>
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

        {/* Enhanced Villa Info */}
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
