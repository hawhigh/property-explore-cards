
import { useState } from 'react';
import { Calendar, Users, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays } from 'date-fns';

interface EnhancedBookingFlowProps {
  pricePerNight: number;
}

const EnhancedBookingFlow = ({ pricePerNight }: EnhancedBookingFlowProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    requests: ''
  });

  const steps = [
    { id: 1, title: 'Select Dates', icon: Calendar },
    { id: 2, title: 'Guest Details', icon: Users },
    { id: 3, title: 'Review & Book', icon: CheckCircle }
  ];

  const progressPercentage = (currentStep / steps.length) * 100;

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    return Math.max(1, differenceInDays(checkOut, checkIn));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * pricePerNight + 150 + 120; // base price + cleaning + service
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!bookingData.checkIn || !bookingData.checkOut) {
          toast({
            title: "Select Dates",
            description: "Please select check-in and check-out dates.",
            variant: "destructive",
          });
          return false;
        }
        if (calculateNights() < 2) {
          toast({
            title: "Minimum Stay",
            description: "Minimum 2-night stay required.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 2:
        if (!bookingData.name.trim() || !bookingData.email.trim() || !bookingData.phone.trim()) {
          toast({
            title: "Complete Details",
            description: "Please fill in all required fields.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = () => {
    if (validateStep(2)) {
      toast({
        title: "Booking Submitted!",
        description: "We'll contact you within 24 hours to confirm your reservation.",
      });
      // Reset form
      setBookingData({
        checkIn: '',
        checkOut: '',
        guests: 2,
        name: '',
        email: '',
        phone: '',
        requests: ''
      });
      setCurrentStep(1);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Book Villa Lucilla</CardTitle>
        <Progress value={progressPercentage} className="w-full" />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          {steps.map((step) => (
            <div key={step.id} className={`flex items-center ${currentStep >= step.id ? 'text-blue-600 font-medium' : ''}`}>
              <step.icon className="h-4 w-4 mr-1" />
              {step.title}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Your Dates</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkin">Check-in</Label>
                <Input
                  id="checkin"
                  type="date"
                  value={bookingData.checkIn}
                  onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                  min={today}
                />
              </div>
              <div>
                <Label htmlFor="checkout">Check-out</Label>
                <Input
                  id="checkout"
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                  min={bookingData.checkIn || today}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="6"
                value={bookingData.guests}
                onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value) || 1})}
              />
            </div>
            {bookingData.checkIn && bookingData.checkOut && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm">
                  <strong>{calculateNights()} nights</strong> • €{pricePerNight}/night
                </div>
                <div className="text-lg font-bold text-blue-600">
                  Total: €{calculateTotal()}
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Guest Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div>
                <Label htmlFor="requests">Special Requests</Label>
                <Input
                  id="requests"
                  value={bookingData.requests}
                  onChange={(e) => setBookingData({...bookingData, requests: e.target.value})}
                  placeholder="Any special requirements..."
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Booking</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Dates:</span>
                <span>{bookingData.checkIn} to {bookingData.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span>{bookingData.guests}</span>
              </div>
              <div className="flex justify-between">
                <span>Nights:</span>
                <span>{calculateNights()}</span>
              </div>
              <div className="flex justify-between">
                <span>Rate per night:</span>
                <span>€{pricePerNight}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total:</span>
                <span>€{calculateTotal()}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <Button 
            onClick={currentStep === 3 ? handleBooking : handleNext}
            className="ml-auto bg-blue-600 hover:bg-blue-700"
          >
            {currentStep === 3 ? 'Confirm Booking' : 'Continue'}
            {currentStep < 3 && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedBookingFlow;
