
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 'diving-excursion',
    name: 'Diving Adventure',
    description: 'Professional diving experience with certified instructors',
    price: 120,
    unit: 'per person',
    category: 'Water Activities',
    icon: '🤿'
  },
  {
    id: 'guided-tour',
    name: 'Cyprus Cultural Tour',
    description: 'Full-day guided tour of Cyprus historical sites',
    price: 85,
    unit: 'per person',
    category: 'Tours',
    icon: '🏛️'
  },
  {
    id: 'car-rental',
    name: 'Premium Car Rental',
    description: 'Luxury vehicle rental with full insurance',
    price: 65,
    unit: 'per day',
    category: 'Rental',
    icon: '🚗'
  },
  {
    id: 'water-sports',
    name: 'Water Sports Package',
    description: 'Jet ski, parasailing, and banana boat adventures',
    price: 150,
    unit: 'per package',
    category: 'Water Activities',
    icon: '🏄‍♂️'
  },
  {
    id: 'hotel-spa',
    name: 'Luxury Hotel Spa',
    description: 'Premium spa treatments at nearby luxury hotels',
    price: 180,
    unit: 'per session',
    category: 'Hotel Services',
    icon: '🏨'
  }
];
