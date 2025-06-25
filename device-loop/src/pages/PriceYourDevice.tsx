// import React, { useState } from 'react';
// import { brands, devices } from '../components/Data.tsx';
// import { motion } from 'framer-motion';
// import { ChevronDown } from 'lucide-react';
//
// const PriceYourDevice: React.FC = () => {
//     const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
//     const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
//     const filteredDevices =
//         selectedBrand !== null
//             ? devices.filter((d) => d.brandId === selectedBrand)
//             : [];
//
//     return (
//         // Full-width gradient section (same as homepage)
//         <section className="w-full py-12 bg-gradient-to-br from-primary to-secondary">
//             <div className="p-8 max-w-md mx-auto
//                       bg-white bg-opacity-10 backdrop-blur
//                       rounded-2xl shadow-xl
//                       text-white font-sans"
//             >
//                 <h1 className="text-3xl font-bold mb-6 text-center">
//                     Price Your Device
//                 </h1>
//
//                 {/* Brand Dropdown */}
//                 <div className="relative mb-6">
//                     <label className="block mb-2 font-medium">Brand</label>
//                     <select
//                         className="
//               w-full appearance-none
//               bg-white bg-opacity-20
//               text-white placeholder-white
//               rounded-xl px-4 py-3 pr-10
//               shadow-md
//               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
//               transition duration-150
//             "
//                         value={selectedBrand ?? ''}
//                         onChange={(e) => {
//                             const val = e.target.value;
//                             setSelectedBrand(val ? parseInt(val) : null);
//                             setSelectedDevice(null);
//                         }}
//                     >
//                         <option value="" disabled>
//                             Select a brand
//                         </option>
//                         {brands.map((b) => (
//                             <option key={b.id} value={b.id}>
//                                 {b.name}
//                             </option>
//                         ))}
//                     </select>
//                     <ChevronDown
//                         size={20}
//                         className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-80"
//                     />
//                 </div>
//
//                 {/* Device Dropdown */}
//                 <div className="relative mb-6">
//                     <label className="block mb-2 font-medium">Device</label>
//                     <select
//                         className="
//               w-full appearance-none
//               bg-white bg-opacity-20
//               text-white placeholder-white
//               rounded-xl px-4 py-3 pr-10
//               shadow-md
//               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
//               transition duration-150
//             "
//                         value={selectedDevice ?? ''}
//                         disabled={selectedBrand === null}
//                         onChange={(e) => setSelectedDevice(parseInt(e.target.value))}
//                     >
//                         <option value="" disabled>
//                             {selectedBrand ? 'Select a device' : 'Choose a brand first'}
//                         </option>
//                         {filteredDevices.map((d) => (
//                             <option key={d.id} value={d.id}>
//                                 {d.name}
//                             </option>
//                         ))}
//                     </select>
//                     <ChevronDown
//                         size={20}
//                         className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-80"
//                     />
//                 </div>
//
//                 {/* Selection Display */}
//                 {selectedDevice && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="
//               mt-6 p-4
//               bg-white bg-opacity-20
//               rounded-xl shadow-inner
//               text-center
//             "
//                     >
//                         <p className="text-lg">You selected:</p>
//                         <p className="mt-2 font-semibold">
//                             {brands.find((b) => b.id === selectedBrand)?.name} —{' '}
//                             {devices.find((d) => d.id === selectedDevice)?.name}
//                         </p>
//                     </motion.div>
//                 )}
//             </div>
//         </section>
//     );
// };
//
// export default PriceYourDevice;
import { useEffect, useState } from 'react';

const PriceYourDevice = () => {
    const [pricingData, setPricingData] = useState<any[]>([]);
    const [brand, setBrand] = useState('');
    const [device, setDevice] = useState('');
    const [condition, setCondition] = useState('');
    const [models, setModels] = useState<string[]>([]);
    const conditions = ['Brand New', 'Flawless', 'Very Good', 'Good', 'Fair', 'Broken'];

    useEffect(() => {
        fetch('/pricing.json')
            .then((res) => res.json())
            .then((data) => setPricingData(data))
            .catch((err) => console.error('Failed to load pricing:', err));
    }, []);

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setBrand(selected);
        setDevice('');
        const filtered = pricingData.filter((p) => p.brand === selected);
        const uniqueModels = [...new Set(filtered.map((p) => p['Model Name']))];
        setModels(uniqueModels);
    };

    const getPrice = () => {
        const entry = pricingData.find(
            (p) => p.brand === brand && p['Model Name'] === device
        );
        if (!entry) return null;
        const key = `net_${condition.toLowerCase().replace(/ /g, '_')}_payout`;
        return entry[key] || 'N/A';
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
                        >
                            <option value="" disabled>Select a brand</option>
                            {[...new Set(pricingData.map((p) => p.brand))].map((b, i) => (
                                <option key={`${b}-${i}`} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>

                    {/* Device */}
                    <div>
                        <label className="block mb-1">Device</label>
                        <select
                            className="w-full bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg"
                            value={device}
                            onChange={(e) => setDevice(e.target.value)}
                            disabled={!brand}
                        >
                            <option value="" disabled>{brand ? 'Select a device' : 'Choose brand first'}</option>
                            {models.map((d, i) => (
                                <option key={`${d}-${i}`} value={d}>{d}</option>
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
                            disabled={!device}
                        >
                            <option value="" disabled>Select condition</option>
                            {conditions.map((c, i) => (
                                <option key={`${c}-${i}`} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* Result */}
                    {brand && device && condition && (
                        <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg text-center">
                            <p className="text-lg">Estimated Payout:</p>
                            <p className="text-2xl font-bold mt-2">${getPrice()}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PriceYourDevice;
