import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home page';
import VehiclePage from './pages/Vehicle page';
import ServicePage from './pages/Service page';
import GalleryPage from './pages/Gallery page';
import ContactPage from './pages/Cotact page';
import LoginPage from './auth/Login page.jsx';
import SignUpPage from './auth/Signup page.jsx';

function App() {
  return (
<>
      <Navbar />
      <Routes>
        <Route path='/home' element={<HomePage></HomePage>} />
        <Route path='/vehicle' element={<VehiclePage></VehiclePage>} />
        <Route path='/service' element={<ServicePage></ServicePage>} />
        <Route path='/gallery' element={<GalleryPage></GalleryPage>} />
        <Route path='/contact' element={<ContactPage></ContactPage>} />
        <Route path='/login' element={<LoginPage></LoginPage>} />
        <Route path='/signuppage' element={<SignUpPage></SignUpPage>} />
      </Routes>
</>
  );
}

export default App;