import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check for saved theme preference on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            // Check system preference if no saved theme
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(systemDark);
        }
    }, []);

    // Apply theme changes to document
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // SVG Logo Component
    const DeviceLoopLogo = ({ className = "" }) => (
        <svg
            width="220"
            height="40"
            viewBox="0 0 220 40"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="royalToForest" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" style={{stopColor: '#1d4ed8', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#16a34a', stopOpacity: 1}} />
                </linearGradient>
            </defs>
            <text
                x="110"
                y="27"
                fontFamily="'Balsamiq Sans', 'Comic Sans MS', cursive, Arial, sans-serif"
                fontSize="22"
                fontWeight="700"
                textAnchor="middle"
                fill="url(#royalToForest)"
            >
                DeviceLoop
            </text>
        </svg>
    );

    // Compact Logo for smaller screens (just "DL")
    const CompactLogo = ({ className = "" }) => (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="compactGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" style={{stopColor: '#1d4ed8', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#16a34a', stopOpacity: 1}} />
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22" fill="url(#compactGradient)" opacity="0.1" />
            <text
                x="24"
                y="32"
                fontFamily="'Balsamiq Sans', 'Comic Sans MS', cursive, Arial, sans-serif"
                fontSize="18"
                fontWeight="700"
                textAnchor="middle"
                fill="url(#compactGradient)"
            >
                DL
            </text>
        </svg>
    );

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo & Title */}
                <a href="/" className="flex items-center">
                    {/* Option 1: Full DeviceLoop logo (recommended for desktop) */}
                    <DeviceLoopLogo className="hidden sm:block" />

                    {/* Option 2: Compact DL logo for mobile */}
                    <CompactLogo className="block sm:hidden" />

                    {/* Option 3: If you prefer text alongside logo, uncomment below */}
                    {/*
                    <CompactLogo className="mr-2" />
                    <span className="font-bold text-primary dark:text-white transition-colors duration-300">
                        DeviceLoop
                    </span>
                    */}
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 items-center">
                    <a href="/" className="text-base font-medium text-primary dark:text-green-400 hover:text-accent dark:hover:text-green-300 transition-colors duration-300">
                        Home
                    </a>
                    <a href="/#about" className="text-base font-medium text-primary dark:text-green-400 hover:text-accent dark:hover:text-green-300 transition-colors duration-300">
                        About
                    </a>
                    <a href="/#how-it-works" className="text-base font-medium text-primary dark:text-green-400 hover:text-accent dark:hover:text-green-300 transition-colors duration-300">
                        How It Works
                    </a>
                    <a href="/#pricedevice" className="text-base font-medium text-primary dark:text-green-400 hover:text-accent dark:hover:text-green-300 transition-colors duration-300">
                        Price Your Device
                    </a>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-600"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? (
                            <Sun className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-gray-600" />
                        )}
                    </button>

                    <a href="/#badge" className="btn btn-outline btn-primary dark:btn-outline dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-gray-900 px-4 py-1 ml-4 transition-colors duration-300">
                        Upload Selfie
                    </a>
                    <a
                        href="/#contact"
                        className="btn btn-outline btn-primary dark:btn-outline dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-gray-900 px-4 py-1 ml-4 transition-colors duration-300"
                    >
                        Contact
                    </a>
                </div>

                {/* Mobile Menu Button & Theme Toggle */}
                <div className="md:hidden flex items-center space-x-2">
                    {/* Mobile Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? (
                            <Sun className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-gray-600" />
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle Menu"
                        className="p-2 focus:outline-none text-black dark:text-white transition-colors duration-300"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {menuOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 transition-colors duration-300"
                >
                    <div className="flex flex-col px-6 py-4 space-y-3">
                        <a href="/" className="text-base font-medium text-primary dark:text-green-400 transition-colors duration-300">
                            Home
                        </a>
                        <a href="/#about" className="text-base font-medium text-primary dark:text-green-400 transition-colors duration-300">
                            About
                        </a>
                        <a href="/#how-it-works" className="text-base font-medium text-primary dark:text-green-400 transition-colors duration-300">
                            How It Works
                        </a>
                        <a href="/#pricedevice" className="text-base font-medium text-primary dark:text-green-400 transition-colors duration-300">
                            Price Your Device
                        </a>
                        <a
                            href="/#badge"
                            className="btn btn-outline btn-primary dark:btn-outline dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-gray-900 px-4 py-1 mt-2 transition-colors duration-300"
                        >
                            Upload Selfie
                        </a>
                        <a
                            href="/#contact"
                            className="btn btn-outline btn-primary dark:btn-outline dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-gray-900 px-4 py-1 transition-colors duration-300"
                        >
                            Contact
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}