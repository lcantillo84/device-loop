// src/components/checkout/AccountStep.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import { useCheckout } from '../../context/CheckoutContext';
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

interface LoginFormData {
    email: string;
    password: string;
}

interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

interface GuestFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

const AccountStep: React.FC = () => {
    const { setCustomer, completeStep, setError, clearErrors } = useCheckout();
    const [mode, setMode] = useState<'choice' | 'login' | 'signup' | 'guest'>('choice');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [loginData, setLoginData] = useState<LoginFormData>({
        email: '',
        password: ''
    });

    const [signupData, setSignupData] = useState<SignupFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [guestData, setGuestData] = useState<GuestFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    // Validation
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        setLoading(true);

        try {
            // Validate inputs
            if (!validateEmail(loginData.email)) {
                setError('email', 'Please enter a valid email address');
                return;
            }

            if (loginData.password.length < 6) {
                setError('password', 'Password must be at least 6 characters');
                return;
            }

            // TODO: Call your authentication API
            // For now, simulate login
            await new Promise(resolve => setTimeout(resolve, 1000));

            const customer: CustomerInfo = {
                id: 'user_123', // Would come from API
                email: loginData.email,
                firstName: 'John', // Would come from API
                lastName: 'Doe', // Would come from API
                phone: '(555) 123-4567', // Would come from API
                isGuest: false,
                preferences: {
                    marketing: true,
                    sms: true
                }
            };

            setCustomer(customer);
            completeStep(1);

        } catch (error) {
            setError('general', 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        setLoading(true);

        try {
            // Validate inputs
            if (!signupData.firstName.trim()) {
                setError('firstName', 'First name is required');
                return;
            }

            if (!signupData.lastName.trim()) {
                setError('lastName', 'Last name is required');
                return;
            }

            if (!validateEmail(signupData.email)) {
                setError('email', 'Please enter a valid email address');
                return;
            }

            if (!validatePhone(signupData.phone)) {
                setError('phone', 'Please enter a valid phone number');
                return;
            }

            if (signupData.password.length < 6) {
                setError('password', 'Password must be at least 6 characters');
                return;
            }

            if (signupData.password !== signupData.confirmPassword) {
                setError('confirmPassword', 'Passwords do not match');
                return;
            }

            // TODO: Call your signup API
            await new Promise(resolve => setTimeout(resolve, 1500));

            const customer: CustomerInfo = {
                id: `user_${Date.now()}`,
                email: signupData.email,
                firstName: signupData.firstName,
                lastName: signupData.lastName,
                phone: signupData.phone,
                isGuest: false,
                preferences: {
                    marketing: true,
                    sms: true
                }
            };

            setCustomer(customer);
            completeStep(1);

        } catch (error) {
            setError('general', 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGuestCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        setLoading(true);

        try {
            // Validate inputs
            if (!guestData.firstName.trim()) {
                setError('firstName', 'First name is required');
                return;
            }

            if (!guestData.lastName.trim()) {
                setError('lastName', 'Last name is required');
                return;
            }

            if (!validateEmail(guestData.email)) {
                setError('email', 'Please enter a valid email address');
                return;
            }

            if (!validatePhone(guestData.phone)) {
                setError('phone', 'Please enter a valid phone number');
                return;
            }

            // TODO: Check if email already exists
            await new Promise(resolve => setTimeout(resolve, 800));

            const customer: CustomerInfo = {
                email: guestData.email,
                firstName: guestData.firstName,
                lastName: guestData.lastName,
                phone: guestData.phone,
                isGuest: true,
                preferences: {
                    marketing: false,
                    sms: false
                }
            };

            setCustomer(customer);
            completeStep(1);

        } catch (error) {
            setError('general', 'Failed to process guest checkout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Choice view
    if (mode === 'choice') {
        return (
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Let's Get Started</h2>
                    <p className="text-gray-600">Choose how you'd like to proceed with your device sale</p>
                </div>

                <div className="space-y-4">
                    {/* Guest Checkout */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('guest')}
                        className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-300 transition-colors group text-left"
                    >
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                                <UserPlus className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Guest Checkout</h3>
                                <p className="text-sm text-gray-600">Quick and easy, no account needed</p>
                            </div>
                        </div>
                    </motion.button>

                    {/* Create Account */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('signup')}
                        className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors group text-left"
                    >
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Create Account</h3>
                                <p className="text-sm text-gray-600">Track orders, save preferences, faster checkout</p>
                            </div>
                        </div>
                    </motion.button>

                    {/* Login */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('login')}
                        className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors group text-left"
                    >
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                                <LogIn className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Sign In</h3>
                                <p className="text-sm text-gray-600">Already have an account? Sign in here</p>
                            </div>
                        </div>
                    </motion.button>
                </div>
            </div>
        );
    }

    // Login form
    if (mode === 'login') {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-md mx-auto"
            >
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to your DeviceLoop account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={loginData.email}
                                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={loginData.password}
                                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <button type="button" className="text-sm text-green-600 hover:text-green-700">
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                {/* Switch to other modes */}
                <div className="mt-6 text-center space-y-2">
                    <button
                        onClick={() => setMode('signup')}
                        className="text-green-600 hover:text-green-700 text-sm"
                    >
                        Don't have an account? Create one
                    </button>
                    <br />
                    <button
                        onClick={() => setMode('choice')}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                        ← Back to options
                    </button>
                </div>
            </motion.div>
        );
    }

    // Signup form
    if (mode === 'signup') {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-md mx-auto"
            >
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                    <p className="text-gray-600">Join DeviceLoop and help save the planet</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            <input
                                type="text"
                                value={signupData.firstName}
                                onChange={(e) => setSignupData(prev => ({ ...prev, firstName: e.target.value }))}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="John"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            <input
                                type="text"
                                value={signupData.lastName}
                                onChange={(e) => setSignupData(prev => ({ ...prev, lastName: e.target.value }))}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={signupData.email}
                                onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                value={signupData.phone}
                                onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="(555) 123-4567"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={signupData.password}
                                onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Create a secure password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={signupData.confirmPassword}
                                onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {/* Switch to other modes */}
                <div className="mt-6 text-center space-y-2">
                    <button
                        onClick={() => setMode('login')}
                        className="text-green-600 hover:text-green-700 text-sm"
                    >
                        Already have an account? Sign in
                    </button>
                    <br />
                    <button
                        onClick={() => setMode('choice')}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                        ← Back to options
                    </button>
                </div>
            </motion.div>
        );
    }

    // Guest checkout form
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-md mx-auto"
        >
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Guest Checkout</h2>
                <p className="text-gray-600">Enter your information to proceed</p>
            </div>

            <form onSubmit={handleGuestCheckout} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                            type="text"
                            value={guestData.firstName}
                            onChange={(e) => setGuestData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="John"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                            type="text"
                            value={guestData.lastName}
                            onChange={(e) => setGuestData(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Doe"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            value={guestData.email}
                            onChange={(e) => setGuestData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="tel"
                            value={guestData.phone}
                            onChange={(e) => setGuestData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="(555) 123-4567"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Processing...' : 'Continue as Guest'}
                </button>
            </form>

            {/* Switch to other modes */}
            <div className="mt-6 text-center space-y-2">
                <button
                    onClick={() => setMode('login')}
                    className="text-green-600 hover:text-green-700 text-sm"
                >
                    Have an account? Sign in instead
                </button>
                <br />
                <button
                    onClick={() => setMode('choice')}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                >
                    ← Back to options
                </button>
            </div>
        </motion.div>
    );
};

export default AccountStep;