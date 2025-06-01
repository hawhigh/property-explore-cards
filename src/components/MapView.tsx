
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

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
  latitude: number;
  longitude: number;
}

interface MapViewProps {
  properties: Property[];
}

const MapView = ({ properties }: MapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
      {/* Placeholder Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            {/* Street grid pattern */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Property Markers */}
      <div className="absolute inset-0 p-4">
        {properties.map((property, index) => {
          // Simple positioning based on index for demo
          const left = 20 + (index % 3) * 25 + Math.random() * 10;
          const top = 20 + Math.floor(index / 3) * 25 + Math.random() * 10;
          
          return (
            <div
              key={property.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
              onClick={() => setSelectedProperty(property)}
            >
              <div className="relative">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg hover:bg-blue-700 transition-colors">
                  {formatPrice(property.price)}
                </div>
                <MapPin className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-6 w-6 text-blue-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Property Detail Card */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <Card className="shadow-xl">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{selectedProperty.title}</h3>
                    <button
                      onClick={() => setSelectedProperty(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedProperty.address}, {selectedProperty.city}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>{selectedProperty.bedrooms} beds</span>
                    <span>{selectedProperty.bathrooms} baths</span>
                    <span>{selectedProperty.sqft.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-600">
                      {formatPrice(selectedProperty.price)}
                    </Badge>
                    <Badge variant="outline">
                      {selectedProperty.propertyType}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="bg-white p-2 rounded shadow hover:bg-gray-50 transition-colors">
          <span className="text-lg font-bold">+</span>
        </button>
        <button className="bg-white p-2 rounded shadow hover:bg-gray-50 transition-colors">
          <span className="text-lg font-bold">−</span>
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow">
        <h4 className="font-semibold text-sm mb-2">Map View</h4>
        <p className="text-xs text-gray-600">
          Click on price markers to view property details
        </p>
      </div>
    </div>
  );
};

export default MapView;
