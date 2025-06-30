import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home page';
import VehiclePage from './pages/Vehicle page';
import ServicePage from '../src/pages/Service page.jsx';
import Loginpage from './auth/Login page.jsx';
import SignUpPage from './auth/Signup page.jsx';
import Fooder from './components/Fooder.jsx';
import AdminDashboard from '../src/dashboard/AdminDashboard.jsx';
import PartnerDashboard from './dashboard/PartnerDashboard.jsx';

function App() {
  return (
<>    
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage></HomePage>} />
        <Route path='/vehicle' element={<VehiclePage></VehiclePage>} />
        <Route path='/service' element={<ServicePage></ServicePage>} />
        <Route path='/admin' element={<AdminDashboard></AdminDashboard>} />
        <Route path='/partner' element={<PartnerDashboard></PartnerDashboard>} />
        <Route path='/login' element={<Loginpage></Loginpage>} />
        <Route path='/signuppage' element={<SignUpPage></SignUpPage>} />
      </Routes>
      <Fooder />
</>
  );
}

export default App;