
const WhyChooseSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Villa Lucilla?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes our luxury villa the perfect choice for your Cyprus vacation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🏖️</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Prime Location</h3>
            <p className="text-gray-600">Located in prestigious Protaras with easy access to beautiful beaches and local attractions.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🏊‍♂️</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Private Pool</h3>
            <p className="text-gray-600">Enjoy your own private swimming pool with outdoor dining area and BBQ facilities.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Luxury Comfort</h3>
            <p className="text-gray-600">Modern amenities, air conditioning, and resort access for the ultimate comfort experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
