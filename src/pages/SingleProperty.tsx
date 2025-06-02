
import { Button } from '@/components/ui/button';
import PropertyHeader from '@/components/PropertyHeader';
import PropertyGallery from '@/components/PropertyGallery';
import PropertyDescription from '@/components/PropertyDescription';
import PropertyAmenities from '@/components/PropertyAmenities';
import PropertyLocationHighlights from '@/components/PropertyLocationHighlights';
import PropertyBookingSidebar from '@/components/PropertyBookingSidebar';
import PropertyGuestReviews from '@/components/PropertyGuestReviews';

const SingleProperty = () => {
  // Villa Lucilla inspired property data
  const property = {
    id: '1',
    title: 'Villa Lucilla - Luxury Mediterranean Retreat',
    description: 'Escape to this magnificent Mediterranean villa nestled in the heart of Tuscany. Villa Lucilla offers breathtaking panoramic views of rolling hills and vineyards, featuring authentic Italian architecture with modern luxury amenities. The villa boasts spacious terraces, a stunning infinity pool, and beautifully landscaped gardens with olive trees and lavender. Perfect for families and groups seeking an authentic Italian experience with world-class comfort and privacy.',
    price: 2850000,
    pricePerNight: 850,
    bedrooms: 6,
    bathrooms: 5,
    sqft: 4500,
    address: 'Via delle Colline 47',
    city: 'Montalcino',
    state: 'Tuscany',
    country: 'Italy',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', // Luxury villa exterior
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', // Modern luxury interior
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop', // Pool area
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', // Villa bedroom
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', // Kitchen/dining
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop'  // Garden view
    ],
    propertyType: 'Luxury Villa',
    amenities: [
      'Private Infinity Pool',
      'Panoramic Terrace',
      'Wine Cellar',
      'Olive Grove',
      'Professional Kitchen',
      'Air Conditioning',
      'WiFi Throughout',
      'Private Parking',
      'Fireplace',
      'Garden & Grounds',
      'Pool House',
      'Outdoor Dining'
    ],
    yearBuilt: 1850,
    renovated: 2020,
    rating: 4.9,
    reviews: 127,
    maxGuests: 12,
    poolSize: '15m x 7m',
    groundsSize: '2.5 hectares'
  };

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
              <PropertyBookingSidebar pricePerNight={property.pricePerNight} maxGuests={property.maxGuests} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
