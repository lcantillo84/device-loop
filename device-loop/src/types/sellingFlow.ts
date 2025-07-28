// src/types/sellingFlow.ts

export interface DeviceOffer {
    id: string;
    deviceInfo: {
        brand: string;
        model: string;
        condition: string;
        carrier: string;
        storage: string;
        accessories: string[];
    };
    pricing: {
        estimatedValue: number;
        originalPrice: number;
    };
    createdAt: Date;
    expiresAt: Date;
    status: 'draft' | 'pending_payment' | 'pending_shipping' | 'shipped' | 'received' | 'completed' | 'cancelled';
}

export interface CustomerInfo {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    isGuest: boolean;
    preferences: {
        marketing: boolean;
        sms: boolean;
    };
}

export interface PaymentMethod {
    type: 'digital' | 'paypal' | 'zelle' | 'check';
    details: {
        email?: string;
        phone?: string;
        accountInfo?: string;
    };
    verificationStatus: 'pending' | 'verified' | 'failed';
}

export interface ShippingAddress {
    fullName: string;
    company?: string;
    phone: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface SellingOptions {
    shippingInsurance: {
        enabled: boolean;
        cost: number;
        coverage: number;
    };
    termsAccepted: boolean;
    marketingOptIn: boolean;
    smsOptIn: boolean;
}

export interface SellOrder {
    id: string;
    offerNumber: string;
    deviceOffer: DeviceOffer;
    customer: CustomerInfo;
    paymentMethod: PaymentMethod;
    shippingAddress: ShippingAddress;
    options: SellingOptions;
    totals: {
        deviceValue: number;
        insuranceCost: number;
        finalPayout: number;
    };
    status: 'pending_shipment' | 'shipped' | 'received' | 'processing' | 'completed' | 'cancelled';
    trackingInfo?: {
        carrier: 'fedex' | 'ups' | 'usps';
        trackingNumber: string;
        labelUrl: string;
        shippingDate?: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface CheckoutStep {
    id: number;
    name: string;
    component: string;
    isComplete: boolean;
    isActive: boolean;
}

export interface CheckoutState {
    currentStep: number;
    steps: CheckoutStep[];
    deviceOffer: DeviceOffer | null;
    customer: CustomerInfo | null;
    paymentMethod: PaymentMethod | null;
    shippingAddress: ShippingAddress | null;
    options: SellingOptions | null;
    order: SellOrder | null;
    errors: Record<string, string>;
    loading: boolean;
}

// Validation schemas
export interface ValidationError {
    field: string;
    message: string;
}

export interface FormValidation {
    isValid: boolean;
    errors: ValidationError[];
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    errors?: ValidationError[];
}

// States for dropdowns
export const US_STATES = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'DC', name: 'District of Columbia' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' }
] as const;

export type StateCode = typeof US_STATES[number]['code'];

// Payment method options
export const PAYMENT_METHODS = [
    {
        id: 'digital',
        name: 'Digital Payment',
        description: 'Instant payment to your account',
        processingTime: 'Same day',
        icon: '💳'
    },
    {
        id: 'paypal',
        name: 'PayPal™',
        description: 'Payment through PayPal',
        processingTime: '1-2 business days',
        icon: '🅿️'
    },
    {
        id: 'zelle',
        name: 'Zelle®',
        description: 'Direct bank transfer',
        processingTime: 'Within hours',
        icon: '🏦'
    },
    {
        id: 'check',
        name: 'Check',
        description: 'Mailed paper check',
        processingTime: '5-7 business days',
        icon: '📫'
    }
] as const;

export type PaymentMethodId = typeof PAYMENT_METHODS[number]['id'];