
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';

const AvailabilityTab = () => {
  return (
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
  );
};

export default AvailabilityTab;
