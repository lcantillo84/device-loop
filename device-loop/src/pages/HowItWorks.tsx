import { Link } from "react-router-dom";
import { Truck, Cpu, TreeDeciduous } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
    const steps = [
        {
            icon: <Truck size={48} />,
            title: "Drop Your Device",
            desc:
                "Find a DeviceLoop kiosk, schedule a robot pickup, or request a free mail-in kit—anywhere in the U.S.",
        },
        {
            icon: <Cpu size={48} />,
            title: "Analyze & Refurbish",
            desc:
                "We inspect each device: working ones get a second life, non-working ones yield valuable parts.",
        },
        {
            icon: <TreeDeciduous size={48} />,
            title: "Plant a Tree",
            desc:
                "For every device collected, we plant a tree—and you can track your impact in real time.",
        },
    ];

    return (
        <section className="bg-surface text-text py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-primary mb-16">
                    How DeviceLoop Works
                </h2>

                <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className="flex-1 bg-base-100 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center"
                        >
                            <div className="p-4 bg-primary text-white rounded-full mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-lg">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link to="/get-started" className="btn btn-primary">
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    );
}
