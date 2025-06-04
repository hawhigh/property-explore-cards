
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm hover:scale-105 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardHeader className="text-center pb-4 relative z-10">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </div>
        <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
          {service.category}
        </Badge>
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors">
          {service.name}
        </CardTitle>
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          €{service.price}
        </div>
        <div className="text-sm text-gray-500 font-medium">{service.unit}</div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <p className="text-gray-600 text-sm mb-6 leading-relaxed min-h-[40px]">
          {service.description}
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
            onClick={() => onUpdateQuantity(service.id, -1)}
            disabled={!quantity}
          >
            <Minus className="h-5 w-5" />
          </Button>
          
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600 min-w-[40px] text-center">
              {quantity || 0}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {quantity > 0 ? 'Selected' : 'Add'}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
            onClick={() => onUpdateQuantity(service.id, 1)}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        
        {quantity > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in">
            <div className="text-center">
              <span className="text-sm font-medium text-blue-700">
                Subtotal: €{service.price * quantity}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
