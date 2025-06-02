
import { Button } from '@/components/ui/button';
import PropertyHeader from '@/components/PropertyHeader';
import PropertyGallery from '@/components/PropertyGallery';
import PropertyDescription from '@/components/PropertyDescription';
import PropertyAmenities from '@/components/PropertyAmenities';
import PropertyLocationHighlights from '@/components/PropertyLocationHighlights';
import BookingCalendar from '@/components/BookingCalendar';
import PropertyGuestReviews from '@/components/PropertyGuestReviews';
import { usePropertyData } from '@/hooks/usePropertyData';

const SingleProperty = () => {
  const { property } = usePropertyData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">PropertyHub</h1>
            <Button variant="outline">Sign In</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <PropertyGallery images={property.images} title={property.title} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Info */}
              <PropertyHeader property={property} />

              {/* Description */}
              <PropertyDescription title={property.title} description={property.description} />

              {/* Key Features */}
              <PropertyAmenities amenities={property.amenities} />

              {/* Location Highlights */}
              <PropertyLocationHighlights />

              {/* Guest Reviews */}
              <PropertyGuestReviews />
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <BookingCalendar 
                propertyId={property.id} 
                pricePerNight={property.pricePerNight} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
