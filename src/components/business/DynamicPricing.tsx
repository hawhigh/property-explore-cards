
import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Percent, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PricingRule {
  id: string;
  name: string;
  type: 'seasonal' | 'weekend' | 'early_bird' | 'last_minute' | 'minimum_stay';
  modifier: number;
  description: string;
  active: boolean;
  conditions: {
    startDate?: string;
    endDate?: string;
    daysAhead?: number;
    dayOfWeek?: number[];
    minimumNights?: number;
  };
}

interface DynamicPricingProps {
  basePrice: number;
  selectedDates?: { from: Date; to: Date } | null;
  guestCount: number;
}

const DynamicPricing = ({ basePrice, selectedDates, guestCount }: DynamicPricingProps) => {
  const [appliedRules, setAppliedRules] = useState<PricingRule[]>([]);
  const [finalPrice, setFinalPrice] = useState(basePrice);

  const pricingRules: PricingRule[] = [
    {
      id: 'summer_premium',
      name: 'Summer Peak Season',
      type: 'seasonal',
      modifier: 1.25,
      description: '+25% during July-August',
      active: true,
      conditions: { startDate: '07-01', endDate: '08-31' }
    },
    {
      id: 'weekend_premium',
      name: 'Weekend Premium',
      type: 'weekend',
      modifier: 1.15,
      description: '+15% for Friday-Sunday',
      active: true,
      conditions: { dayOfWeek: [5, 6, 0] }
    },
    {
      id: 'early_bird',
      name: 'Early Bird Special',
      type: 'early_bird',
      modifier: 0.85,
      description: '-15% when booked 60+ days ahead',
      active: true,
      conditions: { daysAhead: 60 }
    },
    {
      id: 'last_minute',
      name: 'Last Minute Deal',
      type: 'last_minute',
      modifier: 0.75,
      description: '-25% when booked within 7 days',
      active: true,
      conditions: { daysAhead: -7 }
    }
  ];

  useEffect(() => {
    if (!selectedDates?.from || !selectedDates?.to) {
      setFinalPrice(basePrice);
      setAppliedRules([]);
      return;
    }

    const applied: PricingRule[] = [];
    let price = basePrice;

    // Check each pricing rule
    pricingRules.forEach(rule => {
      if (!rule.active) return;

      let applies = false;
      const checkIn = selectedDates.from;
      const today = new Date();
      const daysAhead = Math.ceil((checkIn.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      switch (rule.type) {
        case 'seasonal':
          const month = checkIn.getMonth() + 1;
          const day = checkIn.getDate();
          const startMonth = parseInt(rule.conditions.startDate?.split('-')[0] || '0');
          const startDay = parseInt(rule.conditions.startDate?.split('-')[1] || '0');
          const endMonth = parseInt(rule.conditions.endDate?.split('-')[0] || '0');
          const endDay = parseInt(rule.conditions.endDate?.split('-')[1] || '0');
          
          applies = (month > startMonth || (month === startMonth && day >= startDay)) &&
                   (month < endMonth || (month === endMonth && day <= endDay));
          break;

        case 'weekend':
          applies = rule.conditions.dayOfWeek?.includes(checkIn.getDay()) || false;
          break;

        case 'early_bird':
          applies = daysAhead >= (rule.conditions.daysAhead || 60);
          break;

        case 'last_minute':
          applies = daysAhead <= 7 && daysAhead > 0;
          break;
      }

      if (applies) {
        applied.push(rule);
        price *= rule.modifier;
      }
    });

    setAppliedRules(applied);
    setFinalPrice(Math.round(price));
  }, [selectedDates, basePrice]);

  const savings = basePrice - finalPrice;

  return (
    <Card className="border-2 border-blue-100">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Smart Pricing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Base Rate:</span>
          <span className="font-semibold">€{basePrice}/night</span>
        </div>

        {appliedRules.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Applied Discounts & Premiums:
            </h4>
            {appliedRules.map(rule => (
              <div key={rule.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{rule.name}</span>
                <Badge variant={rule.modifier > 1 ? "destructive" : "default"}>
                  {rule.modifier > 1 ? '+' : ''}{Math.round((rule.modifier - 1) * 100)}%
                </Badge>
              </div>
            ))}
          </div>
        )}

        <div className="border-t pt-3">
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Final Rate:</span>
            <div className="text-right">
              {savings !== 0 && (
                <div className="text-sm text-gray-500 line-through">€{basePrice}</div>
              )}
              <div className="text-green-600">€{finalPrice}/night</div>
            </div>
          </div>
          
          {savings > 0 && (
            <div className="text-center mt-2">
              <Badge className="bg-green-100 text-green-700">
                You save €{savings} per night! 🎉
              </Badge>
            </div>
          )}
        </div>

        {selectedDates?.from && selectedDates?.to && (
          <div className="bg-blue-50 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2 text-blue-700 font-medium mb-1">
              <Calendar className="h-4 w-4" />
              Booking Timeline Benefits
            </div>
            <div className="text-blue-600">
              {Math.ceil((selectedDates.from.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days ahead
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DynamicPricing;
