import { Clock, Gift, Calendar, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const SpecialOffersSection = () => {
  const offers = [{
    id: 'early-bird',
    title: 'Early Bird Special',
    discount: '15%',
    description: 'Book 60 days in advance and save',
    icon: <Clock className="h-6 w-6" />,
    validUntil: 'Valid until March 31, 2024',
    color: 'from-green-500 to-emerald-600',
    features: ['Free airport transfer', 'Welcome basket', 'Late checkout']
  }, {
    id: 'weekly-stay',
    title: 'Weekly Getaway',
    discount: '20%',
    description: 'Stay 7+ nights and enjoy exclusive savings',
    icon: <Calendar className="h-6 w-6" />,
    validUntil: 'All year round',
    color: 'from-blue-500 to-indigo-600',
    features: ['Daily housekeeping', 'Grocery pre-stocking', 'Car rental discount']
  }, {
    id: 'last-minute',
    title: 'Last Minute Deal',
    discount: '25%',
    description: 'Book within 7 days of arrival',
    icon: <Percent className="h-6 w-6" />,
    validUntil: 'Subject to availability',
    color: 'from-orange-500 to-red-600',
    features: ['Instant confirmation', 'Flexible cancellation', 'Concierge service']
  }];
  return;
};
export default SpecialOffersSection;