import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../src/assets/images/WrapForge logo.png'

const Signup = () => {
  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="text-center mb-4">
        <img src={logo} alt="WrapForge Logo" width="120" />
        <h3 className="mt-3">Sign Up</h3>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">User Name</label>
          <input type="text" className="form-control" id="username" placeholder="Enter your username" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" />
        </div>
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="terms" />
          <label className="form-check-label" htmlFor="terms">
            I agree to the Terms & Conditions
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        <div className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;