
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PropertyStatusOverview from './PropertyStatusOverview';
import AvailabilityTab from './AvailabilityTab';
import PricingTab from './PricingTab';
import AmenitiesTab from './AmenitiesTab';
import MaintenanceTab from './MaintenanceTab';
import PropertySettingsTab from './PropertySettingsTab';

interface PropertyOperationsPanelProps {
  property: any;
  onPropertyUpdate: () => void;
}

const PropertyOperationsPanel = ({ property, onPropertyUpdate }: PropertyOperationsPanelProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('availability');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuickUpdate = async (field: string, value: any) => {
    if (!property?.id) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('properties')
        .update({ [field]: value })
        .eq('id', property.id);

      if (error) throw error;

      toast({
        title: "Property Updated",
        description: `${field} has been updated successfully.`,
      });
      
      // Force refresh of all property data
      onPropertyUpdate();
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast({
        title: "Update Failed",
        description: `Failed to update ${field}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Status Overview */}
      <PropertyStatusOverview property={property} />

      {/* Operations Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="availability" className="space-y-4">
          <AvailabilityTab />
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <PricingTab property={property} onQuickUpdate={handleQuickUpdate} />
        </TabsContent>

        <TabsContent value="amenities" className="space-y-4">
          <AmenitiesTab />
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <MaintenanceTab />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <PropertySettingsTab property={property} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyOperationsPanel;
