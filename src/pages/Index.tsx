
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import PropertyCard from '@/components/PropertyCard';
import FilterSidebar from '@/components/FilterSidebar';
import MapView from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Search, Home } from 'lucide-react';

// Mock data for properties
const mockProperties = [
  {
    id: '1',
    title: 'Modern Downtown Loft',
    price: 650000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    address: '123 Main St, Downtown',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'],
    description: 'Beautiful modern loft in the heart of downtown with stunning city views.',
    amenities: ['Gym', 'Pool', 'Parking', 'Pet Friendly'],
    propertyType: 'Condo',
    yearBuilt: 2018,
    latitude: 37.7749,
    longitude: -122.4194
  },
  {
    id: '2',
    title: 'Charming Family Home',
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    address: '456 Oak Avenue',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94115',
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'],
    description: 'Spacious family home with large backyard and updated kitchen.',
    amenities: ['Garage', 'Garden', 'Fireplace'],
    propertyType: 'House',
    yearBuilt: 1995,
    latitude: 37.7849,
    longitude: -122.4294
  },
  {
    id: '3',
    title: 'Luxury Penthouse',
    price: 1250000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1800,
    address: '789 Hill Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94108',
    images: ['https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'],
    description: 'Stunning penthouse with panoramic views and premium finishes.',
    amenities: ['Concierge', 'Rooftop', 'Valet', 'Pool'],
    propertyType: 'Condo',
    yearBuilt: 2020,
    latitude: 37.7949,
    longitude: -122.4094
  }
];

const Index = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (filters: any) => {
    let filtered = mockProperties;

    if (filters.priceRange) {
      filtered = filtered.filter(
        property => property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms);
    }

    if (filters.bathrooms) {
      filtered = filtered.filter(property => property.bathrooms >= filters.bathrooms);
    }

    if (filters.propertyType && filters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.propertyType.toLowerCase() === filters.propertyType);
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.some((amenity: string) => property.amenities.includes(amenity))
      );
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Find Your Perfect Home</h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover amazing properties in the best neighborhoods
            </p>
            
            {/* Search Bar */}
            <Card className="p-6 bg-white text-gray-900 shadow-xl">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter city, neighborhood, or address..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <Button size="lg" className="px-8">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* View Toggle */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredProperties.length} Properties Found
              </h2>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  onClick={() => setViewMode('map')}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Map
                </Button>
              </div>
            </div>

            {/* Content */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <Link key={property.id} to={`/property/${property.id}`}>
                    <PropertyCard property={property} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="h-[600px] rounded-lg overflow-hidden">
                <MapView properties={filteredProperties} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
