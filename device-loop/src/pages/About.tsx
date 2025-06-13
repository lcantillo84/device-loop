
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div data-theme="deviceloop" className="bg-base-100 text-text font-sans">
            {/* Our Story Section with Wave Divider */}
            <section className="relative py-16 px-6 bg-surface overflow-hidden">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold mb-4 text-primary"
                    >
                        Our Story
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-md md:text-xl leading-relaxed max-w-3xl mx-auto"
                    >
                        At DeviceLoop, we used to stare at our overflowing tech drawers—old phones, tablets, and laptops we’d outgrown yet couldn’t bear to toss. We wondered: could those 18 devices our founder had in her drawer do more than gather dust? That question led us here. DeviceLoop turns forgotten gadgets into real-world impact: we refurbish them for a second life or reuse their materials to build tomorrow’s devices. Even better, for every device you send, we’ll plant a tree—so clearing out your drawer becomes an act of giving back.
                    </motion.p>
                </div>
                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 text-base-100">
                        <path d="M1200 0L0 0 892.25 114.72 1200 0z" fill="currentColor" />
                    </svg>
                </div>
            </section>

            {/* Mission Section with Inverted Wave Top */}
            <section className="relative py-16 px-6 bg-base-100 overflow-hidden">
                {/* Top Wave */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 text-surface">
                        <path d="M1200 0L0 0 892.25 114.72 1200 0z" fill="currentColor" />
                    </svg>
                </div>
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold mb-4 text-primary"
                    >
                        Our Mission
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-lg leading-relaxed max-w-2xl mx-auto"
                    >
                        Loop every device back into the circular economy — and plant <strong>1 million+ trees</strong> along the way.
                    </motion.p>
                </div>
            </section>

            {/* Differentiators Section with Wave Divider */}
            <section className="relative py-16 px-6 bg-surface overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold mb-4 text-primary"
                    >
                        What Makes Us Different
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: '💸 “Cash or Cause” Choice', text: 'Choose a payout or donate your device’s value to verified tree-planting partners.' },
                            { title: '🤖 Autonomous Collection', text: 'Drop devices at 24/7 kiosks or summon an on-demand DeviceLoop robot pickup.' },
                            { title: '🔧 Full-Stack Processing', text: 'We handle refurbishing, parts harvesting, and rare-earth element recovery — in-house.' },
                            { title: '🌱 Verified Impact', text: 'Our blockchain-backed CO₂ ledger proves your trees are real and your impact is lasting.' }
                        ].map((item) => (
                            <motion.div
                                key={item.title}
                                whileHover={{ scale: 1.03 }}
                                className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-text"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-primary">{item.title}</h3>
                                <p className="text-base text-center">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 text-base-100">
                        <path d="M1200 0L0 0 892.25 114.72 1200 0z" fill="currentColor" />
                    </svg>
                </div>
            </section>

            {/* Call to Action Section */}
            <section
                className="relative py-16 px-6 text-center text-white"
                style={{
                    backgroundImage: "url('/images/homepage1.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50" />
                <div className="relative max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Join Our Mission
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-lg mb-6"
                    >
                        Ready to clear your tech drawer and make an impact? Let’s loop your devices together.
                    </motion.p>
                    <Link to="/get-started">
                        <motion.button whileHover={{ scale: 1.05 }} className="btn btn-accent px-8 py-3 text-lg">
                            Get Started
                        </motion.button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
