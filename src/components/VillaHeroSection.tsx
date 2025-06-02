
import { Button } from '@/components/ui/button';
import VillaStats from '@/components/VillaStats';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
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
          
          <VillaStats 
            bedrooms={bedrooms}
            maxGuests={maxGuests}
            pricePerNight={pricePerNight}
            rating={rating}
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={onBookingClick}
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
              onClick={onManagementClick}
            >
              Manage Property
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg rounded-full border-2 border-red-200 hover:border-red-300"
              onClick={() => navigate('/admin')}
            >
              Admin Panel
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillaHeroSection;
