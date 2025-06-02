import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

type UserRole = 'user' | 'agent' | 'admin';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: UserRole;
}

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: { full_name?: string; phone?: string }) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const promoteToAdmin = async () => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, role: 'admin' } : null);
      toast({
        title: "Admin Access Granted",
        description: "You now have administrator privileges. Please refresh the page to see admin features.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to grant admin access.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateProfile({
      full_name: formData.get('full_name') as string,
      phone: formData.get('phone') as string,
    });
  };

  if (loading) {
    return <div className="animate-pulse">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            User Profile
            <div className="flex items-center gap-2">
              <Badge variant={profile?.role === 'admin' ? 'default' : 'secondary'}>
                {profile?.role || 'user'}
              </Badge>
              {profile?.role === 'admin' && (
                <Badge variant="destructive" className="text-xs">
                  Property Owner Access
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="owner">Owner Hub</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profile?.email || ''}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    defaultValue={profile?.full_name || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={profile?.phone || ''}
                  />
                </div>
                <Button type="submit" disabled={updating}>
                  {updating ? 'Updating...' : 'Update Profile'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="space-y-4">
                {profile?.role !== 'admin' && (
                  <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">Developer Access</h3>
                    <p className="text-sm text-yellow-700 mb-3">
                      For testing purposes, you can grant yourself administrator privileges to manage all listings and bookings.
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="text-yellow-700 border-yellow-300">
                          Grant Admin Access
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Grant Administrator Access?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will give you full access to manage all properties, bookings, and users in the system. 
                            This action is intended for development and testing purposes.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={promoteToAdmin} disabled={updating}>
                            {updating ? 'Processing...' : 'Grant Access'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
                
                <Button
                  variant="destructive"
                  onClick={signOut}
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="owner">
              <div className="space-y-4">
                <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Property Owner Dashboard</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Access your comprehensive property management dashboard with analytics, booking management, and listing tools.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/dashboard'}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Go to Owner Dashboard
                  </Button>
                </div>
                
                <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Quick Property Management</h3>
                  <p className="text-sm text-green-700 mb-3">
                    Directly manage your property listings, add new properties, and handle bookings.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/property-management'}
                    variant="outline" 
                    className="text-green-700 border-green-300"
                  >
                    Manage Properties
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
