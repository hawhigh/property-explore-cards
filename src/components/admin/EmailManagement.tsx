
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Send, Users, FileText, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmailManagement = () => {
  const { toast } = useToast();
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('custom');
  const [targetAudience, setTargetAudience] = useState('all');

  const emailTemplates = [
    { id: 'welcome', name: 'Welcome Email', subject: 'Welcome to our platform!' },
    { id: 'booking_confirmation', name: 'Booking Confirmation', subject: 'Your booking is confirmed' },
    { id: 'payment_reminder', name: 'Payment Reminder', subject: 'Payment due reminder' },
    { id: 'newsletter', name: 'Newsletter', subject: 'Monthly newsletter' },
    { id: 'custom', name: 'Custom Email', subject: '' }
  ];

  const emailHistory = [
    {
      id: 1,
      subject: 'Welcome to Villa Rentals',
      recipients: 45,
      sent: '2024-01-15 10:30 AM',
      status: 'delivered',
      openRate: '68%',
      clickRate: '12%'
    },
    {
      id: 2,
      subject: 'Special Winter Offers',
      recipients: 1205,
      sent: '2024-01-14 02:15 PM',
      status: 'delivered',
      openRate: '45%',
      clickRate: '8%'
    },
    {
      id: 3,
      subject: 'Booking Confirmation #12345',
      recipients: 1,
      sent: '2024-01-14 11:20 AM',
      status: 'delivered',
      openRate: '100%',
      clickRate: '25%'
    }
  ];

  const handleTemplateChange = (templateId: string) => {
    setEmailTemplate(templateId);
    const template = emailTemplates.find(t => t.id === templateId);
    if (template && template.subject) {
      setEmailSubject(template.subject);
    }
    if (templateId !== 'custom') {
      setEmailContent(getTemplateContent(templateId));
    }
  };

  const getTemplateContent = (templateId: string) => {
    switch (templateId) {
      case 'welcome':
        return 'Welcome to our platform! We\'re excited to have you join our community...';
      case 'booking_confirmation':
        return 'Your booking has been confirmed. Here are the details...';
      case 'payment_reminder':
        return 'This is a friendly reminder that your payment is due...';
      case 'newsletter':
        return 'Here\'s what\'s new this month...';
      default:
        return '';
    }
  };

  const handleSendEmail = () => {
    if (!emailSubject.trim() || !emailContent.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both subject and content fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send the email via API
    toast({
      title: "Email Sent",
      description: `Email sent to ${targetAudience} successfully.`,
    });

    // Reset form
    setEmailSubject('');
    setEmailContent('');
    setEmailTemplate('custom');
    setTargetAudience('all');
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{emailHistory.length}</p>
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
                <p className="text-2xl font-bold">1,251</p>
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
                <p className="text-2xl font-bold">56%</p>
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
                <p className="text-2xl font-bold">{emailTemplates.length - 1}</p>
                <p className="text-sm text-gray-600">Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compose Email */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Compose Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Template</label>
              <Select value={emailTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {emailTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input
                placeholder="Email subject..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                placeholder="Email content..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={8}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Send To</label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="owners">Property Owners</SelectItem>
                  <SelectItem value="guests">Guests</SelectItem>
                  <SelectItem value="agents">Agents</SelectItem>
                  <SelectItem value="recent">Recent Signups</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSendEmail} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </CardContent>
        </Card>

        {/* Email Analytics */}
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
      </div>

      {/* Email History Table */}
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
    </div>
  );
};

export default EmailManagement;
