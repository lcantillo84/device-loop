export default function HowItWorks() {
    return (
        <div className="bg-base-100 p-10 text-gray-800 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card bg-white shadow-xl">
                    <figure><img src="https://via.placeholder.com/400x200?text=Drop+Your+Device" alt="Drop your device" /></figure>
                    <div className="card-body">
                        <h3 className="card-title">1. Drop Your Device</h3>
                        <p>Find a DeviceLoop kiosk or request a prepaid mail-in kit to send us your unused devices.</p>
                    </div>
                </div>
                <div className="card bg-white shadow-xl">
                    <figure><img src="https://via.placeholder.com/400x200?text=Analyze+and+Refurbish" alt="Analyze device" /></figure>
                    <div className="card-body">
                        <h3 className="card-title">2. Analyze & Refurbish</h3>
                        <p>We inspect, wipe, and refurbish devices when possible — or recycle them safely.</p>
                    </div>
                </div>
                <div className="card bg-white shadow-xl">
                    <figure><img src="https://via.placeholder.com/400x200?text=Plant+a+Tree" alt="Tree planting" /></figure>
                    <div className="card-body">
                        <h3 className="card-title">3. Plant a Tree</h3>
                        <p>For every device, we plant a tree — and track the impact in your dashboard.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}