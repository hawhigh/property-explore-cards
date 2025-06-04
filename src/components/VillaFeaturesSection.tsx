
import { Wifi, Car, Utensils, Waves, Home, Shield, Coffee, TreePine } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const VillaFeaturesSection = () => {
  const features = [
    {
      icon: <Waves className="h-8 w-8" />,
      title: "Private Pool & Terrace",
      description: "Stunning private swimming pool with spacious sun terrace and outdoor dining area",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "3 Luxury Bedrooms",
      description: "Elegantly furnished bedrooms with premium linens and en-suite bathrooms",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Gourmet Kitchen",
      description: "Fully equipped modern kitchen with premium appliances and dining space",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: "High-Speed WiFi",
      description: "Complimentary high-speed internet throughout the villa for work and leisure",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: "Private Parking",
      description: "Secure private parking space within the gated resort community",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "24/7 Security",
      description: "Round-the-clock security and concierge services within the resort",
      gradient: "from-gray-600 to-gray-800"
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: "Welcome Package",
      description: "Complimentary welcome basket with local delicacies and refreshments",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <TreePine className="h-8 w-8" />,
      title: "Resort Amenities",
      description: "Access to all Anthorina Gardens Resort facilities and services",
      gradient: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tl from-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 text-lg mb-6 animate-fade-in">
            🏖️ Villa Features
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight animate-fade-in delay-200">
            Everything You Need for the
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Perfect Stay
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-300">
            Villa Lucilla combines luxury living with modern convenience. Every detail has been carefully 
            crafted to ensure your Cyprus vacation exceeds all expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:scale-105 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed flex-grow text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional highlights */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white max-w-4xl mx-auto shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl md:text-4xl font-bold mb-6">
              Resort-Style Living in the Heart of Protaras
            </h3>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Located within the prestigious Anthorina Gardens Resort, Villa Lucilla offers 
              the perfect blend of privacy and access to world-class amenities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">2010</div>
                <div className="text-sm opacity-80">Year Built</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">2022</div>
                <div className="text-sm opacity-80">Last Renovated</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">150m²</div>
                <div className="text-sm opacity-80">Living Space</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillaFeaturesSection;
