
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VillaGallerySectionProps {
  images: string[];
}

const VillaGallerySection = ({ images }: VillaGallerySectionProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Villa Lucilla Gallery
          </h2>
          <p className="text-lg text-gray-600">
            Discover the beauty and luxury of your Cyprus getaway
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Image */}
          <div className="relative mb-6">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={images[currentImage]}
                alt={`Villa Lucilla - Image ${currentImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Fullscreen Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white shadow-lg"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImage + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-5 gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`aspect-square rounded-lg overflow-hidden ${
                  currentImage === index 
                    ? 'ring-2 ring-blue-500 ring-offset-2' 
                    : 'hover:opacity-80'
                }`}
              >
                <img
                  src={image}
                  alt={`Villa Lucilla thumbnail ${index + 1}`}
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
