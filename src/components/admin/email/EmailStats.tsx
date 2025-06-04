
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Users, TrendingUp, FileText } from 'lucide-react';

interface EmailStatsProps {
  emailsSent: number;
  totalRecipients: number;
  avgOpenRate: string;
  templatesCount: number;
}

const EmailStats = ({ emailsSent, totalRecipients, avgOpenRate, templatesCount }: EmailStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{emailsSent}</p>
              <p className="text-sm text-gray-600">Emails Sent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{totalRecipients.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Recipients</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">{avgOpenRate}</p>
              <p className="text-sm text-gray-600">Avg Open Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">{templatesCount}</p>
              <p className="text-sm text-gray-600">Templates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailStats;
