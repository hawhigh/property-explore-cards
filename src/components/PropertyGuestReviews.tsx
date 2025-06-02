
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PropertyGuestReviews = () => {
  const reviews = [
    {
      id: '1',
      name: 'Alessandro M.',
      date: '3 weeks ago',
      rating: 5,
      comment: "Absolutely magical stay at Villa Lucilla. The views are breathtaking, the pool area is perfect for relaxation, and the villa itself is beautifully maintained. The kitchen is fully equipped and the outdoor dining area made our evenings unforgettable. Highly recommend for families or groups!"
    },
    {
      id: '2',
      name: 'Sophie L.',
      date: '1 month ago',
      rating: 5,
      comment: "The perfect Tuscan escape! Villa Lucilla exceeded all our expectations. The property is stunning, impeccably clean, and the grounds are simply beautiful. Waking up to those vineyard views every morning was a dream. Can't wait to return!"
    },
    {
      id: '3',
      name: 'James & Rachel',
      date: '2 months ago',
      rating: 5,
      comment: "Our wedding party stayed here and it was absolutely perfect. The villa accommodated our group of 10 comfortably, the outdoor spaces were ideal for celebrations, and the location provided easy access to wine tours. Truly a once-in-a-lifetime experience!"
    }
  ];

  return (
    <Card>
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Guest Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={review.id} className={index < reviews.length - 1 ? "border-b pb-6" : ""}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-gray-900">{review.name}</span>
                <span className="text-gray-500">• {review.date}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyGuestReviews;
