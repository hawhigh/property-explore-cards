
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, Users, Euro, Star, Target } from 'lucide-react';

const BusinessAnalytics = () => {
  // Sample data - in real app this would come from your booking system
  const metrics = {
    occupancyRate: 78,
    averageDailyRate: 198,
    revenue: {
      thisMonth: 5650,
      lastMonth: 4890,
      growth: 15.5
    },
    bookings: {
      total: 42,
      pending: 3,
      confirmed: 36,
      cancelled: 3
    },
    guestSatisfaction: 4.8,
    repeatGuests: 23,
    averageStayLength: 4.2
  };

  const revenueStreams = [
    { name: 'Accommodation', amount: 4680, percentage: 68 },
    { name: 'Services & Add-ons', amount: 890, percentage: 13 },
    { name: 'Cleaning Fees', amount: 560, percentage: 8 },
    { name: 'Airport Transfers', amount: 420, percentage: 6 },
    { name: 'Other', amount: 350, percentage: 5 }
  ];

  const upcomingBookings = [
    { guest: 'Smith Family', dates: 'Dec 15-19', value: 740, services: ['Airport Transfer', 'Grocery Stocking'] },
    { guest: 'Martinez Couple', dates: 'Dec 22-28', value: 1180, services: ['Private Chef', 'Concierge'] },
    { guest: 'Johnson Group', dates: 'Jan 5-12', value: 1390, services: ['Airport Transfer', 'Car Rental'] }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Occupancy Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.occupancyRate}%</div>
            <p className="text-sm text-gray-500">Target: 75%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Avg Daily Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{metrics.averageDailyRate}</div>
            <p className="text-sm text-gray-500">+8% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">€{metrics.revenue.thisMonth.toLocaleString()}</div>
            <p className="text-sm text-green-600">+{metrics.revenue.growth}% growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Guest Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{metrics.guestSatisfaction}</div>
            <p className="text-sm text-gray-500">Based on 89 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="h-5 w-5 text-green-600" />
              Revenue Streams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{stream.name}</span>
                  <div className="text-right">
                    <span className="font-semibold">€{stream.amount}</span>
                    <span className="text-sm text-gray-500 ml-2">({stream.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${stream.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Booking Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{metrics.bookings.confirmed}</div>
                <div className="text-sm text-gray-600">Confirmed</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{metrics.bookings.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Average Stay</span>
                <span className="font-semibold">{metrics.averageStayLength} nights</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Repeat Guests</span>
                <span className="font-semibold">{metrics.repeatGuests}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Upcoming High-Value Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div>
                  <div className="font-semibold">{booking.guest}</div>
                  <div className="text-sm text-gray-600">{booking.dates}</div>
                  <div className="flex gap-2 mt-2">
                    {booking.services.map((service, serviceIndex) => (
                      <Badge key={serviceIndex} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">€{booking.value}</div>
                  <div className="text-sm text-gray-500">Total Value</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessAnalytics;
