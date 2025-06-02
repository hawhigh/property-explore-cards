
interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  // Fallback images if none provided
  const fallbackImages = [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
  ];

  const displayImages = images && images.length > 0 ? images : fallbackImages;

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[500px]">
        <div className="lg:col-span-2 lg:row-span-2">
          <img
            src={displayImages[0]}
            alt={title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImages[0];
            }}
          />
        </div>
        <div className="hidden lg:block">
          <img
            src={displayImages[1] || fallbackImages[1]}
            alt="Interior view"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImages[1];
            }}
          />
        </div>
        <div className="hidden lg:block">
          <img
            src={displayImages[2] || fallbackImages[2]}
            alt="Pool area"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImages[2];
            }}
          />
        </div>
        <div className="hidden lg:block">
          <img
            src={displayImages[3] || fallbackImages[3]}
            alt="Bedroom"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImages[3];
            }}
          />
        </div>
        <div className="hidden lg:block">
          <img
            src={displayImages[4] || fallbackImages[4]}
            alt="Kitchen"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImages[4];
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
