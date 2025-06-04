
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah & Michael Johnson",
      location: "London, UK",
      rating: 5,
      text: "Villa Lucilla exceeded all our expectations! The private pool was perfect for our family, and the location in Protaras couldn't be better. The additional services made our stay absolutely seamless.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Maria Gonzalez",
      location: "Madrid, Spain",
      rating: 5,
      text: "The most beautiful villa I've ever stayed in! Everything was exactly as described. The airport transfer service and grocery pre-stocking were incredibly convenient. Will definitely return!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "James & Emma Wilson",
      location: "Dublin, Ireland",
      rating: 5,
      text: "Our honeymoon at Villa Lucilla was magical. The in-villa spa service was the perfect touch of luxury. The villa is immaculate and the resort location is pristine. Highly recommended!",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Alessandro Romano",
      location: "Rome, Italy",
      rating: 5,
      text: "Spectacular villa with amazing amenities. The private chef service for our anniversary dinner was outstanding. The boat excursion was also unforgettable. Perfect Cyprus vacation!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-yellow-100 text-yellow-700 px-4 py-2 text-lg mb-4">
            ⭐ Guest Reviews
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Guests Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Read authentic reviews from guests who have experienced the luxury of Villa Lucilla
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">4.8</div>
                <div className="flex items-center justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-gray-600 mt-1">Average Rating</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-blue-600">89</div>
                <div className="text-sm text-gray-600 mt-1">Happy Guests</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600 mt-1">Would Recommend</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
