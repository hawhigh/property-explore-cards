
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FilterSidebar from '@/components/FilterSidebar';
import PropertyGrid from '@/components/PropertyGrid';
import BookingWidget from '@/components/BookingWidget';
import HeroHeader from '@/components/HeroHeader';
import HeroSection from '@/components/HeroSection';
import FeaturedProperty from '@/components/FeaturedProperty';
import FooterCTA from '@/components/FooterCTA';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Header */}
      <HeroHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* Enhanced Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dream Property
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              From luxury villas in Cyprus to modern apartments worldwide. 
              Find exceptional properties that match your lifestyle and dreams.
            </p>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">500+</div>
                <div className="text-sm md:text-base text-gray-600">Premium Properties</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-sm md:text-base text-gray-600">Global Locations</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">10k+</div>
                <div className="text-sm md:text-base text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">24/7</div>
                <div className="text-sm md:text-base text-gray-600">Expert Support</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                Explore Properties
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg rounded-full border-2 border-blue-200 hover:border-blue-300">
                View Virtual Tours
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Booking Widget Section */}
      <section className="py-8 md:py-16 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Start Your Property Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use our advanced search to find properties that perfectly match your needs
            </p>
          </div>
          <BookingWidget />
        </div>
      </section>

      {/* Featured Property Section */}
      <FeaturedProperty />

      {/* Properties Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore More Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our curated collection of premium properties
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile-optimized Sidebar */}
            <aside className={`w-full lg:w-80 flex-shrink-0 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6 lg:hidden">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      className="text-gray-500"
                    >
                      ✕
                    </Button>
                  </div>
                  <FilterSidebar onFilterChange={handleFilterChange} />
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      Available Properties
                    </h3>
                    <p className="text-gray-600 hidden md:block">
                      Discover handpicked properties from around the world
                    </p>
                  </div>
                  
                  {/* Mobile Filter Toggle */}
                  <Button 
                    variant="outline" 
                    className="lg:hidden flex items-center gap-2 rounded-full"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    {showFilters ? 'Hide' : 'Show'} Filters
                  </Button>
                </div>
              </div>

              <PropertyGrid filters={filters} />
            </main>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PropertyHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide exceptional service and expertise to make your property journey seamless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Properties</h3>
              <p className="text-gray-600">Carefully curated collection of luxury properties in prime locations worldwide.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Support</h3>
              <p className="text-gray-600">24/7 professional assistance from our experienced property consultants.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Process</h3>
              <p className="text-gray-600">Safe and transparent transactions with comprehensive legal support.</p>
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
