
import { useState } from 'react';
import HeroHeader from '@/components/HeroHeader';
import FooterCTA from '@/components/FooterCTA';
import PropertyManagementDashboard from '@/components/PropertyManagementDashboard';
import NotificationSystem from '@/components/NotificationSystem';
import VillaHeroSection from '@/components/VillaHeroSection';
import AvailabilitySection from '@/components/AvailabilitySection';
import VillaDetailsSection from '@/components/VillaDetailsSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import EnhancedBookingModal from '@/components/EnhancedBookingModal';
import EnhancedVillaShowcase from '@/components/EnhancedVillaShowcase';
import FeaturedProperty from '@/components/FeaturedProperty';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showManagement, setShowManagement] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header with improved glass effect */}
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

        {/* Hero Section with enhanced visual appeal */}
        <VillaHeroSection
          bedrooms={property.bedrooms}
          maxGuests={property.maxGuests}
          pricePerNight={pricePerNight}
          rating={property.rating}
          onBookingClick={() => setShowEnhancedBooking(true)}
          onManagementClick={() => setShowManagement(true)}
        />

        {/* Enhanced Booking Modal */}
        <EnhancedBookingModal
          isOpen={showEnhancedBooking}
          onClose={() => setShowEnhancedBooking(false)}
          pricePerNight={pricePerNight}
        />

        {/* Featured Property Section */}
        <FeaturedProperty />

        {/* Villa Showcase with improved spacing */}
        <div className="py-8">
          <EnhancedVillaShowcase />
        </div>

        {/* Availability Section with enhanced styling */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
          <AvailabilitySection />
        </div>
        
        {/* Villa Details with improved layout */}
        <div className="bg-white/70 backdrop-blur-sm">
          <VillaDetailsSection 
            property={property} 
            pricePerNight={pricePerNight} 
          />
        </div>

        {/* Why Choose Section */}
        <WhyChooseSection />

        {/* Footer CTA with enhanced gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900"></div>
          <div className="relative">
            <FooterCTA />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
