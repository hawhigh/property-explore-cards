
import { Card, CardContent } from '@/components/ui/card';

interface PropertyDescriptionProps {
  title: string;
  description: string;
}

const PropertyDescription = ({ title, description }: PropertyDescriptionProps) => {
  return (
    <Card className="border-l-4 border-l-blue-600">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">About {title.split(' - ')[0]}</h2>
        <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
      </CardContent>
    </Card>
  );
};

export default PropertyDescription;
