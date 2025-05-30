import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/LoginForm.css';
import * as port from "../ports/DatabaseRouting"

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const body = document.body;
        if (location.pathname === "/login") {
            body.style.backgroundColor = "#f0f0f0";
        } else {
            body.style.backgroundColor = "#ffffff";
        }
        return () => {
            body.style.backgroundColor = "";
        };
    }, [location]);


    const handleLogin = async (e) => {
        e.preventDefault();

        // Check if email and password are provided
        if (!email || !password) {
            setError("Please provide both email and password.");
            return;
        }

        try {
            const response = await fetch(port.PortLogin, {
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
        fetch(port.PortSession, { credentials: "include" }) // Ensure cookies are sent
            .then((res) => res.json())
            .then((data) => {
                console.log("Session Data:", data);
            })
            .catch((err) => console.error("Error fetching session:", err));
    }, []);




    return (
        <div className="login_page d-flex justify-content-center align-items-center vh-100">
            <div className="login-form-wrapper-header">
                <div className="row justify-content-center align-items-center ">
                    <div className="login-form-wrapper-logo col-md-1">
                        <div className="dong_tulong_logo_container">
                            <img src='assets/img/dong_tulong_logo.jpg' className='dong_tulong_logo' />
                        </div>
                    </div>

                    <div className="login-form-wrapper-column col-md-3">
                        <h2 className="title">DONG TULONG</h2>
                        <p className="subtitle">Provincial Government of Camarines Norte - Governor’s Office</p>
                    </div>
                    
                    <div className="login-form-wrapper-column col-md-10">
                        <hr/>
                    </div>
                    
                    <div className="login-form-wrapper-column col-md-5 text-center">  

                        <div className="login_form_container">

                            <h2 className="title_text">LOGIN</h2>
                            <p className="subtitle">Login to continue</p>
                            {error && <p className="error">{error}</p>}
                            {/* {success && <p className="success">{success}</p>} */}

                            <br/>

                            <form onSubmit={handleLogin} className="form">

                                <div className="input-group">
                                    <label htmlFor="email" className="label">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="input"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password" className="label">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="input"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <br/>
                                
                                <button type="submit" className="button">Log In</button>

                            </form>

                            <p className="footer">
                                Don't have an account? <a href="/signup" className="link">Sign up</a>
                            </p>

                        </div>
 
                    </div>
 


                </div>
            </div> 

        </div>
    );
}

export default LoginForm;
