
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface BookingFormProps {
  selectedDates: DateRange | undefined;
  setSelectedDates: (dates: DateRange | undefined) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  specialRequests: string;
  setSpecialRequests: (requests: string) => void;
  unavailableDates: Date[];
}

const BookingForm = ({
  selectedDates,
  setSelectedDates,
  guestCount,
  setGuestCount,
  specialRequests,
  setSpecialRequests,
  unavailableDates,
}: BookingFormProps) => {
  return (
    <>
      <div>
        <Label className="text-sm font-medium mb-2 block">Select Dates</Label>
        <Calendar
          mode="range"
          selected={selectedDates}
          onSelect={setSelectedDates}
          disabled={unavailableDates}
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
            max="6"
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-500">max 6</span>
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
