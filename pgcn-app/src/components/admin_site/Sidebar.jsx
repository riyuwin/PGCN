import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Sidebar({ isVisible }) {
    const navigate = useNavigate();
    const location = useLocation();

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
            await axios.post("http://localhost:5000/logout");
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

    return (
        <>
            {isVisible && (
                <aside id="sidebar" className="sidebar">
                    <ul className="sidebar-nav" id="sidebar-nav">
                        <li className="nav-heading">ADMIN TOOL</li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/dashboard') ? '' : 'collapsed'}`} to="/admin/dashboard">
                                <i className="bx bxs-dashboard"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <hr />
                        <li className="nav-heading">MANAGE TRANSACTIONS</li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/hospital_bill') ? '' : 'collapsed'}`} to="/admin/hospital_bill">
                                <i className="bx bxs-briefcase"></i>
                                <span>Hospital Bill</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <div className={`nav-link ${isOpen ? '' : 'collapsed'}`} onClick={toggleDropdown} style={{ cursor: "pointer" }}>
                                <i className="bx bxs-briefcase"></i>
                                <span>Burial</span>
                                <i className={`bx ${isOpen ? 'bx-chevron-up' : 'bx-chevron-down'} ms-auto`}></i>
                            </div>
                            {isOpen && (
                                <ul className="nav flex-column ps-3">
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive('/admin/alay_pagdamay') ? '' : 'collapsed'}`} to="/admin/alay_pagdamay">
                                            <i className="bx bx-plus"></i>
                                            Alay Pagdamay
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive('/admin/manage_burial') ? '' : 'collapsed'}`} to="/admin/manage_burial">
                                            <i className="bx bx-plus"></i>
                                            Burial Assistance
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <hr />
                        <li className="nav-heading">REPORTS</li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/manage_report') ? '' : 'collapsed'}`} to="/admin/manage_report">
                                <i className="bx bxs-report"></i>
                                <span>Generate Masterlist</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/report_statistics') ? '' : 'collapsed'}`} to="/admin/report_statistics">
                                <i className="bx bx-line-chart"></i>
                                <span>Reports and Statistics</span>
                            </Link>
                        </li>

                        <hr />
                        <li className="nav-heading">CONFIGURATION</li>

                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/admin/manage_user_accounts') ? '' : 'collapsed'}`} to="/admin/dashboard">
                                <i className="bx bxs-user-account"></i>
                                <span>Manage User Accounts</span>
                            </Link>
                        </li>
                        <hr />

                        <li className="nav-item">
                            <Link className="nav-link" onClick={handleLogout} style={{ cursor: "pointer" }}>
                                <i className="bx bx-log-out"></i>
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </aside>
            )}
        </>
    );
}

export default Sidebar;
