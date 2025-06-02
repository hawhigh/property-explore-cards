
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Plus, Eye, Edit } from 'lucide-react';

const MyProperties = () => {
  const { user } = useAuth();

  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ['user-properties', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        console.log('No user ID available for properties query');
        return [];
      }

      console.log('Fetching properties for user:', user.id);

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }

      console.log('Properties fetched successfully:', data?.length || 0);
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Show sign-in prompt if no user
  if (!user) {
    return (
      <div className="text-center py-12">
        <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign In Required</h3>
        <p className="text-gray-600 mb-6">Please sign in to view and manage your properties.</p>
        <Button 
          onClick={() => window.location.href = '/auth'}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Sign In
        </Button>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">My Properties</h3>
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
        </div>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Show error state
  if (error) {
    console.error('Properties query error:', error);
    return (
      <div className="text-center py-12">
        <Home className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Properties</h3>
        <p className="text-red-600 mb-6">There was an issue loading your properties. Please try again.</p>
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50"
        >
          Retry
        </Button>
      </div>
    );
  }

  // Show empty state
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Yet</h3>
        <p className="text-gray-600 mb-6">Start building your rental portfolio by adding your first property.</p>
        <Button 
          onClick={() => window.location.href = '/property-management'}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Your First Property
        </Button>
      </div>
    );
  }

  // Show properties list
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">My Properties ({properties.length})</h3>
        <Button 
          onClick={() => window.location.href = '/property-management'}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      <div className="grid gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold mb-1">
                    {property.title || 'Untitled Property'}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {property.address}, {property.city}, {property.state}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{property.bedrooms || 0} bed</span>
                    <span>{property.bathrooms || 0} bath</span>
                    {property.sqft && <span>{property.sqft} sqft</span>}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                    {property.status || 'inactive'}
                  </Badge>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    €{property.price || 0}/month
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {property.images && property.images.length > 0 && (
                <div className="mb-4">
                  <img 
                    src={property.images[0]} 
                    alt={property.title || 'Property image'}
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop';
                    }}
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Listed on {new Date(property.created_at).toLocaleDateString()}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`/property/${property.id}`, '_blank')}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = '/property-management'}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          variant="outline"
          onClick={() => window.location.href = '/property-management'}
          className="w-full"
        >
          Manage All Properties
        </Button>
      </div>
    </div>
  );
};

export default MyProperties;
