
import { ShoppingCart } from 'lucide-react';
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

  if (Object.keys(selectedServices).length === 0) {
    return null;
  }

  return (
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
            onClick={onOrderServices}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Add to Booking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
