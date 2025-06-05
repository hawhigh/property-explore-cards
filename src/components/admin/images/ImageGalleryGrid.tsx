
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Image {
  id: number;
  name: string;
  url: string;
  alt: string;
}

interface ImageGalleryGridProps {
  images: Image[];
  categoryName: string;
  onEditImage?: (imageUrl: string) => void;
}

const ImageGalleryGrid = ({ images, categoryName, onEditImage }: ImageGalleryGridProps) => {
  const { toast } = useToast();

  const handleImageDelete = (imageId: number) => {
    toast({
      title: "Image Deleted",
      description: "Image has been removed successfully.",
    });
  };

  const handleEditImage = (imageUrl: string) => {
    if (onEditImage) {
      onEditImage(imageUrl);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{categoryName} Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images?.map((image) => (
            <div key={image.id} className="border rounded-lg p-4 space-y-3">
              <img 
                src={image.url} 
                alt={image.alt}
                className="w-full h-40 object-cover rounded"
              />
              <div>
                <h4 className="font-medium">{image.name}</h4>
                <p className="text-sm text-gray-600">{image.alt}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditImage(image.url)}
                >
                  <Palette className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleImageDelete(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageGalleryGrid;
