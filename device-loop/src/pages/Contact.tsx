import { useState } from 'react';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // You can hook this to EmailJS, Formspree, or your API later
    };

    return (
        <section className="bg-base-100 text-text py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-primary text-center mb-10">Contact Us</h1>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Questions? We’re here to help.</h2>
                        <p className="mb-4">Reach out to us anytime and we’ll get back to you as soon as possible.</p>
                        <ul className="space-y-2">
                            <li><strong>Email:</strong>{' '}
                                <a href="mailto:support@deviceloop.com" className="text-primary hover:underline">
                                    support@deviceloop.com
                                </a>
                            </li>
                            <li><strong>Phone:</strong>{' '}
                                <a href="tel:1800XXXXXXX" className="text-primary hover:underline">
                                    1-800-XXX-XXXX
                                </a>
                            </li>
                            <li><strong>Press & Partnerships:</strong>{' '}
                                <a href="mailto:partnerships@deviceloop.com" className="text-primary hover:underline">
                                    partnerships@deviceloop.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-surface p-6 rounded-xl shadow-md">
                        {submitted ? (
                            <div className="text-center text-success font-semibold">
                                ✅ Thanks for your message! We'll get back to you shortly.
                            </div>
                        ) : (
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block font-medium mb-1">Name</label>
                                    <input type="text" required placeholder="Your name" className="input input-bordered input-primary w-full" />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Email</label>
                                    <input type="email" required placeholder="you@example.com" className="input input-bordered input-primary w-full" />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Subject</label>
                                    <input type="text" required placeholder="Subject" className="input input-bordered input-primary w-full" />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Message</label>
                                    <textarea required className="textarea textarea-bordered input-primary w-full" rows={4} placeholder="Your message..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-full">Send Message</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
