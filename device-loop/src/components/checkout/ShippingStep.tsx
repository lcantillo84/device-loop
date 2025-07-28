// src/components/checkout/ShippingStep.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    User,
    Phone,
    Building,
    Home,
    CheckCircle,
    AlertCircle,
    Truck
} from 'lucide-react';
import { useCheckout } from '../../context/CheckoutContext';
import {type ShippingAddress, US_STATES } from '../../types/sellingFlow';

const ShippingStep: React.FC = () => {
    const { setShippingAddress, completeStep, setError, clearErrors, state } = useCheckout();
    const [loading, setLoading] = useState(false);
    const [addressValidated, setAddressValidated] = useState(false);

    const [formData, setFormData] = useState<ShippingAddress>({
        fullName: state.customer ? `${state.customer.firstName} ${state.customer.lastName}` : '',
        company: '',
        phone: state.customer?.phone || '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'US'
    });

    const [validationResults, setValidationResults] = useState<{
        isValid: boolean;
        suggestions?: ShippingAddress[];
        correctedAddress?: ShippingAddress;
    } | null>(null);

    useEffect(() => {
        // Pre-fill with customer info if available
        if (state.customer) {
            setFormData(prev => ({
                ...prev,
                fullName: `${state.customer!.firstName} ${state.customer!.lastName}`,
                phone: state.customer!.phone
            }));
        }
    }, [state.customer]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setAddressValidated(false);
        setValidationResults(null);
        clearErrors();
    };

    const validatePostalCode = (code: string): boolean => {
        const usZipRegex = /^\d{5}(-\d{4})?$/;
        return usZipRegex.test(code);
    };

    const validatePhoneNumber = (phone: string): boolean => {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    };

    const validateAddress = async (): Promise<boolean> => {
        clearErrors();

        // Basic validation
        if (!formData.fullName.trim()) {
            setError('fullName', 'Full name is required');
            return false;
        }

        if (!validatePhoneNumber(formData.phone)) {
            setError('phone', 'Please enter a valid phone number');
            return false;
        }

        if (!formData.address1.trim()) {
            setError('address1', 'Street address is required');
            return false;
        }

        if (!formData.city.trim()) {
            setError('city', 'City is required');
            return false;
        }

        if (!formData.state) {
            setError('state', 'State is required');
            return false;
        }

        if (!validatePostalCode(formData.postalCode)) {
            setError('postalCode', 'Please enter a valid ZIP code');
            return false;
        }

        setLoading(true);

        try {
            // Simulate address validation API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock validation results
            const mockValidation = {
                isValid: true,
                correctedAddress: {
                    ...formData,
                    address1: formData.address1.toUpperCase(), // Simulate standardization
                    city: formData.city.toUpperCase()
                }
            };

            setValidationResults(mockValidation);
            setAddressValidated(true);
            return true;

        } catch (error) {
            setError('general', 'Address validation failed. Please check your address and try again.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!addressValidated) {
            const isValid = await validateAddress();
            if (!isValid) return;
        }

        // Use corrected address if available
        const finalAddress = validationResults?.correctedAddress || formData;

        setShippingAddress(finalAddress);
        completeStep(3);
    };

    const useValidatedAddress = () => {
        if (validationResults?.correctedAddress) {
            setFormData(validationResults.correctedAddress);
            setAddressValidated(true);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Shipping Information</h2>
                <p className="text-gray-600">Where should we send your free shipping label?</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Contact Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name or Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        {/* Company (Optional) */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company <span className="text-gray-400">(Optional)</span>
                            </label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Company name"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="(555) 123-4567"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Home className="w-5 h-5 mr-2" />
                        Shipping Address
                    </h3>

                    <div className="space-y-4">
                        {/* Address Line 1 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Street Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="address1"
                                    value={formData.address1}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="123 Main Street"
                                    required
                                />
                            </div>
                        </div>

                        {/* Address Line 2 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Apartment, suite, etc. <span className="text-gray-400">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                name="address2"
                                value={formData.address2}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Apt 4B, Suite 100"
                            />
                        </div>

                        {/* City, State, ZIP */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Austin"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select State</option>
                                    {US_STATES.map(state => (
                                        <option key={state.code} value={state.code}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ZIP Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="78701"
                                    pattern="[0-9]{5}(-[0-9]{4})?"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Validation Results */}
                {validationResults && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
                    >
                        <div className="flex items-start">
                            <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-blue-800 mb-2">Address Verified</h4>
                                {validationResults.correctedAddress && (
                                    <div className="space-y-2">
                                        <p className="text-blue-700 text-sm mb-3">
                                            We've standardized your address for accurate delivery:
                                        </p>

                                        <div className="bg-white rounded-lg p-4 text-sm">
                                            <div className="font-medium text-gray-800">{validationResults.correctedAddress.fullName}</div>
                                            {validationResults.correctedAddress.company && (
                                                <div className="text-gray-600">{validationResults.correctedAddress.company}</div>
                                            )}
                                            <div className="text-gray-800">{validationResults.correctedAddress.address1}</div>
                                            {validationResults.correctedAddress.address2 && (
                                                <div className="text-gray-800">{validationResults.correctedAddress.address2}</div>
                                            )}
                                            <div className="text-gray-800">
                                                {validationResults.correctedAddress.city}, {validationResults.correctedAddress.state} {validationResults.correctedAddress.postalCode}
                                            </div>
                                            <div className="text-gray-600">{validationResults.correctedAddress.phone}</div>
                                        </div>

                                        {JSON.stringify(validationResults.correctedAddress) !== JSON.stringify(formData) && (
                                            <button
                                                type="button"
                                                onClick={useValidatedAddress}
                                                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                            >
                                                Use this corrected address
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Shipping Notice */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-start">
                        <Truck className="w-6 h-6 text-green-600 mr-3 mt-1" />
                        <div>
                            <h4 className="font-semibold text-green-800 mb-2">Free Shipping Included</h4>
                            <div className="text-green-700 text-sm space-y-1">
                                <p>• We'll email you a prepaid shipping label within 24 hours</p>
                                <p>• Your device must be shipped within 21 days of offer creation</p>
                                <p>• All packages are insured up to $100 for free</p>
                                <p>• Use any FedEx location or schedule a pickup</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col space-y-3">
                    {!addressValidated ? (
                        <button
                            type="button"
                            onClick={validateAddress}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                    Validating Address...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Validate Address
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Continue with This Address
                        </button>
                    )}

                    {addressValidated && (
                        <button
                            type="button"
                            onClick={() => {
                                setAddressValidated(false);
                                setValidationResults(null);
                            }}
                            className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm"
                        >
                            ← Edit Address
                        </button>
                    )}
                </div>
            </form>

            {/* Security Note */}
            <div className="mt-8 bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-gray-600 mr-2 mt-0.5" />
                    <div className="text-sm text-gray-600">
                        <p className="font-medium mb-1">Address Security</p>
                        <p>Your shipping information is encrypted and only used for delivery purposes. We never share or sell your personal data.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingStep;