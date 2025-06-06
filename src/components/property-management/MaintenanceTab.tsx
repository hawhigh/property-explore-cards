
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle,
  Clock
} from 'lucide-react';

const MaintenanceTab = () => {
  return (
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
  );
};

export default MaintenanceTab;
