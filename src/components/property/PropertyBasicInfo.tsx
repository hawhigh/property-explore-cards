
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyFormData } from '@/types/property';

interface PropertyBasicInfoProps {
  formData: PropertyFormData;
  setFormData: (data: PropertyFormData) => void;
}

const PropertyBasicInfo = ({ formData, setFormData }: PropertyBasicInfoProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="property_type">Property Type *</Label>
          <Select value={formData.property_type} onValueChange={(value) => setFormData({...formData, property_type: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Condo">Condo</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Townhouse">Townhouse</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
        />
      </div>
    </>
  );
};

export default PropertyBasicInfo;
