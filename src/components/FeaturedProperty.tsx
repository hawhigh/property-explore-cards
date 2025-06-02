
import { Link } from 'react-router-dom';
import { MapPin, Star, Home, Bath, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FeaturedProperty = () => {
  const featuredProperty = {
    id: 'villa-lucilla',
    title: 'Villa Lucilla - Anthorina Gardens Resort',
    price: 185,
    originalPrice: 220,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    location: 'Protaras, Cyprus',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 89,
    amenities: ['Private Pool', 'Beach Access', 'Wi-Fi', 'Parking'],
    description: 'Luxury villa in Anthorina Gardens resort with private pool and walking distance to pristine beaches.'
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Property
          </h2>
          <p className="text-xl text-gray-600">
            Discover our most popular luxury villa
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-2xl border-0 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-96 lg:h-auto">
                <img
                  src={featuredProperty.image}
                  alt={featuredProperty.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white px-3 py-1">
                    Featured
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white px-3 py-1">
                    Save ${featuredProperty.originalPrice - featuredProperty.price}/night
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-8 lg:p-12">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {featuredProperty.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="text-lg">{featuredProperty.location}</span>
                    </div>

                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center">
                        <Home className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="font-medium">{featuredProperty.bedrooms} beds</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="font-medium">{featuredProperty.bathrooms} baths</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="font-medium">Up to {featuredProperty.maxGuests} guests</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-semibold">{featuredProperty.rating}</span>
                        <span className="text-gray-600">({featuredProperty.reviews} reviews)</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {featuredProperty.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {featuredProperty.amenities.map((amenity) => (
                        <Badge key={amenity} variant="outline" className="text-sm">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-4xl font-bold text-blue-600">
                        ${featuredProperty.price}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        ${featuredProperty.originalPrice}
                      </span>
                      <span className="text-lg text-gray-600">per night</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button asChild size="lg" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Link to="/single">View Details</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="flex-1">
                        <Link to="/single">Book Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
