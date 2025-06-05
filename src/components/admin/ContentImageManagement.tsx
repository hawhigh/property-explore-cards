
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageEditor from './ImageEditor';
import BulkImageOperations from './BulkImageOperations';
import ContentManagementTab from './content/ContentManagementTab';
import ImageManagementTab from './images/ImageManagementTab';

const ContentImageManagement = () => {
  const { toast } = useToast();
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [editingImageUrl, setEditingImageUrl] = useState('');

  const openImageEditor = (imageUrl: string) => {
    setEditingImageUrl(imageUrl);
    setShowImageEditor(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content & Image Management</h2>
        <Badge variant="default" className="bg-blue-600">
          <Edit className="h-4 w-4 mr-1" />
          Advanced Editor
        </Badge>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="editor">Advanced Editor</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <ContentManagementTab />
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          <ImageManagementTab />
        </TabsContent>

        <TabsContent value="editor" className="mt-6">
          <ImageEditor 
            imageUrl={editingImageUrl}
            onSave={(blob) => {
              toast({
                title: "Image Saved",
                description: "Your edited image has been saved successfully.",
              });
            }}
          />
        </TabsContent>

        <TabsContent value="bulk" className="mt-6">
          <BulkImageOperations />
        </TabsContent>
      </Tabs>

      {/* Image Editor Dialog */}
      <Dialog open={showImageEditor} onOpenChange={setShowImageEditor}>
        <DialogContent className="max-w-7xl w-full max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Advanced Image Editor</DialogTitle>
          </DialogHeader>
          <ImageEditor 
            imageUrl={editingImageUrl}
            onSave={(blob) => {
              toast({
                title: "Image Saved",
                description: "Your edited image has been saved successfully.",
              });
              setShowImageEditor(false);
            }}
            onClose={() => setShowImageEditor(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentImageManagement;
