export interface SignatureStyle {
  id: string;
  name: string;
  fontClass: string;
  description: string;
  vibes: string[];
  personality: string;
  recommendedFor: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  popular: boolean;
  tagline: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatarUrl?: string;
  signatureStyle: string; // Style they chose
}

export interface OrderDetails {
  fullName: string;
  email: string;
  selectedPackage: string;
  stylePreferences: string[];
  intendedUse: string;
  additionalNotes: string;
  slant: 'forward' | 'straight' | 'backward';
  flair: 'minimal' | 'moderate' | 'dramatic';
}
