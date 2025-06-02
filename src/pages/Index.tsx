import { useState } from 'react';
import { Button } from '@/components/ui/button';
import BookingWidget from '@/components/BookingWidget';
import HeroHeader from '@/components/HeroHeader';
import FooterCTA from '@/components/FooterCTA';
import PropertyHeader from '@/components/PropertyHeader';
import PropertyDescription from '@/components/PropertyDescription';
import PropertyAmenities from '@/components/PropertyAmenities';
import PropertyLocationHighlights from '@/components/PropertyLocationHighlights';
import PropertyGuestReviews from '@/components/PropertyGuestReviews';
import BookingCalendar from '@/components/BookingCalendar';
import EnhancedBookingFlow from '@/components/EnhancedBookingFlow';
import ImageGalleryLightbox from '@/components/ImageGalleryLightbox';
import PropertyManagementDashboard from '@/components/PropertyManagementDashboard';
import NotificationSystem from '@/components/NotificationSystem';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showManagement, setShowManagement] = useState(false);
  const [showEnhancedBooking, setShowEnhancedBooking] = useState(false);

  // Single property data for Villa Lucilla
  const property = {
    id: 'villa-lucilla-1',
    title: 'Villa Lucilla - Anthorina Gardens Resort',
    propertyType: 'Luxury Villa',
    address: 'Konnou street 17, Anthorina Gardens Resort',
    city: 'Protaras',
    state: 'Famagusta District',
    country: 'Cyprus',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    poolSize: 'Private Pool',
    price: 1850,
    rating: 4.8,
    reviews: 89,
    yearBuilt: 2010,
    renovated: 2022,
    groundsSize: 'Resort Grounds',
    description: 'Escape to Villa Lucilla, a stunning 3-bedroom villa nestled in the prestigious Anthorina Gardens Resort in Protaras, Cyprus. This beautifully appointed property offers the perfect blend of luxury and comfort, featuring a private pool, modern amenities, and breathtaking views of the Mediterranean landscape. Located just minutes from pristine beaches and local attractions, Villa Lucilla provides an ideal base for your Cyprus getaway.',
    amenities: [
      'Private Swimming Pool',
      'Air Conditioning',
      'Free WiFi',
      'Fully Equipped Kitchen',
      'Private Parking',
      'Outdoor Dining Area',
      'BBQ Facilities',
      'Beach Towels Provided',
      'Resort Amenities Access',
      'Weekly Housekeeping'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ]
  };

  const pricePerNight = 185;

  if (showManagement) {
    return <PropertyManagementDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Header with Notifications */}
      <div className="relative">
        <HeroHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        <div className="absolute top-4 right-4">
          <NotificationSystem />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Perfect
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Cyprus Getaway
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Experience luxury at Villa Lucilla in Protaras, Cyprus. 
              A stunning 3-bedroom villa with private pool in the exclusive Anthorina Gardens Resort.
            </p>
            
            {/* Villa Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">3</div>
                <div className="text-sm md:text-base text-gray-600">Bedrooms</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">6</div>
                <div className="text-sm md:text-base text-gray-600">Max Guests</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">€{pricePerNight}</div>
                <div className="text-sm md:text-base text-gray-600">Per Night</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">4.8★</div>
                <div className="text-sm md:text-base text-gray-600">Guest Rating</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => setShowEnhancedBooking(true)}
              >
                Book Your Stay
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg rounded-full border-2 border-blue-200 hover:border-blue-300">
                View Gallery
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg rounded-full border-2 border-green-200 hover:border-green-300"
                onClick={() => setShowManagement(true)}
              >
                Manage Property
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Booking Modal */}
      {showEnhancedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={() => setShowEnhancedBooking(false)}
            >
              ✕
            </Button>
            <EnhancedBookingFlow pricePerNight={pricePerNight} />
          </div>
        </div>
      )}

      {/* Booking Widget Section */}
      <section className="py-8 md:py-16 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Check Availability
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select your dates and see if Villa Lucilla is available for your perfect Cyprus vacation
            </p>
          </div>
          <BookingWidget />
        </div>
      </section>

      {/* Property Details Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Image Gallery */}
            <ImageGalleryLightbox images={property.images} title={property.title} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Property Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header Info */}
                <PropertyHeader property={property} />

                {/* Description */}
                <PropertyDescription 
                  title={property.title} 
                  description={property.description} 
                />

                {/* Amenities */}
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
                  pricePerNight={pricePerNight}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Villa Lucilla Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Villa Lucilla?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes our luxury villa the perfect choice for your Cyprus vacation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏖️</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Prime Location</h3>
              <p className="text-gray-600">Located in prestigious Protaras with easy access to beautiful beaches and local attractions.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏊‍♂️</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Private Pool</h3>
              <p className="text-gray-600">Enjoy your own private swimming pool with outdoor dining area and BBQ facilities.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Luxury Comfort</h3>
              <p className="text-gray-600">Modern amenities, air conditioning, and resort access for the ultimate comfort experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA />
    </div>
  );
};

export default Index;
