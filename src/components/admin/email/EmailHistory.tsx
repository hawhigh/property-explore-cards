
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface EmailHistoryItem {
  id: number;
  subject: string;
  recipients: number;
  sent: string;
  status: string;
  openRate: string;
  clickRate: string;
}

interface EmailHistoryProps {
  emailHistory: EmailHistoryItem[];
  getStatusBadgeVariant: (status: string) => "default" | "secondary" | "destructive" | "outline";
}

const EmailHistory = ({ emailHistory, getStatusBadgeVariant }: EmailHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Open Rate</TableHead>
              <TableHead>Click Rate</TableHead>
              <TableHead>Sent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emailHistory.map((email) => (
              <TableRow key={email.id}>
                <TableCell className="font-medium">{email.subject}</TableCell>
                <TableCell>{email.recipients}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(email.status)}>
                    {email.status}
                  </Badge>
                </TableCell>
                <TableCell>{email.openRate}</TableCell>
                <TableCell>{email.clickRate}</TableCell>
                <TableCell>{email.sent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EmailHistory;
