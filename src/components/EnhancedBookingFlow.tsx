
import { useState } from 'react';
import { Calendar, Users, CreditCard, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface EnhancedBookingFlowProps {
  pricePerNight: number;
}

const EnhancedBookingFlow = ({ pricePerNight }: EnhancedBookingFlowProps) => {
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

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="checkout">Check-out</Label>
                <Input
                  id="checkout"
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                  min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
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
                onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Guest Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
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
                <span>Rate per night:</span>
                <span>€{pricePerNight}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total:</span>
                <span>€{pricePerNight * 7}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button 
            onClick={handleNext}
            className="ml-auto bg-blue-600 hover:bg-blue-700"
            disabled={currentStep === 3}
          >
            {currentStep === steps.length ? 'Confirm Booking' : 'Continue'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedBookingFlow;
