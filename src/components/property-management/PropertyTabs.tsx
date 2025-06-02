
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyManagementCard from '@/components/PropertyManagementCard';

interface PropertyTabsProps {
  properties: any[];
  groupedProperties: Record<string, any[]>;
  viewMode: 'grid' | 'list';
  onPropertyUpdate: () => void;
}

const PropertyTabs = ({ 
  properties, 
  groupedProperties, 
  viewMode, 
  onPropertyUpdate 
}: PropertyTabsProps) => {
  const gridClasses = viewMode === 'grid' 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    : "space-y-4";

  return (
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
        <div className={gridClasses}>
          {properties.map((property) => (
            <PropertyManagementCard
              key={property.id}
              property={property}
              onPropertyUpdate={onPropertyUpdate}
            />
          ))}
        </div>
      </TabsContent>

      {Object.entries(groupedProperties).map(([status, statusProperties]) => (
        <TabsContent key={status} value={status}>
          <div className={gridClasses}>
            {statusProperties.map((property) => (
              <PropertyManagementCard
                key={property.id}
                property={property}
                onPropertyUpdate={onPropertyUpdate}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default PropertyTabs;
