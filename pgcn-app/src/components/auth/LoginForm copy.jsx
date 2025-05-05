import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; 

import '../../css/LoginForm.css'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    /* useEffect(() => {
        const body = document.body;
        if (location.pathname === "/login") {
            body.style.backgroundColor = "#f0f0f0";
        } else {
            body.style.backgroundColor = "#ffffff";
        }
        return () => {
            body.style.backgroundColor = "";
        };
    }, [location]); */


    const handleLogin = async (e) => {
        e.preventDefault();

        // Check if email and password are provided
        if (!email || !password) {
            setError("Please provide both email and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed.");
            }

            console.log("Login successful!", data);
            setSuccess("Login successful!");

            // Show success message with SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Welcome back!',
            });

            // Optionally, store user data (e.g., token) in localStorage or context
            localStorage.setItem("user", JSON.stringify(data));

            // Redirect user after successful login (adjust according to your app structure)
            setTimeout(() => navigate('/admin/dashboard'), 2000); // Navigate to a protected route like '/dashboard'

        } catch (err) {
            console.error("Error:", err.message);
            setError(err.message);

            // Show error message with SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: err.message,
            });
        }
    };


    useEffect(() => {
        // Get user from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            console.log("Stored User:", JSON.parse(storedUser));

            navigate("/admin/dashboard");
        } else {    
            navigate("/");
        }

        // Fetch user session from backend
        fetch("http://localhost:5000/session", { credentials: "include" }) // Ensure cookies are sent
            .then((res) => res.json())
            .then((data) => {
                console.log("Session Data:", data);
            })
            .catch((err) => console.error("Error fetching session:", err));
    }, []);




    return (
        <div className="login-container">
            <div className="login-card">
                <img src="/assets/img/dong_tulong_logo.jpg" alt="Dong Tulong Logo" className="logo" />
                <hr/>
                <h1 className="main-title">DONG TULONG</h1>
                <p className="sub-title">Provincial Government of Camarines Norte – Governor’s Office</p>

                <h2 className="login-title">Login</h2>
                <p className="login-subtext">Login to continue</p>

                <form onSubmit={handleLogin} className="login-form">
                    <label className='email' htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className='password' htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="forgot">Forgot Password?</div>

                    <button type="submit">LOGIN</button>
                </form>

                <p className="signup-text">
                    Don’t have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;