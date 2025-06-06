
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket, X, Loader2, Tag } from 'lucide-react';

interface CouponInputProps {
  couponCode: string;
  setCouponCode: (code: string) => void;
  onApplyCoupon: (code: string) => Promise<boolean>;
  appliedCoupon: any;
  onRemoveCoupon: () => void;
  isValidating: boolean;
  subtotal: number;
}

const CouponInput = ({
  couponCode,
  setCouponCode,
  onApplyCoupon,
  appliedCoupon,
  onRemoveCoupon,
  isValidating,
  subtotal
}: CouponInputProps) => {
  const [inputValue, setInputValue] = useState(couponCode);

  const handleApply = async () => {
    if (!inputValue.trim()) return;
    
    const success = await onApplyCoupon(inputValue.trim());
    if (success) {
      setCouponCode(inputValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  if (appliedCoupon) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-full">
              <Ticket className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-green-800 flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {appliedCoupon.code}
                </Badge>
                <span className="text-sm">Applied!</span>
              </div>
              <p className="text-sm text-green-600">{appliedCoupon.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveCoupon}
            className="text-green-600 hover:text-green-700 hover:bg-green-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="h-4 w-4 text-purple-600" />
        <span className="text-sm font-medium text-purple-800">Have a coupon code?</span>
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder="Enter coupon code"
            className="border-purple-200 focus:border-purple-500 focus:ring-purple-100"
            disabled={isValidating}
          />
        </div>
        <Button
          onClick={handleApply}
          disabled={!inputValue.trim() || isValidating}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isValidating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Apply'
          )}
        </Button>
      </div>
      
      <div className="mt-2 text-xs text-purple-600">
        💡 Try: WELCOME10, SUMMER25, SAVE50, or LOYALTY15
      </div>
    </div>
  );
};

export default CouponInput;
