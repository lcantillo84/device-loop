import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <div className="navbar bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="flex-1">
                <Link to="/" className="text-2xl font-bold text-green-300">DeviceLoop</Link>
            </div>
            <div className="flex-none space-x-4 text-sm font-medium text-blue-60">
                <Link to="/" className="btn  btn-ghost text-green-300">Home</Link>
                <Link to="/about" className="btn btn-ghost text-green-300">About</Link>
                <Link to="/how-it-works" className="btn btn-ghost text-green-300">How It Works</Link>
                <Link to="/contact" className="btn btn-outline btn-primary text-green-300">Contact</Link>
            </div>
        </div>
    )
}
