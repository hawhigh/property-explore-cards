
import { Button } from '@/components/ui/button';
import EnhancedBookingFlow from '@/components/EnhancedBookingFlow';

interface EnhancedBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricePerNight: number;
}

const EnhancedBookingModal = ({ isOpen, onClose, pricePerNight }: EnhancedBookingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-white hover:bg-white/20"
          onClick={onClose}
        >
          ✕
        </Button>
        <EnhancedBookingFlow pricePerNight={pricePerNight} />
      </div>
    </div>
  );
};

export default EnhancedBookingModal;
