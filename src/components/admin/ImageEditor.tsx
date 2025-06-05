
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crop, 
  RotateCw, 
  Palette, 
  Download, 
  Upload, 
  Scissors,
  Maximize,
  Sun,
  Contrast,
  Zap,
  Eraser
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageEditorProps {
  imageUrl?: string;
  onSave?: (editedImage: Blob) => void;
  onClose?: () => void;
}

const ImageEditor = ({ imageUrl, onSave, onClose }: ImageEditorProps) => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    sepia: 0,
    grayscale: 0
  });
  const [cropSettings, setCropSettings] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImage = useCallback((src: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setOriginalImage(img);
      drawImage(img);
    };
    img.src = src;
  }, []);

  const drawImage = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    // Apply filters
    ctx.filter = `
      brightness(${filters.brightness}%) 
      contrast(${filters.contrast}%) 
      saturate(${filters.saturation}%) 
      blur(${filters.blur}px) 
      sepia(${filters.sepia}%) 
      grayscale(${filters.grayscale}%)
    `;

    ctx.drawImage(img, 0, 0);
  }, [filters]);

  React.useEffect(() => {
    if (imageUrl) {
      loadImage(imageUrl);
    }
  }, [imageUrl, loadImage]);

  React.useEffect(() => {
    if (originalImage) {
      drawImage(originalImage);
    }
  }, [originalImage, drawImage]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      loadImage(url);
    }
  };

  const handleFilterChange = (filterName: string, value: number) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      sepia: 0,
      grayscale: 0
    });
  };

  const cropImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImage) return;

    const croppedCanvas = document.createElement('canvas');
    const ctx = croppedCanvas.getContext('2d');
    if (!ctx) return;

    const cropX = (cropSettings.x / 100) * originalImage.width;
    const cropY = (cropSettings.y / 100) * originalImage.height;
    const cropWidth = (cropSettings.width / 100) * originalImage.width;
    const cropHeight = (cropSettings.height / 100) * originalImage.height;

    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;

    ctx.drawImage(
      originalImage,
      cropX, cropY, cropWidth, cropHeight,
      0, 0, cropWidth, cropHeight
    );

    const croppedImg = new Image();
    croppedImg.onload = () => {
      setOriginalImage(croppedImg);
    };
    croppedImg.src = croppedCanvas.toDataURL();
  };

  const resizeImage = (width: number, height: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImage) return;

    const resizedCanvas = document.createElement('canvas');
    const ctx = resizedCanvas.getContext('2d');
    if (!ctx) return;

    resizedCanvas.width = width;
    resizedCanvas.height = height;

    ctx.drawImage(originalImage, 0, 0, width, height);

    const resizedImg = new Image();
    resizedImg.onload = () => {
      setOriginalImage(resizedImg);
    };
    resizedImg.src = resizedCanvas.toDataURL();
  };

  const removeBackground = async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    try {
      const { pipeline, env } = await import('@huggingface/transformers');
      
      env.allowLocalModels = false;
      env.useBrowserCache = false;

      const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512');
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      
      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      ctx.drawImage(originalImage, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      const result = await segmenter(imageData);
      
      if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
        throw new Error('Invalid segmentation result');
      }
      
      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = canvas.width;
      outputCanvas.height = canvas.height;
      const outputCtx = outputCanvas.getContext('2d');
      
      if (!outputCtx) throw new Error('Could not get output canvas context');
      
      outputCtx.drawImage(canvas, 0, 0);
      
      const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
      const data = outputImageData.data;
      
      for (let i = 0; i < result[0].mask.data.length; i++) {
        const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
        data[i * 4 + 3] = alpha;
      }
      
      outputCtx.putImageData(outputImageData, 0, 0);
      
      const processedImg = new Image();
      processedImg.onload = () => {
        setOriginalImage(processedImg);
        toast({
          title: "Background Removed",
          description: "Background has been successfully removed from the image.",
        });
      };
      processedImg.src = outputCanvas.toDataURL();
    } catch (error) {
      console.error('Error removing background:', error);
      toast({
        title: "Error",
        description: "Failed to remove background. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob && onSave) {
        onSave(blob);
        toast({
          title: "Image Saved",
          description: "Your edited image has been saved successfully.",
        });
      }
    }, 'image/png');
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Advanced Image Editor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <div className="border rounded-lg p-4 bg-gray-50">
              {!originalImage && (
                <div className="text-center py-12">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              )}
              <canvas 
                ref={canvasRef} 
                className="max-w-full h-auto border rounded"
                style={{ display: originalImage ? 'block' : 'none' }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <Tabs defaultValue="filters" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="crop">Crop</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>

              <TabsContent value="filters" className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Brightness: {filters.brightness}%
                    </label>
                    <Slider
                      value={[filters.brightness]}
                      onValueChange={(value) => handleFilterChange('brightness', value[0])}
                      max={200}
                      min={0}
                      step={1}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Contrast className="h-4 w-4" />
                      Contrast: {filters.contrast}%
                    </label>
                    <Slider
                      value={[filters.contrast]}
                      onValueChange={(value) => handleFilterChange('contrast', value[0])}
                      max={200}
                      min={0}
                      step={1}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Saturation: {filters.saturation}%</label>
                    <Slider
                      value={[filters.saturation]}
                      onValueChange={(value) => handleFilterChange('saturation', value[0])}
                      max={200}
                      min={0}
                      step={1}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Blur: {filters.blur}px</label>
                    <Slider
                      value={[filters.blur]}
                      onValueChange={(value) => handleFilterChange('blur', value[0])}
                      max={10}
                      min={0}
                      step={0.1}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Sepia: {filters.sepia}%</label>
                    <Slider
                      value={[filters.sepia]}
                      onValueChange={(value) => handleFilterChange('sepia', value[0])}
                      max={100}
                      min={0}
                      step={1}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Grayscale: {filters.grayscale}%</label>
                    <Slider
                      value={[filters.grayscale]}
                      onValueChange={(value) => handleFilterChange('grayscale', value[0])}
                      max={100}
                      min={0}
                      step={1}
                    />
                  </div>

                  <Button onClick={resetFilters} variant="outline" className="w-full">
                    Reset Filters
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="crop" className="space-y-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium">X Position</label>
                      <Input
                        type="number"
                        value={cropSettings.x}
                        onChange={(e) => setCropSettings(prev => ({ ...prev, x: Number(e.target.value) }))}
                        min={0}
                        max={100}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Y Position</label>
                      <Input
                        type="number"
                        value={cropSettings.y}
                        onChange={(e) => setCropSettings(prev => ({ ...prev, y: Number(e.target.value) }))}
                        min={0}
                        max={100}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium">Width %</label>
                      <Input
                        type="number"
                        value={cropSettings.width}
                        onChange={(e) => setCropSettings(prev => ({ ...prev, width: Number(e.target.value) }))}
                        min={1}
                        max={100}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Height %</label>
                      <Input
                        type="number"
                        value={cropSettings.height}
                        onChange={(e) => setCropSettings(prev => ({ ...prev, height: Number(e.target.value) }))}
                        min={1}
                        max={100}
                      />
                    </div>
                  </div>

                  <Button onClick={cropImage} className="w-full">
                    <Crop className="h-4 w-4 mr-2" />
                    Apply Crop
                  </Button>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quick Resize</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => resizeImage(800, 600)}
                        size="sm"
                      >
                        800x600
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => resizeImage(1920, 1080)}
                        size="sm"
                      >
                        1920x1080
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tools" className="space-y-4">
                <div className="space-y-3">
                  <Button 
                    onClick={removeBackground} 
                    disabled={isProcessing}
                    className="w-full"
                  >
                    <Eraser className="h-4 w-4 mr-2" />
                    {isProcessing ? 'Removing Background...' : 'Remove Background'}
                  </Button>

                  <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Load New Image
                  </Button>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4 border-t">
              <Button onClick={saveImage} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              
              <Button onClick={downloadImage} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Image
              </Button>

              {onClose && (
                <Button onClick={onClose} variant="secondary" className="w-full">
                  Close Editor
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageEditor;
