
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Edit, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import PropertyManagementCard from '@/components/PropertyManagementCard';

const PropertyListingManagement = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ['owner-properties', user?.id, searchQuery, statusFilter],
    queryFn: async () => {
      if (!user) return [];

      let query = supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handlePropertyUpdate = () => {
    refetch();
  };

  const statusCounts = {
    all: properties.length,
    active: properties.filter(p => p.status === 'active').length,
    pending: properties.filter(p => p.status === 'pending').length,
    rented: properties.filter(p => p.status === 'rented').length,
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading properties...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Property Listings</h2>
          <p className="text-gray-600">Manage all your property listings</p>
        </div>
        <Button 
          onClick={() => window.location.href = '/property-management'}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Property
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search properties by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Tabs by Status */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="active">Active ({statusCounts.active})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
          <TabsTrigger value="rented">Rented ({statusCounts.rented})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyManagementCard
                key={property.id}
                property={property}
                onPropertyUpdate={handlePropertyUpdate}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.filter(p => p.status === 'active').map((property) => (
              <PropertyManagementCard
                key={property.id}
                property={property}
                onPropertyUpdate={handlePropertyUpdate}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.filter(p => p.status === 'pending').map((property) => (
              <PropertyManagementCard
                key={property.id}
                property={property}
                onPropertyUpdate={handlePropertyUpdate}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rented" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.filter(p => p.status === 'rented').map((property) => (
              <PropertyManagementCard
                key={property.id}
                property={property}
                onPropertyUpdate={handlePropertyUpdate}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {properties.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p>Get started by adding your first property listing</p>
            </div>
            <Button 
              onClick={() => window.location.href = '/property-management'}
              className="mt-4"
            >
              Add Your First Property
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyListingManagement;
