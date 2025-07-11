import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import logo from '/src/assets/images/WrapForge logo.png';
import SignupPage from '../auth/Signup page.jsx';

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showSignupPage, setShowSignupPage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);

      if (res.status === 200) {
        alert('Login Successful!');
        console.log('Login Successful:', res.data);

        // ✅ Store token with consistent key used in other pages
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        const role = res.data.user?.role;
        if (role === 'admin') navigate('/admin');
        else if (role === 'partner') navigate('/partnerdashboard');
        else if (role === 'user') { navigate('/');
          if (onClose) onClose();
        } else {
          alert('Invalid role');
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      alert(msg);
      if (msg.toLowerCase().includes('password')) setPasswordError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-10 py-10 text-gray-800 mt-20">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="WrapForge Logo" className="w-20 h-20" />
          <h2 className="text-xl font-bold text-[#2f1c13] mt-2">Login Page</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-blue-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {passwordError && <p className="text-sm text-red-600 mt-1">{passwordError}</p>}
          </div>

          {/* Remember Me & Forgot */}
          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-yellow-500" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-gray-700 hover:underline">Forgot Password?</a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-orange-500 text-black font-bold py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup */}
        <p className="mt-6 text-center text-sm">
          Don't have an account?{' '}
          <button
            onClick={() => setShowSignupPage(true)}
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>

      {/* Signup Modal */}
      {showSignupPage && (
        <div
          className="fixed inset-0 z-50 bg-opacity-30 backdrop-blur-sm bg-black/01 flex items-center justify-center p-4"
          onClick={() => setShowSignupPage(false)}
        >
          <div
            className="bg-white h-[80vh] rounded-xl max-w-xl w-full relative shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSignupPage(false)}
              className="absolute top-3 right-3 text-gray-50 hover:text-red-500"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <div className="p-6 h-full">
              <SignupPage isOpen={showSignupPage} onClose={() => setShowSignupPage(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
