
import { useParams } from 'react-router-dom';
import { usePropertyData } from '@/hooks/usePropertyData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Home, Bath, Users, Star, Heart, Share, ArrowLeft, Calendar, Phone, Mail, Wifi } from 'lucide-react';
import { useState } from 'react';

const SinglePropertyView = () => {
  const { id } = useParams();
  const { property, isLoading, error } = usePropertyData(id);
  const [isFavorited, setIsFavorited] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading your dream property...</div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find the property you're looking for. It might have been moved or is no longer available.</p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Browse Properties
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const mainImage = property.images?.[0] || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop';
  const additionalImages = property.images?.slice(1, 5) || [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="hover:bg-blue-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Properties
            </Button>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-blue-50 transition-colors"
              >
                <Share className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsFavorited(!isFavorited)}
                className={`transition-colors ${isFavorited ? 'text-red-500 hover:bg-red-50' : 'hover:bg-blue-50'}`}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Image Gallery */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <div className="lg:col-span-2 lg:row-span-2 relative group">
                <img
                  src={mainImage}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              {additionalImages.map((image, index) => (
                <div key={index} className="hidden lg:block relative group overflow-hidden">
                  <img
                    src={image}
                    alt={`Property view ${index + 2}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Enhanced Property Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Header with Better Typography */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{property.title}</h1>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-semibold">
                        {property.property_type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-6">
                      <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                      <span className="text-lg font-medium">
                        {property.address}, {property.city}, {property.state}
                      </span>
                    </div>

                    {/* Enhanced Property Stats */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <Home className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                        <div className="text-sm text-gray-600 font-medium">Bedrooms</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <Bath className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                        <div className="text-sm text-gray-600 font-medium">Bathrooms</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-2xl font-bold text-gray-900">6</div>
                        <div className="text-sm text-gray-600 font-medium">Max Guests</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-4xl font-bold text-blue-600">
                        {formatPrice(property.price)}<span className="text-lg text-gray-500">/night</span>
                      </div>
                      <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                        <Star className="h-6 w-6 text-yellow-400 fill-current" />
                        <span className="text-xl font-bold">4.8</span>
                        <span className="text-gray-600">(89 reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Description */}
              <Card className="shadow-lg border border-gray-100">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">About Villa Lucilla</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {property.description || 'Experience luxury living in this stunning Mediterranean villa, perfectly positioned to offer breathtaking views and world-class amenities. This exceptional property combines modern comfort with timeless elegance, creating an unforgettable retreat for discerning guests.'}
                  </p>
                </CardContent>
              </Card>

              {/* Enhanced Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <Card className="shadow-lg border border-gray-100">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Premium Amenities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-800 font-medium">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Enhanced Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      Book Your Stay
                    </div>
                    <p className="text-gray-600">Reserve Villa Lucilla for your perfect getaway</p>
                  </div>

                  <div className="space-y-6">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold shadow-lg" size="lg">
                      <Calendar className="h-5 w-5 mr-3" />
                      Check Availability
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="border-blue-200 hover:bg-blue-50" size="lg">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" className="border-blue-200 hover:bg-blue-50" size="lg">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Wifi className="h-4 w-4 text-blue-600" />
                        <span>Free WiFi & High-Speed Internet</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span>Professional Concierge Service</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-blue-600" />
                        <span>5-Star Guest Experience</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Property ID:</span>
                        <span className="font-mono text-xs bg-white px-2 py-1 rounded">{property.id.slice(0, 8)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Status:</span>
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          Available
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
