import React from 'react';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3fb] px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <img src='/src/assets/images/WrapForge logo.png' alt="WrapForge Logo" className="mx-auto w-20" />
          <h2 className="mt-3 text-2xl font-bold text-[#2f1c13]">Sign Up</h2>
        </div>

        {/* Form */}
        <form>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium text-block-700">
              User Name
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Email */}

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-block-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium text-block-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1 font-medium text-block-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center mb-6">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-yellow-500" />
              <span>I agree to the</span>
              <span className="text-blue-600 hover:underline font-medium">Terms & Conditions</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-orange-500 text-black font-semibold py-2 rounded-md transition duration-300"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center mt-5 text-sm text-block-700 font-medium">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 font-semibold hover:underline font-medium">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;