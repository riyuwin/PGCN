import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../../css/SignUpForm.css';  
import * as port from "../ports/DatabaseRouting"

function SignupForm() {
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [extName, setExtName] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const [membership, setMembership] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    /* const [image, setImage] = useState(null);  // Image file state
    const [imagePreview, setImagePreview] = useState('../');  // Image preview state */

    const navigate = useNavigate();
 

    const handleBack = () => {
        setStep(prevStep => prevStep - 1);
    };

    
    const handleSignup = async (e) => {
        e.preventDefault();
    
        // Get current date in yyyy-mm-dd format
        const currentDate = new Date().toISOString().split('T')[0];
    
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        console.log(
            "Fname:", firstName, "\n",
            "Mname:", middleName, "\n",
            "Lname:", lastName, "\n", 
            "ExtName:", extName, "\n", 
            "Gender:", gender, "\n",
            "Bdate:", birthday, "\n",
            "Pnum:", phoneNumber, "\n",
            "Address:", address, "\n",
            "Membership:", membership, "\n",
            "Email:", email, "\n",
            "Password:", password, "\n",
            "Current Date:", currentDate  // log current date
        );
    
        try {
            const response = await fetch(port.PortSignup, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    middleName,
                    lastName,
                    extName,
                    gender,
                    birthday,
                    phoneNumber,
                    address,
                    membership,
                    email,
                    password,
                    currentDate   
                })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || "Signup failed.");
            }
    
            console.log("Signup successful!", data);
            setSuccess("Signup successful!");
 
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            console.error("Error:", err.message);
            setError(err.message);
        }
    };      

    return (
        <>
            <div className="signup_page d-flex justify-content-center align-items-center vh-150">
                <div className="signup_wrapper_container"  >
 
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
                        
                        <div className="login-form-wrapper-column col-md-8 text-center">  

                            <div className="login_form_container">

                                <h2 className="title_text">SIGN UP</h2>
                                {error && <p className="error">{error}</p>}
                                {/* {success && <p className="success">{success}</p>} */}
                            </div>

                            <div>
                                {/* Basic Information Form */}
                                {step === 1 && (
                                    <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="form">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="fName" className="label"><b>Step 1: Basic Information</b></label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* First Name, Middle Name, Last Name */}
                                            <div className="col-md-4">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="fName" className="label">First Name</label>
                                                        <input
                                                            type="text"
                                                            id="fName"
                                                            className="input"
                                                            placeholder="First Name"
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="middleName" className="label">Middle Name</label>
                                                        <input
                                                            type="text"
                                                            id="middleName"
                                                            className="input"
                                                            placeholder="Middle Name"
                                                            value={middleName}
                                                            onChange={(e) => setMiddleName(e.target.value)} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="lastName" className="label">Last Name</label>
                                                        <input
                                                            type="text"
                                                            id="lastName"
                                                            className="input"
                                                            placeholder="Last Name"
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            
                                            <div className="col-md-4">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="extName" className="label">Ext Name</label>
                                                        <input
                                                            type="text"
                                                            id="extName"
                                                            className="input"
                                                            placeholder="Ext"
                                                            value={extName}
                                                            onChange={(e) => setExtName(e.target.value)} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Gender */}
                                            <div className="col-md-4">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="gender" className="label">Gender</label>
                                                        <select
                                                            id="gender"
                                                            className="input"
                                                            value={gender}
                                                            onChange={(e) => setGender(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Select Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>    
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Birthday */}
                                            <div className="col-md-4">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="birthday" className="label">Birthdate</label>
                                                        <input
                                                            type="date"
                                                            id="birthday"
                                                            className="input"
                                                            value={birthday}
                                                            onChange={(e) => setBirthday(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="phoneNumber" className="label">Phone Number</label>
                                                        <input
                                                            type="tel"
                                                            id="phoneNumber"
                                                            className="input"
                                                            placeholder="Phone Number"
                                                            value={phoneNumber}
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Address */}
                                            <div className="col-md-8">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="address" className="label">Address</label>
                                                        <input
                                                            type="tel"
                                                            id="address"
                                                            className="input"
                                                            placeholder="Address"
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            required
                                                        />
                                                        {/* <textarea
                                                            id="address"
                                                            className="input"
                                                            placeholder="Enter your address"
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            required
                                                        /> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <button type="submit" className="button">Next</button>
                                    </form>
                                )}

                                {/* Membership Information Form */}
                                {step === 2 && (
                                    <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="form">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="membership" className="label"><b>Step 2. Membership Information</b></label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Membership */}
                                            <div className="col-md-12">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="membership" className="label">Membership Type</label>
                                                        <select
                                                            id="membership"
                                                            className="input"
                                                            value={membership}
                                                            onChange={(e) => setMembership(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Select Membership Type</option>
                                                            <option value="Admin">Admin</option>
                                                            <option value="Employee">Employee</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="button-group">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="p-3">
                                                        <div className="input-group">
                                                            <button type="button" onClick={handleBack} className="button" style={{ width: '100%' }}>Back</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="p-3">
                                                        <div className="input-group">
                                                            <button type="submit" className="button" style={{ width: '100%' }}>Next</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {/* Account Information Form */}
                                {step === 3 && (
                                    <form onSubmit={handleSignup} className="form">
                                        {error && <p className="error">{error}</p>}
                                        {success && <p className="success">{success}</p>}

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="fName" className="label"><b>Step 3. Account Information</b></label>
                                                    </div>
                                                </div>
                                            </div>  

                                            <div className="col-md-12">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="email" className="label">Email</label>
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
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="password" className="label">Password</label>
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
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="p-3">
                                                    <div className="input-group">
                                                        <label htmlFor="confirm_password" className="label">Confirm Password</label>
                                                        <input
                                                            type="password"
                                                            id="confirm_password"
                                                            className="input"
                                                            placeholder="Confirm your password"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">

                                                <div className="col-md-12">
                                                    <div className="p-3">
                                                        <div className="input-group">
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="col-md-6">
                                                    <div className="p-3">
                                                        <div className="input-group">
                                                            <button type="button" onClick={handleBack} className="button" style={{ width: '100%' }}>Back</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="p-3">
                                                        <div className="input-group">
                                                            <button type="submit" className="button" style={{ width: '100%' }}>Sign up</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* <button type="submit" className="button">Sign up</button> */}
                                    </form>
                                )}
                                 

                                <p className="footer">
                                    Already have an account? <a href="/" className="link">Login</a>
                                </p>

                            </div>
    
                        </div>
    


                    </div>

                </div>
            </div>
        </>
    );
}

export default SignupForm;
