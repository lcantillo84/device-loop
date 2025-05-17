import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className="navbar bg-base-100 border-b shadow-sm sticky top-0 z-50">
            <div className="flex-1">
                <Link to="/" className="text-2xl font-bold text-primary">
                    DeviceLoop
                </Link>
            </div>
            <div className="flex-none space-x-2 text-sm font-medium">
                <Link to="/" className="btn btn-ghost text-primary">Home</Link>
                <Link to="/about" className="btn btn-ghost text-primary">About</Link>
                <Link to="/how-it-works" className="btn btn-ghost text-primary">How It Works</Link>
                <Link to="/contact" className="btn btn-outline btn-primary">Contact</Link>
            </div>
        </div>
    );
}
