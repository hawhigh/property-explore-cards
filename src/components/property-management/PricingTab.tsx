
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Save
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PricingTabProps {
  property: any;
  onQuickUpdate: (field: string, value: any) => void;
}

const PricingTab = ({ property, onQuickUpdate }: PricingTabProps) => {
  const { toast } = useToast();
  const [basePrice, setBasePrice] = useState(property?.price || 0);
  const [weekendSurcharge, setWeekendSurcharge] = useState(20);
  const [seasonalPricing, setSeasonalPricing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePriceUpdate = async () => {
    if (!property?.id) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('properties')
        .update({ price: basePrice })
        .eq('id', property.id);

      if (error) throw error;

      toast({
        title: "Price Updated",
        description: "Property pricing has been updated successfully.",
      });
      
      onQuickUpdate('price', basePrice);
    } catch (error) {
      console.error('Error updating price:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update pricing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Pricing Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Base Price (per night)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  className="flex-1"
                />
                <Button 
                  onClick={handlePriceUpdate} 
                  disabled={isUpdating}
                  size="sm"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Weekend Surcharge (%)</Label>
              <Input
                type="number"
                value={weekendSurcharge}
                onChange={(e) => setWeekendSurcharge(Number(e.target.value))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Seasonal Pricing</Label>
              <Switch 
                checked={seasonalPricing}
                onCheckedChange={setSeasonalPricing}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Pricing Insights</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Current Rate</p>
                  <p className="text-xs text-gray-600">Per night</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-900">€{basePrice}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Market Average</p>
                  <p className="text-xs text-gray-600">Similar properties</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-900">€{Math.round(basePrice * 1.15)}</p>
                  <Badge variant="secondary" className="text-xs">Above avg</Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Pricing competitive for your area</span>
              </div>
            </div>
          </div>
        </div>
        
        {seasonalPricing && (
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium">Seasonal Rates</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Summer Peak</span>
                  <Calendar className="h-4 w-4 text-orange-500" />
                </div>
                <p className="text-lg font-bold">€{Math.round(basePrice * 1.3)}</p>
                <p className="text-xs text-gray-600">Jun - Aug</p>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Spring/Fall</span>
                  <Calendar className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-lg font-bold">€{Math.round(basePrice * 1.1)}</p>
                <p className="text-xs text-gray-600">Mar-May, Sep-Nov</p>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Winter</span>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-lg font-bold">€{Math.round(basePrice * 0.8)}</p>
                <p className="text-xs text-gray-600">Dec - Feb</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingTab;
