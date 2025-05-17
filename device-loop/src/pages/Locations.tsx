import { Link } from "react-router-dom";

export default function Locations() {
    return (
        <section className="bg-base-100 text-text py-20 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-primary mb-6">Find a Drop-Off Near You</h1>
                <p className="text-lg mb-10">
                    We're growing fast. Right now, you can recycle your devices through:
                </p>

                <div className="grid md:grid-cols-3 gap-6 text-left">
                    <div className="bg-surface p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold text-primary mb-2">📍 2,500+ Kiosks Nationwide</h3>
                        <p>Conveniently located in malls, retail stores, and campuses across the U.S.</p>
                    </div>
                    <div className="bg-surface p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold text-primary mb-2">🤖 On-Demand Robots</h3>
                        <p>Live in select metro areas — schedule a doorstep pickup through the DeviceLoop app.</p>
                    </div>
                    <div className="bg-surface p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold text-primary mb-2">📦 Free Mail-In</h3>
                        <p>No drop-off near you? No problem — request a prepaid mailer and send your devices from anywhere.</p>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-4">DeviceLoop Map (Coming Soon)</h2>
                    <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 italic">
                        Interactive kiosk map launching soon...
                    </div>
                </div>

                {/* Retail CTA */}
                <div className="mt-16 bg-surface p-8 rounded-xl shadow text-center max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-primary mb-2">Want a DeviceLoop kiosk at your store?</h3>
                    <p className="mb-4">Join our growing network of retail and campus partners.</p>
                    <Link to="/partner" className="btn btn-primary">Partner with Us</Link>
                </div>
            </div>
        </section>
    );
}
