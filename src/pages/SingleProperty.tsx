
import { useState } from 'react';
import { Heart, MapPin, Home, Bath, Star, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const SingleProperty = () => {
  const [selectedDates, setSelectedDates] = useState<{ from?: Date; to?: Date }>({});
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  // Sample property data
  const property = {
    id: '1',
    title: 'Luxury Downtown Penthouse',
    description: 'Experience luxury living in this stunning penthouse featuring floor-to-ceiling windows, modern amenities, and breathtaking city views. The open-concept design seamlessly blends indoor and outdoor living with a private terrace perfect for entertaining.',
    price: 1250000,
    pricePerNight: 450,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    address: '789 Sky Tower Boulevard',
    city: 'San Francisco',
    state: 'CA',
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    propertyType: 'Penthouse',
    amenities: ['Rooftop Terrace', 'Concierge', 'Gym', 'Pool', 'Valet Parking', 'Pet Friendly'],
    yearBuilt: 2020,
    rating: 4.8,
    reviews: 47
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">PropertyHub</h1>
            <Button variant="outline">Sign In</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
              <div className="lg:col-span-2">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="hidden lg:grid grid-rows-2 gap-4">
                <img
                  src={property.images[1]}
                  alt={property.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <img
                  src={property.images[2]}
                  alt={property.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Info */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {property.propertyType}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.address}, {property.city}, {property.state}</span>
                  </div>

                  <div className="flex items-center gap-6 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Home className="h-5 w-5 mr-1" />
                      {property.bedrooms} beds
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-1" />
                      {property.bathrooms} baths
                    </div>
                    <span>{property.sqft.toLocaleString()} sqft</span>
                    <span>Built {property.yearBuilt}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPrice(property.price)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{property.rating}</span>
                      <span className="text-gray-600">({property.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFavorite}
                  className={`${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
                >
                  <Heart className={`h-6 w-6 ${isFavorited ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">About this property</h2>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Preview */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-semibold">Sarah M.</span>
                        <span className="text-gray-500">• 2 weeks ago</span>
                      </div>
                      <p className="text-gray-700">Amazing property with stunning views! The amenities are top-notch and the location is perfect.</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-semibold">John D.</span>
                        <span className="text-gray-500">• 1 month ago</span>
                      </div>
                      <p className="text-gray-700">Excellent service and beautiful property. Would definitely stay here again!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      ${property.pricePerNight}/night
                    </div>
                    <div className="text-sm text-gray-600">
                      Average nightly rate
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Select Dates</Label>
                      <CalendarComponent
                        mode="range"
                        selected={selectedDates.from && selectedDates.to ? { from: selectedDates.from, to: selectedDates.to } : undefined}
                        onSelect={(range) => setSelectedDates(range || {})}
                        className="rounded-md border mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="guests" className="text-sm font-medium">Guests</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <Input
                          id="guests"
                          type="number"
                          min="1"
                          max="8"
                          value={guestCount}
                          onChange={(e) => setGuestCount(parseInt(e.target.value))}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="requests" className="text-sm font-medium">Special Requests</Label>
                      <Textarea
                        id="requests"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Any special requests..."
                        className="mt-2"
                        rows={3}
                      />
                    </div>

                    {selectedDates.from && selectedDates.to && (
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>${property.pricePerNight} × 3 nights</span>
                          <span>${property.pricePerNight * 3}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Service fee</span>
                          <span>$75</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Total</span>
                          <span>${(property.pricePerNight * 3) + 75}</span>
                        </div>
                      </div>
                    )}

                    <Button className="w-full" size="lg">
                      <Calendar className="h-4 w-4 mr-2" />
                      Reserve Now
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      You won't be charged yet
                    </p>
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

export default SingleProperty;
