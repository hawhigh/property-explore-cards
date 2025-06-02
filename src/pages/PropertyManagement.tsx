
import Header from '@/components/Header';
import PropertyFilters from '@/components/PropertyFilters';
import AddPropertyModal from '@/components/AddPropertyModal';
import EditPropertyModal from '@/components/EditPropertyModal';
import PropertyManagementHeader from '@/components/property-management/PropertyManagementHeader';
import PropertyEmptyState from '@/components/property-management/PropertyEmptyState';
import PropertyTabs from '@/components/property-management/PropertyTabs';
import PropertyLoadingState from '@/components/property-management/PropertyLoadingState';
import { usePropertyManagement } from '@/hooks/usePropertyManagement';

const PropertyManagement = () => {
  const {
    user,
    properties,
    isLoading,
    showAddModal,
    setShowAddModal,
    editingProperty,
    setEditingProperty,
    filters,
    setFilters,
    viewMode,
    setViewMode,
    groupedProperties,
    handlePropertyUpdated,
    handlePropertyAdded
  } = usePropertyManagement();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <PropertyManagementHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          onAddProperty={() => setShowAddModal(true)}
        />

        <PropertyFilters onFiltersChange={setFilters} totalCount={properties.length} />

        {isLoading ? (
          <PropertyLoadingState />
        ) : properties.length === 0 ? (
          <PropertyEmptyState
            hasFilters={Object.keys(filters).length > 0}
            onAddProperty={() => setShowAddModal(true)}
          />
        ) : (
          <PropertyTabs
            properties={properties}
            groupedProperties={groupedProperties}
            viewMode={viewMode}
            onPropertyUpdate={handlePropertyUpdated}
          />
        )}

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
