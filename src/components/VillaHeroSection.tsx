
import VillaStats from '@/components/VillaStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Users, Star } from 'lucide-react';

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
    <section className="relative py-20 md:py-32 px-4 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=80')] bg-cover bg-center opacity-[0.08]"></div>
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-indigo-400/30 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
            <MapPin className="w-4 h-4" />
            Anthorina Gardens Resort, Protaras, Cyprus
          </div>

          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              <span className="block mb-2">Villa Lucilla</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                Luxury Awaits
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-6">
              Experience the ultimate Cyprus getaway in our exclusive 3-bedroom villa with private pool and resort amenities
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-700 mb-8">
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Up to {maxGuests} guests</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>{rating} rating</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
                <span className="text-blue-600 font-semibold">€{pricePerNight}/night</span>
              </div>
            </div>
          </div>
          
          {/* Villa Stats */}
          <div className="mb-12">
            <VillaStats 
              bedrooms={bedrooms}
              maxGuests={maxGuests}
              pricePerNight={pricePerNight}
              rating={rating}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={onBookingClick}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <CalendarDays className="w-5 h-5 mr-2" />
              Book Your Stay
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all"
              onClick={() => document.getElementById('villa-gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Gallery
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="pt-8 border-t border-gray-200/50">
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
                <span>Free Cancellation</span>
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
