
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ContentTable from './ContentTable';

const ContentManagementTab = () => {
  const { toast } = useToast();
  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentBody, setNewContentBody] = useState('');
  const [newContentType, setNewContentType] = useState('page');
  const [newContentStatus, setNewContentStatus] = useState('draft');

  const handleCreateContent = () => {
    if (!newContentTitle.trim() || !newContentBody.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and content fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Content Created",
      description: `${newContentType} "${newContentTitle}" has been created.`,
    });

    setNewContentTitle('');
    setNewContentBody('');
    setNewContentType('page');
    setNewContentStatus('draft');
  };

  return (
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
                  <SelectItem value="hero">Hero Section</SelectItem>
                  <SelectItem value="page">Page Content</SelectItem>
                  <SelectItem value="service">Service Description</SelectItem>
                  <SelectItem value="footer">Footer Content</SelectItem>
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

      {/* Content List */}
      <div className="lg:col-span-2">
        <ContentTable />
      </div>
    </div>
  );
};

export default ContentManagementTab;
