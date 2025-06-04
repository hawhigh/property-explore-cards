
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Star, Users } from 'lucide-react';

const FooterCTA = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-indigo-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Ready for Your
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cyprus Adventure?
              </span>
            </h3>
            <p className="text-xl md:text-2xl opacity-90 mb-12 leading-relaxed">
              Book Villa Lucilla today and experience luxury living in the heart of Protaras. 
              Your perfect Mediterranean getaway awaits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
                <Link to="/auth">Book Now - From €185/night</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/50 hover:border-white text-white hover:bg-white hover:text-gray-900 px-10 py-6 text-xl rounded-2xl backdrop-blur-sm transition-all">
                <Link to="/single">Virtual Tour</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2 fill-current" />
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm opacity-70">Guest Rating</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm opacity-70">Happy Guests</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <Clock className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-70">Support</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <MapPin className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">Prime</div>
                <div className="text-sm opacity-70">Location</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Info Section */}
      <section className="py-16 px-4 border-t border-white/10 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Contact Information */}
            <div>
              <h4 className="text-2xl font-bold mb-6">Contact Villa Lucilla</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="font-medium">+357 23 456 789</div>
                    <div className="text-sm opacity-70">24/7 Booking Hotline</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="font-medium">info@villalucilla.com</div>
                    <div className="text-sm opacity-70">Reservations & Inquiries</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <div>
                    <div className="font-medium">Konnou street 17</div>
                    <div className="text-sm opacity-70">Anthorina Gardens Resort, Protaras</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-2xl font-bold mb-6">Quick Links</h4>
              <div className="space-y-3">
                <a href="#villa-gallery" className="block hover:text-blue-400 transition-colors">Photo Gallery</a>
                <a href="#amenities" className="block hover:text-blue-400 transition-colors">Villa Amenities</a>
                <a href="#location" className="block hover:text-blue-400 transition-colors">Location & Map</a>
                <a href="#services" className="block hover:text-blue-400 transition-colors">Additional Services</a>
                <a href="#reviews" className="block hover:text-blue-400 transition-colors">Guest Reviews</a>
                <a href="#offers" className="block hover:text-blue-400 transition-colors">Special Offers</a>
              </div>
            </div>

            {/* Villa Highlights */}
            <div>
              <h4 className="text-2xl font-bold mb-6">Villa Highlights</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>3 Luxury Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Private Swimming Pool</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Resort Amenities Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Prime Protaras Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Fully Equipped Kitchen</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Free WiFi & Parking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <section className="py-8 px-4 border-t border-white/10 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm opacity-70 mb-4 md:mb-0">
              © 2024 Villa Lucilla. All rights reserved. | Anthorina Gardens Resort, Protaras, Cyprus
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Cancellation Policy</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default FooterCTA;
