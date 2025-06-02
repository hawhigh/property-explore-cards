
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/types/property';

interface PropertyDetailsProps {
  formData: PropertyFormData;
  setFormData: (data: PropertyFormData) => void;
}

const PropertyDetails = ({ formData, setFormData }: PropertyDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <Label htmlFor="price">Price ($) *</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          required
        />
      </div>
      <div>
        <Label htmlFor="bedrooms">Bedrooms</Label>
        <Input
          id="bedrooms"
          type="number"
          value={formData.bedrooms}
          onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="bathrooms">Bathrooms</Label>
        <Input
          id="bathrooms"
          type="number"
          value={formData.bathrooms}
          onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="sqft">Square Feet</Label>
        <Input
          id="sqft"
          type="number"
          value={formData.sqft}
          onChange={(e) => setFormData({...formData, sqft: e.target.value})}
        />
      </div>
    </div>
  );
};

export default PropertyDetails;
