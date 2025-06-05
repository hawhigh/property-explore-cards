
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Shield, Heart, Sparkles } from 'lucide-react';

interface BookingButtonProps {
  onBooking: () => void;
  isPending: boolean;
  isDisabled: boolean;
}

const BookingButton = ({ onBooking, isPending, isDisabled }: BookingButtonProps) => {
  return (
    <div className="space-y-4">
      <Button 
        onClick={onBooking} 
        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-6 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl disabled:opacity-50 transform hover:scale-105"
        size="lg"
        disabled={isPending || isDisabled}
      >
        {isPending ? (
          <>
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
            <span>✨ Making magic happen...</span>
          </>
        ) : (
          <>
            <CalendarIcon className="h-6 w-6 mr-3" />
            <span>🎉 Yes! Book My Dream Stay</span>
          </>
        )}
      </Button>
      
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-4 py-2 inline-flex font-medium">
          <Shield className="h-4 w-4" />
          <span>💫 Completely secure • No payment needed now</span>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
          <p className="text-sm text-gray-600 mb-2 font-medium">
            🚀 Here's what happens next:
          </p>
          <div className="space-y-1 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>We'll confirm your dates within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>You'll receive all the details via email</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span>Then just pack your bags for paradise! 🏖️</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span>Loved by 500+ guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-yellow-500" />
            <span>Personal owner care</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingButton;
