
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadFormProps {
  activeCategory: string;
}

const ImageUploadForm = ({ activeCategory }: ImageUploadFormProps) => {
  const { toast } = useToast();

  const handleImageUpload = () => {
    toast({
      title: "Image Uploaded",
      description: "New image has been uploaded successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload New Image
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Image Name</label>
          <Input placeholder="Enter image name..." />
        </div>
        <div>
          <label className="text-sm font-medium">Alt Text</label>
          <Input placeholder="Enter alt text for accessibility..." />
        </div>
        <div>
          <label className="text-sm font-medium">Category</label>
          <Select defaultValue={activeCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hero">Hero Images</SelectItem>
              <SelectItem value="gallery">Gallery Images</SelectItem>
              <SelectItem value="services">Service Images</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop your image here, or</p>
          <Button onClick={handleImageUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Browse Files
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploadForm;
