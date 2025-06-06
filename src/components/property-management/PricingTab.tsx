
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PricingTabProps {
  property: any;
  onQuickUpdate: (field: string, value: any) => void;
}

const PricingTab = ({ property, onQuickUpdate }: PricingTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dynamic Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Base Price per Night</Label>
              <div className="flex items-center">
                <span className="text-lg font-bold">€</span>
                <Input 
                  type="number" 
                  defaultValue={property.price} 
                  className="ml-1"
                  onBlur={(e) => onQuickUpdate('price', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Weekend Premium (%)</Label>
              <Input type="number" defaultValue="25" />
            </div>
            <div className="space-y-2">
              <Label>Holiday Premium (%)</Label>
              <Input type="number" defaultValue="50" />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Pricing Rules</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="text-sm font-medium">Last Minute (7 days)</p>
                  <p className="text-xs text-gray-500">15% discount</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="text-sm font-medium">Long Stay (7+ nights)</p>
                  <p className="text-xs text-gray-500">10% discount</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingTab;
