
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  icon: string;
}

interface ServiceCardProps {
  service: Service;
  quantity: number;
  onUpdateQuantity: (serviceId: string, change: number) => void;
}

const ServiceCard = ({ service, quantity, onUpdateQuantity }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
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
            onClick={() => onUpdateQuantity(service.id, -1)}
            disabled={!quantity}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="w-8 text-center font-semibold">
            {quantity || 0}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(service.id, 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
