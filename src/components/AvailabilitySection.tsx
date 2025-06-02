
import BookingWidget from '@/components/BookingWidget';

const AvailabilitySection = () => {
  return (
    <section className="py-16 md:py-24 px-4 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Live Availability
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Check Availability
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select your dates and see if Villa Lucilla is available for your perfect Cyprus vacation.
            Real-time booking with instant confirmation.
          </p>
        </div>
        
        <div className="relative">
          <BookingWidget />
          
          {/* Trust indicators */}
          <div className="mt-8 flex justify-center">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Free Cancellation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailabilitySection;
