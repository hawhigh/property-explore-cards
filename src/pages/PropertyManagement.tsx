
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, LayoutGrid, List } from 'lucide-react';
import Header from '@/components/Header';
import PropertyManagementCard from '@/components/PropertyManagementCard';
import AddPropertyModal from '@/components/AddPropertyModal';
import EditPropertyModal from '@/components/EditPropertyModal';
import PropertyFilters from '@/components/PropertyFilters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PropertyFilters {
  search?: string;
  status?: string;
  propertyType?: string;
  priceMin?: number;
  priceMax?: number;
}

const PropertyManagement = () => {
  const { user } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ['user-properties', user?.id, filters],
    queryFn: async () => {
      if (!user) return [];

      let query = supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at', { ascending: false });

      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.propertyType) {
        query = query.eq('property_type', filters.propertyType);
      }

      if (filters.priceMin) {
        query = query.gte('price', filters.priceMin);
      }

      if (filters.priceMax) {
        query = query.lte('price', filters.priceMax);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handlePropertyUpdated = () => {
    refetch();
    setEditingProperty(null);
  };

  const handlePropertyAdded = () => {
    refetch();
    setShowAddModal(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">Please sign in to manage your properties.</p>
          </div>
        </div>
      </div>
    );
  }

  // Group properties by status for better organization
  const groupedProperties = properties.reduce((acc, property) => {
    const status = property.status || 'active';
    if (!acc[status]) acc[status] = [];
    acc[status].push(property);
    return acc;
  }, {} as Record<string, typeof properties>);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
            <p className="text-gray-600 mt-2">Manage all your property listings</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>

        {/* Filters */}
        <PropertyFilters onFiltersChange={setFilters} totalCount={properties.length} />

        {/* Properties Display */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-4">
                {Object.keys(filters).length > 0 ? 'No properties match your filters.' : 'You haven\'t added any properties yet.'}
              </p>
              {Object.keys(filters).length === 0 && (
                <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Property
                </Button>
              )}
            </div>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All ({properties.length})</TabsTrigger>
              {Object.entries(groupedProperties).map(([status, props]) => (
                <TabsTrigger key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({props.length})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
              }>
                {properties.map((property) => (
                  <PropertyManagementCard
                    key={property.id}
                    property={property}
                    onPropertyUpdate={refetch}
                  />
                ))}
              </div>
            </TabsContent>

            {Object.entries(groupedProperties).map(([status, statusProperties]) => (
              <TabsContent key={status} value={status}>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
                }>
                  {statusProperties.map((property) => (
                    <PropertyManagementCard
                      key={property.id}
                      property={property}
                      onPropertyUpdate={refetch}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Modals */}
        <AddPropertyModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handlePropertyAdded}
        />

        {editingProperty && (
          <EditPropertyModal
            property={editingProperty}
            isOpen={!!editingProperty}
            onClose={() => setEditingProperty(null)}
            onSuccess={handlePropertyUpdated}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyManagement;
