
import BookingWidget from '@/components/BookingWidget';
import { Shield, Clock, CheckCircle, Users, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AvailabilitySection = () => {
  const trustFactors = [
    {
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      text: "Secure booking with instant confirmation"
    },
    {
      icon: <Clock className="h-5 w-5 text-green-600" />,
      text: "Free cancellation up to 48 hours"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-purple-600" />,
      text: "Best price guaranteed"
    },
    {
      icon: <Users className="h-5 w-5 text-orange-600" />,
      text: "Perfect for families and groups"
    }
  ];

  const recentBookings = [
    { location: "London, UK", timeAgo: "2 hours ago" },
    { location: "Berlin, Germany", timeAgo: "5 hours ago" },
    { location: "Paris, France", timeAgo: "1 day ago" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Booking Widget */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Check Availability & Book
              </h2>
              <p className="text-lg text-gray-600">
                Secure your perfect getaway at Villa Lucilla with our easy booking system
              </p>
            </div>
            
            <BookingWidget />
          </div>

          {/* Right Column - Trust Factors & Recent Activity */}
          <div className="space-y-8">
            {/* Trust Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-6 w-6 text-red-500 mr-2" />
                  Why Guests Love Villa Lucilla
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trustFactors.map((factor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {factor.icon}
                    <span className="text-gray-700">{factor.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Bookings Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-2" />
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentBookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Guest from {booking.location}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {booking.timeAgo}
                    </Badge>
                  </div>
                ))}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-500">
                    Join 89+ satisfied guests who have stayed at Villa Lucilla
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Availability Status */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Live Availability</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-600 font-medium">Available</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Villa Lucilla is currently available for your selected dates. Book now to secure your reservation!
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">4.8</p>
                  <p className="text-xs text-gray-500">Guest Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">89</p>
                  <p className="text-xs text-gray-500">Happy Guests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailabilitySection;
