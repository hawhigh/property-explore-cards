
import { useState } from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const BookingWidget = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log('Searching properties...', { checkIn, checkOut, guests, location });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Stay</h3>
          <p className="text-gray-600">Enter your dates and preferences to discover amazing properties</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Location */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Location
            </label>
            <Input
              placeholder="Where to?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Check-in */}
          <div className="lg:col-span-1">
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

          {/* Check-out */}
          <div className="lg:col-span-1">
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

          {/* Guests */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Guests
            </label>
            <Input
              type="number"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Search Button */}
          <div className="lg:col-span-1 flex items-end">
            <Button 
              onClick={handleSearch}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Quick filters */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 pt-6 border-t border-gray-200">
          <span className="text-sm text-gray-500 mr-2">Popular:</span>
          {['This Weekend', 'Next Week', 'Flexible Dates'].map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="sm"
              className="rounded-full border-gray-300 hover:border-blue-500 hover:text-blue-600"
            >
              {filter}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingWidget;
