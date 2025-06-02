
import { Card, CardContent } from '@/components/ui/card';

interface PropertyAmenitiesProps {
  amenities: string[];
}

const PropertyAmenities = ({ amenities }: PropertyAmenitiesProps) => {
  return (
    <Card>
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Villa Features & Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
              <span className="text-gray-800 font-medium">{amenity}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyAmenities;
