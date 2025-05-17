import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="flex gap-4 p-4 bg-gray-100 text-blue-600">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/how-it-works">How It Works</Link>
        </nav>
    )
}
