// src/components/checkout/PaymentStep.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard,
    DollarSign,
    Clock,
    CheckCircle,
    Mail,
    Phone,
    AlertCircle
} from 'lucide-react';
import { useCheckout } from '../../context/CheckoutContext';

// Local type definitions to avoid import issues
interface PaymentMethod {
    type: 'digital' | 'paypal' | 'zelle' | 'check';
    details: {
        email?: string;
        phone?: string;
        accountInfo?: string;
    };
    verificationStatus: 'pending' | 'verified' | 'failed';
}

// Payment method options
const PAYMENT_METHODS = [
    {
        id: 'digital' as const,
        name: 'Digital Payment',
        description: 'Instant payment to your account',
        processingTime: 'Same day',
        icon: '💳',
        popular: true
    },
    {
        id: 'paypal' as const,
        name: 'PayPal™',
        description: 'Payment through PayPal',
        processingTime: '1-2 business days',
        icon: '🅿️',
        popular: false
    },
    {
        id: 'zelle' as const,
        name: 'Zelle®',
        description: 'Direct bank transfer',
        processingTime: 'Within hours',
        icon: '🏦',
        popular: false
    },
    {
        id: 'check' as const,
        name: 'Check',
        description: 'Mailed paper check',
        processingTime: '5-7 business days',
        icon: '📫',
        popular: false
    }
];

type PaymentMethodId = typeof PAYMENT_METHODS[number]['id'];

const PaymentStep: React.FC = () => {
    const { setPaymentMethod, completeStep, setError, clearErrors } = useCheckout();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(null);
    const [paymentDetails, setPaymentDetails] = useState({
        email: '',
        phone: '',
        accountInfo: ''
    });
    const [loading, setLoading] = useState(false);

    // Validation
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    };

    const handleMethodSelect = (methodId: PaymentMethodId) => {
        setSelectedMethod(methodId);
        clearErrors();
        // Reset details when changing methods
        setPaymentDetails({
            email: '',
            phone: '',
            accountInfo: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        setLoading(true);

        try {
            if (!selectedMethod) {
                setError('method', 'Please select a payment method');
                return;
            }

            // Validate based on payment method
            if (selectedMethod === 'digital' || selectedMethod === 'paypal') {
                if (!paymentDetails.email) {
                    setError('email', 'Email address is required');
                    return;
                }
                if (!validateEmail(paymentDetails.email)) {
                    setError('email', 'Please enter a valid email address');
                    return;
                }
            }

            if (selectedMethod === 'zelle') {
                if (!paymentDetails.email && !paymentDetails.phone) {
                    setError('contact', 'Email or phone number is required for Zelle');
                    return;
                }
                if (paymentDetails.email && !validateEmail(paymentDetails.email)) {
                    setError('email', 'Please enter a valid email address');
                    return;
                }
                if (paymentDetails.phone && !validatePhone(paymentDetails.phone)) {
                    setError('phone', 'Please enter a valid phone number');
                    return;
                }
            }

            // Simulate verification process
            await new Promise(resolve => setTimeout(resolve, 1500));

            const paymentMethod: PaymentMethod = {
                type: selectedMethod,
                details: {
                    email: paymentDetails.email || undefined,
                    phone: paymentDetails.phone || undefined,
                    accountInfo: paymentDetails.accountInfo || undefined
                },
                verificationStatus: 'verified'
            };

            setPaymentMethod(paymentMethod);
            completeStep(2);

        } catch (error) {
            setError('general', 'Failed to verify payment method. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const selectedMethodData = PAYMENT_METHODS.find(method => method.id === selectedMethod);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Method</h2>
                <p className="text-gray-600">Choose how you'd like to receive your payment</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {PAYMENT_METHODS.map((method) => (
                            <motion.div
                                key={method.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleMethodSelect(method.id)}
                                className={`relative p-6 border-2 rounded-xl cursor-pointer transition-colors ${
                                    selectedMethod === method.id
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                {method.popular && (
                                    <div className="absolute -top-2 left-4 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="flex items-start space-x-4">
                                    <div className="text-2xl">{method.icon}</div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800">{method.name}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {method.processingTime}
                                        </div>
                                    </div>
                                    {selectedMethod === method.id && (
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Payment Details Form */}
                {selectedMethod && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <CreditCard className="w-5 h-5 mr-2" />
                            {selectedMethodData?.name} Details
                        </h3>

                        <div className="space-y-4">
                            {/* Digital Payment & PayPal */}
                            {(selectedMethod === 'digital' || selectedMethod === 'paypal') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={paymentDetails.email}
                                            onChange={(e) => setPaymentDetails(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {selectedMethod === 'paypal'
                                            ? 'Your PayPal account email address'
                                            : "We'll send payment to this email address"
                                        }
                                    </p>
                                </div>
                            )}

                            {/* Zelle */}
                            {selectedMethod === 'zelle' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={paymentDetails.email}
                                                onChange={(e) => setPaymentDetails(prev => ({ ...prev, email: e.target.value }))}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center text-gray-500">OR</div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                value={paymentDetails.phone}
                                                onChange={(e) => setPaymentDetails(prev => ({ ...prev, phone: e.target.value }))}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                placeholder="(555) 123-4567"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <div className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                                            <p className="text-sm text-blue-700">
                                                Provide either an email address or phone number associated with your Zelle account.
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Check */}
                            {selectedMethod === 'check' && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-yellow-700 font-medium mb-1">
                                                Physical Check Payment
                                            </p>
                                            <p className="text-sm text-yellow-700">
                                                Your check will be mailed to the shipping address you provide in the next step.
                                                Processing time is 5-7 business days after we receive your device.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Submit Button */}
                {selectedMethod && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                                    Verifying Payment Method...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-6 h-6 mr-2" />
                                    Continue to Shipping
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </form>

            {/* Payment Security Notice */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Payment Security
                </h4>
                <p className="text-sm text-gray-600">
                    All payment information is encrypted and secure. We never store your financial details.
                    Payments are processed only after we receive and verify your device.
                </p>
            </div>
        </div>
    );
};

export default PaymentStep;