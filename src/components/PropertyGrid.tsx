
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import PropertyCard from './PropertyCard';
import PropertyEmptyState from './PropertyEmptyState';
import PropertyLoadingGrid from './PropertyLoadingGrid';
import { usePropertyGrid } from '@/hooks/usePropertyGrid';
import { usePropertyActions } from '@/hooks/usePropertyActions';

interface PropertyGridProps {
  filters?: any;
}

const PropertyGrid = ({ filters }: PropertyGridProps) => {
  const { data: properties = [], isLoading, refetch } = usePropertyGrid({ filters });
  const { createSampleProperty, toggleFavorite } = usePropertyActions(refetch);

  if (isLoading) {
    return <PropertyLoadingGrid />;
  }

  if (properties.length === 0) {
    return <PropertyEmptyState onCreateSample={createSampleProperty} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="relative">
          <Link to={`/property-view/${property.id}`}>
            <PropertyCard 
              property={{
                ...property,
                propertyType: property.property_type
              }} 
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 ${property.is_favorited ? 'text-red-500' : 'text-gray-400'}`}
            onClick={() => toggleFavorite(property.id, property.is_favorited || false)}
          >
            <Heart className={`h-5 w-5 ${property.is_favorited ? 'fill-current' : ''}`} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;
