
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Home, Search, User, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PropertyOwnerManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['admin-properties-with-owners', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('properties')
        .select(`
          *,
          profiles!properties_owner_id_fkey (
            id,
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ['admin-users-for-ownership'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .order('full_name', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  const updatePropertyOwner = useMutation({
    mutationFn: async ({ propertyId, newOwnerId }: { propertyId: string; newOwnerId: string }) => {
      const { error } = await supabase
        .from('properties')
        .update({ owner_id: newOwnerId })
        .eq('id', propertyId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties-with-owners'] });
      toast({
        title: "Success",
        description: "Property owner updated successfully.",
      });
      setSelectedProperty(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update property owner.",
        variant: "destructive",
      });
    },
  });

  const stats = {
    totalProperties: properties.length,
    propertiesWithOwners: properties.filter(p => p.profiles).length,
    propertiesWithoutOwners: properties.filter(p => !p.profiles).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalProperties}</p>
                <p className="text-sm text-gray-600">Total Properties</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.propertiesWithOwners}</p>
                <p className="text-sm text-gray-600">With Owners</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{stats.propertiesWithoutOwners}</p>
                <p className="text-sm text-gray-600">Without Owners</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Owner Management */}
      <Card>
        <CardHeader>
          <CardTitle>Property Owner Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading properties...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Current Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-sm text-gray-500">{property.city}, {property.state}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {property.profiles ? (
                        <div>
                          <p className="font-medium">{property.profiles.full_name || 'No name'}</p>
                          <p className="text-sm text-gray-500">{property.profiles.email}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No owner assigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedProperty(property)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Change Property Owner</DialogTitle>
                          </DialogHeader>
                          {selectedProperty && (
                            <div className="space-y-4">
                              <div>
                                <Label>Property</Label>
                                <p className="text-sm text-gray-600">{selectedProperty.title}</p>
                              </div>
                              <div>
                                <Label>Current Owner</Label>
                                <p className="text-sm text-gray-600">
                                  {selectedProperty.profiles?.full_name || 'No owner assigned'} 
                                  {selectedProperty.profiles?.email && ` (${selectedProperty.profiles.email})`}
                                </p>
                              </div>
                              <div>
                                <Label htmlFor="newOwner">New Owner</Label>
                                <Select
                                  onValueChange={(userId: string) => 
                                    updatePropertyOwner.mutate({ 
                                      propertyId: selectedProperty.id, 
                                      newOwnerId: userId 
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select new owner" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {users.map((user) => (
                                      <SelectItem key={user.id} value={user.id}>
                                        {user.full_name || 'No name'} ({user.email})
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyOwnerManagement;
