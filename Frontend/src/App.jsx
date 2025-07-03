import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home page';
import VehiclePage from './pages/Vehicle page';
import ServicePage from '../src/pages/Service page.jsx';
import AdminDashboard from '../src/dashboard/AdminDashboard.jsx';
import PartnerDashboard from './dashboard/PartnerDashboard.jsx';
import UserDashboard from './dashboard/UserDashboard.jsx';
import Loginpage from './auth/Login page.jsx';
import SignUpPage from './auth/Signup page.jsx';
import Fooder from './components/Fooder.jsx';
import AddVehicles from './pages/AddVehicles.jsx';
import AddStickers from './pages/Addstickers.jsx';
// import VehicleScene from './pages/VehicleScene.jsx';
// import Sticker from './pages/Sticker.jsx';

function App() {
  return (
<>    
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage></HomePage>} />
        <Route path='/vehicle' element={<VehiclePage></VehiclePage>} />
        <Route path='/service' element={<ServicePage></ServicePage>} />
        <Route path='/admin' element={<AdminDashboard></AdminDashboard>} />
        <Route path='/partnerdashboard' element={<PartnerDashboard></PartnerDashboard>} />
        <Route path='/userdashboard' element={<UserDashboard></UserDashboard>} />
        <Route path='/login' element={<Loginpage></Loginpage>} />
        <Route path='/signuppage' element={<SignUpPage></SignUpPage>} />
        <Route path='/addvehicles' element={<AddVehicles></AddVehicles>} />
        <Route path='/addstickers' element={<AddStickers></AddStickers>} />
        <Route path="/add-sticker" element={<AddStickers />} />
        {/* <Route path='/vehiclesceene' element={<VehicleScene />} />
        <Route path='/sticker' element={<Sticker />} /> */}
      </Routes>
      <Fooder />
</>
  );
}

export default App;