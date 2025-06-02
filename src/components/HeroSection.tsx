
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  return (
    <section className="relative py-16 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Property</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover exceptional properties from luxury villas to modern apartments. 
            Your dream home is just a click away.
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-500">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-500">Locations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">10k+</div>
              <div className="text-sm text-gray-500">Happy Clients</div>
            </div>
          </div>

          {/* Popular Locations */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Protaras', 'Cyprus', 'Famagusta', 'Ayia Napa', 'Limassol'].map((location) => (
              <Badge key={location} variant="secondary" className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer transition-colors">
                <MapPin className="h-3 w-3 mr-1" />
                {location}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
