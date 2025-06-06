
import { Badge } from '@/components/ui/badge';

interface BookingPricingProps {
  pricePerNight: number;
  nights: number;
  total: number;
  discount?: number;
  appliedCoupon?: any;
}

const BookingPricing = ({ pricePerNight, nights, total, discount = 0, appliedCoupon }: BookingPricingProps) => {
  if (nights <= 0) return null;

  const subtotal = pricePerNight * nights;
  const cleaningFee = 50;
  const serviceFee = 25;
  const totalBeforeDiscount = subtotal + cleaningFee + serviceFee;

  return (
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
      
      {discount > 0 && appliedCoupon && (
        <div className="flex justify-between text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
          <span className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
              {appliedCoupon.code}
            </Badge>
            Discount
          </span>
          <span>-€{discount.toFixed(2)}</span>
        </div>
      )}
      
      <div className="flex justify-between font-bold text-lg border-t pt-3">
        <span>Total</span>
        <div className="text-right">
          {discount > 0 ? (
            <>
              <div className="text-sm text-gray-500 line-through">€{totalBeforeDiscount}</div>
              <div className="text-green-600">€{total}</div>
            </>
          ) : (
            <span>€{total}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPricing;
