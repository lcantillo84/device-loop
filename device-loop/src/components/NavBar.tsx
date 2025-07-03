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
                    <img
                        src="/images/icon.png"
                        alt="DeviceLoop Logo"
                        className="h-10 w-10 mr-2"
                    />
                    <span className="text-2xl font-bold text-black dark:text-white transition-colors duration-300">
                        DeviceLoop
                    </span>
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