
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const PropertyPerformanceChart = () => {
  // Mock data for demonstration
  const revenueData = [
    { month: 'Jan', revenue: 2400, bookings: 8 },
    { month: 'Feb', revenue: 1398, bookings: 5 },
    { month: 'Mar', revenue: 9800, bookings: 12 },
    { month: 'Apr', revenue: 3908, bookings: 9 },
    { month: 'May', revenue: 4800, bookings: 11 },
    { month: 'Jun', revenue: 3800, bookings: 8 }
  ];

  const occupancyData = [
    { month: 'Jan', occupancy: 85 },
    { month: 'Feb', occupancy: 72 },
    { month: 'Mar', occupancy: 95 },
    { month: 'Apr', occupancy: 88 },
    { month: 'May', occupancy: 92 },
    { month: 'Jun', occupancy: 78 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue (€)" />
              <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} name="Bookings" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Occupancy Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="occupancy" fill="#8b5cf6" name="Occupancy %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyPerformanceChart;
