
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/types/property';

interface PropertyAmenitiesFormProps {
  formData: PropertyFormData;
  setFormData: (data: PropertyFormData) => void;
}

const PropertyAmenitiesForm = ({ formData, setFormData }: PropertyAmenitiesFormProps) => {
  return (
    <>
      <div>
        <Label htmlFor="amenities">Amenities (comma separated)</Label>
        <Input
          id="amenities"
          value={formData.amenities}
          onChange={(e) => setFormData({...formData, amenities: e.target.value})}
          placeholder="Pool, Gym, Parking, Pet Friendly"
        />
      </div>

      <div>
        <Label htmlFor="images">Image URLs (comma separated)</Label>
        <Input
          id="images"
          value={formData.images}
          onChange={(e) => setFormData({...formData, images: e.target.value})}
          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
        />
      </div>
    </>
  );
};

export default PropertyAmenitiesForm;
