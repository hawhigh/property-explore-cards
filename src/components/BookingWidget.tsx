
import { useState } from 'react';
import { Calendar, Users, MapPin, Search } from 'lucide-react';
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
        title: "Select Dates",
        description: "Please select both check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      toast({
        title: "Invalid Dates",
        description: "Check-out date must be after check-in date.",
        variant: "destructive",
      });
      return;
    }

    if (guests < 1 || guests > 6) {
      toast({
        title: "Invalid Guest Count",
        description: "Villa Lucilla accommodates 1-6 guests.",
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
          title: "Villa Lucilla is Available! 🎉",
          description: `Your dates from ${new Date(checkIn).toLocaleDateString()} to ${new Date(checkOut).toLocaleDateString()} are available.`,
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
          title: "Villa Lucilla is Not Available",
          description: "Your selected dates are already booked. Please try different dates.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Availability check failed:', error);
      toast({
        title: "Availability Check Failed",
        description: "Unable to check availability. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardContent className="p-4 md:p-8">
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Check Villa Lucilla Availability</h3>
          <p className="text-sm md:text-base text-gray-600">Select your dates to see if our luxury villa is available</p>
        </div>
        
        {/* Mobile-first responsive grid */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {/* Check-in & Check-out - Side by side on mobile */}
          <div className="grid grid-cols-2 gap-3 md:contents">
            <div className="md:lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Check-in
              </label>
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                min={today}
              />
            </div>

            <div className="md:lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Check-out
              </label>
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                min={checkIn || today}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="md:lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Guests
            </label>
            <Input
              type="number"
              min="1"
              max="6"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <span className="text-xs text-gray-500 mt-1 block">Max 6 guests</span>
          </div>

          {/* Search Button */}
          <div className="md:lg:col-span-1 md:flex md:items-end">
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              <Search className="h-4 w-4 mr-2 md:hidden" />
              {isSearching ? 'Checking...' : 'Check Availability'}
            </Button>
          </div>
        </div>

        {/* Villa Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>Protaras, Cyprus</span>
            </div>
            <div className="hidden md:block">•</div>
            <span>€185/night</span>
            <div className="hidden md:block">•</div>
            <span>Minimum 2 nights</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingWidget;
