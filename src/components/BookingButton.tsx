
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Shield } from 'lucide-react';

interface BookingButtonProps {
  onBooking: () => void;
  isPending: boolean;
  isDisabled: boolean;
}

const BookingButton = ({ onBooking, isPending, isDisabled }: BookingButtonProps) => {
  return (
    <div className="space-y-3">
      <Button 
        onClick={onBooking} 
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
        disabled={isPending || isDisabled}
      >
        {isPending ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            Submitting Request...
          </>
        ) : (
          <>
            <CalendarIcon className="h-5 w-5 mr-2" />
            Submit Booking Request
          </>
        )}
      </Button>
      
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-1">
          <Shield className="h-3 w-3" />
          <span>Secure booking • No payment required now</span>
        </div>
        <p className="text-xs text-gray-400">
          Submit your request and we'll confirm availability within 24 hours
        </p>
      </div>
    </div>
  );
};

export default BookingButton;
