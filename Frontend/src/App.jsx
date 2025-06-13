import { BrowserRouter as Router, Routes, Route } from 'react'
import Login from './components/auth/LoginForm.jsx'
import Home from './pages/Homepage.jsx'
import Vehicle from './pages/Vehiclepage.jsx'
import Gallery from './pages/Gallerypage.jsx'
import About from './pages/Aboutuspage.jsx'
import Contact from './pages/Contactpage.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Vehicle" element={<Vehicle />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App