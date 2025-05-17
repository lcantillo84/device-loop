export default function Footer() {
    return (
        <footer className="bg-surface text-text py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Nav Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary">Explore</h4>
                    <ul className="space-y-2">
                        <li><a href="/about" className="hover:text-primary">About</a></li>
                        <li><a href="/how-it-works" className="hover:text-primary">How It Works</a></li>
                        <li><a href="/impact" className="hover:text-primary">Impact</a></li>
                        <li><a href="/faq" className="hover:text-primary">FAQ</a></li>
                        <li><a href="/locations" className="hover:text-primary">Locations</a></li>
                        <li><a href="/contact" className="hover:text-primary">Contact</a></li>
                    </ul>
                </div>

                {/* Legal Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary">Legal</h4>
                    <ul className="space-y-2">
                        <li><a href="/privacy-policy" className="hover:text-primary">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-primary">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Branding / Message */}
                <div className="flex flex-col justify-between">
                    <h4 className="text-xl font-bold text-primary">DeviceLoop</h4>
                    <p className="mt-4 italic">Loop for good.</p>
                    <p className="text-sm text-gray-500 mt-6">© 2025 DeviceLoop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
