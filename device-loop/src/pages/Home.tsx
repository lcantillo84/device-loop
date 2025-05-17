export default function Home() {
    return (
        <div className="min-h-screen bg-base-100">
            <div className="hero min-h-[80vh] bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src="https://placehold.co/500x300?text=Device+Drop"
                        className="max-w-sm rounded-lg shadow-2xl"
                        alt="DeviceLoop drop"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">Turn Devices into Impact 🌱</h1>
                        <p className="py-6 max-w-xl">
                            At DeviceLoop, we turn your old tech into something incredible —
                            working devices for someone else, recycled materials for new tech,
                            and a tree planted for every item you send.
                        </p>
                        <a href="/how-it-works" className="btn btn-primary">How It Works</a>
                    </div>
                </div>
            </div>

            <div className="text-center my-12">
                <h2 className="text-3xl font-bold mb-4">Why DeviceLoop?</h2>
                <div className="stats shadow w-full max-w-4xl mx-auto">
                    <div className="stat">
                        <div className="stat-title">Devices Rescued</div>
                        <div className="stat-value text-primary">18,432</div>
                        <div className="stat-desc">And counting</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Trees Planted</div>
                        <div className="stat-value text-secondary">19,210</div>
                        <div className="stat-desc">One per device</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">CO₂ Offset</div>
                        <div className="stat-value text-accent">38 Tons</div>
                        <div className="stat-desc">From landfill diversion</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
