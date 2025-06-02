
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Edit, Trash2, Plus, Eye, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContentManagement = () => {
  const { toast } = useToast();
  const [selectedContent, setSelectedContent] = useState(null);
  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentBody, setNewContentBody] = useState('');
  const [newContentType, setNewContentType] = useState('page');
  const [newContentStatus, setNewContentStatus] = useState('draft');

  const contentItems = [
    {
      id: 1,
      title: 'About Us',
      type: 'page',
      status: 'published',
      lastModified: '2024-01-15',
      author: 'Admin',
      views: 1245
    },
    {
      id: 2,
      title: 'Privacy Policy',
      type: 'page',
      status: 'published',
      lastModified: '2024-01-10',
      author: 'Admin',
      views: 892
    },
    {
      id: 3,
      title: 'Winter Holiday Special',
      type: 'announcement',
      status: 'published',
      lastModified: '2024-01-14',
      author: 'Admin',
      views: 2156
    },
    {
      id: 4,
      title: 'Terms of Service',
      type: 'page',
      status: 'draft',
      lastModified: '2024-01-12',
      author: 'Admin',
      views: 0
    },
    {
      id: 5,
      title: 'Booking Guidelines',
      type: 'help',
      status: 'published',
      lastModified: '2024-01-08',
      author: 'Admin',
      views: 567
    }
  ];

  const handleCreateContent = () => {
    if (!newContentTitle.trim() || !newContentBody.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and content fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save to database
    toast({
      title: "Content Created",
      description: `${newContentType} "${newContentTitle}" has been created.`,
    });

    // Reset form
    setNewContentTitle('');
    setNewContentBody('');
    setNewContentType('page');
    setNewContentStatus('draft');
  };

  const handleDeleteContent = (contentId: number) => {
    // In a real app, this would delete from database
    toast({
      title: "Content Deleted",
      description: "Content has been deleted successfully.",
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'archived': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'page': return 'default';
      case 'announcement': return 'destructive';
      case 'help': return 'secondary';
      default: return 'outline';
    }
  };

  const stats = {
    total: contentItems.length,
    published: contentItems.filter(c => c.status === 'published').length,
    drafts: contentItems.filter(c => c.status === 'draft').length,
    totalViews: contentItems.reduce((sum, c) => sum + c.views, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Content</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.published}</p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Edit className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{stats.drafts}</p>
                <p className="text-sm text-gray-600">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Content title..."
                value={newContentTitle}
                onChange={(e) => setNewContentTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select value={newContentType} onValueChange={setNewContentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page">Page</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="help">Help Article</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={newContentStatus} onValueChange={setNewContentStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                placeholder="Write your content here..."
                value={newContentBody}
                onChange={(e) => setNewContentBody(e.target.value)}
                rows={8}
              />
            </div>

            <Button onClick={handleCreateContent} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </CardContent>
        </Card>

        {/* Content Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentItems.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell className="font-medium">{content.title}</TableCell>
                      <TableCell>
                        <Badge variant={getTypeBadgeVariant(content.type)}>
                          {content.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(content.status)}>
                          {content.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{content.views.toLocaleString()}</TableCell>
                      <TableCell>{content.lastModified}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedContent(content)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Content Details</DialogTitle>
                              </DialogHeader>
                              {selectedContent && (
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-lg font-semibold">{selectedContent.title}</h3>
                                    <div className="flex gap-2 mt-2">
                                      <Badge variant={getTypeBadgeVariant(selectedContent.type)}>
                                        {selectedContent.type}
                                      </Badge>
                                      <Badge variant={getStatusBadgeVariant(selectedContent.status)}>
                                        {selectedContent.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p><strong>Views:</strong> {selectedContent.views}</p>
                                      <p><strong>Author:</strong> {selectedContent.author}</p>
                                    </div>
                                    <div>
                                      <p><strong>Last Modified:</strong> {selectedContent.lastModified}</p>
                                      <p><strong>Type:</strong> {selectedContent.type}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm">
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleDeleteContent(selectedContent.id)}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteContent(content.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
