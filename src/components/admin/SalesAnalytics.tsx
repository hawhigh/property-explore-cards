
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, Users, Package, Calendar, Star, ArrowUp, ArrowDown } from 'lucide-react';

const SalesAnalytics = () => {
  const [dateRange, setDateRange] = useState('last_30_days');

  // Mock data for analytics
  const salesData = [
    { month: 'Jan', revenue: 12400, bookings: 18, upsells: 1200 },
    { month: 'Feb', revenue: 15800, bookings: 22, upsells: 1850 },
    { month: 'Mar', revenue: 18900, bookings: 28, upsells: 2100 },
    { month: 'Apr', revenue: 16200, bookings: 24, upsells: 1650 },
    { month: 'May', revenue: 21300, bookings: 31, upsells: 2450 },
    { month: 'Jun', revenue: 19800, bookings: 29, upsells: 2200 }
  ];

  const upsellData = [
    { name: 'Diving Tours', value: 35, revenue: 3500 },
    { name: 'Car Rental', value: 25, revenue: 2250 },
    { name: 'Water Sports', value: 20, revenue: 1800 },
    { name: 'Cultural Tours', value: 15, revenue: 1350 },
    { name: 'Spa Services', value: 5, revenue: 450 }
  ];

  const recentBookings = [
    {
      id: 1,
      guest: 'John Smith',
      property: 'Villa Lucilla',
      dates: 'Mar 15-22',
      basePrice: 1295,
      upsells: 350,
      total: 1645,
      services: ['Diving', 'Car Rental']
    },
    {
      id: 2,
      guest: 'Sarah Johnson',
      property: 'Villa Lucilla',
      dates: 'Mar 25-30',
      basePrice: 925,
      upsells: 180,
      total: 1105,
      services: ['Water Sports']
    },
    {
      id: 3,
      guest: 'Mike Davis',
      property: 'Villa Lucilla',
      dates: 'Apr 2-9',
      basePrice: 1295,
      upsells: 420,
      total: 1715,
      services: ['Diving', 'Spa', 'Tours']
    }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const stats = {
    totalRevenue: 104400,
    revenueGrowth: 12.5,
    totalBookings: 152,
    bookingGrowth: 8.3,
    avgBookingValue: 687,
    valueGrowth: 4.2,
    upsellRevenue: 12050,
    upsellGrowth: 18.7
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <ArrowUp className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowDown className="h-4 w-4 text-red-500" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sales & Analytics</h2>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last_7_days">Last 7 days</SelectItem>
            <SelectItem value="last_30_days">Last 30 days</SelectItem>
            <SelectItem value="last_90_days">Last 90 days</SelectItem>
            <SelectItem value="last_year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
              </div>
              <div className={`flex items-center text-sm ${getGrowthColor(stats.revenueGrowth)}`}>
                {getGrowthIcon(stats.revenueGrowth)}
                <span className="ml-1">{Math.abs(stats.revenueGrowth)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
              </div>
              <div className={`flex items-center text-sm ${getGrowthColor(stats.bookingGrowth)}`}>
                {getGrowthIcon(stats.bookingGrowth)}
                <span className="ml-1">{Math.abs(stats.bookingGrowth)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">€{stats.avgBookingValue}</p>
                  <p className="text-sm text-gray-600">Avg Booking Value</p>
                </div>
              </div>
              <div className={`flex items-center text-sm ${getGrowthColor(stats.valueGrowth)}`}>
                {getGrowthIcon(stats.valueGrowth)}
                <span className="ml-1">{Math.abs(stats.valueGrowth)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">€{stats.upsellRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Upsell Revenue</p>
                </div>
              </div>
              <div className={`flex items-center text-sm ${getGrowthColor(stats.upsellGrowth)}`}>
                {getGrowthIcon(stats.upsellGrowth)}
                <span className="ml-1">{Math.abs(stats.upsellGrowth)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="upsells">Upsells</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Upsell Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Upsell Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={upsellData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {upsellData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Base Revenue" />
                  <Bar dataKey="upsells" fill="#10b981" name="Upsell Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upsells" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upsell Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Sales Count</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Conversion Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upsellData.map((service, index) => (
                      <TableRow key={service.name}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.value}</TableCell>
                        <TableCell>€{service.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {((service.value / stats.totalBookings) * 100).toFixed(1)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings with Upsells</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Base Price</TableHead>
                    <TableHead>Upsells</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Services</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.guest}</TableCell>
                      <TableCell>{booking.property}</TableCell>
                      <TableCell>{booking.dates}</TableCell>
                      <TableCell>€{booking.basePrice}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        €{booking.upsells}
                      </TableCell>
                      <TableCell className="font-bold">€{booking.total}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {booking.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesAnalytics;
