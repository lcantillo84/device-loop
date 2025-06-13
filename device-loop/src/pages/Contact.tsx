export default function Contact() {
    return (
        <section className="bg-base-100 text-text py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-primary text-center mb-10">
                    Contact Us
                </h1>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Questions? We’re here to help.
                        </h2>
                        <p className="mb-4">
                            Reach out to us anytime and we’ll get back to you as soon as
                            possible.
                        </p>
                        <ul className="space-y-2">
                            <li>
                                <strong>Email:</strong>{' '}
                                <a
                                    href="mailto:support@deviceloop.io"
                                    className="text-primary hover:underline"
                                >
                                    support@deviceloop.io
                                </a>
                            </li>
                            <li>
                                <strong>Phone:</strong>{' '}
                                <a
                                    href="tel:1-800-XXX-XXXX"
                                    className="text-primary hover:underline"
                                >
                                    1-800-XXX-XXXX
                                </a>
                            </li>
                            <li>
                                <strong>Press & Partnerships:</strong>{' '}
                                <a
                                    href="mailto:partnerships@deviceloop.io"
                                    className="text-primary hover:underline"
                                >
                                    partnerships@deviceloop.io
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-surface p-6 rounded-xl shadow-md">
                        <form
                            action="https://formsubmit.co/tim@deviceloop.io"
                            method="POST"
                            className="space-y-4"
                        >
                            {/* 1) Honeypot to block bots */}
                            <input type="text" name="_honey" style={{ display: 'none' }} />

                            {/* 2) Redirect to a thank-you page after submit */}
                            <input
                                type="hidden"
                                name="_next"
                                value={`${window.location.origin}/thank-you`}
                            />

                            {/* 3) Disable FormSubmit’s CAPTCHA if you like */}
                            {/* <input type="hidden" name="_captcha" value="false" /> */}

                            {/* Name */}
                            <div>
                                <label className="block font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Your name"
                                    className="input input-bordered input-primary w-full"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="you@example.com"
                                    className="input input-bordered input-primary w-full"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block font-medium mb-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    placeholder="Subject"
                                    className="input input-bordered input-primary w-full"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block font-medium mb-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="Your message..."
                                    className="textarea textarea-bordered input-primary w-full"
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
