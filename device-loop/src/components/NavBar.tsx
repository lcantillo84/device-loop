
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import {useState} from "react";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo & Title */}
                <Link to="/" className="flex items-center">
                    <img
                        src="/images/icon.png"
                        alt="DeviceLoop Logo"
                        className="h-10 w-10 mr-2"
                    />
                    <span className="text-2xl font-bold text-black">DeviceLoop</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="text-base font-medium text-primary hover:text-accent">
                        Home
                    </Link>
                    <Link to="/about" className="text-base font-medium text-primary hover:text-accent">
                        About
                    </Link>
                    <Link to="/how-it-works" className="text-base font-medium text-primary hover:text-accent">
                        How It Works
                    </Link>
                    <Link to="/pricedevice" className="text-base font-medium text-primary hover:text-accent">
                        Price Your Device
                    </Link>
                    <Link
                        to="/contact"
                        className="btn btn-outline btn-primary px-4 py-1 ml-4"
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle Menu"
                        className="p-2 focus:outline-none"
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
                    className="md:hidden bg-white/95 backdrop-blur-md border-t"
                >
                    <div className="flex flex-col px-6 py-4 space-y-3">
                        <Link to="/" className="text-base font-medium text-primary">
                            Home
                        </Link>
                        <Link to="/about" className="text-base font-medium text-primary">
                            About
                        </Link>
                        <Link to="/how-it-works" className="text-base font-medium text-primary">
                            How It Works
                        </Link>
                        <Link to="/pricedevice" className="text-base font-medium text-primary">
                            Price Your Device
                        </Link>
                        <Link
                            to="/contact"
                            className="btn btn-outline btn-primary px-4 py-1 mt-2"
                        >
                            Contact
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
