import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '/src/assets/images/WrapForge logo.png';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [mismatchError, setMismatchError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === 'password') {
      setPasswordError(value.length < 6 ? 'Password must be at least 6 characters' : '');
    }

    if (id === 'confirmPassword' || (id === 'password' && formData.confirmPassword)) {
      const mismatch =
        id === 'confirmPassword'
          ? value !== formData.password
          : formData.confirmPassword !== value;
      setMismatchError(mismatch ? 'Passwords do not match' : '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
      if (res.status === 201 || res.status === 200) {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Signup error:', err.response?.data);
      alert(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3fb] px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <img src={logo} alt="WrapForge Logo" className="mx-auto w-20" />
          <h2 className="mt-3 text-2xl font-bold text-[#2f1c13]">Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium text-block-700">User Name</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-block-700">Email address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium text-block-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={handleChange}
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

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1 font-medium text-block-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-blue-500"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {mismatchError && <p className="text-sm text-red-600 mt-1">{mismatchError}</p>}
          </div>

          {/* Terms */}
          <div className="flex items-center mb-6">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-yellow-500" required />
              <span>I agree to the</span>
              <span className="text-blue-600 hover:underline font-medium">Terms & Conditions</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || passwordError || mismatchError}
            className="w-full bg-yellow-500 hover:bg-orange-500 text-black font-semibold py-2 rounded-md transition duration-300"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          {/* Login Link */}
          <p className="text-center mt-5 text-sm text-block-700 font-medium">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 font-semibold hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;