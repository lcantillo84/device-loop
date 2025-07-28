// src/context/CheckoutContext.tsx
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type {
    CheckoutState,
    CheckoutStep,
    DeviceOffer,
    CustomerInfo,
    PaymentMethod,
    ShippingAddress,
    SellingOptions,
    SellOrder
} from '../types/sellingFlow';

// Action types
type CheckoutAction =
    | { type: 'SET_DEVICE_OFFER'; payload: DeviceOffer }
    | { type: 'SET_CUSTOMER'; payload: CustomerInfo }
    | { type: 'SET_PAYMENT_METHOD'; payload: PaymentMethod }
    | { type: 'SET_SHIPPING_ADDRESS'; payload: ShippingAddress }
    | { type: 'SET_OPTIONS'; payload: SellingOptions }
    | { type: 'SET_ORDER'; payload: SellOrder }
    | { type: 'SET_CURRENT_STEP'; payload: number }
    | { type: 'COMPLETE_STEP'; payload: number }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: { field: string; message: string } }
    | { type: 'CLEAR_ERRORS' }
    | { type: 'RESET_CHECKOUT' };

// Initial checkout steps
const initialSteps: CheckoutStep[] = [
    { id: 1, name: 'Account', component: 'AccountStep', isComplete: false, isActive: true },
    { id: 2, name: 'Payment', component: 'PaymentStep', isComplete: false, isActive: false },
    { id: 3, name: 'Shipping', component: 'ShippingStep', isComplete: false, isActive: false },
    { id: 4, name: 'Options', component: 'OptionsStep', isComplete: false, isActive: false },
    { id: 5, name: 'Review', component: 'ReviewStep', isComplete: false, isActive: false }
];

// Initial state
const initialState: CheckoutState = {
    currentStep: 1,
    steps: initialSteps,
    deviceOffer: null,
    customer: null,
    paymentMethod: null,
    shippingAddress: null,
    options: null,
    order: null,
    errors: {},
    loading: false
};

// Reducer
function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
    switch (action.type) {
        case 'SET_DEVICE_OFFER':
            return { ...state, deviceOffer: action.payload };

        case 'SET_CUSTOMER':
            return { ...state, customer: action.payload };

        case 'SET_PAYMENT_METHOD':
            return { ...state, paymentMethod: action.payload };

        case 'SET_SHIPPING_ADDRESS':
            return { ...state, shippingAddress: action.payload };

        case 'SET_OPTIONS':
            return { ...state, options: action.payload };

        case 'SET_ORDER':
            return { ...state, order: action.payload };

        case 'SET_CURRENT_STEP':
            return {
                ...state,
                currentStep: action.payload,
                steps: state.steps.map(step => ({
                    ...step,
                    isActive: step.id === action.payload
                }))
            };

        case 'COMPLETE_STEP':
            return {
                ...state,
                steps: state.steps.map(step => ({
                    ...step,
                    isComplete: step.id <= action.payload,
                    isActive: step.id === action.payload + 1
                }))
            };

        case 'SET_LOADING':
            return { ...state, loading: action.payload };

        case 'SET_ERROR':
            return {
                ...state,
                errors: { ...state.errors, [action.payload.field]: action.payload.message }
            };

        case 'CLEAR_ERRORS':
            return { ...state, errors: {} };

        case 'RESET_CHECKOUT':
            return initialState;

        default:
            return state;
    }
}

// Context
interface CheckoutContextType {
    state: CheckoutState;
    dispatch: React.Dispatch<CheckoutAction>;

