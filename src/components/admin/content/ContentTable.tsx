
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentItem {
  id: number;
  title: string;
  type: string;
  status: string;
  content: string;
  lastModified: string;
  category: string;
}

const ContentTable = () => {
  const { toast } = useToast();
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  // Mock content data
  const contentItems: ContentItem[] = [
    {
      id: 1,
      title: 'Hero Section Title',
      type: 'hero',
      status: 'published',
      content: 'Luxury Villa Rentals in Cyprus',
      lastModified: '2024-01-15',
      category: 'homepage'
    },
    {
      id: 2,
      title: 'About Us Page',
      type: 'page',
      status: 'published',
      content: 'Welcome to our premium villa rental service...',
      lastModified: '2024-01-10',
      category: 'static'
    },
    {
      id: 3,
      title: 'Service Description - Diving',
      type: 'service',
      status: 'published',
      content: 'Professional diving experience with certified instructors',
      lastModified: '2024-01-14',
      category: 'services'
    },
    {
      id: 4,
      title: 'Footer Contact Info',
      type: 'footer',
      status: 'published',
      content: 'Contact us at info@villalucilla.com',
      lastModified: '2024-01-12',
      category: 'layout'
    }
  ];

  const handleSaveContent = (contentId: number) => {
    toast({
      title: "Content Saved",
      description: "Content has been updated successfully.",
    });
  };

  const handleDeleteContent = (contentId: number) => {
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
      case 'hero': return 'default';
      case 'service': return 'destructive';
      case 'page': return 'secondary';
      case 'footer': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
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
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Content</DialogTitle>
                        </DialogHeader>
                        {selectedContent && (
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Title</label>
                              <Input defaultValue={selectedContent.title} />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Content</label>
                              <Textarea defaultValue={selectedContent.content} rows={10} />
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={() => handleSaveContent(selectedContent.id)}>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
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
  );
};

export default ContentTable;
