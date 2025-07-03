import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import HowItWorks from './pages/HowItWorks'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import PriceYourDevice from "./pages/PriceYourDevice.tsx";
import SelfieBadgePage from './pages/SelfieBadgePage'


function App() {
    return (
        <div data-theme="deviceloop"  className="min-h-screen bg-base-100 dark:bg-gray-900 transition-colors duration-300">
            <NavBar />
            <div className="">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/pricedevice" element={<PriceYourDevice />} />
                    <Route path="/badge" element={<SelfieBadgePage />} />
                    <Route path="/badge-create" element={<SelfieBadgePage />} />
                    <Route path="/donate-steps" element={<SelfieBadgePage />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App
