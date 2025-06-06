
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Camera, 
  MapPin
} from 'lucide-react';

interface PropertySettingsTabProps {
  property: any;
}

const PropertySettingsTab = ({ property }: PropertySettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Property Status</Label>
              <Select defaultValue={property.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label>Featured Property</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Allow Reviews</Label>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              Update Photos
            </Button>
            <Button variant="outline" className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              Edit Location
            </Button>
            <Button variant="destructive" className="w-full">
              Deactivate Property
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertySettingsTab;
