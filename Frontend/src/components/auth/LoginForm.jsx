import React from 'react';
import '/src/components/css/Footer.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="logo">
                <h1>WRAPFORGE</h1>
            </div>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required />
                </div>
                <div className="options">
                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember Me</label>
                    </div>
                    <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                </div>
                <button type="submit" className="login-button">LOGIN</button>
            </form>
            <div className="sign-up">
                <p>Don't have an account? <a href="/sign-up">Sign Up</a></p>
            </div>
        </div>
    );
};

export default Login;