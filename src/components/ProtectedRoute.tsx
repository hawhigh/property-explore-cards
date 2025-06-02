
import { ReactNode } from 'react';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  fallback?: ReactNode;
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  requireAdmin = false,
  fallback 
}: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading, user } = useSecureAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Lock className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 text-center">
              Please sign in to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Lock className="h-12 w-12 text-red-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 text-center">
              You don't have permission to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
