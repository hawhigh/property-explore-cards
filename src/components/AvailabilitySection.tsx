
import BookingWidget from '@/components/BookingWidget';

const AvailabilitySection = () => {
  return (
    <section className="py-8 md:py-16 px-4 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Check Availability
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your dates and see if Villa Lucilla is available for your perfect Cyprus vacation
          </p>
        </div>
        <BookingWidget />
      </div>
    </section>
  );
};

export default AvailabilitySection;
