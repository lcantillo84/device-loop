import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
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