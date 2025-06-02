
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';

interface PropertyEmptyStateProps {
  onCreateSample: () => void;
}

const PropertyEmptyState = ({ onCreateSample }: PropertyEmptyStateProps) => {
  const { user } = useAuth();

  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
        <p className="text-gray-600 mb-6">
          There are currently no active properties in the system.
        </p>
        {user && (
          <div className="space-y-3">
            <Button 
              onClick={onCreateSample}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Sample Villa Property
            </Button>
            <p className="text-sm text-gray-500">
              This will create a sample Villa Lucilla property for testing
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyEmptyState;
