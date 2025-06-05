
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Calendar, 
  Users, 
  Mail, 
  Settings, 
  Bell,
  Phone,
  MessageSquare,
  Star,
  Euro
} from 'lucide-react';
import BusinessAnalytics from './BusinessAnalytics';
import EmailAutomation from './EmailAutomation';

const BusinessDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const quickStats = {
    todayCheckIns: 2,
    todayCheckOuts: 1,
    pendingBookings: 3,
    unreadMessages: 5,
    monthlyRevenue: 8450,
    occupancyRate: 78
  };

  const recentActivity = [
    {
      type: 'booking',
      title: 'New booking from Martinez Family',
      details: 'Dec 22-28, €1,180',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      type: 'review',
      title: 'New 5-star review received',
      details: '"Absolutely perfect villa!" - Sarah J.',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      type: 'inquiry',
      title: 'Guest inquiry about services',
      details: 'Airport transfer request',
      time: '6 hours ago',
      priority: 'medium'
    },
    {
      type: 'maintenance',
      title: 'Pool cleaning completed',
      details: 'Ready for next guests',
      time: '1 day ago',
      priority: 'low'
    }
  ];

  const upcomingTasks = [
    { task: 'Prepare welcome basket for Smith family', due: 'Today, 3:00 PM', urgent: true },
    { task: 'Confirm airport transfer for Martinez guests', due: 'Tomorrow, 10:00 AM', urgent: false },
    { task: 'Weekly property maintenance check', due: 'Friday, 2:00 PM', urgent: false },
    { task: 'Follow up on review request', due: 'Monday', urgent: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Villa Lucilla Business Dashboard</h1>
          <p className="text-gray-600">Manage your luxury villa rental business professionally</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Check-ins Today</p>
                  <p className="text-2xl font-bold text-blue-600">{quickStats.todayCheckIns}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Check-outs Today</p>
                  <p className="text-2xl font-bold text-green-600">{quickStats.todayCheckOuts}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Bookings</p>
                  <p className="text-2xl font-bold text-yellow-600">{quickStats.pendingBookings}</p>
                </div>
                <Bell className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Messages</p>
                  <p className="text-2xl font-bold text-purple-600">{quickStats.unreadMessages}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-green-600">€{quickStats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <Euro className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Occupancy</p>
                  <p className="text-2xl font-bold text-indigo-600">{quickStats.occupancyRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="emails">Email Automation</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === 'booking' && <Calendar className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'review' && <Star className="h-4 w-4 text-yellow-600" />}
                        {activity.type === 'inquiry' && <MessageSquare className="h-4 w-4 text-purple-600" />}
                        {activity.type === 'maintenance' && <Settings className="h-4 w-4 text-green-600" />}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-sm">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                      <Badge 
                        variant={activity.priority === 'high' ? 'destructive' : 
                               activity.priority === 'medium' ? 'default' : 'secondary'}
                      >
                        {activity.priority}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <input type="checkbox" className="rounded" />
                      <div className="flex-grow">
                        <p className="font-medium text-sm">{task.task}</p>
                        <p className="text-xs text-gray-500">{task.due}</p>
                      </div>
                      {task.urgent && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-4">
                    Add New Task
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <Button className="flex flex-col items-center gap-2 h-20">
                    <Phone className="h-5 w-5" />
                    <span className="text-xs">Contact Guest</span>
                  </Button>
                  <Button className="flex flex-col items-center gap-2 h-20" variant="outline">
                    <Mail className="h-5 w-5" />
                    <span className="text-xs">Send Email</span>
                  </Button>
                  <Button className="flex flex-col items-center gap-2 h-20" variant="outline">
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">Block Dates</span>
                  </Button>
                  <Button className="flex flex-col items-center gap-2 h-20" variant="outline">
                    <Settings className="h-5 w-5" />
                    <span className="text-xs">Maintenance</span>
                  </Button>
                  <Button className="flex flex-col items-center gap-2 h-20" variant="outline">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-xs">Update Pricing</span>
                  </Button>
                  <Button className="flex flex-col items-center gap-2 h-20" variant="outline">
                    <Star className="h-5 w-5" />
                    <span className="text-xs">Manage Reviews</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <BusinessAnalytics />
          </TabsContent>

          <TabsContent value="emails">
            <EmailAutomation />
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Booking Calendar Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Advanced calendar features coming soon! Manage availability, pricing, and bookings.
                </p>
                <Button>Set Up Calendar Integration</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Business Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  Property Information & Photos
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Pricing & Availability Rules
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Service Offerings & Add-ons
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Email Templates & Automation
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Payment & Booking Settings
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Integration Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessDashboard;
