import { motion } from "framer-motion";

export default function Locations() {
    const spots = [
        { icon: "📍", title: "2,500+ Kiosks Nationwide", desc: "Located…" },
        { icon: "🤖", title: "On-Demand Robots", desc: "Live in…" },
        { icon: "📦", title: "Free Mail-In", desc: "No kiosk nearby…" },
    ];

    return (
        <section className="py-20 px-6 bg-base-100">
            <h2 className="text-3xl font-bold text-primary text-center mb-6">
                Find a Drop-Off Near You
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                {spots.map((spot, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        className="bg-surface p-6 rounded-xl shadow-md text-center"
                    >
                        <p className="text-3xl mb-2">{spot.icon}</p>
                        <h3 className="text-xl font-semibold text-primary mb-1">
                            {spot.title}
                        </h3>
                        <p>{spot.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
