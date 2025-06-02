
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Calendar, Heart, Plus, Settings, BarChart3, MapPin, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface QuickActionsProps {
  isAdmin?: boolean;
}

const QuickActions = ({ isAdmin = false }: QuickActionsProps) => {
  const { user } = useAuth();

  const actions = [
    {
      title: 'Add Property',
      description: 'List a new property',
      icon: Plus,
      href: '/property-management',
      variant: 'default' as const,
    },
    {
      title: 'Manage Properties',
      description: 'Edit your listings',
      icon: Home,
      href: '/property-management',
      variant: 'outline' as const,
    },
    {
      title: 'View Bookings',
      description: 'Check reservations',
      icon: Calendar,
      href: '/dashboard',
      variant: 'outline' as const,
      onClick: () => {
        // Switch to bookings tab
        const bookingsTab = document.querySelector('[data-state="inactive"][value="bookings"]') as HTMLElement;
        bookingsTab?.click();
      }
    },
    {
      title: 'Property Analytics',
      description: 'View performance',
      icon: BarChart3,
      href: '#',
      variant: 'outline' as const,
    },
    {
      title: 'Guest Management',
      description: 'Manage guest info',
      icon: Users,
      href: '#',
      variant: 'outline' as const,
    },
    {
      title: 'Location Settings',
      description: 'Update locations',
      icon: MapPin,
      href: '#',
      variant: 'outline' as const,
    },
  ];

  if (isAdmin) {
    actions.push({
      title: 'Admin Panel',
      description: 'System management',
      icon: Settings,
      href: '/dashboard',
      variant: 'outline' as const,
      onClick: () => {
        const adminTab = document.querySelector('[data-state="inactive"][value="admin"]') as HTMLElement;
        adminTab?.click();
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto flex flex-col items-center justify-center p-4 text-center"
              onClick={() => {
                if (action.onClick) {
                  action.onClick();
                } else if (action.href !== '#') {
                  window.location.href = action.href;
                }
              }}
            >
              <action.icon className="h-6 w-6 mb-2" />
              <div>
                <div className="font-semibold text-sm">{action.title}</div>
                <div className="text-xs opacity-70 mt-1">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
