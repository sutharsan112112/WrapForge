import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home page';
import VehiclePage from './pages/Vehicle page';
import ServicePage from './pages/Service page.jsx';
import AdminDashboard from './dashboard/AdminDashboard.jsx';
import PartnerDashboard from './dashboard/PartnerDashboard.jsx';
import UserDashboard from './dashboard/UserDashboard.jsx';
import LoginPage from './auth/Login page.jsx';
import SignUpPage from './auth/Signup page.jsx';
import Footer from './components/Fooder.jsx';
import AddVehicles from './pages/AddVehicles.jsx';
import AddStickers from './pages/Addstickers.jsx';
// import VehicleScene from './pages/VehicleScene.jsx';
// import Sticker from './pages/Sticker.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/vehicle' element={<VehiclePage />} />
        <Route path='/service' element={<ServicePage />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/partnerdashboard' element={<PartnerDashboard />} />
        <Route path='/userdashboard' element={<UserDashboard />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signuppage' element={<SignUpPage />} />
        <Route path='/addvehicles' element={<AddVehicles />} />
        <Route path='/addstickers' element={<AddStickers />} />
        {/* Optional - remove duplicate if not needed */}
        {/* <Route path='/vehiclescene' element={<VehicleScene />} />
        <Route path='/sticker' element={<Sticker />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
