
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, Bath } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  address: string;
  city: string;
  state: string;
  images: string[];
  propertyType: string;
  amenities: string[];
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={property.images?.[0] || '/placeholder.svg'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-blue-600 text-white">
            {property.propertyType}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white text-gray-900 font-bold">
            {formatPrice(property.price)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.address}, {property.city}, {property.state}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-1" />
            {property.bedrooms || 0} beds
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {property.bathrooms || 0} baths
          </div>
          {property.sqft && (
            <span>{property.sqft.toLocaleString()} sqft</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {property.amenities?.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {property.amenities && property.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{property.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
