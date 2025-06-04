
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import EmailStats from './email/EmailStats';
import EmailComposer from './email/EmailComposer';
import EmailAnalytics from './email/EmailAnalytics';
import EmailHistory from './email/EmailHistory';
import { emailTemplates, getTemplateContent } from './email/emailTemplates';

const EmailManagement = () => {
  const { toast } = useToast();
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('custom');
  const [targetAudience, setTargetAudience] = useState('all');

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
      <EmailStats
        emailsSent={emailHistory.length}
        totalRecipients={1251}
        avgOpenRate="56%"
        templatesCount={emailTemplates.length - 1}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmailComposer
          emailSubject={emailSubject}
          setEmailSubject={setEmailSubject}
          emailContent={emailContent}
          setEmailContent={setEmailContent}
          emailTemplate={emailTemplate}
          setEmailTemplate={setEmailTemplate}
          targetAudience={targetAudience}
          setTargetAudience={setTargetAudience}
          emailTemplates={emailTemplates}
          onTemplateChange={handleTemplateChange}
          onSendEmail={handleSendEmail}
        />

        <EmailAnalytics
          emailHistory={emailHistory}
          getStatusBadgeVariant={getStatusBadgeVariant}
        />
      </div>

      <EmailHistory
        emailHistory={emailHistory}
        getStatusBadgeVariant={getStatusBadgeVariant}
      />
    </div>
  );
};

export default EmailManagement;
