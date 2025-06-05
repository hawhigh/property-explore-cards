
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Mail, User, Phone, Info } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Date Selection */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <Label className="text-sm font-semibold mb-3 block text-gray-700">Select Your Dates</Label>
        <div className="mb-3">
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
          className="rounded-md border-0 bg-white shadow-sm w-full"
          numberOfMonths={1}
        />
        {unavailableDates.length > 0 && (
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <Info className="h-3 w-3" />
            Red dates are not available for booking
          </p>
        )}
      </div>

      {/* Guest Count */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <Label htmlFor="guests" className="text-sm font-semibold mb-3 block text-gray-700">Number of Guests</Label>
        <div className="flex items-center gap-3 bg-white rounded-md p-3 border">
          <Users className="h-5 w-5 text-gray-400" />
          <Input
            id="guests"
            type="number"
            min="1"
            max="6"
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value))}
            className="flex-1 border-0 focus:ring-0 p-0"
          />
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">max 6</span>
        </div>
      </div>

      {/* Guest Information */}
      <div className="space-y-4 border-t pt-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-semibold text-gray-700">Guest Information</h3>
          <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            No account needed
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="guestName" className="text-sm font-medium mb-2 block text-gray-600">Full Name *</Label>
            <div className="flex items-center gap-2 bg-white rounded-md border focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <User className="h-4 w-4 text-gray-400 ml-3" />
              <Input
                id="guestName"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your full name"
                className="flex-1 border-0 focus:ring-0"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="guestEmail" className="text-sm font-medium mb-2 block text-gray-600">Email Address *</Label>
            <div className="flex items-center gap-2 bg-white rounded-md border focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <Mail className="h-4 w-4 text-gray-400 ml-3" />
              <Input
                id="guestEmail"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border-0 focus:ring-0"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="guestPhone" className="text-sm font-medium mb-2 block text-gray-600">Phone Number *</Label>
            <div className="flex items-center gap-2 bg-white rounded-md border focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <Phone className="h-4 w-4 text-gray-400 ml-3" />
              <Input
                id="guestPhone"
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="flex-1 border-0 focus:ring-0"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <Label htmlFor="requests" className="text-sm font-medium mb-3 block text-gray-600">Special Requests (Optional)</Label>
        <Textarea
          id="requests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="Airport transfer, early check-in, dietary requirements, celebration arrangements..."
          className="resize-none bg-white border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          rows={3}
        />
      </div>
    </div>
  );
};

export default BookingForm;
