import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as port from "../ports/DatabaseRouting" 
import { RetrievePortAccountSession } from '../ports/DatabaseRouting';

function Sidebar({ isVisible }) {
    
    const [sideBarNameText, setSideBarNameText] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
 
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [extName, setExtName] = useState('');
    const [gender, setGender] = useState('');
    const [bdate, setBdate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    // Load dropdown state from localStorage
    const [isOpen, setIsOpen] = useState(
        JSON.parse(localStorage.getItem("burialDropdownState")) || false
    );

    // Toggle dropdown and store state in localStorage
    const toggleDropdown = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        localStorage.setItem("burialDropdownState", JSON.stringify(newState));
    };

    const isActive = (path) => location.pathname === path;

    /* const handleLogout = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.email) {
            console.log("Logging out user:", user.email);
        } else {
            console.log("No user found in localStorage");
        }

        try {
            await axios.post("http://192.168.1.248:5000/logout");
            localStorage.removeItem("user");
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }; */

    const handleLogout = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.email) {
            console.log("Logging out user:", user.email);
        } else {
            console.log("No user found in localStorage");
        }

        try {
            await axios.post(port.PortLogout);
            // Clear all items in localStorage
            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
 

    useEffect(() => {
        const storedDropdownState = JSON.parse(localStorage.getItem("burialDropdownState"));
        if (storedDropdownState !== null) {
            setIsOpen(storedDropdownState);
        }
    }, []);
 
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
    
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("Stored User123:", parsedUser);

            setEmail(parsedUser.email)
    
            const fetchAccountDetails = async () => {
                console.log("Account Id: ", parsedUser.account_id);
                const accountDetails = await RetrievePortAccountSession(parsedUser.account_id); 
                PopulateForms(accountDetails)
            };
    
            fetchAccountDetails();
        } else {
            console.log("No user found");
        }
    }, []);

    const PopulateForms = (data) => {
        setFirstName(data[0].fname); 
        setMiddleName(data[0].mname); 
        setLastName(data[0].lname); 
        setExtName(data[0].ext); 
        setGender(data[0].gender); 
        setBdate(data[0].bdate); 
        setPhoneNumber(data[0].phoneNumber);
        setAddress(data[0].address); 
    }  

    return (
        <>
            {isVisible && (
                <aside id="sidebar" className="sidebar">
                    <ul className="sidebar-nav" id="sidebar-nav">
                        <li className="nav-heading">MENU</li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/dashboard') ? 'active-nav' : 'collapsed'}`} to="/admin/dashboard">
                                <i className="bx bxs-dashboard"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <hr />
                        <li className="nav-heading">ASSISTANCE REGISTRY MANAGEMENT</li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/hospital_bill') ? 'active-nav' : 'collapsed'}`} to="/admin/hospital_bill">
                                <i class='bx bxs-first-aid' ></i>
                                <span>Hospital Bill</span>
                            </Link>
                        </li>

                        <li className="nav-item" >
                            <div className={`nav-link ${isOpen ? '' : 'collapsed'}`} onClick={toggleDropdown} style={{ cursor: "pointer" }}>
                                <i className="bx bxs-briefcase"></i>
                                <span>&nbsp; Burial Transactions</span>
                                <i className={`bx ${isOpen ? 'bx-chevron-up' : 'bx-chevron-down'} ms-auto`}></i>
                            </div>
                            {isOpen && (
                                <ul className="nav flex-column ps-3">
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive('/admin/alay_pagdamay') ? 'active-nav' : 'collapsed'}`} to="/admin/alay_pagdamay">
                                        <i class='bx bxs-plus-square'></i>
                                           <span> Alay Pagdamay </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive('/admin/manage_burial') ? 'active-nav' : 'collapsed'}`} to="/admin/manage_burial">
                                        <i class='bx bxs-plus-square'></i>
                                            <span>Burial Assistance</span>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <hr />
                        <li className="nav-heading">ASSISTANCE REGISTRY REPORTS</li>

                        

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/report_statistics') ? 'active-nav' : 'collapsed'}`} to="/admin/report_statistics">
                                <i className="bx bx-line-chart"></i>
                                <span>Reports and Statistics</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/manage_report') ? 'active-nav' : 'collapsed'}`} to="/admin/manage_report">
                                <i className="bx bxs-report"></i>
                                <span>Generate Reports</span>
                            </Link>
                        </li>   

                        {/* <hr />
                        <li className="nav-heading">CONFIGURATION</li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/manage_user_accounts') ? '' : 'collapsed'}`} to="/admin/dashboard">
                                <i className="bx bxs-user-account"></i>
                                <span>Manage User Accounts</span>
                            </Link>
                        </li> */}
                        
                        <hr />

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={{ cursor: "pointer" }}
                                data-bs-toggle="modal"
                                data-bs-target="#sideBarModal"
                                onClick={() => setSideBarNameText("Profile")} // wrap in arrow function
                            >
                                <i className="bx bxs-user-circle"></i>
                                <span>Profile</span>
                            </Link>
                        </li>


                        <li className="nav-item">
                            <Link className="nav-link" 
                                style={{ cursor: "pointer" }} 
                                data-bs-toggle="modal"
                                data-bs-target="#sideBarModal"
                                onClick={() => setSideBarNameText("Developers")} 
                            >
                                <i class='bx bxs-info-circle' ></i>
                                <span>Developers</span>
                            </Link>
                        </li>
                        
                        

                        <li className="nav-item">
                            <Link className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
                                <i className="bx bx-log-out"></i>
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </aside>
            )}



            <div className="modal fade" id="sideBarModal" tabIndex="-1" aria-labelledby="sideBarModal" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addHospitalBillModalLabel" style={{fontWeight: 'bold', color: '#0C623A', fontSize: '30px'}}> 
                            &nbsp;&nbsp;&nbsp;{sideBarNameText}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {sideBarNameText == "Profile" && 
                                <>
                                    <div className="py-4">
                                        <div className="card shadow-sm mt-2">
                                            <div className="card-body" style={{border: '1.5px solid #CDCDCD'}}>

                                                <div className="d-flex justify-content-center mb-3">
                                                    <i className="bx bxs-user-circle display-1 text-success"></i>
                                                </div>

                                                <p className="text-center" style={{ fontSize: '20px', fontWeight: 'bold', color: '#08533F'}}>
                                                    {firstName} {lastName}
                                                </p>

                                                <p className="text-center" style={{ fontSize: '17px', color: '#08533F' }}>
                                                    {email}
                                                </p>


                                                <hr style= {{border: '1px solid #0A3622'}}/>
                                                <h6 className="text-success fw-bold mb-3" style={{fontSize: '25px'}}>Basic Information</h6><br/>
                                                    <div className="row g-3">
                                                    <div className="col-md-4">
                                                        <label className="label-form">First Name:</label>
                                                        <input type="text" className="form-control custom-input" value={firstName} readOnly />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="label-form">Middle Name:</label>
                                                        <input type="text" className="form-control custom-input" value={middleName} readOnly />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="label-form">Last Name:</label>
                                                        <input type="text" className="form-control custom-input" value={lastName} readOnly />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="label-form">Ext. Name:</label>
                                                        <input type="text" className="form-control custom-input" value={extName} readOnly />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="label-form">Gender:</label>
                                                        <input type="text" className="form-control custom-input" value={gender} readOnly />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="label-form">Birthdate:</label>
                                                        <input type="text" className="form-control custom-input" value={bdate} readOnly />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="label-form">Phone Number:</label>
                                                        <input type="text" className="form-control custom-input" value={phoneNumber} readOnly />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="label-form">Address:</label>
                                                        <input type="text" className="form-control custom-input" value={address} readOnly />
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                </>    
                            }

                            {sideBarNameText == "Developers" && 
                                <>
                                    <div className="about">
                                        <div className="py-4">
                                        <div className="card shadow-sm mt-2">
                                            <div className="card-body" style={{border: '1.5px solid #CDCDCD'}}>
                                                <div className="my-5">
                                                    <h2 className="text-center mb-4" style={{fontWeight: 'bold', color: '#08533F'}}>Meet the Developers</h2>
                                                    <div className="row justify-content-center text-center">
                                                        
                                                        {/* Developer 1 */}
                                                        <div className="col-md-4 mb-4">
                                                        <img src="/assets/img/DELOSREYES.jpg" alt="Developer 1" className="pictureborder rounded-rectangle mb-3" width="150" height="210"  />
                                                        <h5 style={{fontWeight: 'bold', color:'#08533F'}}>Kirby Ann A. De Los Reyes</h5>
                                                        <p style={{color:'#08533F'}}>UI/UX Designer</p>
                                                        </div>

                                                        {/* Developer 2 */}
                                                        <div className="col-md-4 mb-4">
                                                        <img src="/assets/img/ALBOS.jpg" alt="Developer 2" className="pictureborder rounded-rectangle mb-3" width="150" height="210" />
                                                        <h5 style={{fontWeight: 'bold', color:'#08533F'}}>John Erwin S. Albos</h5>
                                                        <p style={{color:'#08533F'}}>Backend Developer</p>
                                                        </div>

                                                        {/* Developer 3 */}
                                                        <div className="col-md-4 mb-4">
                                                        <img src="/assets/img/POSTRE.jpg" alt="Developer 3" className="pictureborder rounded-rectangle mb-3" width="150" height="210" />
                                                        <h5 style={{fontWeight: 'bold', color:'#08533F'}}>Wendee D. Postre</h5>
                                                        <p style={{color:'#08533F'}}>Frontend Developer</p>
                                                        </div>
 

                                                        <div className="col-md-12 mb-12">
                                                            
                                                            <hr style= {{border: '1px solid #0A3622'}}>
                                                            </hr>

                                                            <br/>
                                                             
                                                        </div>
                                                        

                                                        
                                                        {/* cnsc logo */}
                                                        <div className="col-md-4 mb-4">
                                                        <img src="/assets/img/cnsc_logo.jpg" alt="cnsc logo" className="rounded-circle mb-3" width="100" height="100" />
                                                        
                                                        </div>

                                                        {/* ccms logo */}
                                                        <div className="col-md-4 mb-4">
                                                        <img src="/assets/img/ccms_logo.jpg" alt="ccms logo" className="rounded-circle mb-3" width="100" height="100" />

                                                        </div>



                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    
                                </>    
                            }


                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Sidebar;
