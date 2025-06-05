
import BookingWidget from '@/components/BookingWidget';
import { Shield, Clock, CheckCircle, Users } from 'lucide-react';

const AvailabilitySection = () => {
  return (
    <section className="py-16 md:py-24 px-4 relative bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" />
            No Registration Required
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Check Availability & Book
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Reserve Villa Lucilla instantly without creating an account. 
            Simply provide your details and we'll confirm your booking within 24 hours.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Quick Booking</h4>
                <p className="text-sm text-gray-600">No lengthy registration</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Instant Response</h4>
                <p className="text-sm text-gray-600">Confirmed within 24h</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Personal Service</h4>
                <p className="text-sm text-gray-600">Direct owner contact</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <BookingWidget />
          
          {/* Trust indicators */}
          <div className="mt-8 flex justify-center">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 bg-white/60 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>No Payment Now</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Flexible Cancellation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailabilitySection;
