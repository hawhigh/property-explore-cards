
import { useParams } from 'react-router-dom';
import { usePropertyData } from '@/hooks/usePropertyData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Home, Bath, Users, Star, Heart, Share } from 'lucide-react';
import { useState } from 'react';

const SinglePropertyView = () => {
  const { id } = useParams();
  const { property, isLoading, error } = usePropertyData(id);
  const [isFavorited, setIsFavorited] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading property...</div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the property you're looking for.</p>
          <Button onClick={() => window.location.href = '/'}>
            Return to Properties
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const mainImage = property.images?.[0] || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop';
  const additionalImages = property.images?.slice(1, 5) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => window.history.back()}>
              ← Back
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Share className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[500px]">
              <div className="lg:col-span-2 lg:row-span-2">
                <img
                  src={mainImage}
                  alt={property.title}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              {additionalImages.map((image, index) => (
                <div key={index} className="hidden lg:block">
                  <img
                    src={image}
                    alt={`Property view ${index + 2}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {property.property_type}
                  </Badge>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="text-lg">
                    {property.address}, {property.city}, {property.state}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="font-medium">{property.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="font-medium">{property.bathrooms} baths</span>
                  </div>
                  {property.sqft && (
                    <span className="font-medium">{property.sqft.toLocaleString()} sqft</span>
                  )}
                  {property.year_built && (
                    <span className="font-medium">Built {property.year_built}</span>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold text-blue-600">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold">4.8</span>
                    <span className="text-gray-600">(89 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">About this property</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {property.description || 'No description available for this property.'}
                  </p>
                </CardContent>
              </Card>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Amenities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-800">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact/Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      Interested in this property?
                    </div>
                    <p className="text-gray-600">Contact us for more information</p>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      Contact Agent
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Schedule Viewing
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Request Info
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="flex justify-between">
                        <span>Property ID:</span>
                        <span className="font-medium">{property.id.slice(0, 8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge variant="outline" className="text-xs">
                          {property.status || 'Active'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyView;
