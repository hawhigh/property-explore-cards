
import { MapPin, Clock, Car, Plane } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LocationSection = () => {
  const nearbyAttractions = [
    {
      name: "Fig Tree Bay",
      distance: "0.8 km",
      time: "10 min walk",
      type: "Beach",
      description: "Famous crescent-shaped beach with crystal clear waters"
    },
    {
      name: "Cape Greco National Park",
      distance: "8 km",
      time: "12 min drive",
      type: "Nature",
      description: "Stunning coastal cliffs and hiking trails"
    },
    {
      name: "Protaras Ocean Aquarium",
      distance: "2.1 km",
      time: "5 min drive",
      type: "Family",
      description: "Cyprus's largest aquarium with marine life exhibits"
    },
    {
      name: "Ayia Napa",
      distance: "12 km",
      time: "15 min drive",
      type: "Nightlife",
      description: "Vibrant nightlife and entertainment district"
    },
    {
      name: "Konnos Beach",
      distance: "6 km",
      time: "10 min drive",
      type: "Beach",
      description: "Secluded bay perfect for swimming and snorkeling"
    },
    {
      name: "Paralimni Town Square",
      distance: "4 km",
      time: "8 min drive",
      type: "Shopping",
      description: "Local shops, restaurants, and traditional markets"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-green-100 text-green-700 px-4 py-2 text-lg mb-4">
            📍 Prime Location
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Protaras
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Villa Lucilla is perfectly positioned in the heart of Protaras, giving you easy access to Cyprus's most beautiful attractions
          </p>
        </div>

        {/* Map placeholder and location info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Villa Lucilla Location</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Konnou street 17, Anthorina Gardens Resort</span>
                </div>
                <div className="flex items-center gap-3">
                  <Plane className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">45 min from Larnaca Airport</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Free private parking available</span>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Transportation</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Plane className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Airport Transfer</h4>
                    <p className="text-gray-600">Private transfer service available for €75 per journey</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Car className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Car Rental</h4>
                    <p className="text-gray-600">Economy cars available from €35/day with insurance</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Local Transport</h4>
                    <p className="text-gray-600">Regular bus service to Ayia Napa and surrounding areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nearby Attractions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-900">{attraction.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {attraction.type}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{attraction.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-medium">{attraction.distance}</span>
                    <span className="text-gray-500">{attraction.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
