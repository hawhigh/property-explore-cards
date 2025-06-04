
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Play, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VillaGallerySectionProps {
  images: string[];
}

const VillaGallerySection = ({ images }: VillaGallerySectionProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
  };

  // Auto-advance images when autoplay is on
  React.useEffect(() => {
    if (isAutoplay) {
      const interval = setInterval(nextImage, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoplay]);

  const imageCategories = [
    { name: 'Exterior', images: images.slice(0, 3) },
    { name: 'Interior', images: images.slice(3, 6) },
    { name: 'Pool Area', images: images.slice(6, 8) }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-20 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-20 w-80 h-80 bg-gradient-to-tl from-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 text-lg mb-6 animate-fade-in">
            📸 Visual Tour
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight animate-fade-in delay-200">
            Villa Lucilla
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Photo Gallery
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
            Take a virtual tour of your luxury Cyprus getaway and discover every stunning detail
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Main Image Display */}
          <div className="relative mb-8 group">
            <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
              <img
                src={images[currentImage]}
                alt={`Villa Lucilla - Image ${currentImage + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient overlays for better button visibility */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/30 to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/30 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Navigation Controls */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl backdrop-blur-sm w-14 h-14 rounded-full transition-all hover:scale-110"
              onClick={prevImage}
            >
              <ChevronLeft className="h-7 w-7 text-gray-700" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl backdrop-blur-sm w-14 h-14 rounded-full transition-all hover:scale-110"
              onClick={nextImage}
            >
              <ChevronRight className="h-7 w-7 text-gray-700" />
            </Button>

            {/* Top Controls */}
            <div className="absolute top-6 right-6 flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm w-12 h-12 rounded-full transition-all hover:scale-110"
                onClick={toggleAutoplay}
              >
                <Play className={`h-5 w-5 text-gray-700 ${isAutoplay ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm w-12 h-12 rounded-full transition-all hover:scale-110"
              >
                <Maximize2 className="h-5 w-5 text-gray-700" />
              </Button>
            </div>

            {/* Image Counter & Category */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                {currentImage + 1} / {images.length}
              </div>
              <div className="bg-white/90 text-gray-700 px-4 py-2 rounded-full text-sm backdrop-blur-sm font-medium">
                <ImageIcon className="inline h-4 w-4 mr-1" />
                Premium Gallery
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {imageCategories.map((category, index) => (
              <Button
                key={category.name}
                variant="outline"
                className="rounded-full px-6 py-2 bg-white/80 hover:bg-white border-gray-200 hover:border-blue-300 transition-all"
                onClick={() => setCurrentImage(index * 3)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`group relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                  currentImage === index 
                    ? 'ring-4 ring-blue-500 ring-offset-2 scale-105 shadow-lg' 
                    : 'hover:opacity-80 hover:scale-105 shadow-md hover:shadow-lg'
                }`}
              >
                <img
                  src={image}
                  alt={`Villa Lucilla thumbnail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                
                {/* Active indicator */}
                {currentImage === index && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Play className="h-4 w-4 text-white fill-current" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Gallery Stats */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{images.length}</div>
                <div className="text-sm text-gray-600">Photos</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4K</div>
                <div className="text-sm text-gray-600">Quality</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">360°</div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillaGallerySection;
