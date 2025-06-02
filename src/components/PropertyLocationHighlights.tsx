
import { Trees, MapPin, Car, Waves } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PropertyLocationHighlights = () => {
  return (
    <Card>
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Location Highlights</h2>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <Waves className="h-5 w-5 text-blue-600" />
            <span>Walking distance to beautiful Mimosa Beach</span>
          </div>
          <div className="flex items-center gap-3">
            <Waves className="h-5 w-5 text-blue-600" />
            <span>Close to Fig Tree Beach - perfect for swimming and relaxation</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span>Located in Protaras, Famagusta District, Cyprus</span>
          </div>
          <div className="flex items-center gap-3">
            <Car className="h-5 w-5 text-gray-600" />
            <span>Easy access to explore Cyprus's beautiful coastline and attractions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyLocationHighlights;
