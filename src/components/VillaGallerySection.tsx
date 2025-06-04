
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VillaGallerySectionProps {
  images: string[];
}

const VillaGallerySection = ({ images }: VillaGallerySectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Exterior', 'Interior', 'Pool', 'Bedrooms', 'Kitchen'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-advance images when autoplay is on
  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextImage, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-gradient-to-tl from-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 text-lg mb-6 animate-fade-in">
            📸 Villa Gallery
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight animate-fade-in delay-200">
            Discover Your
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dream Villa
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-300">
            Take a visual journey through Villa Lucilla's stunning spaces, from the luxurious interiors 
            to the breathtaking outdoor areas with private pool and Mediterranean views.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-white">
            <img
              src={images[currentImageIndex]}
              alt={`Villa Lucilla - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            <Button
              onClick={previousImage}
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              onClick={nextImage}
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            
            <Button
              onClick={toggleAutoplay}
              variant="outline"
              size="icon"
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-lg"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
          
          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'ring-4 ring-blue-500 scale-110 shadow-lg'
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillaGallerySection;
