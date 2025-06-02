
import { Button } from '@/components/ui/button';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Settings, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoleBasedHeroContent = () => {
  const { user, isAdmin, isAgent, userRole, isLoading } = useSecureAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="animate-pulse">{t('loading')}</div>;
  }

  // Unknown/Guest User Content
  if (!user) {
    return (
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-lg">
            ✨ {t('hero.experience')}
          </Badge>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={() => navigate('/auth')}
          >
            {t('hero.signin.to.book')}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-4 text-lg rounded-full border-2 border-blue-200 hover:border-blue-300"
            onClick={() => navigate('/single')}
          >
            {t('hero.explore.villa')}
          </Button>
        </div>
      </div>
    );
  }

  // Admin User Content
  if (isAdmin) {
    return (
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge className="bg-red-100 text-red-700 px-4 py-2 text-lg">
            🔧 Admin Dashboard
          </Badge>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome back, Administrator. Monitor bookings, manage properties, 
            and oversee the entire Villa Lucilla operation from your central hub.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <Button 
            size="lg" 
            variant="outline"
            className="flex flex-col items-center p-6 h-auto"
            onClick={() => navigate('/admin')}
          >
            <Settings className="h-6 w-6 mb-2" />
            <span>Admin Panel</span>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="flex flex-col items-center p-6 h-auto"
            onClick={() => navigate('/property-management')}
          >
            <BarChart3 className="h-6 w-6 mb-2" />
            <span>Analytics</span>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="flex flex-col items-center p-6 h-auto"
            onClick={() => navigate('/dashboard')}
          >
            <Users className="h-6 w-6 mb-2" />
            <span>User Management</span>
          </Button>
        </div>
      </div>
    );
  }

  // Property Manager/Agent Content
  if (isAgent || userRole === 'agent') {
    return (
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge className="bg-green-100 text-green-700 px-4 py-2 text-lg">
            🏠 Property Manager Portal
          </Badge>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage Villa Lucilla bookings, track guest experiences, 
            and optimize your property's performance with professional tools.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-full"
            onClick={() => navigate('/property-management')}
          >
            Manage Properties
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-4 text-lg rounded-full border-2 border-green-200 hover:border-green-300"
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Regular Logged User Content
  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <Badge className="bg-purple-100 text-purple-700 px-4 py-2 text-lg">
          🌟 {t('hero.welcome.back')}, {user.user_metadata?.full_name || 'Guest'}
        </Badge>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ready for your next Cyprus adventure? Villa Lucilla is waiting with 
          exclusive member benefits and personalized recommendations just for you.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => navigate('/single')}
        >
          <Calendar className="h-5 w-5 mr-2" />
          {t('hero.book.your.stay')}
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="px-8 py-4 text-lg rounded-full border-2 border-purple-200 hover:border-purple-300"
          onClick={() => navigate('/dashboard')}
        >
          {t('hero.my.bookings')}
        </Button>
      </div>
    </div>
  );
};

export default RoleBasedHeroContent;
