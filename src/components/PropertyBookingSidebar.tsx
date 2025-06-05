
import { useState } from 'react';
import { Calendar, Users, Wifi, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { differenceInDays } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface PropertyBookingSidebarProps {
  pricePerNight: number;
  maxGuests: number;
}

const PropertyBookingSidebar = ({ pricePerNight, maxGuests }: PropertyBookingSidebarProps) => {
  const { toast } = useToast();
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>();
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const calculateNights = () => {
    if (!selectedDates?.from || !selectedDates?.to) return 0;
    return Math.max(1, differenceInDays(selectedDates.to, selectedDates.from));
  };

  const nights = calculateNights();
  const subtotal = nights * pricePerNight;
  const cleaningFee = 150;
  const serviceFee = 120;
  const total = subtotal + cleaningFee + serviceFee;

  const handleBooking = () => {
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
        description: "Please fill in all guest details.",
        variant: "destructive",
      });
      return;
    }

    if (nights < 2) {
      toast({
        title: "Minimum Stay Required",
        description: "Villa Lucilla requires a minimum 2-night stay.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Request Submitted!",
      description: "We'll contact you within 24 hours to confirm your reservation.",
    });

    // Reset form
    setSelectedDates(undefined);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSpecialRequests('');
    setGuestCount(1);
  };

  const disabledDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <Card className="sticky top-4 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            €{pricePerNight}/night
          </div>
          <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            Minimum 2-night stay
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Select Dates</Label>
            <CalendarComponent
              mode="range"
              selected={selectedDates}
              onSelect={setSelectedDates}
              disabled={disabledDates}
              className="rounded-md border w-full"
              numberOfMonths={1}
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
                onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                className="flex-1"
              />
              <span className="text-sm text-gray-500">max {maxGuests}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="guestName" className="text-sm font-medium mb-2 block">Full Name *</Label>
              <Input
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="guestEmail" className="text-sm font-medium mb-2 block">Email Address *</Label>
              <Input
                id="guestEmail"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="guestPhone" className="text-sm font-medium mb-2 block">Phone Number *</Label>
              <Input
                id="guestPhone"
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
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

          {selectedDates?.from && selectedDates?.to && nights > 0 && (
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>€{pricePerNight} × {nights} nights</span>
                <span>€{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Cleaning fee</span>
                <span>€{cleaningFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service fee</span>
                <span>€{serviceFee}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total</span>
                <span>€{total}</span>
              </div>
            </div>
          )}

          <Button 
            onClick={handleBooking}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" 
            size="lg"
            disabled={!selectedDates?.from || !selectedDates?.to || !guestName.trim() || !guestEmail.trim() || !guestPhone.trim()}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Reserve Villa Lucilla
          </Button>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-green-600">
              <CheckCircle className="h-3 w-3" />
              <span>You won't be charged yet</span>
            </div>
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
