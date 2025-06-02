
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';

interface BookingButtonProps {
  onBooking: () => void;
  isPending: boolean;
  isDisabled: boolean;
}

const BookingButton = ({ onBooking, isPending, isDisabled }: BookingButtonProps) => {
  return (
    <Button 
      onClick={onBooking} 
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
      size="lg"
      disabled={isPending || isDisabled}
    >
      <CalendarIcon className="h-4 w-4 mr-2" />
      {isPending ? 'Submitting...' : 'Book Villa Lucilla'}
    </Button>
  );
};

export default BookingButton;
