
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Calendar, 
  DollarSign, 
  Users,
  Star,
  Download,
  Filter
} from 'lucide-react';

interface PropertyAnalyticsProps {
  property: any;
}

const PropertyAnalytics = ({ property }: PropertyAnalyticsProps) => {
  const analytics = {
    views: { current: 1247, change: 12.5, trend: 'up' },
    bookings: { current: 23, change: -5.2, trend: 'down' },
    revenue: { current: 5680, change: 18.3, trend: 'up' },
    occupancy: { current: 78, change: 3.1, trend: 'up' },
    rating: { current: 4.8, reviews: 89 }
  };

  const bookingData = [
    { month: 'Jan', bookings: 18, revenue: 4320 },
    { month: 'Feb', bookings: 22, revenue: 5280 },
    { month: 'Mar', bookings: 25, revenue: 6000 },
    { month: 'Apr', bookings: 19, revenue: 4560 },
    { month: 'May', bookings: 28, revenue: 6720 },
    { month: 'Jun', bookings: 32, revenue: 7680 }
  ];

  const topSources = [
    { source: 'Direct Booking', percentage: 45, bookings: 12 },
    { source: 'Search Engines', percentage: 30, bookings: 8 },
    { source: 'Social Media', percentage: 15, bookings: 4 },
    { source: 'Referrals', percentage: 10, bookings: 2 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Views</p>
                <p className="text-2xl font-bold">{analytics.views.current}</p>
              </div>
              <Eye className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{analytics.views.change}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bookings</p>
                <p className="text-2xl font-bold">{analytics.bookings.current}</p>
              </div>
              <Calendar className="h-5 w-5 text-purple-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm text-red-600">{analytics.bookings.change}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">€{analytics.revenue.current}</p>
              </div>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{analytics.revenue.change}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Occupancy</p>
                <p className="text-2xl font-bold">{analytics.occupancy.current}%</p>
              </div>
              <Users className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{analytics.occupancy.change}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-2xl font-bold">{analytics.rating.current}</p>
              </div>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600">{analytics.rating.reviews} reviews</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="performance" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="bookings">Booking Trends</TabsTrigger>
            <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingData.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{month.month}</p>
                        <p className="text-sm text-gray-600">{month.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">€{month.revenue}</p>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(month.bookings / 32) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <p className="font-medium text-green-800">Strong Performance</p>
                  </div>
                  <p className="text-sm text-green-700">
                    Your property is performing 18% above market average
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-blue-600" />
                    <p className="font-medium text-blue-800">High Guest Satisfaction</p>
                  </div>
                  <p className="text-sm text-blue-700">
                    4.8/5 rating with consistent positive feedback
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <p className="font-medium text-orange-800">Optimize Pricing</p>
                  </div>
                  <p className="text-sm text-orange-700">
                    Consider increasing weekend rates by 15%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Peak Seasons</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Summer (Jun-Aug)</span>
                      <Badge>85% occupancy</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Spring (Mar-May)</span>
                      <Badge variant="secondary">72% occupancy</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Booking Lead Time</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">0-7 days</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">1-4 weeks</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">1-3 months</span>
                      <span className="text-sm font-medium">40%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Stay Duration</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">2-3 nights</span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">4-7 nights</span>
                      <span className="text-sm font-medium">50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">1+ weeks</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{source.source}</span>
                        <span className="text-sm text-gray-600">{source.bookings} bookings</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-bold">{source.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guest Reviews & Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Rating Breakdown</h4>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm w-8">{rating}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: rating === 5 ? '75%' : rating === 4 ? '20%' : '5%' }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {rating === 5 ? '67' : rating === 4 ? '18' : '4'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Recent Reviews</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-sm">"Amazing property with beautiful views!"</p>
                      <p className="text-xs text-gray-600 mt-1">- Sarah M.</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">5 days ago</span>
                      </div>
                      <p className="text-sm">"Perfect location and very clean."</p>
                      <p className="text-xs text-gray-600 mt-1">- John D.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyAnalytics;
