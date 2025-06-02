
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, LogOut, Settings, Filter, Sparkles } from 'lucide-react';
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
    <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-blue-600 group-hover:text-indigo-600 transition-colors" />
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl group-hover:bg-indigo-600/30 transition-all"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PropertyHub
            </span>
          </Link>
          
          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
              <Input
                placeholder={t('header.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg shadow-sm bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <Button 
              variant="outline" 
              className="hidden md:flex items-center gap-2 rounded-2xl border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {t('header.filters')}
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-gray-200">
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
              <Button asChild className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all px-6">
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
