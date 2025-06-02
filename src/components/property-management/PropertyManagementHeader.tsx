
import { Button } from '@/components/ui/button';
import { Plus, LayoutGrid, List } from 'lucide-react';

interface PropertyManagementHeaderProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  onAddProperty: () => void;
}

const PropertyManagementHeader = ({ 
  viewMode, 
  setViewMode, 
  onAddProperty 
}: PropertyManagementHeaderProps) => {
  return (
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
        <Button onClick={onAddProperty} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>
    </div>
  );
};

export default PropertyManagementHeader;
