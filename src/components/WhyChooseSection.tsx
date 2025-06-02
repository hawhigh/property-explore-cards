
const WhyChooseSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
            ✨ Premium Experience
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Why Choose Villa Lucilla?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover what makes our luxury villa the perfect choice for your Cyprus vacation.
            Every detail crafted for your comfort and enjoyment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-blue-200/50">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🏖️</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Prime Location</h3>
            <p className="text-gray-600 leading-relaxed">Located in prestigious Protaras with easy access to beautiful beaches and local attractions. Minutes from crystal-clear waters.</p>
          </div>

          <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-green-200/50">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🏊‍♂️</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Private Pool</h3>
            <p className="text-gray-600 leading-relaxed">Enjoy your own private swimming pool with outdoor dining area and BBQ facilities. Perfect for relaxation and entertainment.</p>
          </div>

          <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-purple-200/50 md:col-span-2 lg:col-span-1">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Luxury Comfort</h3>
            <p className="text-gray-600 leading-relaxed">Modern amenities, air conditioning, and resort access for the ultimate comfort experience. Every detail designed for luxury.</p>
          </div>
        </div>

        {/* Additional features grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🍽️</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Gourmet Kitchen</h4>
            <p className="text-sm text-gray-600">Fully equipped</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">📶</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">High-Speed WiFi</h4>
            <p className="text-sm text-gray-600">Stay connected</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🚗</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Private Parking</h4>
            <p className="text-sm text-gray-600">Secure & free</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🧹</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Housekeeping</h4>
            <p className="text-sm text-gray-600">Weekly service</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
