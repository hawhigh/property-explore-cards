
import PropertyHeader from '@/components/PropertyHeader';
import PropertyDescription from '@/components/PropertyDescription';
import PropertyAmenities from '@/components/PropertyAmenities';
import PropertyLocationHighlights from '@/components/PropertyLocationHighlights';
import PropertyGuestReviews from '@/components/PropertyGuestReviews';
import BookingCalendar from '@/components/BookingCalendar';
import ImageGalleryLightbox from '@/components/ImageGalleryLightbox';

interface Property {
  id: string;
  title: string;
  propertyType: string;
  address: string;
  city: string;
  state: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  poolSize: string;
  price: number;
  rating: number;
  reviews: number;
  yearBuilt: number;
  renovated: number;
  groundsSize: string;
  description: string;
  amenities: string[];
  images: string[];
}

interface VillaDetailsSectionProps {
  property: Property;
  pricePerNight: number;
}

const VillaDetailsSection = ({ property, pricePerNight }: VillaDetailsSectionProps) => {
  return (
    <section className="py-8 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <ImageGalleryLightbox images={property.images} title={property.title} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PropertyHeader property={property} />
              <PropertyDescription 
                title={property.title} 
                description={property.description} 
              />
              <PropertyAmenities amenities={property.amenities} />
              <PropertyLocationHighlights />
              <PropertyGuestReviews />
            </div>

            <div className="lg:col-span-1">
              <BookingCalendar 
                propertyId={property.id} 
                pricePerNight={pricePerNight}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillaDetailsSection;
