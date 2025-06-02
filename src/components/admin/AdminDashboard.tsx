
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Calendar, Bell, Mail, FileText } from 'lucide-react';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminOverview from './AdminOverview';
import BookingManagement from './BookingManagement';
import UserManagement from './UserManagement';
import NotificationCenter from './NotificationCenter';
import EmailManagement from './EmailManagement';
import ContentManagement from './ContentManagement';

const AdminDashboard = () => {
  const { isAdmin, user } = useSecureAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-red-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-600">System Management & Control</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="px-3 py-1">
                  Administrator
                </Badge>
                <span className="text-sm text-gray-600">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 lg:w-[600px]">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="emails" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Emails
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Content
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="overview">
                <AdminOverview />
              </TabsContent>

              <TabsContent value="bookings">
                <BookingManagement />
              </TabsContent>

              <TabsContent value="users">
                <UserManagement />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationCenter />
              </TabsContent>

              <TabsContent value="emails">
                <EmailManagement />
              </TabsContent>

              <TabsContent value="content">
                <ContentManagement />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
