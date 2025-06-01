
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Heart, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">RealEstate</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Buy
            </Link>
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Rent
            </Link>
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Sell
            </Link>
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Agents
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
            <Button size="sm">Sign In</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
