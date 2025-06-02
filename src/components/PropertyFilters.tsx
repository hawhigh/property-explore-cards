
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface PropertyFiltersProps {
  onFiltersChange: (filters: any) => void;
  totalCount: number;
}

const PropertyFilters = ({ onFiltersChange, totalCount }: PropertyFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = () => {
    const filters = {
      search: searchTerm,
      status: statusFilter !== 'all' ? statusFilter : null,
      propertyType: typeFilter !== 'all' ? typeFilter : null,
      priceMin: priceRange.min ? parseFloat(priceRange.min) : null,
      priceMax: priceRange.max ? parseFloat(priceRange.max) : null,
    };

    // Update active filters for display
    const active = [];
    if (searchTerm) active.push(`Search: ${searchTerm}`);
    if (statusFilter !== 'all') active.push(`Status: ${statusFilter}`);
    if (typeFilter !== 'all') active.push(`Type: ${typeFilter}`);
    if (priceRange.min) active.push(`Min: $${priceRange.min}`);
    if (priceRange.max) active.push(`Max: $${priceRange.max}`);
    
    setActiveFilters(active);
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setPriceRange({ min: '', max: '' });
    setActiveFilters([]);
    onFiltersChange({});
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Property Filters
            <span className="text-sm font-normal text-gray-500">({totalCount} properties)</span>
          </div>
          {activeFilters.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div>
            <Label htmlFor="search">Search Properties</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="search"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Type Filter */}
          <div>
            <Label htmlFor="type">Property Type</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Resort Villa">Resort Villa</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Condo">Condo</SelectItem>
                <SelectItem value="Townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Label>Price Range</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              />
              <Input
                placeholder="Max"
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary">
                {filter}
              </Badge>
            ))}
          </div>
          <Button onClick={handleFilterChange}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;
