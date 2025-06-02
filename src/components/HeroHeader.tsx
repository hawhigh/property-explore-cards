
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, LogOut, Settings, Filter } from 'lucide-react';
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
                placeholder={t('header.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 rounded-full border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <Button 
              variant="outline" 
              className="hidden md:flex items-center gap-2 rounded-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {t('header.filters')}
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
                      {t('header.dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('header.signout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Link to="/auth">{t('header.signin')}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;
