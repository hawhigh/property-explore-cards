
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface EmailHistoryItem {
  id: number;
  subject: string;
  recipients: number;
  sent: string;
  status: string;
  openRate: string;
  clickRate: string;
}

interface EmailAnalyticsProps {
  emailHistory: EmailHistoryItem[];
  getStatusBadgeVariant: (status: string) => "default" | "secondary" | "destructive" | "outline";
}

const EmailAnalytics = ({ emailHistory, getStatusBadgeVariant }: EmailAnalyticsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Email Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">56%</p>
              <p className="text-sm text-gray-600">Average Open Rate</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">12%</p>
              <p className="text-sm text-gray-600">Click-through Rate</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Recent Campaigns</h4>
            {emailHistory.slice(0, 3).map((email) => (
              <div key={email.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-medium text-sm">{email.subject}</h5>
                  <Badge variant={getStatusBadgeVariant(email.status)}>
                    {email.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Recipients: {email.recipients}</p>
                  <p>Open Rate: {email.openRate} | Click Rate: {email.clickRate}</p>
                  <p>Sent: {email.sent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailAnalytics;
