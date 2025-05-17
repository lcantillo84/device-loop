export default function HowItWorks() {
    return (
        <div className="min-h-screen bg-base-100 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center">How DeviceLoop Works</h1>

                <ul className="steps steps-vertical lg:steps-horizontal w-full text-lg">
                    <li className="step step-primary">Drop off or mail in your device</li>
                    <li className="step step-primary">We assess and refurbish or recycle it</li>
                    <li className="step step-primary">You get paid or donate the value</li>
                    <li className="step step-primary">We plant a tree for every device</li>
                </ul>

                <div className="mt-10 prose lg:prose-xl text-center mx-auto">
                    <p>
                        Whether your device is working or not, we make sure it finds a second life or becomes part of something better.
                        Every item avoids the landfill and gives back to the planet.
                    </p>
                </div>
            </div>
        </div>
    )
}
