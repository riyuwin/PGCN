
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchLocalUserDetails from "./scripts/FetchLocalUser";

function BurialAssistanceModalContent({
    clientFirstName, clientMiddleName, clientLastName, clientExtName,
    clientProvince, clientMunicipality, clientBarangay, clientPurok,
    clientRelationship, clientContactNumber, clientGender, clientAge, clientAmount,
    clientDateDeath, clientCauseDeath, clientTypeAssistance, clientStatusRemarks,
    clientApplication, clientInterviewer, burialAssistanceStatus, checkedItems,
    remarks
}) {

    const [formPage, setFormPage] = useState("Basic Information");

    const handleFormPageUpdate = (formPageNumber) => {
        setFormPage(formPageNumber);
    }

    return (
        <>
            <div className="generateContainer">
                <br />
                <h5>Select Section: </h5>
                <br />
                <div className="row">
                    <div className="col-6">
                        <button
                            type="button"
                            className={`btn w-100 ${formPage === "Basic Information" ? "btn-secondary" : "btn-success"}`}
                            onClick={() => handleFormPageUpdate("Basic Information")}
                        >
                            <i class="bi bi-person-vcard"></i> Basic Information
                        </button>
                    </div>

                    <div className="col-6">
                        <button
                            type="button"
                            className={`btn w-100 ${formPage === "Checklist" ? "btn-secondary" : "btn-success"}`}
                            onClick={() => handleFormPageUpdate("Checklist")}
                        >
                            <i class="bi bi-card-checklist"></i> Burial Requirements
                        </button>
                    </div>


                </div>
            </div>

            <div className="generateContainer">

                <br />

                {formPage == "Basic Information" &&
                    <>

                        <h3>Client Information</h3><br />
                        <div className="row">
                            <div className="col-3">
                                <label htmlFor="firstName" className="form-label">First Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={clientFirstName}
                                    placeholder="First Name"
                                    disabled={true}
                                />
                            </div>

                            <div className="col-3">
                                <label htmlFor="middleName" className="form-label">Middle Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="middleName"
                                    placeholder="Middle Name"
                                    value={clientMiddleName}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-3">
                                <label htmlFor="lastName" className="form-label">Last Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Last Name"
                                    value={clientLastName}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-3">
                                <label htmlFor="extName" className="form-label">Ext Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="extName"
                                    value={clientExtName}
                                    placeholder="Ext Name"
                                    disabled={true}
                                />
                            </div>

                            <div className="col-3">
                                <br />
                                <label className="form-label">Province:</label>
                                <select
                                    className="form-control"
                                    value={clientProvince}
                                    disabled={true}
                                >
                                    <option value="Camarines Norte">Camarines Norte</option>
                                </select>
                            </div>

                            <div className="col-3">
                                <br />
                                <label className="form-label">Municipality:</label>
                                <select
                                    className="form-control"
                                    value={clientMunicipality}
                                    disabled={true}
                                >
                                    <option value="">Select Municipality</option>
                                </select>
                            </div>

                            <div className="col-3">
                                <br />
                                <label className="form-label">Barangay:</label>
                                <select
                                    className="form-control"
                                    value={clientBarangay}
                                    disabled={true}
                                >
                                    <option value="">Select Barangay</option>


                                </select>
                            </div>

                            <div className="col-3">
                                <br />
                                <label className="form-label">Purok:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={clientPurok}
                                    disabled={true}
                                />
                            </div>


                            <div className="col-3">
                                <br />
                                <label htmlFor="relationship" className="form-label">Relationship:</label>
                                <select
                                    className="form-control"
                                    id="relationship"
                                    value={clientRelationship}
                                    disabled={true}
                                >
                                    <option value="">Select Relationship</option>
                                    <option value="Parent">Parent</option>
                                    <option value="Sibling">Sibling</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Child">Child</option>
                                    <option value="Grandparent">Grandparent</option>
                                    <option value="Relative">Relative</option>
                                    <option value="Friend">Friend</option>
                                    <option value="Guardian">Guardian</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="col-3">
                                <br />
                                <label className="form-label">Contact Number:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={clientContactNumber}
                                    disabled={true}
                                />
                            </div>


                            <div className="col-3">
                                <br />
                                <label htmlFor="extName" className="form-label">Gender:</label>

                                <select
                                    className="form-control"
                                    id="hospital"
                                    value={clientGender}
                                    disabled={true}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="col-3">
                                <br />
                                <label htmlFor="extName" className="form-label">Age:</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={clientAge}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-12">
                                <br />
                                <hr />
                                <br />
                                <h3>Burial Information</h3>
                            </div>

                            <div className="col-3">
                                <br />
                                <label htmlFor="extName" className="form-label">Deceased Date of Death:</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={clientDateDeath}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-3">
                                <br />
                                <label htmlFor="extName" className="form-label">Deceased Cause of Death:</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={clientCauseDeath}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-3">
                                <br />
                                <label htmlFor="extName" className="form-label">Petty Amount:</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={clientAmount}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-3">
                                <br />
                                <label htmlFor="relationship" className="form-label">Type of Assistance:</label>
                                <select
                                    className="form-control"
                                    id="relationship"
                                    value={clientTypeAssistance}
                                    disabled={true}
                                >
                                    <option value="">Select Type of Assistance</option>
                                    <option value="Medical Assistance / Hospital Bill">Medical Assistance / Hospital Bill</option>
                                    <option value="Medical Assistance / Request for Laboratory Test">Medical Assistance / Request for Laboratory Test</option>
                                    <option value="Medical Assistance / Maintenance of Medicine">Medical Assistance / Maintenance of Medicine</option>
                                    <option value="Medical Assistance / Request for Laboratory Test">Medical Assistance / Request for Operation</option>
                                    <option value="Burial Assistance">Burial Assistance</option>
                                    <option value="Food Assistance">Food Assistance</option>
                                    <option value="Transportation Assistance">Transportation Assistance</option>
                                    <option value="Educational Assistance">Educational Assistance</option>
                                    <option value="Livelihood Assistance">Livelihood Assistance</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div className="col-3">
                                <br />
                                <label htmlFor="relationship" className="form-label">Status / Remarks:</label>
                                <select
                                    className="form-control"
                                    id="relationship"
                                    value={clientStatusRemarks}
                                    disabled={true}
                                >
                                    <option value="">Select Status / Remarks</option>
                                    <option value="Refer to PSWDO">Refer to PSWDO</option>
                                    <option value="Refer to Malasakit Center / MAIP">Refer to Malasakit Center / MAIP</option>
                                    <option value="Refer to CNPH">Refer to CNPH</option>
                                    <option value="Refer to OPAG">Refer to OPAG</option>
                                    <option value="Refer to Dong Tulong CNPH">Refer to Dong Tulong CNPH</option>
                                    <option value="Refer to Ako Bicol">Refer to Ako Bicol</option>
                                    <option value="Refer to Leon Hernandez MAIP from Senator Dela Rosa">Refer to Leon Hernandez MAIP from Senator Dela Rosa</option>
                                    <option value="Refer to Ako Bicol">Refer to PCSO</option>
                                    <option value="Refer to DSWD">Refer to Ako DSWD</option>
                                </select>
                            </div>

                            <div className="col-3">
                                <br />
                                <label htmlFor="relationship" className="form-label">Status of Application:</label>
                                <select
                                    className="form-control"
                                    id="relationship"
                                    value={clientApplication}
                                    disabled={true}
                                >
                                    <option value="">Select Status of Application</option>
                                    <option value="Claimed / Released / Payout Governors Office">Claimed / Released / Payout Governors Office</option>
                                    <option value="Claimed / Released / Payout PSWDO">Claimed / Released / Payout PSWDO</option>
                                    <option value="Pending / Waiting">Pending / Waiting</option>
                                    <option value="MAIP / Guarantee Letter">MAIP / Guarantee Letter</option>
                                </select>
                            </div>


                            <div className="col-3">
                                <br />
                                <label htmlFor="relationship" className="form-label">Interviewer:</label>
                                <select
                                    className="form-control"
                                    id="relationship"
                                    value={clientInterviewer}
                                    disabled={true}
                                >
                                    <option value="">Select Interviewer</option>
                                    <option value="Dennis S. Ballosa">Dennis S. Ballosa</option>
                                    <option value="Marimar P. Llego">Marimar P. Llego</option>
                                    <option value="John Dave R. Buitre">John Dave R. Buitre</option>
                                    <option value="Charlene C. Mabeza">Charlene C. Mabeza</option>
                                    <option value="Madilyn M. Fresco">Madilyn M. Fresco</option>
                                    <option value="Wilma P. Soriano">Wilma P. Soriano</option>
                                    <option value="Mark Aedrian A. Baigan">Mark Aedrian A. Baigan</option>
                                    <option value="Nellie G. Araneta">Nellie G. Araneta</option>
                                    <option value="Dayang Euvee E. Talavera">Dayang Euvee E. Talavera</option>
                                    <option value="Mary Grace Magana">Mary Grace Magana</option>
                                    <option value="Marissa Buena">Marissa Buena</option>
                                    <option value="John Paul Aguirre">John Paul Aguirre</option>
                                    <option value="Aurea Pamela Tacalan (Panganiban)">Aurea Pamela Tacalan (Panganiban)</option>
                                    <option value="Ian Enero (Capalonga)">Ian Enero (Capalonga)</option>
                                    <option value="Realyn O. Luchavez (Capalonga)">Realyn O. Luchavez (Capalonga)</option>
                                    <option value="Venus Espina (Labo)">Venus Espina (Labo)</option>
                                    <option value="Dhanica Jean Delos Santos (Labo)">Dhanica Jean Delos Santos (Labo)</option>
                                    <option value="Carl James Gianan (Sta. Elena)">Carl James Gianan (Sta. Elena)</option>
                                    <option value="Sherwin Zafe (Sta. Elena)">Sherwin Zafe (Sta. Elena)</option>
                                    <option value="Keith Jasper Barnedo">Keith Jasper Barnedo</option>
                                    <option value="Loue Tolin">Loue Tolin</option>
                                </select>
                            </div>


                        </div>
                        <br />

                    </>
                }

                {formPage === "Checklist" && (
                    <>
                        <div className="row">
                            <div className="col-12">
                                <div className="formContainer">
                                    <h3>Burial Assistance Status: </h3><br />
                                    <p>Current Status: <b>{burialAssistanceStatus}</b></p><br />

                                    <select
                                        className="form-control"
                                        id="relationship"
                                        value={burialAssistanceStatus}
                                        disabled={true}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>

                                </div>
                                <br />
                            </div>


                            <div className="col-12">
                                <div className="formContainer">
                                    <h3>Requirements Checklist:</h3>
                                    <br />
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <input className="form-check-input me-1" type="checkbox" id="checkBarangayIndigency"
                                                checked={checkedItems.checkBarangayIndigency} />
                                            <label className="form-check-label" htmlFor="checkBarangayIndigency">&nbsp; Barangay Indigency (2 Original)</label>
                                        </li>
                                        <li className="list-group-item">
                                            <input className="form-check-input me-1" type="checkbox" id="checkDeathCertificate"
                                                checked={checkedItems.checkDeathCertificate} />
                                            <label className="form-check-label" htmlFor="checkDeathCertificate">&nbsp; Death Certificate (2 Copies)</label>
                                        </li>
                                        <li className="list-group-item">
                                            <input className="form-check-input me-1" type="checkbox" id="checkFuneralContract"
                                                checked={checkedItems.checkFuneralContract} />
                                            <label className="form-check-label" htmlFor="checkFuneralContract">&nbsp; Funeral Contract (2 Copies)</label>
                                        </li>
                                        <li className="list-group-item">
                                            <input className="form-check-input me-1" type="checkbox" id="checkValidId"
                                                checked={checkedItems.checkValidId} />
                                            <label className="form-check-label" htmlFor="checkValidId">&nbsp; Valid Identification (2 Copies)</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-12">
                                <br />
                                <div className="formContainer">
                                    <h3>Remarks:</h3>
                                    <br />

                                    <textarea className="form-control" id="remarks" placeholder="Enter your remarks here" rows={5}
                                        value={remarks}
                                        disabled={true}>
                                    </textarea>

                                </div>
                            </div>
                        </div>
                    </>
                )}


            </div>

        </>
    )
}

export default BurialAssistanceModalContent;
