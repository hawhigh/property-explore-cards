
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Mail, User, Phone } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface BookingFormProps {
  selectedDates: DateRange | undefined;
  setSelectedDates: (dates: DateRange | undefined) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  specialRequests: string;
  setSpecialRequests: (requests: string) => void;
  unavailableDates: Date[];
  guestName: string;
  setGuestName: (name: string) => void;
  guestEmail: string;
  setGuestEmail: (email: string) => void;
  guestPhone: string;
  setGuestPhone: (phone: string) => void;
}

const BookingForm = ({
  selectedDates,
  setSelectedDates,
  guestCount,
  setGuestCount,
  specialRequests,
  setSpecialRequests,
  unavailableDates,
  guestName,
  setGuestName,
  guestEmail,
  setGuestEmail,
  guestPhone,
  setGuestPhone,
}: BookingFormProps) => {
  // Create a function to check if a date is unavailable
  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      date.toDateString() === unavailableDate.toDateString()
    );
  };

  // Disable past dates and unavailable dates
  const disabledDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || isDateUnavailable(date);
  };

  return (
    <>
      <div>
        <Label className="text-sm font-medium mb-2 block">Select Dates</Label>
        <div className="mb-2">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
              <span>Unavailable</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>
        <Calendar
          mode="range"
          selected={selectedDates}
          onSelect={setSelectedDates}
          disabled={disabledDates}
          className="rounded-md border w-full"
          numberOfMonths={1}
        />
        {unavailableDates.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            Red dates are not available for booking
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="guests" className="text-sm font-medium mb-2 block">Number of Guests</Label>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          <Input
            id="guests"
            type="number"
            min="1"
            max="6"
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-500">max 6</span>
        </div>
      </div>

      <div className="space-y-4 border-t pt-4">
        <h3 className="text-sm font-medium">Guest Details</h3>
        
        <div>
          <Label htmlFor="guestName" className="text-sm font-medium mb-2 block">Full Name</Label>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            <Input
              id="guestName"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Your full name"
              className="flex-1"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="guestEmail" className="text-sm font-medium mb-2 block">Email Address</Label>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <Input
              id="guestEmail"
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="guestPhone" className="text-sm font-medium mb-2 block">Phone Number</Label>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <Input
              id="guestPhone"
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="flex-1"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="requests" className="text-sm font-medium mb-2 block">Special Requests</Label>
        <Textarea
          id="requests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="Airport transfer, early check-in, special arrangements..."
          className="resize-none"
          rows={3}
        />
      </div>
    </>
  );
};

export default BookingForm;
