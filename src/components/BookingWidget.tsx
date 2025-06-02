
import { useState } from 'react';
import { Calendar, Users, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const BookingWidget = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    console.log('Checking Villa Lucilla availability...', { checkIn, checkOut, guests });
  };

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
                min={new Date().toISOString().split('T')[0]}
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
                min={checkIn || new Date().toISOString().split('T')[0]}
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
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Search className="h-4 w-4 mr-2 md:hidden" />
              Check Availability
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
