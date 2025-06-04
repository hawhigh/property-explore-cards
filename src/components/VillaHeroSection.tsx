
import VillaStats from '@/components/VillaStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Users, Star, Heart, Share2, Award } from 'lucide-react';

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
    <section className="relative py-24 md:py-40 px-4 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Main background image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=80')] bg-cover bg-center"></div>
        
        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/40 to-pink-900/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Animated elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-blue-400/50 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-purple-400/40 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-60 right-1/3 w-2 h-2 bg-pink-400/50 rounded-full animate-pulse delay-1500"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Location & Awards Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-blue-700 px-6 py-3 rounded-full text-sm font-medium shadow-xl border border-white/20">
              <MapPin className="w-4 h-4" />
              Anthorina Gardens Resort, Protaras, Cyprus
            </div>
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl">
              <Award className="w-4 h-4" />
              Award-Winning Villa
            </div>
          </div>

          {/* Main Title with Enhanced Typography */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight animate-fade-in">
              <span className="block mb-4 drop-shadow-lg">Villa Lucilla</span>
              <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl">
                Luxury Awaits
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8 drop-shadow-lg animate-fade-in delay-300">
              Experience the ultimate Cyprus getaway in our exclusive 3-bedroom villa with private pool, 
              resort amenities, and breathtaking Mediterranean views
            </p>

            {/* Enhanced Quick Stats */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20 animate-fade-in delay-500">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-800">Up to {maxGuests} guests</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20 animate-fade-in delay-700">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold text-gray-800">{rating} Exceptional</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in delay-900">
                <span className="font-bold text-lg">€{pricePerNight}/night</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Villa Stats */}
          <div className="mb-16 animate-fade-in delay-1000">
            <VillaStats 
              bedrooms={bedrooms}
              maxGuests={maxGuests}
              pricePerNight={pricePerNight}
              rating={rating}
            />
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button 
              onClick={onBookingClick}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 animate-fade-in delay-1200 border-2 border-white/20"
            >
              <CalendarDays className="w-6 h-6 mr-3" />
              Book Your Stay
            </Button>
            
            <div className="flex gap-4">
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white/80 hover:border-white text-white hover:text-gray-900 px-8 py-5 text-xl rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white transition-all animate-fade-in delay-1400"
                onClick={() => document.getElementById('villa-gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Gallery
              </Button>
              
              <Button 
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-900 hover:bg-white/90 backdrop-blur-sm w-14 h-14 rounded-full transition-all animate-fade-in delay-1600"
              >
                <Heart className="w-6 h-6" />
              </Button>
              
              <Button 
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-900 hover:bg-white/90 backdrop-blur-sm w-14 h-14 rounded-full transition-all animate-fade-in delay-1800"
              >
                <Share2 className="w-6 h-6" />
              </Button>
            </div>
          </div>
          
          {/* Enhanced Trust Indicators */}
          <div className="pt-8 border-t border-white/20 animate-fade-in delay-2000">
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Instant Booking</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <span className="font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-600"></div>
                <span className="font-medium">Free Cancellation</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-900"></div>
                <span className="font-medium">Best Price Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillaHeroSection;
