
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PropertyCard from './PropertyCard';
import AddPropertyForm from './AddPropertyForm';

const MyProperties = () => {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: properties = [], isLoading, refetch } = useQuery({
    queryKey: ['user-properties', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return <div className="animate-pulse">Loading properties...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Properties</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {showAddForm && (
        <AddPropertyForm 
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false);
            refetch();
          }}
        />
      )}

      {properties.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No properties found. Add your first property to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard 
              key={property.id}
              property={{
                ...property,
                propertyType: property.property_type
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
