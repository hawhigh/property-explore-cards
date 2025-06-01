
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, Bath, Star } from 'lucide-react';
import BookingCalendar from '@/components/BookingCalendar';
import PropertyReviews from '@/components/PropertyReviews';

const PropertyDetail = () => {
  const { id } = useParams();

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!property) {
    return <div className="min-h-screen flex items-center justify-center">Property not found</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                <Badge variant="secondary">{property.property_type}</Badge>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.address}, {property.city}, {property.state}</span>
              </div>

              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Home className="h-5 w-5 mr-1" />
                  {property.bedrooms} beds
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-1" />
                  {property.bathrooms} baths
                </div>
                <span>{property.sqft?.toLocaleString()} sqft</span>
                {property.year_built && <span>Built {property.year_built}</span>}
              </div>

              <div className="text-3xl font-bold text-blue-600 mb-6">
                {formatPrice(property.price)}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description || 'No description available.'}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <PropertyReviews propertyId={property.id} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <BookingCalendar 
                propertyId={property.id} 
                pricePerNight={property.price / 30} // Assuming monthly rent converted to daily
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