    // Helper functions
    setDeviceOffer: (offer: DeviceOffer) => void;
    setCustomer: (customer: CustomerInfo) => void;
    setPaymentMethod: (method: PaymentMethod) => void;
    setShippingAddress: (address: ShippingAddress) => void;
    setOptions: (options: SellingOptions) => void;
    nextStep: () => void;
    previousStep: () => void;
    goToStep: (step: number) => void;
    completeStep: (step: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (field: string, message: string) => void;
    setOrder: (order: SellOrder) => void;
    clearErrors: () => void;
    resetCheckout: () => void;

    // Validation helpers
    canProceedToNextStep: () => boolean;
    getStepValidation: (step: number) => boolean;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

// Provider component
interface CheckoutProviderProps {
    children: React.ReactNode;
    initialOffer?: DeviceOffer;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
                                                                      children,
                                                                      initialOffer
                                                                  }) => {
    const [state, dispatch] = useReducer(checkoutReducer, {
        ...initialState,
        deviceOffer: initialOffer || null
    });

    // Helper functions
    const setDeviceOffer = useCallback((offer: DeviceOffer) => {
        dispatch({ type: 'SET_DEVICE_OFFER', payload: offer });
    }, []);

    const setCustomer = useCallback((customer: CustomerInfo) => {
        dispatch({ type: 'SET_CUSTOMER', payload: customer });
    }, []);

    const setPaymentMethod = useCallback((method: PaymentMethod) => {
        dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });
    }, []);

    const setShippingAddress = useCallback((address: ShippingAddress) => {
        dispatch({ type: 'SET_SHIPPING_ADDRESS', payload: address });
    }, []);

    const setOptions = useCallback((options: SellingOptions) => {
        dispatch({ type: 'SET_OPTIONS', payload: options });
    }, []);

    const setOrder = useCallback((order: SellOrder) => {
        dispatch({ type: 'SET_ORDER', payload: order });
    }, []);

    const nextStep = useCallback(() => {
        if (state.currentStep < state.steps.length) {
            dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep + 1 });
        }
    }, [state.currentStep, state.steps.length]);

    const previousStep = useCallback(() => {
        if (state.currentStep > 1) {
            dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep - 1 });
        }
    }, [state.currentStep]);

    const goToStep = useCallback((step: number) => {
        if (step >= 1 && step <= state.steps.length) {
            dispatch({ type: 'SET_CURRENT_STEP', payload: step });
        }
    }, [state.steps.length]);

    const completeStep = useCallback((step: number) => {
        dispatch({ type: 'COMPLETE_STEP', payload: step });
    }, []);

    const setLoading = useCallback((loading: boolean) => {
        dispatch({ type: 'SET_LOADING', payload: loading });
    }, []);

    const setError = useCallback((field: string, message: string) => {
        dispatch({ type: 'SET_ERROR', payload: { field, message } });
    }, []);

    const clearErrors = useCallback(() => {
        dispatch({ type: 'CLEAR_ERRORS' });
    }, []);

    const resetCheckout = useCallback(() => {
        dispatch({ type: 'RESET_CHECKOUT' });
    }, []);

    // Validation helpers
    const getStepValidation = useCallback((step: number): boolean => {
        switch (step) {
            case 1: // Account
                return !!(state.customer?.email && state.customer?.firstName && state.customer?.lastName);
            case 2: // Payment
                return !!(state.paymentMethod?.type && state.paymentMethod?.verificationStatus === 'verified');
            case 3: // Shipping
                return !!(state.shippingAddress?.fullName &&
                    state.shippingAddress?.address1 &&
                    state.shippingAddress?.city &&
                    state.shippingAddress?.state &&
                    state.shippingAddress?.postalCode);
            case 4: // Options
                return !!(state.options?.termsAccepted);
            case 5: // Review
                return !!(state.deviceOffer && state.customer && state.paymentMethod &&
                    state.shippingAddress && state.options);
            default:
                return false;
        }
    }, [state]);

    const canProceedToNextStep = useCallback((): boolean => {
        return getStepValidation(state.currentStep);
    }, [state.currentStep, getStepValidation]);

    // @ts-ignore
    const contextValue: CheckoutContextType = {
        state,
        dispatch,
        setDeviceOffer,
        setCustomer,
        setPaymentMethod,
        setShippingAddress,
        setOptions,
        setOrder,
        nextStep,
        previousStep,
        goToStep,
        completeStep,
        setLoading,
        setError,
        clearErrors,
        resetCheckout,
        canProceedToNextStep,
        getStepValidation
    };

    return (
        <CheckoutContext.Provider value={contextValue}>
            {children}
        </CheckoutContext.Provider>
    );
};

// Hook to use checkout context
export const useCheckout = (): CheckoutContextType => {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
};

// HOC for components that need checkout context
export function withCheckout<P extends object>(
    Component: React.ComponentType<P>
): React.ComponentType<P> {
    return function CheckoutComponent(props: P) {
        return (
            <CheckoutProvider>
                <Component {...props} />
            </CheckoutProvider>
        );
    };
}