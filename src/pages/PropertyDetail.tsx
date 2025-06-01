
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, Bath, Calendar, ArrowLeft, Heart, Share } from 'lucide-react';

// Mock data - in real app this would come from API
const mockProperty = {
  id: '1',
  title: 'Modern Downtown Loft',
  price: 650000,
  bedrooms: 2,
  bathrooms: 2,
  sqft: 1200,
  address: '123 Main St, Downtown',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94102',
  images: [
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
  ],
  description: 'Beautiful modern loft in the heart of downtown with stunning city views. This property features an open floor plan, high ceilings, floor-to-ceiling windows, and premium finishes throughout. The kitchen boasts stainless steel appliances, quartz countertops, and a large island perfect for entertaining.',
  amenities: ['Gym', 'Pool', 'Parking', 'Pet Friendly', 'Concierge', 'Rooftop Deck'],
  propertyType: 'Condo',
  yearBuilt: 2018,
  latitude: 37.7749,
  longitude: -122.4194,
  features: [
    'Open floor plan',
    'High ceilings',
    'Floor-to-ceiling windows',
    'Hardwood floors',
    'Stainless steel appliances',
    'Quartz countertops',
    'In-unit laundry',
    'Private balcony'
  ],
  neighborhood: 'Downtown',
  walkScore: 95,
  transitScore: 87,
  bikeScore: 78
};

const PropertyDetail = () => {
  const { id } = useParams();
  const property = mockProperty; // In real app, fetch by ID

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Listings
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              {property.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Property Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {formatPrice(property.price)}
                    </div>
                    <Badge variant="secondary">{property.propertyType}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 py-4 border-t border-b border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Home className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Bath className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{property.sqft.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Agent</h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year Built</span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Neighborhood</span>
                    <span className="font-medium">{property.neighborhood}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Walk Score</span>
                    <span className="font-medium">{property.walkScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transit Score</span>
                    <span className="font-medium">{property.transitScore}/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" className="flex-1">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
