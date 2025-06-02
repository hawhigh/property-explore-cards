
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import PropertyHeader from '@/components/PropertyHeader';
import PropertyGallery from '@/components/PropertyGallery';
import PropertyDescription from '@/components/PropertyDescription';
import PropertyAmenities from '@/components/PropertyAmenities';
import PropertyLocationHighlights from '@/components/PropertyLocationHighlights';
import BookingCalendar from '@/components/BookingCalendar';
import PropertyGuestReviews from '@/components/PropertyGuestReviews';
import { usePropertyData } from '@/hooks/usePropertyData';
import { Skeleton } from '@/components/ui/skeleton';

const SingleProperty = () => {
  const { property, isLoading, error } = usePropertyData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-[500px] w-full mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-96 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-8">Sorry, we couldn't find the property you're looking for.</p>
            <Button onClick={() => window.location.href = '/'}>
              Return to Properties
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate price per night from property data with fallbacks
  const pricePerNight = 185; // Default price per night for Villa Lucilla

  // Create enhanced property object with fallback values
  const enhancedProperty = {
    title: property.title || 'Villa Lucilla - Anthorina Gardens Resort',
    propertyType: property.property_type || 'Resort Villa',
    address: property.address || 'Konnou street 17, Anthorina Gardens Resort',
    city: property.city || 'Protaras',
    state: property.state || 'Famagusta District',
    country: 'Cyprus',
    bedrooms: property.bedrooms || 3,
    bathrooms: property.bathrooms || 2,
    maxGuests: 6,
    poolSize: 'Private Pool',
    price: property.price || 1850,
    rating: 4.8,
    reviews: 89,
    yearBuilt: property.year_built || 2010,
    renovated: 2022,
    groundsSize: 'Resort Grounds'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <PropertyGallery images={property.images || []} title={property.title || 'Villa Lucilla'} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Info */}
              <PropertyHeader property={enhancedProperty} />

              {/* Description */}
              <PropertyDescription 
                title={property.title || 'Villa Lucilla'} 
                description={property.description || ''} 
              />

              {/* Key Features */}
              <PropertyAmenities amenities={property.amenities || []} />

              {/* Location Highlights */}
              <PropertyLocationHighlights />

              {/* Guest Reviews */}
              <PropertyGuestReviews />
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <BookingCalendar 
                propertyId={property.id} 
                pricePerNight={pricePerNight}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
