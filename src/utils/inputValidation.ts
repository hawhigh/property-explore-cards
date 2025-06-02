
import { z } from 'zod';

// Property validation schema
export const propertySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(2000, 'Description too long').optional(),
  price: z.number().min(0, 'Price must be positive'),
  bedrooms: z.number().min(0, 'Bedrooms must be positive').optional(),
  bathrooms: z.number().min(0, 'Bathrooms must be positive').optional(),
  sqft: z.number().min(0, 'Square footage must be positive').optional(),
  address: z.string().min(1, 'Address is required').max(200, 'Address too long'),
  city: z.string().min(1, 'City is required').max(100, 'City too long'),
  state: z.string().min(1, 'State is required').max(50, 'State too long'),
  zip_code: z.string().min(1, 'ZIP code is required').max(20, 'ZIP code too long'),
  property_type: z.string().min(1, 'Property type is required'),
  amenities: z.array(z.string()).optional(),
  year_built: z.number().min(1800).max(new Date().getFullYear()).optional(),
});

// Booking validation schema
export const bookingSchema = z.object({
  guest_name: z.string().min(1, 'Guest name is required').max(100, 'Name too long'),
  guest_email: z.string().email('Invalid email format').max(200, 'Email too long'),
  guest_phone: z.string().max(20, 'Phone number too long').optional(),
  guest_count: z.number().min(1, 'At least 1 guest required').max(20, 'Too many guests'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  special_requests: z.string().max(1000, 'Special requests too long').optional(),
});

// Review validation schema
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().max(1000, 'Comment too long').optional(),
});

// Sanitize HTML content to prevent XSS
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate and sanitize user input
export const validateAndSanitizeInput = <T>(
  data: unknown,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
    return { success: false, errors: ['Validation failed'] };
  }
};
