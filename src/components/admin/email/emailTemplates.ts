
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
}

export const emailTemplates: EmailTemplate[] = [
  { id: 'welcome', name: 'Welcome Email', subject: 'Welcome to our platform!' },
  { id: 'booking_confirmation', name: 'Booking Confirmation', subject: 'Your booking is confirmed' },
  { id: 'payment_reminder', name: 'Payment Reminder', subject: 'Payment due reminder' },
  { id: 'newsletter', name: 'Newsletter', subject: 'Monthly newsletter' },
  { id: 'custom', name: 'Custom Email', subject: '' }
];

export const getTemplateContent = (templateId: string): string => {
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
