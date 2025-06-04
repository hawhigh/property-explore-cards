
import ServiceCard from './ServiceCard';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  icon: string;
}

interface ServiceCategoryProps {
  category: string;
  services: Service[];
  selectedServices: Record<string, number>;
  onUpdateQuantity: (serviceId: string, change: number) => void;
}

const ServiceCategory = ({ category, services, selectedServices, onUpdateQuantity }: ServiceCategoryProps) => {
  return (
    <div className="h-full">
      {category && (
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-8 h-1 bg-blue-500 rounded"></span>
          {category}
        </h3>
      )}
      
      <div className="h-full">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            quantity={selectedServices[service.id]}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCategory;
