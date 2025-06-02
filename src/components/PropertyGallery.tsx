
interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[500px]">
        <div className="lg:col-span-2 lg:row-span-2">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="hidden lg:block">
          <img
            src={images[1]}
            alt="Interior view"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="hidden lg:block">
          <img
            src={images[2]}
            alt="Pool area"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="hidden lg:block">
          <img
            src={images[3]}
            alt="Bedroom"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="hidden lg:block">
          <img
            src={images[4]}
            alt="Kitchen"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
