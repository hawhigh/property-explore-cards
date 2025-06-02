
import { useState } from 'react';
import { Calendar, Users, Wifi } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface PropertyBookingSidebarProps {
  pricePerNight: number;
  maxGuests: number;
}

const PropertyBookingSidebar = ({ pricePerNight, maxGuests }: PropertyBookingSidebarProps) => {
  const [selectedDates, setSelectedDates] = useState<{ from?: Date; to?: Date }>({});
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  return (
    <Card className="sticky top-4 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            €{pricePerNight}/night
          </div>
          <div className="text-sm text-gray-600">
            Minimum 3-night stay
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Select Dates</Label>
            <CalendarComponent
              mode="range"
              selected={selectedDates.from && selectedDates.to ? { from: selectedDates.from, to: selectedDates.to } : undefined}
              onSelect={(range) => setSelectedDates(range || {})}
              className="rounded-md border"
            />
          </div>

          <div>
            <Label htmlFor="guests" className="text-sm font-medium mb-2 block">Number of Guests</Label>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <Input
                id="guests"
                type="number"
                min="1"
                max={maxGuests}
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-500">max {maxGuests}</span>
            </div>
          </div>

          <div>
            <Label htmlFor="requests" className="text-sm font-medium mb-2 block">Special Requests</Label>
            <Textarea
              id="requests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Wine tours, private chef, airport transfer..."
              className="resize-none"
              rows={3}
            />
          </div>

          {selectedDates.from && selectedDates.to && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>€{pricePerNight} × 7 nights</span>
                <span>€{pricePerNight * 7}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Cleaning fee</span>
                <span>€150</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service fee</span>
                <span>€120</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total</span>
                <span>€{(pricePerNight * 7) + 150 + 120}</span>
              </div>
            </div>
          )}

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Reserve Villa Lucilla
          </Button>

          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500">
              You won't be charged yet
            </p>
            <p className="text-xs text-gray-500">
              <Wifi className="h-3 w-3 inline mr-1" />
              Free WiFi • Pool & Grounds Access
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyBookingSidebar;
