
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
    <section className="py-16 px-4 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-tl from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-6 py-3 text-lg mb-6 animate-fade-in">
            🎁 Limited Time Offers
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight animate-fade-in delay-200">
            Exclusive Deals & Packages
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
            Take advantage of our special offers and make your Villa Lucilla experience even more memorable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {offers.map((offer, index) => (
            <Card 
              key={offer.id} 
              className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white group hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${offer.color} transform rotate-45 translate-x-8 -translate-y-8`}></div>
              
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${offer.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {offer.icon}
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${offer.color} bg-clip-text text-transparent`}>
                      {offer.discount}
                    </div>
                    <div className="text-xs text-gray-500">OFF</div>
                  </div>
                </div>
                
                <CardTitle className="text-xl text-gray-900 group-hover:text-blue-700 transition-colors">
                  {offer.title}
                </CardTitle>
                <p className="text-gray-600">{offer.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-6">
                  {offer.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm">
                      <Gift className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-gray-500 mb-4">{offer.validUntil}</div>
                
                <Button className={`w-full bg-gradient-to-r ${offer.color} hover:shadow-lg transition-all`}>
                  Claim This Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-orange-100">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900">Can't Decide?</h3>
                <p className="text-gray-600">Contact us for a personalized offer</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Our team can create a custom package tailored to your specific needs and travel dates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Get Custom Quote
              </Button>
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                Call +357 23 456 789
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;
