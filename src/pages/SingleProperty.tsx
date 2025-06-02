
import { useState } from 'react';
import { Heart, MapPin, Home, Bath, Star, Calendar, Users, Wifi, Car, Waves, Trees } from 'lucide-react';
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

  // Villa Lucilla inspired property data
  const property = {
    id: '1',
    title: 'Villa Lucilla - Luxury Mediterranean Retreat',
    description: 'Escape to this magnificent Mediterranean villa nestled in the heart of Tuscany. Villa Lucilla offers breathtaking panoramic views of rolling hills and vineyards, featuring authentic Italian architecture with modern luxury amenities. The villa boasts spacious terraces, a stunning infinity pool, and beautifully landscaped gardens with olive trees and lavender. Perfect for families and groups seeking an authentic Italian experience with world-class comfort and privacy.',
    price: 2850000,
    pricePerNight: 850,
    bedrooms: 6,
    bathrooms: 5,
    sqft: 4500,
    address: 'Via delle Colline 47',
    city: 'Montalcino',
    state: 'Tuscany',
    country: 'Italy',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', // Luxury villa exterior
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', // Modern luxury interior
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop', // Pool area
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', // Villa bedroom
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', // Kitchen/dining
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop'  // Garden view
    ],
    propertyType: 'Luxury Villa',
    amenities: [
      'Private Infinity Pool',
      'Panoramic Terrace',
      'Wine Cellar',
      'Olive Grove',
      'Professional Kitchen',
      'Air Conditioning',
      'WiFi Throughout',
      'Private Parking',
      'Fireplace',
      'Garden & Grounds',
      'Pool House',
      'Outdoor Dining'
    ],
    yearBuilt: 1850,
    renovated: 2020,
    rating: 4.9,
    reviews: 127,
    maxGuests: 12,
    poolSize: '15m x 7m',
    groundsSize: '2.5 hectares'
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
          {/* Hero Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[500px]">
              <div className="lg:col-span-2 lg:row-span-2">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="hidden lg:block">
                <img
                  src={property.images[1]}
                  alt="Interior view"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="hidden lg:block">
                <img
                  src={property.images[2]}
                  alt="Pool area"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="hidden lg:block">
                <img
                  src={property.images[3]}
                  alt="Bedroom"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="hidden lg:block">
                <img
                  src={property.images[4]}
                  alt="Kitchen"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Info */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-4xl font-bold text-gray-900">{property.title}</h1>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 px-3 py-1">
                      {property.propertyType}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="text-lg">{property.address}, {property.city}, {property.state}, {property.country}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Home className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="font-medium">{property.bedrooms} bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="font-medium">{property.bathrooms} bathrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="font-medium">Up to {property.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center">
                      <Waves className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="font-medium">Pool {property.poolSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="text-4xl font-bold text-blue-600">
                      {formatPrice(property.price)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-400 fill-current" />
                      <span className="text-xl font-semibold">{property.rating}</span>
                      <span className="text-gray-600">({property.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="text-gray-600">
                    <span className="font-medium">Built:</span> {property.yearBuilt} • <span className="font-medium">Renovated:</span> {property.renovated} • <span className="font-medium">Grounds:</span> {property.groundsSize}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFavorite}
                  className={`${isFavorited ? 'text-red-500' : 'text-gray-400'} hover:bg-red-50`}
                >
                  <Heart className={`h-8 w-8 ${isFavorited ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Description */}
              <Card className="border-l-4 border-l-blue-600">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">About Villa Lucilla</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
                </CardContent>
              </Card>

              {/* Key Features */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Villa Features & Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-800 font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location Highlights */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Location Highlights</h2>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center gap-3">
                      <Trees className="h-5 w-5 text-green-600" />
                      <span>Surrounded by vineyards and olive groves in the heart of Tuscany</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>15 minutes to Montalcino town center and world-famous wineries</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-gray-600" />
                      <span>45 minutes to Siena, 1.5 hours to Florence</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guest Reviews */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Guest Reviews</h2>
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">Alessandro M.</span>
                        <span className="text-gray-500">• 3 weeks ago</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">"Absolutely magical stay at Villa Lucilla. The views are breathtaking, the pool area is perfect for relaxation, and the villa itself is beautifully maintained. The kitchen is fully equipped and the outdoor dining area made our evenings unforgettable. Highly recommend for families or groups!"</p>
                    </div>
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">Sophie L.</span>
                        <span className="text-gray-500">• 1 month ago</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">"The perfect Tuscan escape! Villa Lucilla exceeded all our expectations. The property is stunning, impeccably clean, and the grounds are simply beautiful. Waking up to those vineyard views every morning was a dream. Can't wait to return!"</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">James & Rachel</span>
                        <span className="text-gray-500">• 2 months ago</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">"Our wedding party stayed here and it was absolutely perfect. The villa accommodated our group of 10 comfortably, the outdoor spaces were ideal for celebrations, and the location provided easy access to wine tours. Truly a once-in-a-lifetime experience!"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      €{property.pricePerNight}/night
                    </div>
                    <div className="text-sm text-gray-600">
                      Minimum 3-night stay
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Select Dates</Label>
                      <CalendarComponent
                        mode="range"
                        selected={selectedDates.from && selectedDates.to ? { from: selectedDates.from, to: selectedDates.to } : undefined}
                        onSelect={(range) => setSelectedDates(range || {})}
                        className="rounded-md border"
                      />
                    </div>

                    <div>
                      <Label htmlFor="guests" className="text-sm font-medium mb-2 block">Number of Guests</Label>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <Input
                          id="guests"
                          type="number"
                          min="1"
                          max={property.maxGuests}
                          value={guestCount}
                          onChange={(e) => setGuestCount(parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm text-gray-500">max {property.maxGuests}</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="requests" className="text-sm font-medium mb-2 block">Special Requests</Label>
                      <Textarea
                        id="requests"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Wine tours, private chef, airport transfer..."
                        className="resize-none"
                        rows={3}
                      />
                    </div>

                    {selectedDates.from && selectedDates.to && (
                      <div className="border-t pt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>€{property.pricePerNight} × 7 nights</span>
                          <span>€{property.pricePerNight * 7}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cleaning fee</span>
                          <span>€150</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Service fee</span>
                          <span>€120</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-3">
                          <span>Total</span>
                          <span>€{(property.pricePerNight * 7) + 150 + 120}</span>
                        </div>
                      </div>
                    )}

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" size="lg">
                      <Calendar className="h-4 w-4 mr-2" />
                      Reserve Villa Lucilla
                    </Button>

                    <div className="text-center space-y-2">
                      <p className="text-xs text-gray-500">
                        You won't be charged yet
                      </p>
                      <p className="text-xs text-gray-500">
                        <Wifi className="h-3 w-3 inline mr-1" />
                        Free WiFi • Pool & Grounds Access
                      </p>
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

export default SingleProperty;
