
import { ShoppingCart, Sparkles } from 'lucide-react';
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

interface OrderSummaryProps {
  selectedServices: Record<string, number>;
  services: Service[];
  onOrderServices: () => void;
}

const OrderSummary = ({ selectedServices, services, onOrderServices }: OrderSummaryProps) => {
  const getTotalPrice = () => {
    return Object.entries(selectedServices).reduce((total, [serviceId, quantity]) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service ? service.price * quantity : 0);
    }, 0);
  };

  const getItemCount = () => {
    return Object.values(selectedServices).reduce((total, quantity) => total + quantity, 0);
  };

  if (Object.keys(selectedServices).length === 0) {
    return null;
  }

  return (
    <div className="mt-16 animate-fade-in">
      <Card className="max-w-lg mx-auto bg-gradient-to-br from-white to-blue-50/50 shadow-2xl border-0 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <Badge className="bg-blue-100 text-blue-700">
              {getItemCount()} {getItemCount() === 1 ? 'Service' : 'Services'} Selected
            </Badge>
          </div>
          <CardTitle className="flex items-center justify-center gap-3 text-xl">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
            Your Adventure Package
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4 mb-6">
            {Object.entries(selectedServices).map(([serviceId, quantity]) => {
              const service = services.find(s => s.id === serviceId);
              if (!service) return null;
              
              return (
                <div key={serviceId} className="flex justify-between items-center p-3 bg-white/60 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-600">
                        {quantity} × €{service.price}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-lg text-blue-600">
                    €{service.price * quantity}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="border-t-2 border-blue-100 pt-4 mb-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-gray-900">Total Experience</span>
              <span className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                €{getTotalPrice()}
              </span>
            </div>
          </div>
          
          <Button 
            onClick={onOrderServices}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Add to Your Villa Booking
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-3">
            Services will be confirmed with your villa reservation
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
