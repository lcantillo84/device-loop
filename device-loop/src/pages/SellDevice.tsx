// src/pages/SellDevice.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { CheckoutProvider, useCheckout } from '../context/CheckoutContext';
import type {DeviceOffer} from '../types/sellingFlow';
import AccountStep from '../components/checkout/AccountStep';
import PaymentStep from '../components/checkout/PaymentStep';
import ShippingStep from '../components/checkout/ShippingStep';
import OptionsStep from '../components/checkout/OptionsStep';
import ReviewStep from '../components/checkout/ReviewStep';

// Progress indicator component
const CheckoutProgress: React.FC = () => {
  const { state } = useCheckout();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {state.steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                step.isComplete 
                  ? 'bg-green-600 border-green-600 text-white'
                  : step.isActive 
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
              }`}>
                {step.isComplete ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>

              {/* Step Label */}
              <span className={`ml-2 text-sm font-medium hidden sm:inline ${
                step.isActive ? 'text-blue-600' : step.isComplete ? 'text-green-600' : 'text-gray-500'
              }`}>
                {step.name}
              </span>

              {/* Connector Line */}
              {index < state.steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 transition-all duration-300 ${
                  step.isComplete ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Device summary component
const DeviceSummary: React.FC<{ offer: DeviceOffer }> = ({ offer }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Star className="w-5 h-5 text-yellow-500 mr-2" />
        Your Device Offer
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Device</p>
          <p className="font-semibold text-gray-800">
            {offer.deviceInfo.brand} {offer.deviceInfo.model}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Condition</p>
          <p className="font-semibold text-gray-800">{offer.deviceInfo.condition}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Storage</p>
          <p className="font-semibold text-gray-800">{offer.deviceInfo.storage}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Estimated Value</p>
          <p className="font-bold text-green-600 text-xl">
            ${offer.pricing.estimatedValue.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center text-sm text-gray-600">
        <Clock className="w-4 h-4 mr-2" />
        <span>Offer expires: {new Date(offer.expiresAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

// Trust indicators
const TrustIndicators: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Why Choose DeviceLoop?</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-800 mb-1">Secure & Safe</h4>
          <p className="text-sm text-gray-600">Data wiped securely, insured shipping</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-800 mb-1">Fast Payment</h4>
          <p className="text-sm text-gray-600">Get paid within 24 hours</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <h4 className="font-semibold text-gray-800 mb-1">Plant Trees</h4>
          <p className="text-sm text-gray-600">1 tree planted per device</p>
        </div>
      </div>
    </div>
  );
};

// Navigation component
const CheckoutNavigation: React.FC = () => {
  const { state, nextStep, previousStep, canProceedToNextStep } = useCheckout();

  return (
    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
      <button
        onClick={previousStep}
        disabled={state.currentStep === 1}
        className={`flex items-center px-4 py-2 rounded-lg transition-all ${
          state.currentStep === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="text-sm text-gray-500">
        Step {state.currentStep} of {state.steps.length}
      </div>

      <button
        onClick={nextStep}
        disabled={!canProceedToNextStep() || state.currentStep === state.steps.length}
        className={`flex items-center px-6 py-2 rounded-lg font-semibold transition-all ${
          canProceedToNextStep() && state.currentStep < state.steps.length
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {state.currentStep === state.steps.length ? 'Complete Order' : 'Continue'}
        {state.currentStep < state.steps.length && <ArrowRight className="w-4 h-4 ml-2" />}
      </button>
    </div>
  );
};

// Main step content renderer
const StepContent: React.FC = () => {
  const { state } = useCheckout();

  switch (state.currentStep) {
    case 1:
      return <AccountStep />;
    case 2:
      return <PaymentStep />;
    case 3:
      return <ShippingStep />;
    case 4:
      return <OptionsStep />;
    case 5:
      return <ReviewStep />;
    default:
      return <div>Unknown step</div>;
  }
};

// Main checkout component
const CheckoutContent: React.FC<{ initialOffer: DeviceOffer }> = ({ initialOffer }) => {
  const { setDeviceOffer } = useCheckout();

  useEffect(() => {
    setDeviceOffer(initialOffer);
  }, [initialOffer, setDeviceOffer]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutProgress />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={`step-content`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <StepContent />
              <CheckoutNavigation />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <DeviceSummary offer={initialOffer} />
              <TrustIndicators />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main page component
const SellDevicePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [deviceOffer, setDeviceOffer] = useState<DeviceOffer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get device info from URL params or localStorage
    const brand = searchParams.get('brand');
    const device = searchParams.get('device');
    const condition = searchParams.get('condition');
    const value = searchParams.get('value');

    if (!brand || !device || !condition || !value) {
      // Redirect back to pricing if no device info
      navigate('/pricedevice');
      return;
    }

    // Create offer object
    const offer: DeviceOffer = {
      id: `offer_${Date.now()}`,
      deviceInfo: {
        brand,
        model: device,
        condition,
        carrier: searchParams.get('carrier') || 'Unlocked',
        storage: searchParams.get('storage') || '128GB',
        accessories: ['Power Cable']
      },
      pricing: {
        estimatedValue: parseFloat(value),
        originalPrice: parseFloat(searchParams.get('originalPrice') || value)
      },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days
      status: 'draft'
    };

    setDeviceOffer(offer);
    setLoading(false);
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your offer...</p>
        </div>
      </div>
    );
  }

  if (!deviceOffer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Offer</h1>
          <p className="text-gray-600 mb-6">Please return to pricing to create a new offer.</p>
          <button
            onClick={() => navigate('/pricedevice')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  return (
    <CheckoutProvider initialOffer={deviceOffer}>
      <CheckoutContent initialOffer={deviceOffer} />
    </CheckoutProvider>
  );
};

export default SellDevicePage;