
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

      {/* Hero Section */}
      <HeroSection />

      {/* Booking Widget Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <BookingWidget />
        </div>
      </section>

      {/* Featured Property Section */}
      <FeaturedProperty />

      <div className="container mx-auto px-4 pb-16">
        <div className="flex gap-8">
          {/* Sidebar - Show/Hide on Mobile */}
          <aside className={`w-80 flex-shrink-0 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    More Properties
                  </h2>
                  <p className="text-gray-600">
                    Explore additional handpicked properties
                  </p>
                </div>
                
                {/* Mobile Filter Toggle */}
                <Button 
                  variant="outline" 
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
            </div>

            <PropertyGrid filters={filters} />
          </main>
        </div>
      </div>

      {/* Footer CTA */}
      <FooterCTA />
    </div>
  );
};

export default Index;
