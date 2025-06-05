
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Mail, User, Phone, Info, Heart, Star, Euro } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import DynamicPricing from '@/components/business/DynamicPricing';
import ServiceAddons from '@/components/business/ServiceAddons';

interface EnhancedBookingFormProps {
  selectedDates: DateRange | undefined;
  setSelectedDates: (dates: DateRange | undefined) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  specialRequests: string;
  setSpecialRequests: (requests: string) => void;
  unavailableDates: Date[];
  guestName: string;
  setGuestName: (name: string) => void;
  guestEmail: string;
  setGuestEmail: (email: string) => void;
  guestPhone: string;
  setGuestPhone: (phone: string) => void;
  basePrice: number;
}

const EnhancedBookingForm = ({
  selectedDates,
  setSelectedDates,
  guestCount,
  setGuestCount,
  specialRequests,
  setSpecialRequests,
  unavailableDates,
  guestName,
  setGuestName,
  guestEmail,
  setGuestEmail,
  guestPhone,
  setGuestPhone,
  basePrice
}: EnhancedBookingFormProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [servicesTotal, setServicesTotal] = useState(0);

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      date.toDateString() === unavailableDate.toDateString()
    );
  };

  const disabledDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || isDateUnavailable(date);
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="space-y-8">
      {/* Dynamic Pricing Card */}
      <DynamicPricing 
        basePrice={basePrice}
        selectedDates={selectedDates}
        guestCount={guestCount}
      />

      {/* Date Selection */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
        <Label className="text-lg font-bold mb-4 block text-gray-800 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          🗓️ Pick Your Perfect Dates
        </Label>
        <p className="text-sm text-gray-600 mb-4">Choose when you'd like to experience Villa Lucilla's magic!</p>
        
        <div className="mb-4">
          <div className="flex items-center gap-6 text-xs text-gray-600 bg-white/60 rounded-lg px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
              <span>Unavailable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Your selection</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span>Available</span>
            </div>
          </div>
        </div>
        
        <Calendar
          mode="range"
          selected={selectedDates}
          onSelect={setSelectedDates}
          disabled={disabledDates}
          className="rounded-xl border-0 bg-white/80 backdrop-blur-sm shadow-lg w-full hover:shadow-xl transition-shadow"
          numberOfMonths={1}
        />
        
        {unavailableDates.length > 0 && (
          <p className="text-xs text-gray-500 mt-3 flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
            <Info className="h-3 w-3" />
            Red dates are already taken, but there are plenty of amazing dates available!
          </p>
        )}
      </div>

      {/* Guest Count */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
        <Label htmlFor="guests" className="text-lg font-bold mb-4 block text-gray-800 flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-600" />
          👥 How Many Amazing People?
        </Label>
        <p className="text-sm text-gray-600 mb-4">Villa Lucilla loves welcoming groups of all sizes!</p>
        
        <div className="flex items-center gap-4 bg-white/80 rounded-xl p-4 border-2 border-purple-200 hover:border-purple-300 transition-colors">
          <Users className="h-6 w-6 text-purple-400" />
          <Input
            id="guests"
            type="number"
            min="1"
            max="6"
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value))}
            className="flex-1 border-0 focus:ring-0 p-0 text-lg font-semibold"
          />
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold">
            max 6 guests
          </div>
        </div>
      </div>

      {/* Service Add-ons */}
      <ServiceAddons 
        selectedServices={selectedServices}
        onServiceToggle={handleServiceToggle}
        onTotalChange={setServicesTotal}
      />

      {/* Guest Information */}
      <div className="space-y-6 border-t-4 border-blue-200 pt-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold text-gray-800">Tell Us About Yourself</h3>
            <Heart className="h-6 w-6 text-red-500 fill-current animate-pulse" />
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full font-medium">
            ✨ No account needed - we keep it simple!
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="group">
            <Label htmlFor="guestName" className="text-base font-bold mb-3 block text-gray-700 flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              What's your name? *
            </Label>
            <div className="flex items-center gap-3 bg-white rounded-xl border-2 border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all group-hover:border-blue-300">
              <User className="h-5 w-5 text-gray-400 ml-4" />
              <Input
                id="guestName"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="We'd love to know your name!"
                className="flex-1 border-0 focus:ring-0 py-4 text-lg"
                required
              />
            </div>
          </div>

          <div className="group">
            <Label htmlFor="guestEmail" className="text-base font-bold mb-3 block text-gray-700 flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              Your email address *
            </Label>
            <div className="flex items-center gap-3 bg-white rounded-xl border-2 border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all group-hover:border-blue-300">
              <Mail className="h-5 w-5 text-gray-400 ml-4" />
              <Input
                id="guestEmail"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="So we can send you confirmation details"
                className="flex-1 border-0 focus:ring-0 py-4 text-lg"
                required
              />
            </div>
          </div>

          <div className="group">
            <Label htmlFor="guestPhone" className="text-base font-bold mb-3 block text-gray-700 flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              Phone number *
            </Label>
            <div className="flex items-center gap-3 bg-white rounded-xl border-2 border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all group-hover:border-blue-300">
              <Phone className="h-5 w-5 text-gray-400 ml-4" />
              <Input
                id="guestPhone"
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="Just in case we need to reach you"
                className="flex-1 border-0 focus:ring-0 py-4 text-lg"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
        <Label htmlFor="requests" className="text-lg font-bold mb-4 block text-gray-800 flex items-center gap-2">
          <Heart className="h-5 w-5 text-orange-600" />
          💫 Any Special Wishes?
        </Label>
        <p className="text-sm text-gray-600 mb-4">Tell us how we can make your stay extra special!</p>
        
        <Textarea
          id="requests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="🚗 Airport transfer? 🎂 Celebrating something special? 🍽️ Dietary needs? We're here to help make it perfect!"
          className="resize-none bg-white/80 border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl text-base min-h-[100px] hover:border-orange-300 transition-colors"
          rows={4}
        />
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          💡 Pro tip: The more you tell us, the more we can personalize your experience!
        </p>
      </div>

      {/* Total Summary */}
      {servicesTotal > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Euro className="h-5 w-5 text-green-600" />
              Services Total:
            </span>
            <span className="text-2xl font-bold text-green-600">€{servicesTotal}</span>
          </div>
          <p className="text-sm text-gray-600">
            Your selected services will be added to your final booking total 🌟
          </p>
        </div>
      )}
    </div>
  );
};

export default EnhancedBookingForm;
