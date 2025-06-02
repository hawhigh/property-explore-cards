
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/property';
import { usePropertyForm } from '@/hooks/usePropertyForm';
import PropertyBasicInfo from '@/components/property/PropertyBasicInfo';
import PropertyDetails from '@/components/property/PropertyDetails';
import PropertyLocation from '@/components/property/PropertyLocation';
import PropertyAmenitiesForm from '@/components/property/PropertyAmenitiesForm';

interface EditPropertyModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditPropertyModal = ({ property, isOpen, onClose, onSuccess }: EditPropertyModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { formData, setFormData } = usePropertyForm(property);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const amenitiesArray = formData.amenities.split(',').map(a => a.trim()).filter(Boolean);
      const imagesArray = formData.images.split(',').map(i => i.trim()).filter(Boolean);

      const { error } = await supabase
        .from('properties')
        .update({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          sqft: parseInt(formData.sqft),
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code,
          property_type: formData.property_type,
          year_built: formData.year_built ? parseInt(formData.year_built) : null,
          amenities: amenitiesArray,
          images: imagesArray.length > 0 ? imagesArray : ['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'],
          status: formData.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', property.id);

      if (error) throw error;

      toast({
        title: "Property Updated",
        description: "Your property has been successfully updated.",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <PropertyBasicInfo formData={formData} setFormData={setFormData} />
          <PropertyDetails formData={formData} setFormData={setFormData} />
          <PropertyLocation formData={formData} setFormData={setFormData} />
          <PropertyAmenitiesForm formData={formData} setFormData={setFormData} />

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Updating...' : 'Update Property'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPropertyModal;
