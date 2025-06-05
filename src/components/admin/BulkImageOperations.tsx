
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  Download, 
  Upload, 
  Trash2, 
  ImageIcon,
  Zap,
  Copy,
  Move,
  Maximize
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageItem {
  id: string;
  name: string;
  url: string;
  category: string;
  size: number;
  selected: boolean;
}

const BulkImageOperations = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: '1',
      name: 'Hero Background 1',
      url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
      category: 'hero',
      size: 1024000,
      selected: false
    },
    {
      id: '2',
      name: 'Villa Living Room',
      url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
      category: 'gallery',
      size: 856000,
      selected: false
    },
    {
      id: '3',
      name: 'Pool Area',
      url: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
      category: 'gallery',
      size: 945000,
      selected: false
    },
    {
      id: '4',
      name: 'Diving Service',
      url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      category: 'services',
      size: 678000,
      selected: false
    }
  ]);

  const [bulkOperation, setBulkOperation] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [resizeWidth, setResizeWidth] = useState(1920);
  const [resizeHeight, setResizeHeight] = useState(1080);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const selectedImages = images.filter(img => img.selected);
  const selectedCount = selectedImages.length;

  const toggleImageSelection = (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, selected: !img.selected } : img
    ));
  };

  const selectAllImages = () => {
    const allSelected = images.every(img => img.selected);
    setImages(prev => prev.map(img => ({ ...img, selected: !allSelected })));
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleBulkOperation = async () => {
    if (selectedCount === 0) {
      toast({
        title: "No Images Selected",
        description: "Please select at least one image to perform bulk operations.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    simulateProgress();

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    switch (bulkOperation) {
      case 'delete':
        setImages(prev => prev.filter(img => !img.selected));
        toast({
          title: "Images Deleted",
          description: `Successfully deleted ${selectedCount} image(s).`,
        });
        break;

      case 'category':
        if (newCategory) {
          setImages(prev => prev.map(img => 
            img.selected ? { ...img, category: newCategory, selected: false } : img
          ));
          toast({
            title: "Category Updated",
            description: `Updated category for ${selectedCount} image(s) to "${newCategory}".`,
          });
        }
        break;

      case 'resize':
        toast({
          title: "Images Resized",
          description: `Resized ${selectedCount} image(s) to ${resizeWidth}x${resizeHeight}.`,
        });
        setImages(prev => prev.map(img => ({ ...img, selected: false })));
        break;

      case 'compress':
        toast({
          title: "Images Compressed",
          description: `Compressed ${selectedCount} image(s) to reduce file size.`,
        });
        setImages(prev => prev.map(img => ({ ...img, selected: false })));
        break;

      case 'download':
        toast({
          title: "Download Started",
          description: `Downloading ${selectedCount} image(s) as a ZIP file.`,
        });
        break;

      default:
        toast({
          title: "Operation Complete",
          description: `Performed operation on ${selectedCount} image(s).`,
        });
    }

    setBulkOperation('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Bulk Operations Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Bulk Image Operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={selectAllImages}
                size="sm"
              >
                {images.every(img => img.selected) ? 'Deselect All' : 'Select All'}
              </Button>
              <Badge variant="secondary">
                {selectedCount} of {images.length} selected
              </Badge>
            </div>
          </div>

          {selectedCount > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
              <Select value={bulkOperation} onValueChange={setBulkOperation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delete">Delete Images</SelectItem>
                  <SelectItem value="category">Change Category</SelectItem>
                  <SelectItem value="resize">Resize Images</SelectItem>
                  <SelectItem value="compress">Compress Images</SelectItem>
                  <SelectItem value="download">Download as ZIP</SelectItem>
                </SelectContent>
              </Select>

              {bulkOperation === 'category' && (
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="New category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero Images</SelectItem>
                    <SelectItem value="gallery">Gallery Images</SelectItem>
                    <SelectItem value="services">Service Images</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {bulkOperation === 'resize' && (
                <>
                  <Input
                    type="number"
                    placeholder="Width"
                    value={resizeWidth}
                    onChange={(e) => setResizeWidth(Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="Height"
                    value={resizeHeight}
                    onChange={(e) => setResizeHeight(Number(e.target.value))}
                  />
                </>
              )}

              <Button 
                onClick={handleBulkOperation}
                disabled={!bulkOperation || isProcessing}
                className="w-full"
              >
                <Zap className="h-4 w-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Apply'}
              </Button>
            </div>
          )}

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Processing images...</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Image Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((image) => (
              <div 
                key={image.id} 
                className={`border rounded-lg p-3 space-y-3 transition-all ${
                  image.selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Checkbox 
                    checked={image.selected}
                    onCheckedChange={() => toggleImageSelection(image.id)}
                  />
                  <Badge 
                    variant={
                      image.category === 'hero' ? 'default' :
                      image.category === 'gallery' ? 'secondary' :
                      'outline'
                    }
                  >
                    {image.category}
                  </Badge>
                </div>

                <img 
                  src={image.url} 
                  alt={image.name}
                  className="w-full h-32 object-cover rounded"
                />

                <div className="space-y-1">
                  <h4 className="font-medium text-sm truncate">{image.name}</h4>
                  <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                </div>

                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ImageIcon className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkImageOperations;
