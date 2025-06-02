
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface PropertyEmptyStateProps {
  hasFilters: boolean;
  onAddProperty: () => void;
}

const PropertyEmptyState = ({ hasFilters, onAddProperty }: PropertyEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
        <p className="text-gray-600 mb-4">
          {hasFilters ? 'No properties match your filters.' : 'You haven\'t added any properties yet.'}
        </p>
        {!hasFilters && (
          <Button onClick={onAddProperty} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Property
          </Button>
        )}
      </div>
    </div>
  );
};

export default PropertyEmptyState;
