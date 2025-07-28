//
// import { useState, useEffect } from 'react';
// import { ChevronLeft, Star, Shield, Truck, Clock, Check, Smartphone, Tablet, Laptop, AlertCircle, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
//
// // API configuration
// const API_BASE_URL = process.env.NODE_ENV === 'production'
//     ? 'https://device-loop-backend-production.up.railway.app/api' // We'll update this after deployment
//     : 'http://localhost:5285';
//
// // Types for your backend data
// interface Device {
//     id: number;
//     brand: string;
//     modelName: string;
//     priceUsd: number;
//     netFlawlessPayout: number;
//     netVeryGoodPayout: number;
//     netGoodPayout: number;
//     netFairPayout: number;
//     netBrokenPayout: number;
// }
//
// const PriceYourDevice = () => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [selectedBrand, setSelectedBrand] = useState('');
//     const [selectedDevice, setSelectedDevice] = useState('');
//     const [selectedCondition, setSelectedCondition] = useState('');
//     const [selectedCarrier, setSelectedCarrier] = useState('');
//     const [selectedStorage, setSelectedStorage] = useState('');
//     const [finalPrice, setFinalPrice] = useState<number | null>(null);
//     const [showConditionModal, setShowConditionModal] = useState(false);
//
//     // Backend data
//     const [brands, setBrands] = useState<string[]>([]);
//     const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
//     const [selectedDeviceData, setSelectedDeviceData] = useState<Device | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//
//     const categories = [
//         { id: 'phone', name: 'Smartphones', icon: Smartphone, desc: 'iPhone, Samsung, Google Pixel & more' },
//         { id: 'tablet', name: 'Tablets', icon: Tablet, desc: 'iPad, Android tablets & more' },
//         { id: 'laptop', name: 'Laptops', icon: Laptop, desc: 'MacBook, PC laptops & more' }
//     ];
//
//     const carriers = [
//         'Unlocked', 'Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'Other'
//     ];
//
//     const storageOptions = [
//         '16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'
//     ];
//
//     const conditions = [
//         {
//             name: 'Brand New',
//             key: 'netBrandNewPayout',
//             description: 'Never used, still in original packaging',
//             details: [
//                 'Original packaging with all accessories',
//                 'No signs of use whatsoever',
//                 'Screen protector and dust covers intact',
//                 'Never activated or opened'
//             ],
//             color: 'emerald'
//         },
//         {
//             name: 'Flawless',
//             key: 'netFlawlessPayout',
//             description: 'Looks new, minimal signs of use',
//             details: [
//                 'Looks nearly new at first glance',
//                 'Screen and LCD unblemished',
//                 'All buttons work perfectly',
//                 'Minimal non-tangible scratches only'
//             ],
//             color: 'blue'
//         },
//         {
//             name: 'Very Good',
//             key: 'netVeryGoodPayout',
//             description: 'Light wear, fully functional',
//             details: [
//                 'Fully functional device',
//                 'Very light scratches and scuffs',
//                 'No structural damage',
//                 'All buttons and features work perfectly'
//             ],
//             color: 'green'
//         },
//         {
//             name: 'Good',
//             key: 'netGoodPayout',
//             description: 'Normal wear, fully functional',
//             details: [
//                 'Fully functional device',
//                 'Minor scratches and scuffs',
//                 'No structural damage',
//                 'All buttons and features work'
//             ],
//             color: 'yellow'
//         },
//         {
//             name: 'Fair',
//             key: 'netFairPayout',
//             description: 'Heavy wear but working',
//             details: [
//                 'Heavy scratching or denting',
//                 'May have stuck buttons',
//                 'Cracked back plate acceptable',
//                 'Overall functionality intact'
//             ],
//             color: 'orange'
//         },
//         {
//             name: 'Broken',
//             key: 'netBrokenPayout',
//             description: 'Not working or severely damaged',
//             details: [
//                 'Cracked or non-functional screen',
//                 'Multiple non-working buttons',
//                 'Frame damage affecting housing',
//                 'Major functionality issues'
//             ],
//             color: 'red'
//         }
//     ];
//
//     // API Functions
//     const fetchBrands = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${API_BASE_URL}/devices/brands`);
//             if (!response.ok) throw new Error('Failed to fetch brands');
//             const brandsData = await response.json();
//             setBrands(brandsData);
//         } catch (error) {
//             console.error('Error fetching brands:', error);
//             setError('Failed to load brands');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const fetchDevicesByBrand = async (brand: string) => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${API_BASE_URL}/devices/search?brand=${encodeURIComponent(brand)}`);
//             if (!response.ok) throw new Error('Failed to fetch devices');
//             const devicesData = await response.json();
//             setAvailableDevices(devicesData);
//         } catch (error) {
//             console.error('Error fetching devices:', error);
//             setError('Failed to load devices');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const selectDevice = (deviceName: string) => {
//         const device = availableDevices.find(d => d.modelName === deviceName);
//         if (device) {
//             setSelectedDeviceData(device);
//             setSelectedDevice(deviceName);
//         }
//     };
//
//     // Load brands on component mount
//     useEffect(() => {
//         fetchBrands();
//     }, []);
//
//     // Load devices when brand is selected
//     useEffect(() => {
//         if (selectedBrand) {
//             fetchDevicesByBrand(selectedBrand);
//         }
//     }, [selectedBrand]);
//
//     const getStepStatus = (step: number) => {
//         if (step < currentStep) return 'completed';
//         if (step === currentStep) return 'current';
//         return 'upcoming';
//     };
//
//     const calculatePrice = (): number => {
//         if (!selectedDeviceData || !selectedCondition) {
//             return 0;
//         }
//
//         const condition = conditions.find(c => c.name === selectedCondition);
//         if (!condition) return 0;
//
//         const priceKey = condition.key as keyof Device;
//         const price = selectedDeviceData[priceKey] as number;
//         return Math.round(price || 0);
//     };
//
//     const getPriceDisplay = (conditionName: string): string => {
//         if (!selectedDeviceData) return '...';
//
//         const condition = conditions.find(c => c.name === conditionName);
//         if (!condition) return 'N/A';
//
//         const priceKey = condition.key as keyof Device;
//         const price = selectedDeviceData[priceKey] as number;
//         return price ? `$${Math.round(price)}` : 'N/A';
//     };
//
//     const handleNext = () => {
//         if (currentStep === 5) {
//             const price = calculatePrice();
//             setFinalPrice(price);
//         }
//         setCurrentStep(Math.min(currentStep + 1, 6));
//     };
//
//     const handleBack = () => {
//         setCurrentStep(Math.max(currentStep - 1, 1));
//     };
//
//     const canProceed = () => {
//         switch (currentStep) {
//             case 1: return selectedCategory;
//             case 2: return selectedBrand;
//             case 3: return selectedDevice;
//             case 4: return selectedCondition;
//             case 5: return selectedCarrier && selectedStorage;
//             default: return false;
//         }
//     };
//
//     const renderProgressBar = () => (
//         <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
//             <div
//                 className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
//                 style={{ width: `${(currentStep / 6) * 100}%` }}
//             />
//         </div>
//     );
//
//     const renderStepIndicator = () => (
//         <div className="flex justify-center mb-8">
//             <div className="flex items-center space-x-4">
//                 {[1, 2, 3, 4, 5, 6].map((step) => (
//                     <div key={step} className="flex items-center">
//                         <div className={`
//                             w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
//                             ${getStepStatus(step) === 'completed' ? 'bg-green-500 text-white' :
//                             getStepStatus(step) === 'current' ? 'bg-blue-500 text-white' :
//                                 'bg-gray-200 text-gray-500'}
//                         `}>
//                             {getStepStatus(step) === 'completed' ? <Check size={16} /> : step}
//                         </div>
//                         {step < 6 && (
//                             <div className={`w-8 h-0.5 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
//
//     const ConditionModal = () => (
//         <AnimatePresence>
//             {showConditionModal && (
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//                     onClick={() => setShowConditionModal(false)}
//                 >
//                     <motion.div
//                         initial={{ scale: 0.9 }}
//                         animate={{ scale: 1 }}
//                         exit={{ scale: 0.9 }}
//                         className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <div className="p-6 border-b">
//                             <div className="flex justify-between items-center">
//                                 <h2 className="text-2xl font-bold text-gray-800">Condition Guide</h2>
//                                 <button
//                                     onClick={() => setShowConditionModal(false)}
//                                     className="p-2 hover:bg-gray-100 rounded-full"
//                                 >
//                                     <X size={20} />
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="p-6 space-y-6">
//                             {conditions.map((condition) => (
//                                 <div key={condition.name} className="border rounded-xl p-4">
//                                     <div className="flex items-start justify-between mb-3">
//                                         <div>
//                                             <h3 className={`text-xl font-bold text-${condition.color}-600`}>
//                                                 {condition.name}
//                                             </h3>
//                                             <p className="text-gray-600">{condition.description}</p>
//                                         </div>
//                                         <span className={`px-3 py-1 rounded-full text-sm font-bold bg-${condition.color}-100 text-${condition.color}-700`}>
//                                             {getPriceDisplay(condition.name)}
//                                         </span>
//                                     </div>
//                                     <ul className="space-y-1">
//                                         {condition.details.map((detail, idx) => (
//                                             <li key={idx} className="flex items-center text-sm text-gray-600">
//                                                 <div className={`w-2 h-2 rounded-full bg-${condition.color}-400 mr-2`} />
//                                                 {detail}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             ))}
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
//                 <div className="max-w-4xl mx-auto px-6">
//                     <div className="text-center mb-8">
//                         <h1 className="text-4xl font-bold mb-2">Get an Instant Quote</h1>
//                         <p className="text-xl opacity-90">
//                             Find out what your device is worth in seconds
//                         </p>
//                     </div>
//
//                     {/* Trust Indicators */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//                         <div className="flex flex-col items-center">
//                             <Shield className="w-8 h-8 mb-2" />
//                             <span className="text-sm">Secure & Safe</span>
//                         </div>
//                         <div className="flex flex-col items-center">
//                             <Truck className="w-8 h-8 mb-2" />
//                             <span className="text-sm">Free Shipping</span>
//                         </div>
//                         <div className="flex flex-col items-center">
//                             <Clock className="w-8 h-8 mb-2" />
//                             <span className="text-sm">Fast Payment</span>
//                         </div>
//                         <div className="flex flex-col items-center">
//                             <Star className="w-8 h-8 mb-2" />
//                             <span className="text-sm">Top Rated</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="max-w-4xl mx-auto px-6 py-8">
//                 {renderProgressBar()}
//                 {renderStepIndicator()}
//
//                 <motion.div
//                     key={currentStep}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="bg-white rounded-2xl shadow-xl p-8"
//                 >
//                     {/* Step 1: Category Selection */}
//                     {currentStep === 1 && (
//                         <div>
//                             <h2 className="text-2xl font-bold text-center mb-2">What type of device do you have?</h2>
//                             <p className="text-gray-600 text-center mb-8">Select your device category to get started</p>
//
//                             <div className="grid md:grid-cols-3 gap-6">
//                                 {categories.map((category) => (
//                                     <button
//                                         key={category.id}
//                                         onClick={() => setSelectedCategory(category.id)}
//                                         className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
//                                             selectedCategory === category.id
//                                                 ? 'border-green-500 bg-green-50'
//                                                 : 'border-gray-200 hover:border-green-300'
//                                         }`}
//                                     >
//                                         <category.icon className="w-12 h-12 mx-auto mb-4 text-green-600" />
//                                         <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
//                                         <p className="text-gray-600 text-sm">{category.desc}</p>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//
//                     {/* Step 2: Brand Selection */}
//                     {currentStep === 2 && (
//                         <div>
//                             <h2 className="text-2xl font-bold text-center mb-2">Which brand is your device?</h2>
//                             <p className="text-gray-600 text-center mb-8">Choose your device manufacturer</p>
//
//                             {loading && (
//                                 <div className="text-center">
//                                     <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
//                                     <p className="text-sm text-gray-600">Loading brands...</p>
//                                 </div>
//                             )}
//
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                                 {brands.map((brand) => (
//                                     <button
//                                         key={brand}
//                                         onClick={() => setSelectedBrand(brand)}
//                                         className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
//                                             selectedBrand === brand
//                                                 ? 'border-green-500 bg-green-50'
//                                                 : 'border-gray-200 hover:border-green-300'
//                                         }`}
//                                     >
//                                         <div className="text-center">
//                                             <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center">
//                                                 <span className="text-lg font-bold text-gray-600">
//                                                     {brand.charAt(0)}
//                                                 </span>
//                                             </div>
//                                             <span className="text-sm font-medium">{brand}</span>
//                                         </div>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//
//                     {/* Step 3: Device Selection */}
//                     {currentStep === 3 && (
//                         <div>
//                             <h2 className="text-2xl font-bold text-center mb-2">Select your specific model</h2>
//                             <p className="text-gray-600 text-center mb-8">Choose your {selectedBrand} device</p>
//
//                             {loading && (
//                                 <div className="text-center">
//                                     <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
//                                     <p className="text-sm text-gray-600">Loading devices...</p>
//                                 </div>
//                             )}
//
//                             <div className="max-h-96 overflow-y-auto">
//                                 <div className="grid md:grid-cols-2 gap-3">
//                                     {availableDevices.map((device) => (
//                                         <button
//                                             key={device.id}
//                                             onClick={() => selectDevice(device.modelName)}
//                                             className={`p-4 rounded-lg border text-left transition-all hover:shadow-md ${
//                                                 selectedDevice === device.modelName
//                                                     ? 'border-green-500 bg-green-50'
//                                                     : 'border-gray-200 hover:border-green-300'
//                                             }`}
//                                         >
//                                             <span className="font-medium">{device.modelName}</span>
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//
//                     {/* Step 4: Condition Selection */}
//                     {currentStep === 4 && (
//                         <div>
//                             <div className="text-center mb-8">
//                                 <h2 className="text-2xl font-bold mb-2">What condition is your device in?</h2>
//                                 <p className="text-gray-600 mb-4">Be honest for the most accurate quote</p>
//                                 <button
//                                     onClick={() => setShowConditionModal(true)}
//                                     className="text-green-600 hover:text-green-700 font-medium flex items-center mx-auto"
//                                 >
//                                     <AlertCircle size={16} className="mr-1" />
//                                     View detailed condition guide
//                                 </button>
//                             </div>
//
//                             <div className="space-y-4">
//                                 {conditions.map((condition) => (
//                                     <button
//                                         key={condition.name}
//                                         onClick={() => setSelectedCondition(condition.name)}
//                                         className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
//                                             selectedCondition === condition.name
//                                                 ? 'border-green-500 bg-green-50'
//                                                 : 'border-gray-200 hover:border-green-300'
//                                         }`}
//                                     >
//                                         <div className="flex justify-between items-center">
//                                             <div>
//                                                 <h3 className="font-semibold text-lg">{condition.name}</h3>
//                                                 <p className="text-gray-600 text-sm">{condition.description}</p>
//                                             </div>
//                                             <span className={`px-3 py-1 rounded-full text-sm font-bold bg-${condition.color}-100 text-${condition.color}-700`}>
//                                                 {getPriceDisplay(condition.name)}
//                                             </span>
//                                         </div>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//
//                     {/* Step 5: Additional Details */}
//                     {currentStep === 5 && (
//                         <div>
//                             <h2 className="text-2xl font-bold text-center mb-2">Additional details</h2>
//                             <p className="text-gray-600 text-center mb-8">Help us provide the most accurate quote</p>
//
//                             <div className="space-y-6">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Carrier Status
//                                     </label>
//                                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                                         {carriers.map((carrier) => (
//                                             <button
//                                                 key={carrier}
//                                                 onClick={() => setSelectedCarrier(carrier)}
//                                                 className={`p-3 rounded-lg border text-center transition-all ${
//                                                     selectedCarrier === carrier
//                                                         ? 'border-green-500 bg-green-50'
//                                                         : 'border-gray-200 hover:border-green-300'
//                                                 }`}
//                                             >
//                                                 {carrier}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>
//
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Storage Capacity
//                                     </label>
//                                     <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
//                                         {storageOptions.map((storage) => (
//                                             <button
//                                                 key={storage}
//                                                 onClick={() => setSelectedStorage(storage)}
//                                                 className={`p-3 rounded-lg border text-center transition-all ${
//                                                     selectedStorage === storage
//                                                         ? 'border-green-500 bg-green-50'
//                                                         : 'border-gray-200 hover:border-green-300'
//                                                 }`}
//                                             >
//                                                 {storage}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//
//                     {/* Step 6: Final Quote */}
//                     {currentStep === 6 && (
//                         <div className="text-center">
//                             <motion.div
//                                 initial={{ scale: 0.8, opacity: 0 }}
//                                 animate={{ scale: 1, opacity: 1 }}
//                                 transition={{ duration: 0.5 }}
//                                 className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-8 mb-8"
//                             >
//                                 <h2 className="text-3xl font-bold mb-4">Your Device Quote</h2>
//                                 <div className="text-6xl font-bold mb-4">${finalPrice}</div>
//                                 <p className="text-xl opacity-90">For your {selectedBrand} {selectedDevice}</p>
//                                 <p className="text-lg opacity-75 mt-2">Condition: {selectedCondition} | {selectedStorage} | {selectedCarrier}</p>
//                             </motion.div>
//
//                             <div className="bg-blue-50 rounded-xl p-6 mb-8">
//                                 <h3 className="text-lg font-semibold text-blue-800 mb-4">What happens next?</h3>
//                                 <div className="grid md:grid-cols-3 gap-4 text-sm">
//                                     <div className="text-center">
//                                         <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">1</div>
//                                         <p className="font-medium">Ship for Free</p>
//                                         <p className="text-gray-600">We'll send you a prepaid shipping label</p>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">2</div>
//                                         <p className="font-medium">We Inspect</p>
//                                         <p className="text-gray-600">Professional evaluation in 24-48 hours</p>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">3</div>
//                                         <p className="font-medium">Get Paid</p>
//                                         <p className="text-gray-600">PayPal, Zelle, or check - your choice</p>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             <div className="space-y-4">
//                                 <button className="w-full bg-green-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors">
//                                     Accept Quote & Continue
//                                 </button>
//                                 <button
//                                     onClick={() => {
//                                         setCurrentStep(1);
//                                         setSelectedCategory('');
//                                         setSelectedBrand('');
//                                         setSelectedDevice('');
//                                         setSelectedCondition('');
//                                         setSelectedCarrier('');
//                                         setSelectedStorage('');
//                                         setFinalPrice(null);
//                                         setSelectedDeviceData(null);
//                                     }}
//                                     className="w-full border-2 border-gray-300 text-gray-700 py-3 px-8 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
//                                 >
//                                     Start Over
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//
//                     {/* Navigation */}
//                     {currentStep < 6 && (
//                         <div className="flex justify-between items-center mt-8 pt-8 border-t">
//                             <button
//                                 onClick={handleBack}
//                                 disabled={currentStep === 1}
//                                 className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-colors ${
//                                     currentStep === 1
//                                         ? 'text-gray-400 cursor-not-allowed'
//                                         : 'text-gray-600 hover:bg-gray-100'
//                                 }`}
//                             >
//                                 <ChevronLeft size={20} className="mr-1" />
//                                 Back
//                             </button>
//
//                             <button
//                                 onClick={handleNext}
//                                 disabled={!canProceed() || loading}
//                                 className={`px-8 py-3 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed ${
//                                     canProceed() && !loading
//                                         ? 'bg-green-600 text-white hover:bg-green-700'
//                                         : 'bg-gray-200 text-gray-400'
//                                 }`}
//                             >
//                                 {loading ? 'Loading...' : currentStep === 5 ? 'Get My Quote' : 'Continue'}
//                             </button>
//                         </div>
//                     )}
//
//                     {/* Error Display */}
//                     {error && (
//                         <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
//                             <p className="text-red-700 text-sm">{error}</p>
//                         </div>
//                     )}
//                 </motion.div>
//             </div>
//
//             <ConditionModal />
//         </div>
//     );
// };
//
// export default PriceYourDevice;
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config'; // Remove .ts extension

// Debug function to check all collections
const debugFirebase = async () => {
    try {
        console.log('🔍 Debugging Firebase connection...');

        // Try different possible collection names
        const possibleCollections = ['devices', 'pricing', 'products', 'phone_pricing'];

        for (const collectionName of possibleCollections) {
            try {
                console.log(`📁 Checking collection: ${collectionName}`);
                const ref = collection(db, collectionName);
                const snapshot = await getDocs(ref);
                console.log(`📊 ${collectionName}: ${snapshot.docs.length} documents`);

                if (snapshot.docs.length > 0) {
                    console.log(`📄 Sample document from ${collectionName}:`, snapshot.docs[0].data());
                }
            } catch (error) {
                console.log(`❌ Error accessing ${collectionName}:`, error instanceof Error ? error.message : String(error));
            }
        }
    } catch (error) {
        console.error('❌ Debug failed:', error);
    }
};

// Firebase API functions
const getBrands = async () => {
    try {
        console.log('🔥 Fetching brands from Firebase...');

        // First run debug
        await debugFirebase();

        const devicesRef = collection(db, 'devices');
        const snapshot = await getDocs(devicesRef);

        console.log('📊 Found', snapshot.docs.length, 'total devices');
        const brands = [...new Set(snapshot.docs.map(doc => doc.data().brand))];
        console.log('🏷️ Unique brands:', brands);

        return brands.filter(Boolean).sort();
    } catch (error) {
        console.error('❌ Error fetching brands:', error);
        return [];
    }
};

const getModelsByBrand = async (brand: string) => {
    try {
        console.log('🔍 Fetching models for brand:', brand);
        const devicesRef = collection(db, 'devices');
        const q = query(devicesRef, where('brand', '==', brand));
        const snapshot = await getDocs(q);

        console.log('📱 Found', snapshot.docs.length, 'devices for', brand);
        const models = [...new Set(snapshot.docs.map(doc => doc.data()['Model Name']))];
        console.log('📋 Models:', models);

        return models.filter(Boolean).sort();
    } catch (error) {
        console.error('❌ Error fetching models:', error);
        return [];
    }
};

const getDevicePricing = async (brand: string, modelName: string) => {
    try {
        console.log('💰 Fetching pricing for:', brand, modelName);
        const devicesRef = collection(db, 'devices');
        const q = query(
            devicesRef,
            where('brand', '==', brand),
            where('Model Name', '==', modelName)
        );
        const snapshot = await getDocs(q);

        console.log('💵 Found', snapshot.docs.length, 'pricing entries');

        if (snapshot.empty) {
            console.log('❌ No pricing data found');
            return null;
        }

        const data = snapshot.docs[0].data();
        console.log('✅ Pricing data:', data);

        return data;
    } catch (error) {
        console.error('❌ Error fetching device pricing:', error);
        return null;
    }
};

const PriceYourDevice = () => {
    const navigate = useNavigate(); // ADDED: For navigation to selling flow
    const [brands, setBrands] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [deviceData, setDeviceData] = useState<any>(null);
    const [brand, setBrand] = useState('');
    const [device, setDevice] = useState('');
    const [condition, setCondition] = useState('');
    const [loading, setLoading] = useState(false);
    const [brandsLoading, setBrandsLoading] = useState(true);

    const conditions = ['Brand New', 'Flawless', 'Very Good', 'Good', 'Fair', 'Broken'];

    // Load brands on component mount
    useEffect(() => {
        const loadBrands = async () => {
            setBrandsLoading(true);
            try {
                const brandList = await getBrands();
                setBrands(brandList);
            } catch (error) {
                console.error('Failed to load brands:', error);
            } finally {
                setBrandsLoading(false);
            }
        };
        loadBrands();
    }, []);

    // Handle brand selection
    const handleBrandChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setBrand(selected);
        setDevice('');
        setCondition('');
        setDeviceData(null);

        if (selected) {
            setLoading(true);
            try {
                const modelList = await getModelsByBrand(selected);
                setModels(modelList);
            } catch (error) {
                console.error('Failed to load models:', error);
                setModels([]);
            } finally {
                setLoading(false);
            }
        } else {
            setModels([]);
        }
    };

    // Handle device selection
    const handleDeviceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDevice = e.target.value;
        setDevice(selectedDevice);
        setCondition('');

        if (selectedDevice && brand) {
            setLoading(true);
            try {
                const pricing = await getDevicePricing(brand, selectedDevice);
                setDeviceData(pricing);
            } catch (error) {
                console.error('Failed to load device pricing:', error);
                setDeviceData(null);
            } finally {
                setLoading(false);
            }
        } else {
            setDeviceData(null);
        }
    };

    // Get price based on condition
    const getPrice = () => {
        if (!deviceData || !condition) return null;

        const key = `net_${condition.toLowerCase().replace(/ /g, '_')}_payout`;
        const price = deviceData[key];

        if (price === undefined || price === null) return 'N/A';
        if (price === 0 || price === '0.0') return '0.00';

        return parseFloat(price).toFixed(2);
    };

    // ADDED: Handle navigation to selling flow
    const handleShipDevice = () => {
        // Navigate to selling flow with device information
        const params = new URLSearchParams({
            brand,
            device,
            condition,
            value: getPrice() || '0',
            originalPrice: (deviceData?.price_usd || 0).toString(),
            carrier: 'Unlocked', // Default or could be from form
            storage: '128GB' // Default or could be from form
        });

        navigate(`/sell-device?${params.toString()}`);
    };

    return (
        <section className="w-full py-16 bg-gradient-to-br from-primary to-secondary text-white">
            <div className="max-w-xl mx-auto bg-white bg-opacity-10 p-8 rounded-xl shadow-xl backdrop-blur">
                <h1 className="text-3xl font-bold text-center mb-6">Price Your Device</h1>

                <div className="space-y-4">
                    {/* Brand */}
                    <div>
                        <label className="block mb-1">Brand</label>
                        <select
                            className="w-full bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg"
                            value={brand}
                            onChange={handleBrandChange}
                            disabled={brandsLoading}
                        >
                            <option value="" disabled>
                                {brandsLoading ? 'Loading brands...' : 'Select a brand'}
                            </option>
                            {brands.map((b, i) => (
                                <option key={`${b}-${i}`} value={b} className="text-gray-800">
                                    {b}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Device */}
                    <div>
                        <label className="block mb-1">Device</label>
                        <select
                            className="w-full bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg"
                            value={device}
                            onChange={handleDeviceChange}
                            disabled={!brand || loading}
                        >
                            <option value="" disabled className="text-gray-800">
                                {loading ? 'Loading devices...' : brand ? 'Select a device' : 'Choose brand first'}
                            </option>
                            {models.map((d, i) => (
                                <option key={`${d}-${i}`} value={d} className="text-gray-800">
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Condition */}
                    <div>
                        <label className="block mb-1">Condition</label>
                        <select
                            className="w-full bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg"
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            disabled={!device || loading}
                        >
                            <option value="" disabled className="text-gray-800">
                                Select condition
                            </option>
                            {conditions.map((c, i) => (
                                <option key={`${c}-${i}`} value={c} className="text-gray-800">
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg text-center">
                            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p className="text-sm">Loading pricing...</p>
                        </div>
                    )}

                    {/* Result */}
                    {brand && device && condition && !loading && (
                        <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg text-center">
                            <p className="text-lg">Estimated Payout:</p>
                            <p className="text-2xl font-bold mt-2">
                                ${getPrice()}
                            </p>
                            {deviceData && (
                                <div className="mt-3 text-sm opacity-90">
                                    <p>Original Price: ${parseFloat(deviceData.price_usd || 0).toFixed(0)}</p>
                                    <p>🌱 Trees Planted: 1 per device</p>
                                </div>
                            )}

                            {/* ADDED: Ship Device Button - Only show if price is valid */}
                            {getPrice() !== null && getPrice() !== 'N/A' && getPrice() !== '0.00' && (
                                <div className="mt-4 space-y-2">
                                    <button
                                        onClick={handleShipDevice}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <span>📦</span>
                                        <span>Sell My Device</span>
                                    </button>
                                    <p className="text-xs opacity-75">
                                        Start the selling process with free shipping
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* No Data Found */}
                    {brand && device && condition && !loading && !deviceData && (
                        <div className="mt-6 p-4 bg-red-500 bg-opacity-20 rounded-lg text-center">
                            <p className="text-lg">Device not found</p>
                            <p className="text-sm mt-1">This device may not be in our pricing database yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PriceYourDevice;