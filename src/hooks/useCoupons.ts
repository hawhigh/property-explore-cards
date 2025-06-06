
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
  minAmount?: number;
  maxDiscount?: number;
}

// Sample coupons - in a real app, these would come from your backend
const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    description: '10% off your first booking',
    minAmount: 100
  },
  {
    code: 'SUMMER25',
    discount: 25,
    type: 'percentage',
    description: '25% off summer bookings',
    minAmount: 200,
    maxDiscount: 150
  },
  {
    code: 'SAVE50',
    discount: 50,
    type: 'fixed',
    description: '€50 off your booking',
    minAmount: 150
  },
  {
    code: 'LOYALTY15',
    discount: 15,
    type: 'percentage',
    description: '15% off for returning guests',
    minAmount: 100
  }
];

export const useCoupons = () => {
  const { toast } = useToast();
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const validateCoupon = async (code: string, subtotal: number) => {
    setIsValidating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const coupon = AVAILABLE_COUPONS.find(
      c => c.code.toLowerCase() === code.toLowerCase()
    );
    
    setIsValidating(false);
    
    if (!coupon) {
      toast({
        title: "Invalid Coupon",
        description: "The coupon code you entered is not valid.",
        variant: "destructive",
      });
      return false;
    }
    
    if (coupon.minAmount && subtotal < coupon.minAmount) {
      toast({
        title: "Minimum Amount Required",
        description: `This coupon requires a minimum booking amount of €${coupon.minAmount}.`,
        variant: "destructive",
      });
      return false;
    }
    
    setAppliedCoupon(coupon);
    toast({
      title: "Coupon Applied!",
      description: coupon.description,
    });
    return true;
  };

  const calculateDiscount = (subtotal: number) => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      const discount = (subtotal * appliedCoupon.discount) / 100;
      return appliedCoupon.maxDiscount 
        ? Math.min(discount, appliedCoupon.maxDiscount)
        : discount;
    } else {
      return Math.min(appliedCoupon.discount, subtotal);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast({
      title: "Coupon Removed",
      description: "The coupon has been removed from your booking.",
    });
  };

  return {
    appliedCoupon,
    couponCode,
    setCouponCode,
    isValidating,
    validateCoupon,
    calculateDiscount,
    removeCoupon,
  };
};
