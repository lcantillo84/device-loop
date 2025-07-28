// src/components/checkout/ReviewStep.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    Package,
    CreditCard,
    MapPin,
    Settings,
    AlertTriangle,
    Edit2
} from 'lucide-react';
import { useCheckout } from '../../context/CheckoutContext';
// Firebase services will be added later

// Local type definitions to avoid import issues
interface CustomerInfo {
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

interface DeviceOffer {
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

interface PaymentMethod {
    type: 'digital' | 'paypal' | 'zelle' | 'check';
    details: {
        email?: string;
        phone?: string;
        accountInfo?: string;
    };
    verificationStatus: 'pending' | 'verified' | 'failed';
}

interface ShippingAddress {
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

interface SellingOptions {
    shippingInsurance: {
        enabled: boolean;
        cost: number;
        coverage: number;
    };
    termsAccepted: boolean;
    marketingOptIn: boolean;
    smsOptIn: boolean;
}

interface SellOrder {
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

const ReviewStep: React.FC = () => {
    const { state, goToStep, setOrder } = useCheckout();
    const [loading, setLoading] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    if (!state.deviceOffer || !state.customer || !state.paymentMethod ||
        !state.shippingAddress || !state.options) {
        return (
            <div className="text-center py-8">
                <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Missing Information</h3>
                <p className="text-gray-600">Please complete all previous steps to review your order.</p>
            </div>
        );
    }

    const deviceValue = state.deviceOffer.pricing.estimatedValue;
    const insuranceCost = state.options.shippingInsurance.enabled ? state.options.shippingInsurance.cost : 0;
    const finalPayout = deviceValue - insuranceCost;

    const generateOrderNumber = () => {
        return Math.floor(2000000 + Math.random() * 900000).toString();
    };

    const handleSubmitOrder = async () => {
        setLoading(true);

        try {
            const orderNum = generateOrderNumber();
            setOrderNumber(orderNum);

            // Create the sell order
            const sellOrder: SellOrder = {
                id: `order_${Date.now()}`,
                offerNumber: orderNum,
                deviceOffer: state.deviceOffer!,
                customer: state.customer!,
                paymentMethod: state.paymentMethod!,
                shippingAddress: state.shippingAddress!,
                options: state.options!,
                totals: {
                    deviceValue,
                    insuranceCost,
                    finalPayout
                },
                status: 'pending_shipment',
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // TODO: Save order to backend/database when ready
            // For now, we'll just store it in the checkout context
            console.log('Order created:', sellOrder);

            setOrder(sellOrder);
            setOrderComplete(true);

        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Failed to submit order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (orderComplete) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
            >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Thank You for Selling with Us!
                </h2>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 max-w-md mx-auto">
                    <p className="text-green-800 mb-2">Your offer number is</p>
                    <p className="text-2xl font-bold text-green-800">#{orderNumber}</p>
                    <p className="text-sm text-green-700 mt-2">
                        A copy of this information has been sent to {state.customer!.email}
                    </p>
                </div>

                <div className="text-left max-w-2xl mx-auto space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">📦 What's Next?</h3>
                        <p className="text-blue-700 mb-4">
                            Shipping your device to us is fast, free, and easy!
                        </p>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-blue-800 mb-2">Device Preparation</h4>
                                <ul className="text-sm text-blue-700 space-y-1 ml-4">
                                    <li>• Indicate to your carrier that you are deactivating your phone</li>
                                    <li>• Turn off "Find My iPhone" or Google activation lock</li>
                                    <li>• Remove any SIM or SD cards with data</li>
                                    <li>• Back up any data you want to keep</li>
                                    <li>• Reset your device and make sure it is fully charged</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-blue-800 mb-2">Packaging</h4>
                                <p className="text-sm text-blue-700">
                                    Pack your item securely using bubble wrap, foam, or padding materials.
                                    The better condition your phone arrives in, the better the value! Tape your box shut securely.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-blue-800 mb-2">Shipping Label</h4>
                                <p className="text-sm text-blue-700 mb-3">
                                    Once packed, add the shipping label ensuring the barcode is flat and readable.
                                    Your trade-in must be received within <strong>21 days</strong> from offer creation.
                                </p>

                                <div className="flex space-x-3">
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                        📄 Print Label
                                    </button>
                                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                        📱 Email QR Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pre-Shipping Checklist */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">✅ Pre-Shipping Checklist</h3>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>I have reset my device and turned off activation locks</span>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Removed any SIM or SD cards</span>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Device is securely packaged</span>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Shipping label is attached and barcode is visible</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                        <div className="text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Offer #{orderNumber}</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className="text-blue-600 font-medium">Awaiting Shipment</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                                <span>Total Payout:</span>
                                <span className="text-green-600">${finalPayout.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Your Order</h2>
                <p className="text-gray-600">Please review all details before submitting</p>
            </div>

            <div className="space-y-6">
                {/* Device Information */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                            <Package className="w-5 h-5 mr-2" />
                            Device Information
                        </h3>
                        <button
                            onClick={() => goToStep(1)}
                            className="text-green-600 hover:text-green-700 text-sm flex items-center"
                        >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600">Device:</span>
                            <p className="font-semibold">{state.deviceOffer.deviceInfo.brand} {state.deviceOffer.deviceInfo.model}</p>
                        </div>
                        <div>
                            <span className="text-gray-600">Condition:</span>
                            <p className="font-semibold">{state.deviceOffer.deviceInfo.condition}</p>
                        </div>
                        <div>
                            <span className="text-gray-600">Storage:</span>
                            <p className="font-semibold">{state.deviceOffer.deviceInfo.storage}</p>
                        </div>
                        <div>
                            <span className="text-gray-600">Carrier:</span>
                            <p className="font-semibold">{state.deviceOffer.deviceInfo.carrier}</p>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                            <CreditCard className="w-5 h-5 mr-2" />
                            Payment Method
                        </h3>
                        <button
                            onClick={() => goToStep(2)}
                            className="text-green-600 hover:text-green-700 text-sm flex items-center"
                        >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                        </button>
                    </div>

                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="font-semibold capitalize">{state.paymentMethod.type}</p>
                            {state.paymentMethod.details.email && (
                                <p className="text-sm text-gray-600">{state.paymentMethod.details.email}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                            <MapPin className="w-5 h-5 mr-2" />
                            Shipping Address
                        </h3>
                        <button
                            onClick={() => goToStep(3)}
                            className="text-green-600 hover:text-green-700 text-sm flex items-center"
                        >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                        </button>
                    </div>

                    <div className="text-sm">
                        <p className="font-semibold">{state.shippingAddress.fullName}</p>
                        {state.shippingAddress.company && <p>{state.shippingAddress.company}</p>}
                        <p>{state.shippingAddress.address1}</p>
                        {state.shippingAddress.address2 && <p>{state.shippingAddress.address2}</p>}
                        <p>{state.shippingAddress.city}, {state.shippingAddress.state} {state.shippingAddress.postalCode}</p>
                        <p className="text-gray-600 mt-1">{state.shippingAddress.phone}</p>
                    </div>
                </div>

                {/* Order Options */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                            <Settings className="w-5 h-5 mr-2" />
                            Options & Insurance
                        </h3>
                        <button
                            onClick={() => goToStep(4)}
                            className="text-green-600 hover:text-green-700 text-sm flex items-center"
                        >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                        </button>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Shipping Insurance:</span>
                            <span className="font-semibold">
                                {state.options.shippingInsurance.enabled ? 'Full Coverage ($1.00)' : 'Standard ($100)'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Marketing Emails:</span>
                            <span className="font-semibold">{state.options.marketingOptIn ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">SMS Notifications:</span>
                            <span className="font-semibold">{state.options.smsOptIn ? 'Yes' : 'No'}</span>
                        </div>
                    </div>
                </div>

                {/* Order Total */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Total</h3>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Device Value:</span>
                            <span className="font-semibold">${deviceValue.toFixed(2)}</span>
                        </div>
                        {insuranceCost > 0 && (
                            <div className="flex justify-between text-sm text-red-600">
                                <span>Insurance Cost:</span>
                                <span>-${insuranceCost.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="border-t border-green-200 pt-2 flex justify-between font-bold text-xl">
                            <span>Final Payout:</span>
                            <span className="text-green-600">${finalPayout.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                            Processing Order...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-6 h-6 mr-2" />
                            Submit Order
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ReviewStep;