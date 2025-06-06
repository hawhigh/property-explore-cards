
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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

  // Fetch real property data from the database
  const { data: property, isLoading } = useQuery({
    queryKey: ['featured-property'],
    queryFn: async () => {
      // First try to get Villa Lucilla by title
      let { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .ilike('title', '%Villa Lucilla%')
        .eq('status', 'active')
        .limit(1);

      if (error || !properties || properties.length === 0) {
        // If Villa Lucilla doesn't exist, get any active property
        const { data: fallbackProperties, error: fallbackError } = await supabase
          .from('properties')
          .select('*')
          .eq('status', 'active')
          .limit(1);

        if (fallbackError) {
          console.error('Error fetching properties:', fallbackError);
          throw fallbackError;
        }

        if (!fallbackProperties || fallbackProperties.length === 0) {
          // Create a sample property if none exist
          const { data: newProperty, error: createError } = await supabase
            .from('properties')
            .insert({
              title: 'Villa Lucilla - Anthorina Gardens Resort',
              address: 'Konnou street 17, Anthorina Gardens Resort',
              city: 'Protaras',
              state: 'Famagusta District',
              zip_code: '5290',
              property_type: 'Luxury Villa',
              price: 185,
              bedrooms: 3,
              bathrooms: 2,
              description: 'Escape to Villa Lucilla, a stunning 3-bedroom villa nestled in the prestigious Anthorina Gardens Resort in Protaras, Cyprus. This beautifully appointed property offers the perfect blend of luxury and comfort, featuring a private pool, modern amenities, and breathtaking views of the Mediterranean landscape.',
              status: 'active',
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
            })
            .select()
            .single();

          if (createError) {
            console.error('Error creating property:', createError);
            throw createError;
          }
          return newProperty;
        }
        return fallbackProperties[0];
      }
      return properties[0];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Villa Lucilla...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Property not found</p>
        </div>
      </div>
    );
  }

  // Convert database property to match the expected format
  const formattedProperty = {
    id: property.id,
    title: property.title,
    propertyType: property.property_type,
    address: property.address,
    city: property.city,
    state: property.state,
    country: 'Cyprus',
    bedrooms: property.bedrooms || 3,
    bathrooms: property.bathrooms || 2,
    maxGuests: 6,
    poolSize: 'Private Pool',
    price: Number(property.price),
    rating: 4.8,
    reviews: 89,
    yearBuilt: property.year_built || 2010,
    renovated: 2022,
    groundsSize: 'Resort Grounds',
    description: property.description || '',
    amenities: property.amenities || [],
    images: property.images || []
  };

  const pricePerNight = Number(property.price);

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
        bedrooms={formattedProperty.bedrooms}
        maxGuests={formattedProperty.maxGuests}
        pricePerNight={pricePerNight}
        rating={formattedProperty.rating}
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
        <VillaGallerySection images={formattedProperty.images} />
      </section>

      {/* Special Offers */}
      <SpecialOffersSection />

      {/* Availability Section */}
      <AvailabilitySection />
      
      {/* Villa Features */}
      <VillaFeaturesSection />

      {/* Villa Details */}
      <VillaDetailsSection 
        property={formattedProperty} 
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
