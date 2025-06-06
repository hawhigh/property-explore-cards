
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  Calendar, 
  DollarSign, 
  Users, 
  Camera, 
  MapPin, 
  Wifi,
  Car,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PropertyOperationsPanelProps {
  property: any;
  onPropertyUpdate: () => void;
}

const PropertyOperationsPanel = ({ property, onPropertyUpdate }: PropertyOperationsPanelProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('availability');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuickUpdate = async (field: string, value: any) => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Property Updated",
        description: `${field} has been updated successfully.`,
      });
      
      onPropertyUpdate();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Property Operations - {property.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-xs text-gray-600">Active & Available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Next Booking</p>
                <p className="text-xs text-gray-600">Mar 15, 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Monthly Revenue</p>
                <p className="text-xs text-gray-600">€{property.price * 3}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Occupancy</p>
                <p className="text-xs text-gray-600">78% this month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operations Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Availability Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Instant Booking</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Accept Bookings</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum Stay (nights)</Label>
                    <Input type="number" defaultValue="2" className="w-20" />
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Stay (nights)</Label>
                    <Input type="number" defaultValue="30" className="w-20" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Blocked Dates</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Dec 24-26, 2024</span>
                      <Badge variant="secondary">Holiday</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Jan 15-20, 2025</span>
                      <Badge variant="destructive">Maintenance</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dynamic Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Base Price per Night</Label>
                    <div className="flex items-center">
                      <span className="text-lg font-bold">€</span>
                      <Input 
                        type="number" 
                        defaultValue={property.price} 
                        className="ml-1"
                        onBlur={(e) => handleQuickUpdate('price', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Weekend Premium (%)</Label>
                    <Input type="number" defaultValue="25" />
                  </div>
                  <div className="space-y-2">
                    <Label>Holiday Premium (%)</Label>
                    <Input type="number" defaultValue="50" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Pricing Rules</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="text-sm font-medium">Last Minute (7 days)</p>
                        <p className="text-xs text-gray-500">15% discount</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="text-sm font-medium">Long Stay (7+ nights)</p>
                        <p className="text-xs text-gray-500">10% discount</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance & Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Active Issues</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-red-50">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Pool Filter</p>
                        <p className="text-xs text-gray-500">Reported 2 days ago</p>
                      </div>
                      <Badge variant="destructive">High</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-yellow-50">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Garden Maintenance</p>
                        <p className="text-xs text-gray-500">Scheduled for next week</p>
                      </div>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Report New Issue
                  </Button>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Maintenance Schedule</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium">Deep Cleaning</p>
                        <Badge variant="outline">Monthly</Badge>
                      </div>
                      <p className="text-xs text-gray-500">Next: March 1st, 2024</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium">HVAC Service</p>
                        <Badge variant="outline">Quarterly</Badge>
                      </div>
                      <p className="text-xs text-gray-500">Next: April 15th, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyOperationsPanel;
