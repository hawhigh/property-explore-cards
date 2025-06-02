
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, LogOut, Settings, MapPin, Filter } from 'lucide-react';
import FilterSidebar from '@/components/FilterSidebar';
import PropertyGrid from '@/components/PropertyGrid';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              PropertyHub
            </Link>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  placeholder="Search properties by location, type, or amenities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 rounded-full border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="hidden md:flex items-center gap-2 rounded-full"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              
              <Button variant="outline" asChild className="rounded-full">
                <Link to="/single">View Demo</Link>
              </Button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
                    Featured Properties
                  </h2>
                  <p className="text-gray-600">
                    Handpicked properties for the perfect stay
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Property?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers who found their dream homes with us.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/auth">Get Started Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full text-white border-white hover:bg-white hover:text-blue-600">
              <Link to="/single">Explore Demo Property</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
