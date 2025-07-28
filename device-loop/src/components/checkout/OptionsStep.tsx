// src/components/checkout/OptionsStep.tsx
import React, { useState } from 'react';
import { Shield, FileText, Mail } from 'lucide-react';
import { useCheckout } from '../../context/CheckoutContext';
import type {SellingOptions} from '../../types/sellingFlow';

const OptionsStep: React.FC = () => {
    const { setOptions, completeStep, state } = useCheckout();
    const [formData, setFormData] = useState<SellingOptions>({
        shippingInsurance: {
            enabled: false,
            cost: 1.00,
            coverage: state.deviceOffer?.pricing.estimatedValue || 0
        },
        termsAccepted: false,
        marketingOptIn: false,
        smsOptIn: false
    });

    const handleInsuranceToggle = (enabled: boolean) => {
        setFormData(prev => ({
            ...prev,
            shippingInsurance: {
                ...prev.shippingInsurance,
                enabled
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.termsAccepted) {
            alert('Please accept the terms and conditions to continue.');
            return;
        }

        setOptions(formData);
        completeStep(4);
    };

    const deviceValue = state.deviceOffer?.pricing.estimatedValue || 0;
    const finalPayout = deviceValue - (formData.shippingInsurance.enabled ? formData.shippingInsurance.cost : 0);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Options & Terms</h2>
                <p className="text-gray-600">Customize your selling experience</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Insurance */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-blue-600" />
                        Shipping Insurance
                    </h3>

                    <p className="text-gray-600 mb-4">
                        All packages are insured up to $100 for free. If you'd like, you can purchase additional
                        shipping insurance to cover the full value of your offer for just <strong>$1.00</strong>.
                        (This amount will be deducted from the final offer amount)
                    </p>

                    <div className="space-y-3">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="insurance"
                                checked={formData.shippingInsurance.enabled}
                                onChange={() => handleInsuranceToggle(true)}
                                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                            />
                            <span className="ml-3 text-gray-800">
                <strong>Yes, Add Insurance</strong> - Cover full value for $1.00
              </span>
                        </label>

                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="insurance"
                                checked={!formData.shippingInsurance.enabled}
                                onChange={() => handleInsuranceToggle(false)}
                                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                            />
                            <span className="ml-3 text-gray-800">
                <strong>No Thanks</strong> - Use free $100 coverage
              </span>
                        </label>
                    </div>

                    {/* Payout Summary */}
                    <div className="mt-6 bg-white rounded-lg p-4 border border-blue-200">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Device Value:</span>
                            <span className="font-semibold">${deviceValue.toFixed(2)}</span>
                        </div>
                        {formData.shippingInsurance.enabled && (
                            <div className="flex justify-between items-center text-sm text-red-600 mt-1">
                                <span>Insurance Cost:</span>
                                <span>-${formData.shippingInsurance.cost.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center font-bold text-lg">
                            <span>Final Payout:</span>
                            <span className="text-green-600">${finalPayout.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Terms & Conditions */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-gray-600" />
                        Terms & Conditions
                    </h3>

                    <div className="mb-4">
                        <p className="text-gray-600 text-sm mb-3">
                            Please carefully read our terms and conditions before placing your offer.
                        </p>

                        <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-32 overflow-y-auto text-xs text-gray-700">
                            <p className="mb-2">
                                <strong>Device Condition:</strong> By submitting this offer, you confirm that your device matches
                                the condition you selected. Any significant discrepancies may result in a revised offer.
                            </p>
                            <p className="mb-2">
                                <strong>Data Removal:</strong> You are responsible for backing up and removing all personal data
                                from your device before shipping. DeviceLoop will perform a secure data wipe on all devices.
                            </p>
                            <p className="mb-2">
                                <strong>Shipping:</strong> Devices must be shipped within 21 days of offer creation.
                                Use provided packaging materials and shipping label.
                            </p>
                            <p>
                                <strong>Payment:</strong> Payment will be processed within 2-3 business days after
                                device inspection and verification.
                            </p>
                        </div>
                    </div>

                    <label className="flex items-start cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.termsAccepted}
                            onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-1"
                            required
                        />
                        <span className="ml-3 text-sm text-gray-800">
              I accept the <a href="/terms" className="text-green-600 hover:text-green-700 underline">terms and conditions</a>
            </span>
                    </label>
                </div>

                {/* Communication Preferences */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-gray-600" />
                        Communication Preferences
                    </h3>

                    <div className="space-y-3">
                        <label className="flex items-start cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.marketingOptIn}
                                onChange={(e) => setFormData(prev => ({ ...prev, marketingOptIn: e.target.checked }))}
                                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-1"
                            />
                            <span className="ml-3 text-sm text-gray-800">
                Send me occasional special offers and eco-impact updates
              </span>
                        </label>

                        <label className="flex items-start cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.smsOptIn}
                                onChange={(e) => setFormData(prev => ({ ...prev, smsOptIn: e.target.checked }))}
                                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mt-1"
                            />
                            <span className="ml-3 text-sm text-gray-800">
                Send me important SMS notifications to {state.customer?.phone}
              </span>
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        formData.termsAccepted
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!formData.termsAccepted}
                >
                    Continue to Review
                </button>
            </form>
        </div>
    );
};

export default OptionsStep;