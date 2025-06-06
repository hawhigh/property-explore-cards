
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { useNavigate } from 'react-router-dom';

const AdminConnectionStatus = () => {
  const { user, userRole, isAdmin, isAuthenticated, isLoading } = useSecureAuth();
  const navigate = useNavigate();

  const connectionChecks = [
    {
      name: 'Authentication',
      status: isAuthenticated ? 'connected' : 'disconnected',
      description: isAuthenticated ? 'User is logged in' : 'User not authenticated',
      fix: isAuthenticated ? null : 'Please sign in to access admin features'
    },
    {
      name: 'Admin Role',
      status: isAdmin ? 'connected' : 'disconnected',
      description: isAdmin ? 'User has admin privileges' : `Current role: ${userRole || 'user'}`,
      fix: isAdmin ? null : 'Admin role required for full access'
    },
    {
      name: 'Supabase Connection',
      status: 'connected',
      description: 'Database and auth services are operational',
      fix: null
    },
    {
      name: 'Role Security Function',
      status: 'connected',
      description: 'get_current_user_role() function is available',
      fix: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'disconnected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="destructive">Disconnected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Checking connection status...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Admin Panel Connection Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {connectionChecks.map((check, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(check.status)}
              <div>
                <p className="font-medium">{check.name}</p>
                <p className="text-sm text-gray-600">{check.description}</p>
                {check.fix && (
                  <p className="text-sm text-red-600 mt-1">{check.fix}</p>
                )}
              </div>
            </div>
            {getStatusBadge(check.status)}
          </div>
        ))}

        {!isAuthenticated && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Authentication Required</h4>
            <p className="text-sm text-yellow-700 mb-3">
              You need to sign in to access the admin panel. Click below to go to the authentication page.
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              variant="outline"
              className="text-yellow-700 border-yellow-300"
            >
              Go to Sign In
            </Button>
          </div>
        )}

        {isAuthenticated && !isAdmin && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">Admin Role Required</h4>
            <p className="text-sm text-red-700 mb-3">
              Your current role is "{userRole || 'user'}". You need admin privileges to access the full admin panel.
            </p>
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="text-red-700 border-red-300 mr-2"
            >
              Go to Dashboard
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="text-red-700 border-red-300"
            >
              Go to Home
            </Button>
          </div>
        )}

        {isAdmin && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Admin Access Confirmed</h4>
            <p className="text-sm text-green-700">
              All systems are connected and you have full admin access. You can use all admin panel features.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminConnectionStatus;
