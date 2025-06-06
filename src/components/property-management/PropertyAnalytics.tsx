
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Users,
  Star,
  Eye
} from 'lucide-react';

interface PropertyAnalyticsProps {
  property: any;
}

const PropertyAnalytics = ({ property }: PropertyAnalyticsProps) => {
  // Fetch real booking data for this property
  const { data: bookings = [] } = useQuery({
    queryKey: ['property-bookings', property?.id],
    queryFn: async () => {
      if (!property?.id) return [];

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('property_id', property.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!property?.id,
  });

  // Calculate analytics from real data
  const totalRevenue = bookings
    .filter(booking => booking.status === 'confirmed')
    .reduce((sum, booking) => sum + Number(booking.total_price || 0), 0);

  const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed').length;
  const pendingBookings = bookings.filter(booking => booking.status === 'pending').length;
  const averageBookingValue = confirmedBookings > 0 ? totalRevenue / confirmedBookings : 0;

  // Mock data for charts (in real app, this would be calculated from actual booking data)
  const monthlyRevenue = [
    { month: 'Jan', revenue: 1200, bookings: 4 },
    { month: 'Feb', revenue: 1800, bookings: 6 },
    { month: 'Mar', revenue: 2400, bookings: 8 },
    { month: 'Apr', revenue: 2100, bookings: 7 },
    { month: 'May', revenue: 2800, bookings: 9 },
    { month: 'Jun', revenue: 3200, bookings: 12 },
  ];

  const occupancyData = [
    { name: 'Occupied', value: 68, color: '#10B981' },
    { name: 'Available', value: 32, color: '#EF4444' },
  ];

  const guestDemographics = [
    { type: 'Families', count: 45 },
    { type: 'Couples', count: 32 },
    { type: 'Business', count: 18 },
    { type: 'Groups', count: 15 },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex items-center mt-2 gap-2">
              <Badge variant="secondary" className="text-xs">
                {confirmedBookings} confirmed
              </Badge>
              <Badge variant="outline" className="text-xs">
                {pendingBookings} pending
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Booking Value</p>
                <p className="text-2xl font-bold">€{Math.round(averageBookingValue)}</p>
              </div>
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs text-gray-600">Per booking</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold">4.8</p>
              </div>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs text-gray-600">Based on 89 reviews</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Occupancy']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {occupancyData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Booking Patterns */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Guest Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={guestDemographics} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="type" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Revenue Growth</span>
              </div>
              <p className="text-sm text-green-700">
                Your property revenue has increased by 15% compared to last month
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Market Position</span>
              </div>
              <p className="text-sm text-blue-700">
                Your pricing is competitive and above market average for the area
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-900">Guest Satisfaction</span>
              </div>
              <p className="text-sm text-purple-700">
                High guest ratings are driving repeat bookings and referrals
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyAnalytics;
