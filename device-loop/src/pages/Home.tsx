import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div data-theme="deviceloop" className="bg-base-100 text-text font-sans">
            {/* Hero Section – Now bright and clean */}
            <section className="py-20 px-6 bg-base-100 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-primary mb-4">Give Your Devices a Second Life</h1>
                    <p className="text-lg text-text mb-6">
                        At DeviceLoop, we turn your unused phones, tablets, laptops and more into impact.
                        We refurbish or recycle your old tech — and for every device, we plant a tree 🌱.
                    </p>
                    <Link to="/how-it-works">
                        <button className="btn btn-primary text-white">See How It Works</button>
                    </Link>
                </div>
            </section>

            {/* What We Take – Redesigned in card style like Impact */}
            <section className="py-16 px-6 bg-surface">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-primary">What Devices Do We Accept?</h2>
                    <p className="text-lg mb-10">We take it all — not just smartphones.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            "Phones",
                            "Tablets",
                            "Laptops",
                            "Smartwatches",
                            "Game Consoles",
                            "Headphones",
                            "E-Readers",
                            "Accessories"
                        ].map((item) => (
                            <div
                                key={item}
                                className="bg-base-100 text-text p-4 rounded-xl shadow-md border border-accent"
                            >
                                <p className="text-lg font-semibold">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Section – Already beautiful */}
            <section className="py-16 px-6 bg-surface">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4 text-primary">A Simple Action, A Global Impact</h2>
                    <p className="text-lg text-text mb-8">
                        Imagine this: your old device helps someone stay connected, avoids toxic waste, and becomes a tree in the ground.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-2">Refurbish & Reuse</h3>
                            <p>We give tech a second chance before recycling, saving energy and emissions.</p>
                        </div>
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-2">Recycle Responsibly</h3>
                            <p>Anything that can’t be reused gets dismantled for materials — nothing goes to landfill.</p>
                        </div>
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-2">Plant a Tree</h3>
                            <p>Every device equals one new tree planted — with verified partners around the world.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action – Already beautiful */}
            <section className="py-16 px-6 text-center bg-primary text-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Ready to Clear Your Drawer?</h2>
                    <p className="text-lg mb-6">Help the planet and get rewarded — in just minutes.</p>
                    <Link to="/get-started">
                        <button className="btn btn-accent">Get Started</button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
