export default function FAQ() {
    return (
        <section className="bg-base-100 text-text py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-primary text-center mb-10">Frequently Asked Questions</h1>

                <div className="space-y-4">

                    {/* Question 1 */}
                    <div className="collapse collapse-arrow bg-surface rounded-xl shadow-md">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium">
                            What types of devices can I drop off?
                        </div>
                        <div className="collapse-content text-text">
                            <p>
                                We accept smartphones, tablets, laptops, smartwatches, headphones, game consoles, and more. If it’s a personal electronic device, we probably take it.
                            </p>
                        </div>
                    </div>

                    {/* Question 2 */}
                    <div className="collapse collapse-arrow bg-surface rounded-xl shadow-md">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium">
                            Do I get paid for my device?
                        </div>
                        <div className="collapse-content text-text">
                            <p>
                                Yes! You can choose between receiving a cash payout or donating your device's value to plant trees. The choice is yours: Cash or Cause.
                            </p>
                        </div>
                    </div>

                    {/* Question 3 */}
                    <div className="collapse collapse-arrow bg-surface rounded-xl shadow-md">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium">
                            What if I don’t live near a kiosk?
                        </div>
                        <div className="collapse-content text-text">
                            <p>
                                We’ve got you covered. Use our free mail-in option from anywhere in the U.S., or schedule an on-demand robot pickup (available in select cities).
                            </p>
                        </div>
                    </div>

                    {/* Question 4 */}
                    <div className="collapse collapse-arrow bg-surface rounded-xl shadow-md">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium">
                            How does tree planting work?
                        </div>
                        <div className="collapse-content text-text">
                            <p>
                                For every device received, we plant a tree through verified reforestation partners. You’ll be able to track your impact on your account page.
                            </p>
                        </div>
                    </div>

                    {/* Question 5 */}
                    <div className="collapse collapse-arrow bg-surface rounded-xl shadow-md">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium">
                            Is my data safe?
                        </div>
                        <div className="collapse-content text-text">
                            <p>
                                Absolutely. Devices are wiped and securely processed in certified facilities. We never resell or share any personal data.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
