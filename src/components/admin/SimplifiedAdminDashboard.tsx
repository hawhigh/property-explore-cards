
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import SecureAdminPanel from '@/components/SecureAdminPanel';
import UserManagement from '@/components/admin/UserManagement';
import PropertyOwnerManagement from '@/components/admin/PropertyOwnerManagement';
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="properties">Property Owners</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <SecureAdminPanel />
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="properties" className="mt-6">
              <PropertyOwnerManagement />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="text-center py-8">
                <p className="text-gray-500">Admin settings coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SimplifiedAdminDashboard;
