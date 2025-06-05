
import BookingWidget from '@/components/BookingWidget';
import { Shield, Clock, CheckCircle, Users, Heart, Star } from 'lucide-react';

const AvailabilitySection = () => {
  return (
    <section className="py-16 md:py-24 px-4 relative bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-pink-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-sm hover:shadow-md transition-shadow">
            <Shield className="w-4 h-4" />
            <span>✨ No Registration Required</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            <span className="block mb-2">Ready to Escape?</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Book Your Dream Stay
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
            🏖️ Your perfect Cyprus getaway is just a few clicks away! 
            Simply choose your dates and we'll take care of the rest.
          </p>

          {/* Enhanced Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="group flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900 text-lg">Super Quick</h4>
                <p className="text-gray-600">Book in under 2 minutes</p>
              </div>
            </div>
            
            <div className="group flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900 text-lg">Instant Confirmation</h4>
                <p className="text-gray-600">We'll respond within hours</p>
              </div>
            </div>
            
            <div className="group flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900 text-lg">Personal Touch</h4>
                <p className="text-gray-600">Direct owner care</p>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium">4.9/5 Guest Rating</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="font-medium">500+ Happy Guests</span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <BookingWidget />
          
          {/* Enhanced Trust indicators */}
          <div className="mt-8 flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-white/50">
              <div className="flex items-center gap-2 text-green-700 font-medium">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>💳 No Payment Now</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-medium">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                <span>🎯 No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 text-purple-700 font-medium">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-600"></div>
                <span>🔄 Flexible Cancellation</span>
              </div>
            </div>
          </div>

          {/* Friendly reminder */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm bg-white/40 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
              💡 Have questions? We're here to help make your stay perfect!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailabilitySection;
