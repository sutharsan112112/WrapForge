import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import LoginPage from '../auth/Login page.jsx'; // LoginPage import செய்யவும்

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Login Modal state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, [location]);

  const email = user?.email || '';
  const firstLetter = email ? email.charAt(0).toUpperCase() : '';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="shadow-md flex items-center justify-between fixed top-0 left-0 w-full bg-white z-50 px-6">
      <div className="logo items-center flex">
        <img src="/src/assets/images/WrapForge logo.png" alt="Logo" className="h-20 w-20" />
        <h1 className="text-2xl font-bold text-gray-800 items-center">WrapForge</h1>
      </div>

      <div className="flex items-center space-x-4 relative">
        {/* Scroll Links */}
        <ScrollLink to="/" smooth={true} duration={500} className="cursor-pointer text-black-700 hover:text-orange-500 px-5 py-5 text-xl">Home</ScrollLink>
        <ScrollLink to="aboutus" smooth={true} duration={500} className="cursor-pointer text-black-700 hover:text-orange-500 px-5 py-5 text-xl">About us</ScrollLink>
        <ScrollLink to="Vehicle" smooth={true} duration={500} className="cursor-pointer text-black-700 hover:text-orange-500 px-5 py-5 text-xl">Vehicle</ScrollLink>
        <ScrollLink to="service" smooth={true} duration={500} className="cursor-pointer text-black-700 hover:text-orange-500 px-5 py-5 text-xl">Service</ScrollLink>
        <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer text-black-700 hover:text-orange-500 px-5 py-5 text-xl">Contact us</ScrollLink>

        {!user ? (
          <button
            onClick={() => setShowLoginModal(true)} // Popup open
            className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-orange-500 transition-colors"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-lg shadow-md cursor-pointer"
              title={email}
            >
              {firstLetter}
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md z-10">
                <button
                  onClick={() => navigate('/profile')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-50 bg-opacity-30 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-white h-[80vh] rounded-xl max-w-xl w-full relative shadow-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="p-6 h-full">
              <LoginPage isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;