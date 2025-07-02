import { useRef, useState, useEffect } from 'react';

export default function Tech2TreesDonation() {
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [badgeStyle, setBadgeStyle] = useState<keyof typeof badgeStyles>('eco-warrior');
    const [showSuccess, setShowSuccess] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [currentSection, setCurrentSection] = useState<'instructions' | 'badge'>('instructions');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Check URL hash on component mount
    useEffect(() => {
        const hash = window.location.hash;
        console.log('Exact hash value:', hash); // Debug log

        // Simple direct matching
        if (hash === '#/badge-create') {
            setCurrentSection('badge');
            console.log('Matched badge-create, setting to badge section');
        } else if (hash === '#/donate-steps') {
            setCurrentSection('instructions');
            console.log('Matched donate-steps, setting to instructions section');
        } else {
            setCurrentSection('instructions');
            console.log('No match, defaulting to instructions. Hash was:', hash);
        }
    }, []);

    const badgeStyles = {
        'eco-warrior': {
            name: '🌱 Eco Warrior',
            gradient: 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)',
            accentColor: '#fbbf24',
            message: 'TECH HERO',
            subtitle: 'Saving the Planet One Device at a Time'
        },
        'planet-protector': {
            name: '🌍 Planet Protector',
            gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7, #0369a1)',
            accentColor: '#10b981',
            message: 'EARTH CHAMPION',
            subtitle: 'Turning E-Waste into Forest Gold'
        },
        'green-guardian': {
            name: '🌿 Green Guardian',
            gradient: 'linear-gradient(135deg, #059669, #047857, #065f46)',
            accentColor: '#f59e0b',
            message: 'NATURE DEFENDER',
            subtitle: 'Every Device Donated = Trees Planted'
        }
    };

    const steps = [
        {
            id: 1,
            title: "Prepare Your Device",
            icon: "📱",
            color: "from-blue-500 to-indigo-600",
            accentColor: "blue",
            items: [
                { text: "Power off your phone or tablet", icon: "🔌" },
                { text: "Remove SIM & Memory Cards - keep these for your records", icon: "💳" },
                { text: "Back up & wipe data - factory reset or request secure data destruction", icon: "🔒" }
            ]
        },
        {
            id: 2,
            title: "Battery Safety",
            icon: "🔋",
            color: "from-orange-500 to-red-600",
            accentColor: "orange",
            items: [
                { text: "Battery must be intact - no swollen, leaking, or damaged batteries", icon: "⚠️" },
                { text: "Do not donate loose batteries - take them to hazardous waste collection", icon: "🚫" },
                { text: "Protect terminals - tape them or use a clear plastic bag if battery removed", icon: "🔧" }
            ]
        },
        {
            id: 3,
            title: "Acceptable Items",
            icon: "✅",
            color: "from-green-500 to-emerald-600",
            accentColor: "green",
            items: [
                { text: "Only cell phones and tablets with built-in lithium-ion batteries", icon: "📱" },
                { text: "No loose batteries, chargers, or other accessories", icon: "🔌" },
                { text: "See our website for other drop-off options for accessories", icon: "🌐" }
            ]
        },
        {
            id: 4,
            title: "How to Donate",
            icon: "📋",
            color: "from-purple-500 to-violet-600",
            accentColor: "purple",
            items: [
                { text: "Scan the QR code to open our secure donation portal", icon: "📲" },
                { text: "Complete the digital form to certify data removal and battery safety", icon: "✍️" },
                { text: "Get drop-off instructions or schedule free pickup", icon: "🚚" }
            ]
        }
    ];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageURL(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateBadge = async () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx || !imageURL) return;

        const loadImage = (src: string): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => resolve(img);
                img.onerror = (err) => reject(err);
                img.src = src;
            });
        };

        try {
            const selfie = await loadImage(imageURL);
            const style = badgeStyles[badgeStyle];

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#22c55e');
            gradient.addColorStop(0.5, '#16a34a');
            gradient.addColorStop(1, '#15803d');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add decorative border
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 12;
            ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

            // Draw inner border
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 4;
            ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

            // Draw selfie in circular frame
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2 - 50;
            const radius = 200;

            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.clip();

            // Calculate aspect ratio and draw image
            const imgAspect = selfie.width / selfie.height;
            let drawWidth, drawHeight;

            if (imgAspect > 1) {
                drawHeight = radius * 2;
                drawWidth = drawHeight * imgAspect;
            } else {
                drawWidth = radius * 2;
                drawHeight = drawWidth / imgAspect;
            }

            ctx.drawImage(
                selfie,
                centerX - drawWidth / 2,
                centerY - drawHeight / 2,
                drawWidth,
                drawHeight
            );
            ctx.restore();

            // Draw circular border around selfie
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius + 8, 0, Math.PI * 2);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 16;
            ctx.stroke();

            // Add golden accent ring
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius + 16, 0, Math.PI * 2);
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 8;
            ctx.stroke();

            // Add title text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('TECH2TREES', centerX, 80);

            // Add main message
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 42px Arial';
            ctx.fillText(style.message, centerX, centerY + radius + 80);

            // Add subtitle
            ctx.fillStyle = '#ffffff';
            ctx.font = '28px Arial';
            ctx.fillText(style.subtitle, centerX, centerY + radius + 120);

            // Add impact stats
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 24px Arial';
            ctx.fillText('🌱 DONATED • 🌍 IMPACT • 🌿 SUSTAINABLE', centerX, canvas.height - 80);

            // Add decorative elements
            const drawStar = (x: number, y: number, size: number) => {
                ctx.save();
                ctx.translate(x, y);
                ctx.fillStyle = '#fbbf24';
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(Math.cos((i * 4 * Math.PI) / 5) * size, Math.sin((i * 4 * Math.PI) / 5) * size);
                }
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            };

            // Add decorative stars
            drawStar(100, 150, 15);
            drawStar(canvas.width - 100, 150, 15);
            drawStar(150, canvas.height - 150, 12);
            drawStar(canvas.width - 150, canvas.height - 150, 12);

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);

        } catch (err) {
            console.error('Error generating badge:', err);
        }
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `tech2trees-${badgeStyle}-badge.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    const handleShare = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.toBlob(async (blob) => {
            if (blob && navigator.share) {
                try {
                    await navigator.share({
                        title: 'I just donated to Tech2Trees! 🌱',
                        text: 'Just donated my old device to Tech2Trees and helped plant trees! Every device donated helps create a greener future. Join me in making an impact! #Tech2Trees #EcoWarrior #Sustainability',
                        files: [new File([blob], 'tech2trees-badge.png', { type: 'image/png' })]
                    });
                } catch (err) {
                    console.log('Share failed, downloading instead');
                    handleDownload();
                }
            } else {
                handleDownload();
            }
        });
    };

    const toggleStepCompletion = (stepIndex: number) => {
        setCompletedSteps(prev =>
            prev.includes(stepIndex)
                ? prev.filter(i => i !== stepIndex)
                : [...prev, stepIndex]
        );
    };

    const getAccentClasses = (color: string) => {
        const classes: Record<string, { bg: string; text: string; border: string }> = {
            blue: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300" },
            orange: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
            green: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" },
            purple: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" }
        };
        return classes[color] || classes.blue;
    };

    const allStepsCompleted = completedSteps.length === steps.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-4">
                        🌱 Tech2Trees Donation Center
                    </h1>
                    <p className="text-xl opacity-90 mb-6">
                        Follow the steps, donate your device, and create your impact badge!
                    </p>
                    <div className="bg-white/20 rounded-2xl p-6 inline-block">
                        <div className="text-6xl mb-4">📱➡️🌳</div>
                        <p className="text-lg font-semibold">
                            Every device donated helps plant trees and protect our planet!
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white rounded-2xl p-2 shadow-lg flex flex-row w-full max-w-md mx-auto">
                        <button
                            onClick={() => setCurrentSection('instructions')}
                            className={`flex-1 px-3 py-4 rounded-xl font-semibold transition-all text-sm ${
                                currentSection === 'instructions'
                                    ? 'bg-green-600 text-white shadow-lg'
                                    : 'text-green-700 hover:bg-green-50'
                            }`}
                        >
                            📋 Donation Steps
                        </button>
                        <button
                            onClick={() => setCurrentSection('badge')}
                            className={`flex-1 px-3 py-4 rounded-xl font-semibold transition-all text-sm ml-2 ${
                                currentSection === 'badge'
                                    ? 'bg-green-600 text-white shadow-lg'
                                    : 'text-green-700 hover:bg-green-50'
                            }`}
                        >
                            🎨 Create Badge
                        </button>
                    </div>
                </div>

                {currentSection === 'instructions' && (
                    <>
                        {/* Progress Bar */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-green-800">Your Progress</h2>
                                <span className="text-green-600 font-semibold">
                                    {completedSteps.length} of {steps.length} steps completed
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="space-y-6">
                            {steps.map((step, index) => {
                                const isCompleted = completedSteps.includes(index);
                                const accent = getAccentClasses(step.accentColor);

                                return (
                                    <div
                                        key={step.id}
                                        className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                                            isCompleted ? 'ring-4 ring-green-300 shadow-xl' : ''
                                        }`}
                                    >
                                        {/* Step Header */}
                                        <div className={`bg-gradient-to-r ${step.color} text-white p-4`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-3xl">{step.icon}</div>
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="bg-white/20 rounded-full px-2 py-1 text-xs font-bold">
                                                                Step {step.id}
                                                            </span>
                                                            {isCompleted && (
                                                                <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                                                                    ✓ Complete
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-xl font-bold mt-1">{step.title}</h3>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => toggleStepCompletion(index)}
                                                    className={`w-8 h-8 rounded-full border-2 border-white transition-all ${
                                                        isCompleted
                                                            ? 'bg-white text-green-600'
                                                            : 'bg-transparent hover:bg-white/20'
                                                    }`}
                                                >
                                                    {isCompleted ? '✓' : ''}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Step Content */}
                                        <div className="p-4">
                                            <div className="space-y-3">
                                                {step.items.map((item, itemIndex) => (
                                                    <div
                                                        key={itemIndex}
                                                        className={`flex items-start space-x-3 p-3 rounded-lg border ${accent.bg} ${accent.border}`}
                                                    >
                                                        <div className="text-xl flex-shrink-0">{item.icon}</div>
                                                        <p className={`${accent.text} font-medium text-sm leading-relaxed`}>
                                                            {item.text}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* QR Code Section */}
                        <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 text-center">
                            <h2 className="text-2xl font-bold text-green-800 mb-4">
                                🎯 Ready to Donate?
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6 items-center">
                                <div>
                                    <div className="bg-gray-100 rounded-xl p-6">
                                        <div className="text-4xl mb-2">📲</div>
                                        <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                                            <span className="text-gray-500 font-mono text-xs">QR CODE</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-green-800 mb-3">
                                        Scan & Complete Your Donation
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                            <span className="text-green-700">Scan QR code</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                            <span className="text-green-700">Complete secure form</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                            <span className="text-green-700">Choose drop-off/pickup</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Complete All Steps CTA */}
                        {allStepsCompleted && (
                            <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-center text-white">
                                <h2 className="text-2xl font-bold mb-2">🎉 All Steps Complete!</h2>
                                <p className="mb-4">Ready to create your impact badge?</p>
                                <button
                                    onClick={() => setCurrentSection('badge')}
                                    className="bg-white text-orange-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105"
                                >
                                    🎨 Create Your Badge
                                </button>
                            </div>
                        )}
                    </>
                )}

                {currentSection === 'badge' && (
                    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 -mx-6 -mb-12 px-6 pb-12">
                        <div className="max-w-4xl mx-auto pt-8">
                            {/* Badge Style Selector */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold text-green-800 mb-4 text-center">
                                    Choose Your Hero Status
                                </h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {(Object.entries(badgeStyles) as [keyof typeof badgeStyles, typeof badgeStyles[keyof typeof badgeStyles]][]).map(([key, style]) => (
                                        <button
                                            key={key}
                                            onClick={() => setBadgeStyle(key)}
                                            className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                                                badgeStyle === key
                                                    ? 'bg-green-600 text-white shadow-lg'
                                                    : 'bg-white text-green-700 hover:bg-green-50 border-2 border-green-200'
                                            }`}
                                        >
                                            {style.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Upload Section */}
                            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                                <div className="text-center mb-6">
                                    <h2 className="text-3xl font-bold text-green-800 mb-2">
                                        📸 Upload Your Selfie
                                    </h2>
                                    <p className="text-xl text-green-600">
                                        Time to show off your eco-hero status!
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <label className="block w-full">
                                        <div className="border-4 border-dashed border-green-300 rounded-2xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <div className="text-6xl mb-4">📱➡️🌳</div>
                                            <p className="text-lg text-green-700 font-semibold">
                                                Click to upload your selfie
                                            </p>
                                            <p className="text-green-600 mt-2">
                                                Make it Instagram-worthy! 📸✨
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Canvas */}
                                <div className="flex justify-center mb-6">
                                    <canvas
                                        ref={canvasRef}
                                        width={800}
                                        height={800}
                                        className="rounded-2xl shadow-2xl bg-gradient-to-br from-green-400 to-emerald-600 max-w-full h-auto"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap justify-center gap-4">
                                    <button
                                        onClick={handleGenerateBadge}
                                        disabled={!imageURL}
                                        className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        🎨 Create My Badge
                                    </button>

                                    <button
                                        onClick={handleShare}
                                        className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-amber-600 transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        📤 Share & Inspire
                                    </button>

                                    <button
                                        onClick={handleDownload}
                                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        💾 Download Badge
                                    </button>
                                </div>
                            </div>

                            {/* Impact Stats */}
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                                    <div className="text-4xl mb-2">🌱</div>
                                    <div className="text-2xl font-bold text-green-800">Trees Planted</div>
                                    <div className="text-green-600">Every device = More green</div>
                                </div>
                                <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                                    <div className="text-4xl mb-2">♻️</div>
                                    <div className="text-2xl font-bold text-green-800">E-Waste Reduced</div>
                                    <div className="text-green-600">Keeping tech out of landfills</div>
                                </div>
                                <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                                    <div className="text-4xl mb-2">🌍</div>
                                    <div className="text-2xl font-bold text-green-800">Impact Made</div>
                                    <div className="text-green-600">Together we're changing the world</div>
                                </div>
                            </div>

                            {/* Social Media Copy */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
                                    📱 Ready-to-Share Caption
                                </h3>
                                <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm">
                                    <p className="text-gray-800 leading-relaxed">
                                        🌱 Just donated my old device to @Tech2Trees and earned my Eco Warrior badge!
                                        Every phone donated helps plant trees and keeps e-waste out of landfills.
                                        Join me in making a real impact! 🌍💚
                                        <br/><br/>
                                        #Tech2Trees #EcoWarrior #Sustainability #ClimateAction #TechForGood #GreenTech #PlantTrees #EWaste #MakeADifference
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Legal Compliance Section */}
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <h3 className="text-lg font-bold text-blue-800 mb-2 flex items-center">
                            🔒 Your Data & Privacy
                        </h3>
                        <p className="text-blue-700 text-sm leading-relaxed">
                            By donating, you agree to our Data Destruction Policy. We securely erase all
                            data-bearing devices in accordance with GDPR and U.S. data-privacy best practices.
                        </p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center">
                            🌍 Environmental Compliance
                        </h3>
                        <p className="text-green-700 text-sm leading-relaxed">
                            We recycle devices under state and federal e-waste laws. Unsuitable items are
                            redirected to certified hazardous-waste facilities for safe handling.
                        </p>
                    </div>
                </div>

                {/* Success Animation */}
                {showSuccess && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-3xl p-8 text-center transform animate-pulse">
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-3xl font-bold text-green-800 mb-2">
                                Badge Created!
                            </h2>
                            <p className="text-green-600">
                                You're officially an eco-hero! 🌱
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}