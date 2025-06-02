
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Wifi, Car, Waves, UtensilsCrossed, AirVent, Shield, Star } from 'lucide-react';

const EnhancedVillaShowcase = () => {
  const highlights = [
    {
      icon: Waves,
      title: "Private Pool",
      description: "Exclusive swimming pool with sun deck"
    },
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Anthorina Gardens Resort, Protaras"
    },
    {
      icon: UtensilsCrossed,
      title: "Full Kitchen",
      description: "Modern appliances & dining area"
    },
    {
      icon: Wifi,
      title: "High-Speed WiFi",
      description: "Complimentary internet throughout"
    },
    {
      icon: Car,
      title: "Free Parking",
      description: "Private parking space included"
    },
    {
      icon: AirVent,
      title: "Climate Control",
      description: "Air conditioning in all rooms"
    }
  ];

  const testimonials = [
    {
      rating: 5,
      text: "Absolutely stunning villa! The pool area was perfect for our family vacation.",
      author: "Sarah M."
    },
    {
      rating: 5,
      text: "Prime location in Protaras, walking distance to beautiful beaches.",
      author: "James K."
    },
    {
      rating: 5,
      text: "Exceeded our expectations. Will definitely book again!",
      author: "Maria L."
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto">
        {/* Villa Highlights */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-lg mb-4">
            ✨ Villa Lucilla Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Luxury Meets Comfort
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the perfect blend of Mediterranean charm and modern amenities in our 
            3-bedroom villa with private pool in the exclusive Anthorina Gardens Resort.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <highlight.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guest Reviews */}
        <div className="text-center mb-8">
          <Badge className="bg-yellow-100 text-yellow-700 px-4 py-2 text-lg mb-4">
            ⭐ Guest Reviews
          </Badge>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            What Our Guests Say
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 bg-white/90 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </blockquote>
                <p className="text-sm font-semibold text-gray-900">— {testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-semibold text-gray-700">Verified Property</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-8 w-8 text-yellow-500 mb-2" />
              <span className="text-sm font-semibold text-gray-700">4.8★ Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-semibold text-gray-700">Prime Location</span>
            </div>
            <div className="flex flex-col items-center">
              <UtensilsCrossed className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-semibold text-gray-700">Full Amenities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedVillaShowcase;
