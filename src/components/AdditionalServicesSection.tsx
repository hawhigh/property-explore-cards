
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
          <ServiceCategory
            key={category}
            category={category}
            services={services.filter(service => service.category === category)}
            selectedServices={selectedServices}
            onUpdateQuantity={updateServiceQuantity}
          />
        ))}

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
