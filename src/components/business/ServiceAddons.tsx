
import React, { useState } from 'react';
import { Car, ChefHat, ShoppingCart, Sparkles, Plane, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ServiceAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  category: 'transport' | 'culinary' | 'convenience' | 'experience';
  popular?: boolean;
  included?: boolean;
}

interface ServiceAddonsProps {
  selectedServices: string[];
  onServiceToggle: (serviceId: string) => void;
  onTotalChange: (total: number) => void;
}

const ServiceAddons = ({ selectedServices, onServiceToggle, onTotalChange }: ServiceAddonsProps) => {
  const services: ServiceAddon[] = [
    {
      id: 'airport_transfer',
      name: 'Airport Transfer',
      description: 'Round-trip luxury transport from Larnaca Airport',
      price: 120,
      icon: <Plane className="h-5 w-5" />,
      category: 'transport',
      popular: true
    },
    {
      id: 'car_rental',
      name: 'Car Rental Discount',
      description: '20% off with our partner rental company',
      price: 0,
      icon: <Car className="h-5 w-5" />,
      category: 'transport',
      included: true
    },
    {
      id: 'grocery_stocking',
      name: 'Grocery Pre-Stocking',
      description: 'Fresh groceries and essentials ready on arrival',
      price: 45,
      icon: <ShoppingCart className="h-5 w-5" />,
      category: 'convenience',
      popular: true
    },
    {
      id: 'private_chef',
      name: 'Private Chef Experience',
      description: 'Traditional Cypriot dinner for up to 6 guests',
      price: 280,
      icon: <ChefHat className="h-5 w-5" />,
      category: 'culinary'
    },
    {
      id: 'restaurant_reservations',
      name: 'Restaurant Reservations',
      description: 'We book the best tables at top Protaras restaurants',
      price: 0,
      icon: <Utensils className="h-5 w-5" />,
      category: 'convenience',
      included: true
    },
    {
      id: 'concierge_service',
      name: '24/7 Concierge Service',
      description: 'Personal assistant for activities, bookings, and support',
      price: 75,
      icon: <Sparkles className="h-5 w-5" />,
      category: 'experience'
    }
  ];

  const total = services
    .filter(service => selectedServices.includes(service.id))
    .reduce((sum, service) => sum + service.price, 0);

  React.useEffect(() => {
    onTotalChange(total);
  }, [total, onTotalChange]);

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceAddon[]>);

  const categoryTitles = {
    transport: '🚗 Transportation',
    culinary: '🍽️ Culinary Experiences', 
    convenience: '🎯 Convenience Services',
    experience: '✨ Premium Experiences'
  };

  return (
    <Card className="border-2 border-purple-100">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Enhance Your Stay
        </CardTitle>
        <p className="text-sm text-gray-600">
          Add services to make your Cyprus vacation unforgettable
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedServices).map(([category, categoryServices]) => (
          <div key={category} className="space-y-3">
            <h3 className="font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {categoryTitles[category as keyof typeof categoryTitles]}
            </h3>
            
            {categoryServices.map(service => (
              <div key={service.id} className="group">
                <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
                  <div className="flex-shrink-0 mt-1">
                    {service.included ? (
                      <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    ) : (
                      <Checkbox
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => onServiceToggle(service.id)}
                        className="mt-0.5"
                      />
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                        {service.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        {service.popular && (
                          <Badge className="bg-orange-100 text-orange-700 text-xs">
                            Most Popular
                          </Badge>
                        )}
                        {service.included && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            Included Free
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                  </div>
                  
                  <div className="text-right">
                    {service.included ? (
                      <div className="text-green-600 font-semibold">FREE</div>
                    ) : (
                      <div className="text-lg font-bold text-gray-900">€{service.price}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {total > 0 && (
          <div className="border-t pt-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">Services Total:</span>
                <span className="text-2xl font-bold text-purple-600">€{total}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Your selected services will make this stay truly special! 🌟
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceAddons;
