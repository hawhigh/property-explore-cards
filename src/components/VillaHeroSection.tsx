
import VillaStats from '@/components/VillaStats';
import RoleBasedHeroContent from '@/components/RoleBasedHeroContent';
import { useLanguage } from '@/contexts/LanguageContext';

interface VillaHeroSectionProps {
  bedrooms: number;
  maxGuests: number;
  pricePerNight: number;
  rating: number;
  onBookingClick: () => void;
  onManagementClick: () => void;
}

const VillaHeroSection = ({ 
  bedrooms, 
  maxGuests, 
  pricePerNight, 
  rating,
  onBookingClick,
  onManagementClick
}: VillaHeroSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Enhanced Background with animated elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80')] bg-cover bg-center opacity-[0.03]"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-indigo-400/30 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced title with better typography */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              <span className="block mb-2">{t('hero.title')}</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                {t('hero.subtitle')}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Experience luxury in the heart of Cyprus with our exclusive villa rental
            </p>
          </div>
          
          {/* Enhanced Villa Stats */}
          <div className="mb-12">
            <VillaStats 
              bedrooms={bedrooms}
              maxGuests={maxGuests}
              pricePerNight={pricePerNight}
              rating={rating}
            />
          </div>

          {/* Role-based content */}
          <RoleBasedHeroContent />
          
          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-gray-200/50">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Verified Properties</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Best Price Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillaHeroSection;
