
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Clock, CheckCircle, Users, Heart, Zap } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  trigger: string;
  timing: string;
  subject: string;
  previewText: string;
  category: 'booking' | 'stay' | 'post_stay' | 'marketing';
  active: boolean;
}

const EmailAutomation = () => {
  const [templates] = useState<EmailTemplate[]>([
    {
      id: 'booking_confirmation',
      name: 'Booking Confirmation',
      trigger: 'Booking submitted',
      timing: 'Immediate',
      subject: '🎉 Your Villa Lucilla booking is confirmed!',
      previewText: 'Welcome to paradise! Your booking details and next steps...',
      category: 'booking',
      active: true
    },
    {
      id: 'pre_arrival',
      name: 'Pre-Arrival Guide',
      trigger: '3 days before check-in',
      timing: '3 days before',
      subject: '🏖️ Almost time for your Cyprus getaway!',
      previewText: 'Check-in details, local recommendations, and special offers...',
      category: 'stay',
      active: true
    },
    {
      id: 'arrival_day',
      name: 'Arrival Day Welcome',
      trigger: 'Check-in day',
      timing: 'Morning of arrival',
      subject: '🌟 Welcome to Villa Lucilla!',
      previewText: 'Your villa is ready! WiFi password, emergency contacts...',
      category: 'stay',
      active: true
    },
    {
      id: 'mid_stay',
      name: 'Mid-Stay Check-in',
      trigger: 'Day 3 of stay',
      timing: 'Day 3 morning',
      subject: '💫 How are you enjoying Villa Lucilla?',
      previewText: 'Quick check-in and local activity recommendations...',
      category: 'stay',
      active: true
    },
    {
      id: 'checkout_reminder',
      name: 'Check-out Reminder',
      trigger: '1 day before departure',
      timing: '1 day before',
      subject: '🧳 Check-out information for tomorrow',
      previewText: 'Check-out procedures and feedback request...',
      category: 'stay',
      active: true
    },
    {
      id: 'post_stay_review',
      name: 'Review Request',
      trigger: '2 days after departure',
      timing: '2 days after',
      subject: '⭐ How was your Villa Lucilla experience?',
      previewText: 'Share your experience and get a special offer...',
      category: 'post_stay',
      active: true
    },
    {
      id: 'return_guest_offer',
      name: 'Return Guest Special',
      trigger: '6 months after stay',
      timing: '6 months later',
      subject: '💕 We miss you! Special offer inside',
      previewText: 'Exclusive 15% discount for returning guests...',
      category: 'marketing',
      active: true
    }
  ]);

  const categoryIcons = {
    booking: <CheckCircle className="h-4 w-4" />,
    stay: <Heart className="h-4 w-4" />,
    post_stay: <Users className="h-4 w-4" />,
    marketing: <Zap className="h-4 w-4" />
  };

  const categoryColors = {
    booking: 'bg-green-100 text-green-700',
    stay: 'bg-blue-100 text-blue-700',
    post_stay: 'bg-purple-100 text-purple-700',
    marketing: 'bg-orange-100 text-orange-700'
  };

  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) acc[template.category] = [];
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, EmailTemplate[]>);

  const stats = {
    totalEmails: 156,
    openRate: 68.5,
    clickRate: 12.3,
    conversionRate: 8.7
  };

  return (
    <div className="space-y-6">
      {/* Email Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-semibold">{stats.totalEmails}</div>
                <div className="text-sm text-gray-600">Emails Sent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <div className="font-semibold">{stats.openRate}%</div>
                <div className="text-sm text-gray-600">Open Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <div className="font-semibold">{stats.clickRate}%</div>
                <div className="text-sm text-gray-600">Click Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <div>
                <div className="font-semibold">{stats.conversionRate}%</div>
                <div className="text-sm text-gray-600">Conversion</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Automated Email Sequences
          </CardTitle>
          <p className="text-sm text-gray-600">
            Professional email automation to delight guests and drive repeat business
          </p>
        </CardHeader>
        <CardContent>
          {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
            <div key={category} className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                {categoryIcons[category as keyof typeof categoryIcons]}
                {category.replace('_', ' ').toUpperCase()}
              </h3>
              
              <div className="space-y-3">
                {categoryTemplates.map(template => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{template.name}</h4>
                          <Badge className={categoryColors[template.category]}>
                            {template.category.replace('_', ' ')}
                          </Badge>
                          {template.active && (
                            <Badge className="bg-green-100 text-green-700">
                              Active
                            </Badge>
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Subject:</strong> {template.subject}
                        </div>
                        
                        <div className="text-sm text-gray-500 mb-3">
                          {template.previewText}
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {template.timing}
                          </div>
                          <div>Trigger: {template.trigger}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Preview</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start" variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Send Custom Email to All Guests
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Email Marketing Campaign
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            Create New Email Template
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailAutomation;
