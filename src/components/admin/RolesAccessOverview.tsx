
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Settings, Eye, Edit, Trash2, Plus, BarChart3 } from 'lucide-react';

const RolesAccessOverview = () => {
  const roles = [
    {
      role: 'admin',
      description: 'Full system access with all administrative privileges',
      color: 'destructive',
      icon: Shield,
      access: [
        'Full user management (create, read, update, delete)',
        'Complete property management across all owners',
        'Booking management for all properties',
        'Content and image management',
        'Email management and analytics',
        'Sales analytics and reporting',
        'System settings and configuration',
        'Role assignment and permissions'
      ]
    },
    {
      role: 'agent',
      description: 'Property management and booking coordination',
      color: 'default',
      icon: Settings,
      access: [
        'Property listing management (own properties)',
        'Booking management (assigned properties)',
        'Guest communication and support',
        'Property analytics and performance',
        'Basic content management',
        'Limited user profile access'
      ]
    },
    {
      role: 'user',
      description: 'Standard user with booking and profile management',
      color: 'secondary',
      icon: Users,
      access: [
        'View and search properties',
        'Create and manage bookings',
        'Profile management',
        'Favorite properties',
        'Review and rating submission',
        'Basic dashboard access'
      ]
    }
  ];

  const permissions = [
    {
      feature: 'User Management',
      admin: { read: true, write: true, delete: true },
      agent: { read: false, write: false, delete: false },
      user: { read: false, write: false, delete: false }
    },
    {
      feature: 'Property Management',
      admin: { read: true, write: true, delete: true },
      agent: { read: true, write: true, delete: false },
      user: { read: true, write: false, delete: false }
    },
    {
      feature: 'Booking Management',
      admin: { read: true, write: true, delete: true },
      agent: { read: true, write: true, delete: false },
      user: { read: true, write: true, delete: false }
    },
    {
      feature: 'Analytics & Reports',
      admin: { read: true, write: true, delete: true },
      agent: { read: true, write: false, delete: false },
      user: { read: false, write: false, delete: false }
    },
    {
      feature: 'Content Management',
      admin: { read: true, write: true, delete: true },
      agent: { read: true, write: true, delete: false },
      user: { read: false, write: false, delete: false }
    },
    {
      feature: 'System Settings',
      admin: { read: true, write: true, delete: true },
      agent: { read: false, write: false, delete: false },
      user: { read: false, write: false, delete: false }
    }
  ];

  const dashboardComparison = {
    dashboard: {
      name: 'Property Owner Dashboard',
      route: '/dashboard',
      purpose: 'Property management and owner analytics',
      features: [
        'Property owner hub with performance metrics',
        'Property listing management',
        'Booking management for owned properties',
        'Property-specific analytics and charts',
        'Guest management and communication',
        'Revenue tracking and reports',
        'Quick actions for property tasks'
      ],
      audience: 'Property owners, agents, and users with properties'
    },
    adminPanel: {
      name: 'Admin Panel',
      route: '/admin',
      purpose: 'System-wide administration and control',
      features: [
        'Complete user management across all users',
        'System-wide property oversight',
        'Global booking management',
        'Content and image management',
        'Email management and automation',
        'Sales analytics across all properties',
        'System configuration and settings'
      ],
      audience: 'Administrators only'
    }
  };

  const getPermissionIcon = (permission: { read: boolean; write: boolean; delete: boolean }) => {
    if (permission.read && permission.write && permission.delete) {
      return <Badge variant="destructive" className="text-xs">Full</Badge>;
    }
    if (permission.read && permission.write) {
      return <Badge variant="default" className="text-xs">Read/Write</Badge>;
    }
    if (permission.read) {
      return <Badge variant="secondary" className="text-xs">Read Only</Badge>;
    }
    return <Badge variant="outline" className="text-xs">No Access</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Roles Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            System Roles Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card key={role.role} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant={role.color as any} className="text-sm">
                        {role.role.toUpperCase()}
                      </Badge>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {role.access.map((access, index) => (
                        <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          {access}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Permissions Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead className="text-center">Admin</TableHead>
                <TableHead className="text-center">Agent</TableHead>
                <TableHead className="text-center">User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.feature}>
                  <TableCell className="font-medium">{permission.feature}</TableCell>
                  <TableCell className="text-center">
                    {getPermissionIcon(permission.admin)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getPermissionIcon(permission.agent)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getPermissionIcon(permission.user)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dashboard vs Admin Panel Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard vs Admin Panel Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dashboard */}
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {dashboardComparison.dashboard.name}
                </CardTitle>
                <p className="text-sm text-blue-600">
                  Route: <code className="bg-blue-100 px-2 py-1 rounded">{dashboardComparison.dashboard.route}</code>
                </p>
                <p className="text-sm text-blue-700">{dashboardComparison.dashboard.purpose}</p>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Target Audience:</p>
                <p className="text-sm text-gray-600 mb-4">{dashboardComparison.dashboard.audience}</p>
                
                <p className="text-sm font-medium text-gray-700 mb-3">Key Features:</p>
                <ul className="space-y-2">
                  {dashboardComparison.dashboard.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Admin Panel */}
            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {dashboardComparison.adminPanel.name}
                </CardTitle>
                <p className="text-sm text-red-600">
                  Route: <code className="bg-red-100 px-2 py-1 rounded">{dashboardComparison.adminPanel.route}</code>
                </p>
                <p className="text-sm text-red-700">{dashboardComparison.adminPanel.purpose}</p>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Target Audience:</p>
                <p className="text-sm text-gray-600 mb-4">{dashboardComparison.adminPanel.audience}</p>
                
                <p className="text-sm font-medium text-gray-700 mb-3">Key Features:</p>
                <ul className="space-y-2">
                  {dashboardComparison.adminPanel.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Access Functions Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Access Control Functions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">useSecureAuth Hook</h4>
              <p className="text-sm text-gray-600 mb-2">
                Central authentication and authorization hook that provides:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• <code>isAdmin</code> - Boolean flag for admin role check</li>
                <li>• <code>isAgent</code> - Boolean flag for agent role check</li>
                <li>• <code>isAuthenticated</code> - User login status</li>
                <li>• <code>userRole</code> - Current user's role string</li>
                <li>• <code>user</code> - Complete user object</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">ProtectedRoute Component</h4>
              <p className="text-sm text-gray-600 mb-2">
                Route protection wrapper that controls access based on:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• <code>requireAuth</code> - Requires user to be logged in</li>
                <li>• <code>requireAdmin</code> - Requires admin role</li>
                <li>• Automatic redirect to appropriate fallback pages</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Database RLS (Row Level Security)</h4>
              <p className="text-sm text-gray-600 mb-2">
                Database-level security ensuring users can only access their own data:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• <code>get_current_user_role()</code> - Supabase function to get user role</li>
                <li>• User ID matching for data ownership</li>
                <li>• Role-based data filtering</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RolesAccessOverview;
