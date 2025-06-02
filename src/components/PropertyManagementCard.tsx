
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MapPin, DollarSign, Home, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Property } from '@/types/property';
import EditPropertyModal from '@/components/EditPropertyModal';

interface PropertyManagementCardProps {
  property: Property;
  onPropertyUpdate: () => void;
}

const PropertyManagementCard = ({ property, onPropertyUpdate }: PropertyManagementCardProps) => {
  const { toast } = useToast();
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', property.id);

      if (error) throw error;

      toast({
        title: "Property Deleted",
        description: "Your property has been successfully deleted.",
      });
      
      onPropertyUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'rented': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{property.title}</CardTitle>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.city}, {property.state}</span>
              </div>
            </div>
            <Badge className={getStatusColor(property.status)}>
              {property.status}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                <span className="font-semibold">${property.price?.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  <span>{property.bedrooms}bd/{property.bathrooms}ba</span>
                </div>
                {property.sqft && (
                  <span>{property.sqft.toLocaleString()} sqft</span>
                )}
              </div>
            </div>
            
            {property.year_built && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Built in {property.year_built}</span>
              </div>
            )}
            
            <div className="flex gap-2 pt-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowEditModal(true)}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleDelete}
                disabled={loading}
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditPropertyModal
        property={property}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={() => {
          setShowEditModal(false);
          onPropertyUpdate();
        }}
      />
    </>
  );
};

export default PropertyManagementCard;
