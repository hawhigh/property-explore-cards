
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import SecureAdminPanel from '@/components/SecureAdminPanel';
import UserManagement from '@/components/admin/UserManagement';
import PropertyOwnerManagement from '@/components/admin/PropertyOwnerManagement';
import ContentImageManagement from '@/components/admin/ContentImageManagement';
import EmailManagement from '@/components/admin/EmailManagement';
import SalesAnalytics from '@/components/admin/SalesAnalytics';
import RolesAccessOverview from '@/components/admin/RolesAccessOverview';
import AdminConnectionStatus from '@/components/admin/AdminConnectionStatus';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';

const SimplifiedAdminDashboard = () => {
  const { isLoading } = useSecureAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="connection">Connection</TabsTrigger>
              <TabsTrigger value="roles">Roles & Access</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="emails">Emails</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <SecureAdminPanel />
            </TabsContent>

            <TabsContent value="connection" className="mt-6">
              <AdminConnectionStatus />
            </TabsContent>

            <TabsContent value="roles" className="mt-6">
              <RolesAccessOverview />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <SalesAnalytics />
            </TabsContent>

            <TabsContent value="emails" className="mt-6">
              <EmailManagement />
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="properties" className="mt-6">
              <PropertyOwnerManagement />
            </TabsContent>

            <TabsContent value="content" className="mt-6">
              <ContentImageManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SimplifiedAdminDashboard;
