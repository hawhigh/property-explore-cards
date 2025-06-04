
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
}

interface EmailComposerProps {
  emailSubject: string;
  setEmailSubject: (subject: string) => void;
  emailContent: string;
  setEmailContent: (content: string) => void;
  emailTemplate: string;
  setEmailTemplate: (template: string) => void;
  targetAudience: string;
  setTargetAudience: (audience: string) => void;
  emailTemplates: EmailTemplate[];
  onTemplateChange: (templateId: string) => void;
  onSendEmail: () => void;
}

const EmailComposer = ({
  emailSubject,
  setEmailSubject,
  emailContent,
  setEmailContent,
  emailTemplate,
  targetAudience,
  setTargetAudience,
  emailTemplates,
  onTemplateChange,
  onSendEmail
}: EmailComposerProps) => {
  return (
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
          <Select value={emailTemplate} onValueChange={onTemplateChange}>
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

        <Button onClick={onSendEmail} className="w-full">
          <Send className="h-4 w-4 mr-2" />
          Send Email
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmailComposer;
