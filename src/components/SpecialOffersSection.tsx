
import { Clock, Gift, Calendar, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SpecialOffersSection = () => {
  const offers = [
    {
      id: 'early-bird',
      title: 'Early Bird Special',
      discount: '15%',
      description: 'Book 60 days in advance and save',
      icon: <Clock className="h-6 w-6" />,
      validUntil: 'Valid until March 31, 2024',
      color: 'from-green-500 to-emerald-600',
      features: ['Free airport transfer', 'Welcome basket', 'Late checkout']
    },
    {
      id: 'weekly-stay',
      title: 'Weekly Getaway',
      discount: '20%',
      description: 'Stay 7+ nights and enjoy exclusive savings',
      icon: <Calendar className="h-6 w-6" />,
      validUntil: 'All year round',
      color: 'from-blue-500 to-indigo-600',
      features: ['Daily housekeeping', 'Grocery pre-stocking', 'Car rental discount']
    },
    {
      id: 'last-minute',
      title: 'Last Minute Deal',
      discount: '25%',
      description: 'Book within 7 days of arrival',
      icon: <Percent className="h-6 w-6" />,
      validUntil: 'Subject to availability',
      color: 'from-orange-500 to-red-600',
      features: ['Instant confirmation', 'Flexible cancellation', 'Concierge service']
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gift className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Special Offers</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exclusive deals and packages designed to make your Villa Lucilla experience even more memorable
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <Card key={offer.id} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${offer.color}`} />
              
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-3">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${offer.color} text-white`}>
                    {offer.icon}
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold mb-2">{offer.title}</CardTitle>
                <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                  Save {offer.discount}
                </Badge>
              </CardHeader>

              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="space-y-2 mb-6">
                  {offer.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mb-4">{offer.validUntil}</p>
                
                <Button className={`w-full bg-gradient-to-r ${offer.color} text-white hover:opacity-90 transition-opacity`}>
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            * Terms and conditions apply. Offers cannot be combined with other promotions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;
