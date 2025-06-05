
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ImageUploadForm from './ImageUploadForm';
import ImageGalleryGrid from './ImageGalleryGrid';

const ImageManagementTab = () => {
  const [activeImageCategory, setActiveImageCategory] = useState('hero');

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

  return (
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
      <ImageUploadForm activeCategory={activeImageCategory} />

      {/* Image Gallery */}
      <ImageGalleryGrid 
        images={imageCategories[activeImageCategory as keyof typeof imageCategories]} 
        categoryName={activeImageCategory}
      />
    </div>
  );
};

export default ImageManagementTab;
