
import { useState } from 'react';
import { Heart, MapPin, Home, Bath, Users, Waves, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PropertyHeaderProps {
  property: {
    title: string;
    propertyType: string;
    address: string;
    city: string;
    state: string;
    country: string;
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    poolSize: string;
    price: number;
    rating: number;
    reviews: number;
    yearBuilt: number;
    renovated: number;
    groundsSize: string;
  };
}

const PropertyHeader = ({ property }: PropertyHeaderProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-4xl font-bold text-gray-900">{property.title}</h1>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 px-3 py-1">
            {property.propertyType}
          </Badge>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          <span className="text-lg">{property.address}, {property.city}, {property.state}, {property.country}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-600 mb-6">
          <div className="flex items-center">
            <Home className="h-5 w-5 mr-2 text-blue-600" />
            <span className="font-medium">{property.bedrooms} bedrooms</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-5 w-5 mr-2 text-blue-600" />
            <span className="font-medium">{property.bathrooms} bathrooms</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            <span className="font-medium">Up to {property.maxGuests} guests</span>
          </div>
          <div className="flex items-center">
            <Waves className="h-5 w-5 mr-2 text-blue-600" />
            <span className="font-medium">Pool {property.poolSize}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="text-4xl font-bold text-blue-600">
            {formatPrice(property.price)}
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
            <span className="text-xl font-semibold">{property.rating}</span>
            <span className="text-gray-600">({property.reviews} reviews)</span>
          </div>
        </div>

        <div className="text-gray-600">
          <span className="font-medium">Built:</span> {property.yearBuilt} • <span className="font-medium">Renovated:</span> {property.renovated} • <span className="font-medium">Grounds:</span> {property.groundsSize}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleFavorite}
        className={`${isFavorited ? 'text-red-500' : 'text-gray-400'} hover:bg-red-50`}
      >
        <Heart className={`h-8 w-8 ${isFavorited ? 'fill-current' : ''}`} />
      </Button>
    </div>
  );
};

export default PropertyHeader;
