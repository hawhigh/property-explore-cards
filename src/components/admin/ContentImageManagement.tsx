import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Edit, Trash2, Plus, Upload, Save, Palette, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageEditor from './ImageEditor';
import BulkImageOperations from './BulkImageOperations';

const ContentImageManagement = () => {
  const { toast } = useToast();
  const [selectedContent, setSelectedContent] = useState(null);
  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentBody, setNewContentBody] = useState('');
  const [newContentType, setNewContentType] = useState('page');
  const [newContentStatus, setNewContentStatus] = useState('draft');
  const [activeImageCategory, setActiveImageCategory] = useState('hero');
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [editingImageUrl, setEditingImageUrl] = useState('');

  // Mock content data
  const contentItems = [
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

  // Mock image data
  const imageCategories = {
    hero: [
      { id: 1, name: 'Main Hero Background', url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04', alt: 'Villa exterior' },
      { id: 2, name: 'Secondary Hero', url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901', alt: 'Pool area' }
    ],
    gallery: [
      { id: 3, name: 'Living Room', url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04', alt: 'Spacious living room' },
      { id: 4, name: 'Bedroom', url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901', alt: 'Master bedroom' },
      { id: 5, name: 'Kitchen', url: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23', alt: 'Modern kitchen' }
    ],
    services: [
      { id: 6, name: 'Diving Service', url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027', alt: 'Diving equipment' },
      { id: 7, name: 'Tour Service', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', alt: 'Cyprus landmarks' }
    ]
  };

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

  const handleImageUpload = () => {
    toast({
      title: "Image Uploaded",
      description: "New image has been uploaded successfully.",
    });
  };

  const handleImageDelete = (imageId: number) => {
    toast({
      title: "Image Deleted",
      description: "Image has been removed successfully.",
    });
  };

  const openImageEditor = (imageUrl: string) => {
    setEditingImageUrl(imageUrl);
    setShowImageEditor(true);
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
            </div>
          </div>
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          <div className="space-y-6">
            {/* Image Category Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Image Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {Object.keys(imageCategories).map((category) => (
                    <Button
                      key={category}
                      variant={activeImageCategory === category ? "default" : "outline"}
                      onClick={() => setActiveImageCategory(category)}
                      className="capitalize"
                    >
                      {category} Images
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload New Image */}
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
                  <Select defaultValue={activeImageCategory}>
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

            {/* Image Gallery */}
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{activeImageCategory} Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {imageCategories[activeImageCategory]?.map((image) => (
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
                          onClick={() => openImageEditor(image.url)}
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
          </div>
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
