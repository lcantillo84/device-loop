// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Phone, Tablet, Laptop , RefreshCw, Repeat, Leaf} from 'lucide-react';
// export default function Home() {
//     return (
//         <div data-theme="deviceloop" className="bg-base-100 text-text font-sans">
//
//             {/* Hero Section with Video Background */}
//             <section className="relative h-screen flex items-center justify-center overflow-hidden">
//                 <div
//                     className="absolute inset-0 w-full h-full object-cover bg-center bg-cover"
//                     style={{backgroundImage: "url('/images/homepage.png')"}}
//                 />
//                 <div className="relative z-10 text-center px-6">
//                     <motion.h1
//                         initial={{opacity: 0, y: -40}}
//                         animate={{opacity: 1, y: 0}}
//                         transition={{duration: 0.8}}
//                         className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4"
//                     >
//                         Give Your Devices a Second Life
//                     </motion.h1>
//                     <motion.p
//                         initial={{opacity: 0}}
//                         animate={{opacity: 1}}
//                         transition={{delay: 0.5, duration: 0.8}}
//                         className="text-lg md:text-xl text-white mb-6 max-w-1xl mx-auto"
//                     >
//                         At DeviceLoop, we turn your unused phones, tablets, laptops, and more into impact.
//                         We refurbish or recycle — and for every device, we plant a tree 🌱.
//                     </motion.p>
//                     <motion.div
//                         initial={{scale: 0.8, opacity: 0}}
//                         animate={{scale: 1, opacity: 1}}
//                         transition={{delay: 1, duration: 0.5}}
//                     >
//                         <Link to="/how-it-works">
//                             <button className="btn btn-primary text-white px-8 py-3 text-lg rounded-2xl">
//                                 See How It Works
//                             </button>
//                         </Link>
//                     </motion.div>
//                 </div>
//             </section>
//             <section className="py-16 px-6 bg-surface">
//                 <div className="max-w-6xl mx-auto text-center">
//                     <motion.h2
//                         initial={{opacity: 0, y: 20}}
//                         whileInView={{opacity: 1, y: 0}}
//                         transition={{duration: 0.6}}
//                         className="text-3xl font-bold mb-6 text-primary"
//                     >
//                         What Devices Do We Accept?
//                     </motion.h2>
//                     <p className="text-lg mb-10">We take it all — not just smartphones.</p>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//                         {[
//                             {name: 'Phones', icon: Phone},
//                             {name: 'Tablets', icon: Tablet},
//                             {name: 'Laptops', icon: Laptop}
//                         ].map(({name, icon: Icon}) => (
//                             <motion.div
//                                 key={name}
//                                 whileHover={{scale: 1.05}}
//                                 className="flex flex-col items-center justify-center p-2 rounded-xl shadow-lg bg-gradient-to-br from-primary to-secondary text-white"
//                             >
//                                 <Icon className="h-5 w-5 mb-3"/>
//                                 <p className="text-lg font-semibold">{name}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//
//             {/*         {/* Impact Section */}
//             <section className="py-16 px-6 bg-gradient-to-br from-green-50 to-blue-50">
//                 <div className="max-w-5xl mx-auto text-center">
//                     <motion.h2
//                         initial={{opacity: 0, y: 20}}
//                         whileInView={{opacity: 1, y: 0}}
//                         transition={{duration: 0.6}}
//                         className="text-3xl font-bold mb-4 text-primary"
//                     >
//                         Global Impact, One Device at a Time
//                     </motion.h2>
//                     <motion.p
//                         initial={{opacity: 0}}
//                         whileInView={{opacity: 1}}
//                         transition={{delay: 0.3, duration: 0.6}}
//                         className="text-lg mb-10"
//                     >
//                         Each device you recycle helps reduce e‑waste, supports communities, and nurtures our planet.
//                     </motion.p>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
//                         <motion.div
//                             whileHover={{scale: 1.05}}
//                             className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
//                         >
//                             <RefreshCw className="h-12 w-12 text-primary mb-4"/>
//                             <h3 className="text-xl font-semibold mb-2">100K+ Devices Refurbished</h3>
//                             <p>Giving tech a second life and bridging the digital divide.</p>
//                         </motion.div>
//                         <motion.div
//                             whileHover={{scale: 1.05}}
//                             className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
//                         >
//                             <Repeat className="h-12 w-12 text-primary mb-4"/>
//                             <h3 className="text-xl font-semibold mb-2">50K+ Devices Recycled</h3>
//                             <p>Mining valuable materials and keeping landfills clean.</p>
//                         </motion.div>
//                         <motion.div
//                             whileHover={{scale: 1.05}}
//                             className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
//                         >
//                             <Leaf className="h-12 w-12 text-primary mb-4"/>
//                             <h3 className="text-xl font-semibold mb-2">Trees Planted Worldwide</h3>
//                             <p>Your impact has grown forests and supported biodiversity.</p>
//                         </motion.div>
//                     </div>
//                 </div>
//             </section>
//
//             {/* Call to Action */}
//             <section
//                 className="relative py-16 px-6 text-center text-white"
//                 style={{
//                     backgroundImage: "url('/images/homepage1.png')",
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center'
//                 }}
//             >
//                 {/* Dark overlay for readability */}
//                 <div className="absolute inset-0 bg-black opacity-50"/>
//                 <div className="relative max-w-3xl mx-auto">
//                     <motion.h2
//                         initial={{opacity: 0, y: 20}}
//                         animate={{opacity: 1, y: 0}}
//                         transition={{duration: 0.6}}
//                         className="text-3xl md:text-4xl font-bold mb-4"
//                     >
//                         Ready to Clear Your Drawer?
//                     </motion.h2>
//                     <motion.p
//                         initial={{opacity: 0}}
//                         animate={{opacity: 1}}
//                         transition={{delay: 0.3, duration: 0.6}}
//                         className="text-lg mb-6"
//                     >
//                         Help the planet and get rewarded — in just minutes.
//                     </motion.p>
//                     <Link to="/pricedevice">
//                         <motion.button
//                             whileHover={{scale: 1.05}}
//                             className="btn btn-accent px-8 py-3 text-lg"
//                         >
//                             Get Started
//                         </motion.button>
//                     </Link>
//                 </div>
//             </section>
//
//             {/* Media Assets Guide */}
//             <section className="py-12 px-6 bg-surface bg-gradient-to-br from-green-50 to-blue-50">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <h2 className="text-2xl font-bold text-primary mb-4">Core Mision</h2>
//                     <p className="text-lg mb-6">
//                         Partnering with communities to recycle over one billion devices—reclaiming critical materials, reducing e-waste, and powering a truly circular future.Recycling devices, savings resources, and generating valuable carbon credits to improve our planet together!
//                     </p>
//
//                     <p className="text-lg mb-6 font-bold">"One refurbished phone saves as much CO₂ as a tree does in a year.".</p>
//                 </div>
//             </section>
//         </div>
//     );
// }
import { motion } from 'framer-motion';
import { Phone, Tablet, Laptop, RefreshCw, Repeat, Leaf, TreePine, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {

    const [currentSlide, setCurrentSlide] = useState(0);

    // Carousel slides data
    const slides = [
        {
            id: 1,
            background: "url('/images/homepage.png')",
            badge: null,
            title: "Give Your Devices a Second Life",
            subtitle: "At DeviceLoop, we turn your unused phones, tablets, laptops, and more into impact. We refurbish or recycle — and for every device, we plant a tree 🌱.",
            cta: {
                primary: { text: "See How It Works", link: "/#how-it-works" }
            }
        },
        {
            id: 2,
            background: "url('/images/homepage.png')",
            badge: { icon: TreePine, text: "Tech2Trees Impact Program" },
            title: "Turn E-Waste Into Forest Gold",
            subtitle: "Every donated device plants trees and reduces e-waste. Join the movement that's transforming technology into environmental impact.",
            cta: {
                primary: { text: "🌱 Donate Your Device", link: "/badge#/donate-steps" },
                secondary: { text: "💰 Check Device Value", link: "/#pricedevice" }
            }
        }
    ];


    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [slides.length]);


    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const currentSlideData = slides[currentSlide];

    return (
        <div data-theme="deviceloop" className="bg-base-100 dark:bg-gray-900 text-text dark:text-white font-sans">


            {/* Hero Section with Carousel */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 w-full h-full object-cover bg-center bg-cover transition-all duration-1000"
                    style={{backgroundImage: currentSlideData.background}}
                />

                {/* Carousel Navigation */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                >
                    <ChevronLeft className="h-6 w-6 text-white" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                >
                    <ChevronRight className="h-6 w-6 text-white" />
                </button>

                <div className="relative z-10 text-center px-6">
                    {/* Badge (for Tech2Trees slide) */}
                    {currentSlideData.badge && (
                        <motion.div
                            key={`badge-${currentSlide}`}
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                            className="mb-4"
                        >
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/30">
                                <currentSlideData.badge.icon className="h-4 w-4 text-green-400 mr-2" />
                                <span className="text-green-300 font-medium">{currentSlideData.badge.text}</span>
                            </span>
                        </motion.div>
                    )}

                    <motion.h1
                        key={`title-${currentSlide}`}
                        initial={{opacity: 0, y: -40}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4"
                    >
                        {currentSlide === 1 ? (
                            <>
                                Turn E-Waste Into
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                                    {" "}Forest Gold
                                </span>
                            </>
                        ) : (
                            currentSlideData.title
                        )}
                    </motion.h1>

                    <motion.p
                        key={`subtitle-${currentSlide}`}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5, duration: 0.8}}
                        className="text-lg md:text-xl text-white mb-6 max-w-1xl mx-auto"
                    >
                        {currentSlideData.subtitle}
                    </motion.p>

                    <motion.div
                        key={`cta-${currentSlide}`}
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{delay: 1, duration: 0.5}}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <a href={currentSlideData.cta.primary.link}>
                            <button className="btn btn-primary text-white px-8 py-3 text-lg rounded-2xl">
                                {currentSlideData.cta.primary.text}
                            </button>
                        </a>
                        {currentSlideData.cta.secondary && (
                            <a href={currentSlideData.cta.secondary.link}>
                                <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 text-lg rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300">
                                    {currentSlideData.cta.secondary.text}
                                </button>
                            </a>
                        )}
                    </motion.div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide ? 'bg-white' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* What Devices Section - EXACT ORIGINAL */}
            <section className="py-16 px-6 bg-surface dark:bg-gray-800">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="text-3xl font-bold mb-6 text-primary dark:text-green-400"
                    >
                        What Devices Do We Accept?
                    </motion.h2>
                    <p className="text-lg mb-10 dark:text-gray-300">We take it all — not just smartphones.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            {name: 'Phones', icon: Phone},
                            {name: 'Tablets', icon: Tablet},
                            {name: 'Laptops', icon: Laptop}
                        ].map(({name, icon: Icon}) => (
                            <motion.div
                                key={name}
                                whileHover={{scale: 1.05}}
                                className="flex flex-col items-center justify-center p-2 rounded-xl shadow-lg bg-gradient-to-br from-primary to-secondary text-white dark:from-green-600 dark:to-emerald-600"
                            >
                                <Icon className="h-5 w-5 mb-3"/>
                                <p className="text-lg font-semibold">{name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Section - EXACT ORIGINAL */}
            <section className="py-16 px-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-800">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="text-3xl font-bold mb-4 text-primary dark:text-green-400"
                    >
                        Global Impact, One Device at a Time
                    </motion.h2>
                    <motion.p
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{delay: 0.3, duration: 0.6}}
                        className="text-lg mb-10 dark:text-gray-300"
                    >
                        Each device you recycle helps reduce e‑waste, supports communities, and nurtures our planet.
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <motion.div
                            whileHover={{scale: 1.05}}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center"
                        >
                            <RefreshCw className="h-12 w-12 text-primary dark:text-green-400 mb-4"/>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">100K+ Devices Refurbished</h3>
                            <p className="dark:text-gray-300">Giving tech a second life and bridging the digital divide.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{scale: 1.05}}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center"
                        >
                            <Repeat className="h-12 w-12 text-primary dark:text-green-400 mb-4"/>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">50K+ Devices Recycled</h3>
                            <p className="dark:text-gray-300">Mining valuable materials and keeping landfills clean.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{scale: 1.05}}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center"
                        >
                            <Leaf className="h-12 w-12 text-primary dark:text-green-400 mb-4"/>
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">Trees Planted Worldwide</h3>
                            <p className="dark:text-gray-300">Your impact has grown forests and supported biodiversity.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action - EXACT ORIGINAL */}
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
                    <a href="/pricedevice">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="btn btn-accent px-8 py-3 text-lg"
                        >
                            Get Started
                        </motion.button>
                    </a>
                </div>
            </section>

            {/* Core Mission - EXACT ORIGINAL */}
            <section className="py-12 px-6 bg-surface dark:bg-gray-800 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-primary dark:text-green-400 mb-4">Core Mission</h2>
                    <p className="text-lg mb-6 dark:text-gray-300">
                        Partnering with communities to recycle over one billion devices—reclaiming critical materials, reducing e-waste, and powering a truly circular future. Recycling devices, saving resources, and generating valuable carbon credits to improve our planet together!
                    </p>

                    <p className="text-lg mb-6 font-bold dark:text-white">"One refurbished phone saves as much CO₂ as a tree does in a year."</p>
                </div>
            </section>
        </div>
    );
}