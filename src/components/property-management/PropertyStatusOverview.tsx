
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Settings, 
  Calendar, 
  DollarSign, 
  Users, 
  CheckCircle
} from 'lucide-react';

interface PropertyStatusOverviewProps {
  property: any;
}

const PropertyStatusOverview = ({ property }: PropertyStatusOverviewProps) => {
  return (
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
  );
};

export default PropertyStatusOverview;
