export default function Footer() {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content mt-16">
            <aside>
                <h2 className="text-xl font-bold text-blue-600">DeviceLoop</h2>
                <p>Creating circular impact for people + planet.<br />© {new Date().getFullYear()} DeviceLoop, Inc.</p>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a href="#"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/github.svg" alt="GitHub" className="w-5 h-5" /></a>
                    <a href="#"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/twitter.svg" alt="Twitter" className="w-5 h-5" /></a>
                    <a href="#"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" /></a>
                </div>
            </nav>
        </footer>
    )
}