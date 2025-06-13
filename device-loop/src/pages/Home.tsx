import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Tablet, Laptop , RefreshCw, Repeat, Leaf} from 'lucide-react';
export default function Home() {
    return (
        <div data-theme="deviceloop" className="bg-base-100 text-text font-sans">

            {/* Hero Section with Video Background */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 w-full h-full object-cover bg-center bg-cover"
                    style={{backgroundImage: "url('/images/homepage.png')"}}
                />
                <div className="relative z-10 text-center px-6">
                    <motion.h1
                        initial={{opacity: 0, y: -40}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4"
                    >
                        Give Your Devices a Second Life
                    </motion.h1>
                    <motion.p
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5, duration: 0.8}}
                        className="text-lg md:text-xl text-white mb-6 max-w-1xl mx-auto"
                    >
                        At DeviceLoop, we turn your unused phones, tablets, laptops, and more into impact.
                        We refurbish or recycle — and for every device, we plant a tree 🌱.
                    </motion.p>
                    <motion.div
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{delay: 1, duration: 0.5}}
                    >
                        <Link to="/how-it-works">
                            <button className="btn btn-primary text-white px-8 py-3 text-lg rounded-2xl">
                                See How It Works
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
            <section className="py-16 px-6 bg-surface">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="text-3xl font-bold mb-6 text-primary"
                    >
                        What Devices Do We Accept?
                    </motion.h2>
                    <p className="text-lg mb-10">We take it all — not just smartphones.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            {name: 'Phones', icon: Phone},
                            {name: 'Tablets', icon: Tablet},
                            {name: 'Laptops', icon: Laptop}
                        ].map(({name, icon: Icon}) => (
                            <motion.div
                                key={name}
                                whileHover={{scale: 1.05}}
                                className="flex flex-col items-center justify-center p-2 rounded-xl shadow-lg bg-gradient-to-br from-primary to-secondary text-white"
                            >
                                <Icon className="h-5 w-5 mb-3"/>
                                <p className="text-lg font-semibold">{name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/*         {/* Impact Section */}
            <section className="py-16 px-6 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="text-3xl font-bold mb-4 text-primary"
                    >
                        Global Impact, One Device at a Time
                    </motion.h2>
                    <motion.p
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{delay: 0.3, duration: 0.6}}
                        className="text-lg mb-10"
                    >
                        Each device you recycle helps reduce e‑waste, supports communities, and nurtures our planet.
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <motion.div
                            whileHover={{scale: 1.05}}
                            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
                        >
                            <RefreshCw className="h-12 w-12 text-primary mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">100K+ Devices Refurbished</h3>
                            <p>Giving tech a second life and bridging the digital divide.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{scale: 1.05}}
                            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
                        >
                            <Repeat className="h-12 w-12 text-primary mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">50K+ Devices Recycled</h3>
                            <p>Mining valuable materials and keeping landfills clean.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{scale: 1.05}}
                            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
                        >
                            <Leaf className="h-12 w-12 text-primary mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">Trees Planted Worldwide</h3>
                            <p>Your impact has grown forests and supported biodiversity.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section
                className="relative py-16 px-6 text-center text-white"
                style={{
                    backgroundImage: "url('/images/homepage1.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black opacity-50"/>
                <div className="relative max-w-3xl mx-auto">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Ready to Clear Your Drawer?
                    </motion.h2>
                    <motion.p
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.3, duration: 0.6}}
                        className="text-lg mb-6"
                    >
                        Help the planet and get rewarded — in just minutes.
                    </motion.p>
                    <Link to="/pricedevice">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="btn btn-accent px-8 py-3 text-lg"
                        >
                            Get Started
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Media Assets Guide */}
            <section className="py-12 px-6 bg-surface bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-primary mb-4">Core Mision</h2>
                    <p className="text-lg mb-6">
                        Partnering with communities to recycle over one billion devices—reclaiming critical materials, reducing e-waste, and powering a truly circular future.Recycling devices, savings resources, and generating valuable carbon credits to improve our planet together!
                    </p>

                    <p className="text-lg mb-6 font-bold">"One refurbished phone saves as much CO₂ as a tree does in a year.".</p>
                </div>
            </section>
        </div>
    );
}
