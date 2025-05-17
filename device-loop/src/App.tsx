import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import HowItWorks from './pages/HowItWorks'
import NavBar from './components/NavBar'

function App() {
    return (
        <div className="min-h-screen bg-base-100">
            <NavBar />
            <div className="px-6 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
