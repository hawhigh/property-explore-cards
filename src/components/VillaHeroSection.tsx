
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
    <section className="relative py-12 md:py-20 px-4 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {t('hero.title')}
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t('hero.subtitle')}
            </span>
          </h1>
          
          <VillaStats 
            bedrooms={bedrooms}
            maxGuests={maxGuests}
            pricePerNight={pricePerNight}
            rating={rating}
          />

          <RoleBasedHeroContent />
        </div>
      </div>
    </section>
  );
};

export default VillaHeroSection;
