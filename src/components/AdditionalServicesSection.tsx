
import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  icon: string;
}

const AdditionalServicesSection = () => {
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});

  const services: Service[] = [
    {
      id: 'airport-transfer',
      name: 'Airport Transfer',
      description: 'Private transfer from/to Larnaca Airport',
      price: 75,
      unit: 'per transfer',
      category: 'Transport',
      icon: '🚗'
    },
    {
      id: 'car-rental',
      name: 'Car Rental',
      description: 'Economy car rental with insurance included',
      price: 35,
      unit: 'per day',
      category: 'Transport',
      icon: '🚙'
    },
    {
      id: 'cleaning-service',
      name: 'Extra Cleaning',
      description: 'Additional mid-stay cleaning service',
      price: 60,
      unit: 'per service',
      category: 'Housekeeping',
      icon: '🧹'
    },
    {
      id: 'grocery-delivery',
      name: 'Grocery Pre-Stocking',
      description: 'Essential groceries delivered before arrival',
      price: 45,
      unit: 'per package',
      category: 'Convenience',
      icon: '🛒'
    },
    {
      id: 'chef-service',
      name: 'Private Chef',
      description: 'Professional chef for dinner preparation',
      price: 150,
      unit: 'per evening',
      category: 'Dining',
      icon: '👨‍🍳'
    },
    {
      id: 'spa-service',
      name: 'In-Villa Spa',
      description: 'Relaxing massage and spa treatments',
      price: 120,
      unit: 'per session',
      category: 'Wellness',
      icon: '💆‍♀️'
    },
    {
      id: 'boat-trip',
      name: 'Boat Excursion',
      description: 'Half-day boat trip around Cyprus coast',
      price: 200,
      unit: 'per person',
      category: 'Activities',
      icon: '⛵'
    },
    {
      id: 'babysitting',
      name: 'Babysitting Service',
      description: 'Professional childcare service',
      price: 25,
      unit: 'per hour',
      category: 'Family',
      icon: '👶'
    }
  ];

  const categories = [...new Set(services.map(service => service.category))];

  const updateServiceQuantity = (serviceId: string, change: number) => {
    setSelectedServices(prev => {
      const current = prev[serviceId] || 0;
      const newQuantity = Math.max(0, current + change);
      if (newQuantity === 0) {
        const { [serviceId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [serviceId]: newQuantity };
    });
  };

  const getTotalPrice = () => {
    return Object.entries(selectedServices).reduce((total, [serviceId, quantity]) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service ? service.price * quantity : 0);
    }, 0);
  };

  const handleOrderServices = () => {
    if (Object.keys(selectedServices).length === 0) {
      toast({
        title: "No Services Selected",
        description: "Please select at least one service to proceed.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Services Added to Booking!",
      description: `€${getTotalPrice()} worth of services added. Complete your villa booking to confirm.`,
    });
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-lg mb-4">
            ✨ Enhance Your Stay
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Additional Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make your stay at Villa Lucilla even more special with our curated selection of premium services
          </p>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded"></span>
              {category}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services
                .filter(service => service.category === category)
                .map(service => (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center pb-4">
                      <div className="text-4xl mb-3">{service.icon}</div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <div className="text-2xl font-bold text-blue-600">
                        €{service.price}
                      </div>
                      <div className="text-sm text-gray-500">{service.unit}</div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      
                      <div className="flex items-center justify-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateServiceQuantity(service.id, -1)}
                          disabled={!selectedServices[service.id]}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-8 text-center font-semibold">
                          {selectedServices[service.id] || 0}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateServiceQuantity(service.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}

        {/* Order Summary */}
        {Object.keys(selectedServices).length > 0 && (
          <div className="mt-12">
            <Card className="max-w-md mx-auto bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Selected Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {Object.entries(selectedServices).map(([serviceId, quantity]) => {
                    const service = services.find(s => s.id === serviceId);
                    if (!service) return null;
                    
                    return (
                      <div key={serviceId} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-gray-500">
                            {quantity} × €{service.price}
                          </div>
                        </div>
                        <div className="font-semibold">
                          €{service.price * quantity}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t pt-3 mb-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>€{getTotalPrice()}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleOrderServices}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Add to Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdditionalServicesSection;
