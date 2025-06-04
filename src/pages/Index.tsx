
import { useState } from 'react';
import HeroHeader from '@/components/HeroHeader';
import FooterCTA from '@/components/FooterCTA';
import NotificationSystem from '@/components/NotificationSystem';
import VillaHeroSection from '@/components/VillaHeroSection';
import AvailabilitySection from '@/components/AvailabilitySection';
import VillaDetailsSection from '@/components/VillaDetailsSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import EnhancedBookingModal from '@/components/EnhancedBookingModal';
import VillaGallerySection from '@/components/VillaGallerySection';
import AdditionalServicesSection from '@/components/AdditionalServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import LocationSection from '@/components/LocationSection';
import VillaFeaturesSection from '@/components/VillaFeaturesSection';
import SpecialOffersSection from '@/components/SpecialOffersSection';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showEnhancedBooking, setShowEnhancedBooking] = useState(false);

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
    description: 'Escape to Villa Lucilla, a stunning 3-bedroom villa nestled in the prestigious Anthorina Gardens Resort in Protaras, Cyprus. This beautifully appointed property offers the perfect blend of luxury and comfort, featuring a private pool, modern amenities, and breathtaking views of the Mediterranean landscape.',
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
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=800&h=600&fit=crop'
    ]
  };

  const pricePerNight = 185;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <div className="relative">
        <HeroHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        <div className="absolute top-4 right-4 z-50">
          <NotificationSystem />
        </div>
      </div>

      {/* Hero Section */}
      <VillaHeroSection
        bedrooms={property.bedrooms}
        maxGuests={property.maxGuests}
        pricePerNight={pricePerNight}
        rating={property.rating}
        onBookingClick={() => setShowEnhancedBooking(true)}
        onManagementClick={() => {}}
      />

      {/* Enhanced Booking Modal */}
      <EnhancedBookingModal
        isOpen={showEnhancedBooking}
        onClose={() => setShowEnhancedBooking(false)}
        pricePerNight={pricePerNight}
      />

      {/* Villa Gallery */}
      <section id="villa-gallery">
        <VillaGallerySection images={property.images} />
      </section>

      {/* Special Offers */}
      <SpecialOffersSection />

      {/* Availability Section */}
      <AvailabilitySection />
      
      {/* Villa Features */}
      <VillaFeaturesSection />

      {/* Villa Details */}
      <VillaDetailsSection 
        property={property} 
        pricePerNight={pricePerNight} 
      />

      {/* Why Choose Section */}
      <WhyChooseSection />

      {/* Additional Services */}
      <AdditionalServicesSection />

      {/* Location Section */}
      <LocationSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Footer CTA */}
      <FooterCTA />
    </div>
  );
};

export default Index;
