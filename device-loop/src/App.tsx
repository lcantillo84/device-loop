import { Routes, Route, Link } from 'react-router-dom'

function App() {
    return (
        <div className="p-6">
            <nav className="space-x-4 text-blue-600">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<h1 className="text-2xl">Welcome to DeviceLoop</h1>} />
                <Route path="/about" element={<p>This is the about page.</p>} />
            </Routes>
        </div>
    )
}

export default App
