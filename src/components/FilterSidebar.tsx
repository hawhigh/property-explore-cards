
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [bedrooms, setBedrooms] = useState<string>('any');
  const [bathrooms, setBathrooms] = useState<string>('any');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenitiesList = [
    'Pool', 'Gym', 'Parking', 'Pet Friendly', 'Concierge', 
    'Rooftop', 'Garden', 'Fireplace', 'Garage', 'Valet'
  ];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const updated = checked
      ? [...selectedAmenities, amenity]
      : selectedAmenities.filter(a => a !== amenity);
    setSelectedAmenities(updated);
    updateFilters({ amenities: updated });
  };

  const updateFilters = (newFilters: any = {}) => {
    const filters = {
      priceRange,
      bedrooms: bedrooms === 'any' ? null : parseInt(bedrooms),
      bathrooms: bathrooms === 'any' ? null : parseInt(bathrooms),
      propertyType,
      amenities: selectedAmenities,
      ...newFilters
    };
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setPriceRange([0, 2000000]);
    setBedrooms('any');
    setBathrooms('any');
    setPropertyType('all');
    setSelectedAmenities([]);
    onFilterChange({});
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Price Range
          </label>
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value);
              updateFilters({ priceRange: value });
            }}
            max={2000000}
            min={0}
            step={50000}
            className="mb-3"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Bedrooms
          </label>
          <Select value={bedrooms} onValueChange={(value) => {
            setBedrooms(value);
            updateFilters({ bedrooms: value === 'any' ? null : parseInt(value) });
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Bathrooms
          </label>
          <Select value={bathrooms} onValueChange={(value) => {
            setBathrooms(value);
            updateFilters({ bathrooms: value === 'any' ? null : parseInt(value) });
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Property Type
          </label>
          <Select value={propertyType} onValueChange={(value) => {
            setPropertyType(value);
            updateFilters({ propertyType: value });
          }}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Amenities
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, !!checked)}
                />
                <label htmlFor={amenity} className="text-sm text-gray-700 cursor-pointer">
                  {amenity}
                </label>
              </div>
            ))}
          </div>
          
          {selectedAmenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {selectedAmenities.map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
