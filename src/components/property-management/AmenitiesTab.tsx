
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  Wifi,
  Car,
  Shield
} from 'lucide-react';

const AmenitiesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Amenities & Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Essential</h4>
            <div className="space-y-2">
              {[
                { icon: Wifi, label: 'WiFi', enabled: true },
                { icon: Car, label: 'Parking', enabled: true },
                { icon: Shield, label: 'Security', enabled: false }
              ].map((amenity, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <amenity.icon className="h-4 w-4" />
                    <span className="text-sm">{amenity.label}</span>
                  </div>
                  <Switch defaultChecked={amenity.enabled} />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Comfort</h4>
            <div className="space-y-2">
              {['Air Conditioning', 'Heating', 'Kitchen', 'Washer'].map((amenity, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{amenity}</span>
                  <Switch defaultChecked={index < 3} />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Entertainment</h4>
            <div className="space-y-2">
              {['TV', 'Pool', 'Garden', 'Gym'].map((amenity, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{amenity}</span>
                  <Switch defaultChecked={index === 1} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmenitiesTab;
