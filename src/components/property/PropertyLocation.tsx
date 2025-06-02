
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyFormData } from '@/types/property';

interface PropertyLocationProps {
  formData: PropertyFormData;
  setFormData: (data: PropertyFormData) => void;
}

const PropertyLocation = ({ formData, setFormData }: PropertyLocationProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({...formData, state: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="zip_code">Zip Code *</Label>
          <Input
            id="zip_code"
            value={formData.zip_code}
            onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="year_built">Year Built</Label>
          <Input
            id="year_built"
            type="number"
            value={formData.year_built}
            onChange={(e) => setFormData({...formData, year_built: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value: 'active' | 'pending' | 'sold' | 'rented') => setFormData({...formData, status: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default PropertyLocation;
