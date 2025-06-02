
import { Trees, MapPin, Car } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PropertyLocationHighlights = () => {
  return (
    <Card>
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Location Highlights</h2>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <Trees className="h-5 w-5 text-green-600" />
            <span>Surrounded by vineyards and olive groves in the heart of Tuscany</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span>15 minutes to Montalcino town center and world-famous wineries</span>
          </div>
          <div className="flex items-center gap-3">
            <Car className="h-5 w-5 text-gray-600" />
            <span>45 minutes to Siena, 1.5 hours to Florence</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyLocationHighlights;
