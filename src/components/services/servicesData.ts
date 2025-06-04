
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
    id: 'airport-transfer',
    name: 'Airport Transfer',
    description: 'Private transfer from/to Larnaca Airport',
    price: 75,
    unit: 'per transfer',
    category: 'Transport',
    icon: '🚗'
  },
  {
    id: 'car-rental',
    name: 'Car Rental',
    description: 'Economy car rental with insurance included',
    price: 35,
    unit: 'per day',
    category: 'Transport',
    icon: '🚙'
  },
  {
    id: 'cleaning-service',
    name: 'Extra Cleaning',
    description: 'Additional mid-stay cleaning service',
    price: 60,
    unit: 'per service',
    category: 'Housekeeping',
    icon: '🧹'
  },
  {
    id: 'grocery-delivery',
    name: 'Grocery Pre-Stocking',
    description: 'Essential groceries delivered before arrival',
    price: 45,
    unit: 'per package',
    category: 'Convenience',
    icon: '🛒'
  },
  {
    id: 'chef-service',
    name: 'Private Chef',
    description: 'Professional chef for dinner preparation',
    price: 150,
    unit: 'per evening',
    category: 'Dining',
    icon: '👨‍🍳'
  },
  {
    id: 'spa-service',
    name: 'In-Villa Spa',
    description: 'Relaxing massage and spa treatments',
    price: 120,
    unit: 'per session',
    category: 'Wellness',
    icon: '💆‍♀️'
  },
  {
    id: 'boat-trip',
    name: 'Boat Excursion',
    description: 'Half-day boat trip around Cyprus coast',
    price: 200,
    unit: 'per person',
    category: 'Activities',
    icon: '⛵'
  },
  {
    id: 'babysitting',
    name: 'Babysitting Service',
    description: 'Professional childcare service',
    price: 25,
    unit: 'per hour',
    category: 'Family',
    icon: '👶'
  }
];
