import React from 'react';
import '../src/components/css/Signup.css'; // Assuming you have a CSS file for styling

const SignUp = () => {
    return (
        <div className="signup-container">
            <img src="path/to/logo.png" alt="WRAPFORGE Logo" className="logo" />
            <h1>Sign Up page</h1>
            <form className="signup-form">
                <div className="input-group">
                    <label htmlFor="username">User Name:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div className="input-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" required />
                </div>
                <div className="checkbox-group">
                    <input type="checkbox" id="terms" name="terms" required />
                    <label htmlFor="terms">I agree to the Terms & Conditions</label>
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default SignUp;
