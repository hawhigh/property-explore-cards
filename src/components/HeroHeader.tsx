
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeroHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const HeroHeader = ({ searchQuery, setSearchQuery, showFilters, setShowFilters }: HeroHeaderProps) => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-blue-600 group-hover:text-indigo-600 transition-colors" />
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl group-hover:bg-indigo-600/30 transition-all"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Villa Lucilla
              </span>
              <div className="text-xs text-gray-500">Luxury Cyprus Retreat</div>
            </div>
          </Link>
          
          {/* Contact Info */}
          <div className="hidden lg:flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              <span>+357 23 456 789</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <span>info@villalucilla.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>Protaras, Cyprus</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
                  >
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-gray-200">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all px-6">
                <Link to="/auth">Book Now</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;
