import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="bg-base-100 text-text">
            {/* Our Story Section */}
            <section className="py-20 px-6 bg-base-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-primary mb-6">Our Story</h1>
                    <p className="text-lg leading-relaxed">
                        We stared at drawers stuffed with old phones, tablets and laptops—upgrades made them worthless, and recycling felt complicated.
                        Could those gadgets do more than clutter? That question sparked <strong>DeviceLoop</strong>.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6 bg-surface">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
                    <p className="text-lg leading-relaxed">
                        Loop every device back into the circular economy — and plant <strong>1 million+ trees</strong> along the way.
                    </p>
                    <img
                        src="https://source.unsplash.com/featured/?tree,technology"
                        alt="Tree and technology"
                        className="rounded-xl mt-8 mx-auto max-w-full shadow-md"
                    />
                </div>
            </section>

            {/* Differentiators Section */}
            <section className="py-20 px-6 bg-base-100">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-primary mb-8">What Makes Us Different</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="bg-surface p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-2">💸 “Cash or Cause” Choice</h3>
                            <p>Choose a payout or donate your device’s value to verified tree planting partners.</p>
                        </div>
                        <div className="bg-surface p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-2">🤖 Autonomous Collection</h3>
                            <p>Drop devices at 24/7 kiosks or summon an on-demand DeviceLoop robot pickup.</p>
                        </div>
                        <div className="bg-surface p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-2">🔧 Full-Stack Processing</h3>
                            <p>We handle refurbishing, parts harvesting, and rare-earth element recovery — in-house.</p>
                        </div>
                        <div className="bg-surface p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-primary mb-2">🌱 Verified Impact</h3>
                            <p>Our blockchain-backed CO₂ ledger proves your trees are real and your impact is lasting.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-6 bg-primary text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Be Part of the Loop</h2>
                    <p className="text-lg mb-6">Recycle devices. Plant trees. Power the circular economy.</p>
                    <Link to="/get-started">
                        <button className="btn btn-accent">Get Started</button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
