import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div data-theme="deviceloop" className="bg-base-100 text-text font-sans">

            {/* Hero Section */}
            <section className="py-20 px-6 bg-base-100 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-primary mb-4">
                        Give Your Devices a Second Life
                    </h1>
                    <p className="text-lg mb-6">
                        At DeviceLoop, we turn your unused phones, tablets, laptops and more into impact.
                        We refurbish or recycle your old tech — and for every device, we plant a tree 🌱.
                    </p>
                    <Link to="/how-it-works">
                        <button className="btn btn-primary text-white">See How It Works</button>
                    </Link>
                </div>
            </section>

            {/* What We Take */}
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

            {/* Impact Section */}
            <section className="py-16 px-6 bg-surface">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4 text-primary">A Simple Action, A Global Impact</h2>
                    <p className="text-lg mb-8">
                        Imagine this: your old device helps someone stay connected, avoids toxic waste,
                        and becomes a tree in the ground.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

            {/* Call to Action */}
            <section className="py-16 px-6 text-center bg-primary text-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Ready to Clear Your Drawer?</h2>
                    <p className="text-lg mb-6">Help the planet and get rewarded — in just minutes.</p>
                    <Link to="/get-started">
                        <button className="btn btn-accent">Get Started</button>
                    </Link>
                </div>
            </section>

            {/* Locations */}
            <section className="py-16 px-6 bg-surface">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-primary mb-6">Find a Drop-Off Near You</h2>
                    <p className="text-lg mb-10">We're growing fast. Recycle through:</p>
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-2">📍 2,500+ Kiosks Nationwide</h3>
                            <p>Located in malls, retail stores, and campuses across the U.S.</p>
                        </div>
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-2">🤖 On-Demand Robots</h3>
                            <p>Live in select metros — schedule a doorstep pickup via our app.</p>
                        </div>
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-2">📦 Free Mail-In</h3>
                            <p>No kiosk nearby? Request a prepaid mailer and ship from anywhere.</p>
                        </div>
                    </div>
                    <div className="w-full h-64 bg-base-200 rounded-xl flex items-center justify-center text-gray-500 italic mb-8">
                        Interactive map coming soon…
                    </div>
                    <div className="inline-block bg-base-100 p-8 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold text-primary mb-2">Want a kiosk at your store?</h3>
                        <p className="mb-4">Learn about our retail partnership program.</p>
                        <Link to="/partner" className="btn btn-primary">Partner with Us</Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-6 bg-surface">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-primary mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: "What types of devices can I drop off?",
                                a: "We accept smartphones, tablets, laptops, smartwatches, headphones, game consoles, and more. If it’s electronics, we probably take it."
                            },
                            {
                                q: "Do I get paid for my device?",
                                a: "Yes! Choose cash payout or donate your device’s value to plant trees—your choice, Cash or Cause."
                            },
                            {
                                q: "What if I don’t live near a kiosk?",
                                a: "We’ve got you covered with free mail-in or on-demand robot pickup (select cities)."
                            },
                            {
                                q: "How does tree planting work?",
                                a: "For every device received, we plant a tree through verified partners. Track your impact on your dashboard."
                            },
                            {
                                q: "Is my data safe?",
                                a: "Absolutely. Devices are wiped and processed in certified facilities. We never share personal data."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="collapse collapse-arrow bg-base-100 rounded-xl shadow-md">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium text-primary">{faq.q}</div>
                                <div className="collapse-content text-text">
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
