
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ServiceCategory from './services/ServiceCategory';
import OrderSummary from './services/OrderSummary';
import { services } from './services/servicesData';

const AdditionalServicesSection = () => {
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});

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

  const handleOrderServices = () => {
    if (Object.keys(selectedServices).length === 0) {
      toast({
        title: "No Services Selected",
        description: "Please select at least one service to proceed.",
        variant: "destructive"
      });
      return;
    }

    const totalPrice = Object.entries(selectedServices).reduce((total, [serviceId, quantity]) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service ? service.price * quantity : 0);
    }, 0);

    toast({
      title: "Services Added to Booking!",
      description: `€${totalPrice} worth of services added. Complete your villa booking to confirm.`,
    });
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-tl from-pink-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 text-lg mb-6 animate-fade-in">
            🌟 Premium Experiences
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight animate-fade-in delay-200">
            Enhance Your
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Cyprus Adventure
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-300">
            Discover the best of Cyprus with our curated selection of premium activities and services. 
            From underwater adventures to cultural explorations, create unforgettable memories.
          </p>
        </div>

        {/* Services Grid - Single row layout */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {services.map(service => (
              <ServiceCategory
                key={service.category}
                category=""
                services={[service]}
                selectedServices={selectedServices}
                onUpdateQuantity={updateServiceQuantity}
              />
            ))}
          </div>
        </div>

        <OrderSummary
          selectedServices={selectedServices}
          services={services}
          onOrderServices={handleOrderServices}
        />
      </div>
    </section>
  );
};

export default AdditionalServicesSection;
