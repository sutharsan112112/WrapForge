import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src="/src/assets/images/WrapForge logo.png" alt="WrapForge Logo" className="w-20 h-20" />
          <h2 className="text-xl font-bold text-[#2f1c13] mt-2">Login page</h2>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@mail.com"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder=""
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Options */}
        <div className="flex items-center justify-between text-sm mb-6">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-yellow-500" />
            <span>Remember Me</span>
          </label>
          <a href="#" className="text-gray-700 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button className="w-full bg-yellow-500 hover:bg-orange-500 text-black font-bold py-2 rounded-md transition duration-300">
          Login
        </button>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm">
          Don't have an account?{' '}
          <a href="/signuppage" className="text-blue-500 font-semibold hover:underline">
            Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;