import React, { useState } from 'react';
import { brands, devices } from '../components/Data.tsx';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const PriceYourDevice: React.FC = () => {
    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
    const filteredDevices =
        selectedBrand !== null
            ? devices.filter((d) => d.brandId === selectedBrand)
            : [];

    return (
        // Full-width gradient section (same as homepage)
        <section className="w-full py-12 bg-gradient-to-br from-primary to-secondary">
            <div className="p-8 max-w-md mx-auto
                      bg-white bg-opacity-10 backdrop-blur
                      rounded-2xl shadow-xl
                      text-white font-sans"
            >
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Price Your Device
                </h1>

                {/* Brand Dropdown */}
                <div className="relative mb-6">
                    <label className="block mb-2 font-medium">Brand</label>
                    <select
                        className="
              w-full appearance-none
              bg-white bg-opacity-20
              text-white placeholder-white
              rounded-xl px-4 py-3 pr-10
              shadow-md
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
              transition duration-150
            "
                        value={selectedBrand ?? ''}
                        onChange={(e) => {
                            const val = e.target.value;
                            setSelectedBrand(val ? parseInt(val) : null);
                            setSelectedDevice(null);
                        }}
                    >
                        <option value="" disabled>
                            Select a brand
                        </option>
                        {brands.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        size={20}
                        className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-80"
                    />
                </div>

                {/* Device Dropdown */}
                <div className="relative mb-6">
                    <label className="block mb-2 font-medium">Device</label>
                    <select
                        className="
              w-full appearance-none
              bg-white bg-opacity-20
              text-white placeholder-white
              rounded-xl px-4 py-3 pr-10
              shadow-md
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
              transition duration-150
            "
                        value={selectedDevice ?? ''}
                        disabled={selectedBrand === null}
                        onChange={(e) => setSelectedDevice(parseInt(e.target.value))}
                    >
                        <option value="" disabled>
                            {selectedBrand ? 'Select a device' : 'Choose a brand first'}
                        </option>
                        {filteredDevices.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        size={20}
                        className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-white opacity-80"
                    />
                </div>

                {/* Selection Display */}
                {selectedDevice && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="
              mt-6 p-4
              bg-white bg-opacity-20
              rounded-xl shadow-inner
              text-center
            "
                    >
                        <p className="text-lg">You selected:</p>
                        <p className="mt-2 font-semibold">
                            {brands.find((b) => b.id === selectedBrand)?.name} —{' '}
                            {devices.find((d) => d.id === selectedDevice)?.name}
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default PriceYourDevice;
