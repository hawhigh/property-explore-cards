
interface BookingPricingProps {
  pricePerNight: number;
  nights: number;
  total: number;
}

const BookingPricing = ({ pricePerNight, nights, total }: BookingPricingProps) => {
  if (nights <= 0) return null;

  return (
    <div className="border-t pt-4 space-y-3">
      <div className="flex justify-between text-sm">
        <span>€{pricePerNight} × {nights} nights</span>
        <span>€{pricePerNight * nights}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Cleaning fee</span>
        <span>€50</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Service fee</span>
        <span>€25</span>
      </div>
      <div className="flex justify-between font-bold text-lg border-t pt-3">
        <span>Total</span>
        <span>€{total}</span>
      </div>
    </div>
  );
};

export default BookingPricing;
