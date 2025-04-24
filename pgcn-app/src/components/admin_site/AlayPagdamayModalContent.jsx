
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchLocalUserDetails from "./scripts/FetchLocalUser";

function AlayPagdamayModalContent({ 
        deceasedFirstName, deceasedMiddleName, deceasedLastName, deceasedExtName,
        deceasedProvince, deceasedMunicipality, deceasedBarangay, deceasedPurok,
        deceasedGender, deceasedDeathDate, deathCertificatePreview, 
        contactPersonFirstname, contactPersonMiddlename, contactPersonLastname, contactPersonExtName,
        contactNumber, contactRelationship, contactPersonServiceCovered, contactPersonFuneralService,
        contactPersonEncoded, pettyCashAmount, deceasedCauseDeath, 
        clientTypeAssistance, clientStatusRemarks, clientApplication, clientInterviewer,
        burialStatus, checkedItems, remarks
    }) {

 
    const [modalName, setModalName] = useState(); 

    const [formPage, setFormPage] = useState("Basic Information");
    
    const handleFormPageUpdate = (formPageNumber) => {
        setFormPage(formPageNumber);
    }

    
 
    return (
        <>  
            <div className="generateContainer">
                                    
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
                    
                { formPage == "Basic Information" && 
                    <>

                        <h3>Deceased Information</h3><br />
                        <div className="row"> 
                            <div className="col-3">               
                                <label htmlFor="firstName" className="form-label">First Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={deceasedFirstName} 
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
                                    value={deceasedMiddleName}  
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
                                    value={deceasedLastName}  
                                    disabled={true}
                                />
                            </div>
                            
                            <div className="col-3"> 
                                <label htmlFor="extName" className="form-label">Ext Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="extName"
                                    value={deceasedExtName}
                                    placeholder="Ext Name"  
                                    disabled={true}
                                />
                            </div>    

                            <div className="col-3">
                                <br />
                                <label className="form-label">Province:</label>
                                <select
                                    className="form-control"
                                    value={deceasedProvince} 
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
                                    value={deceasedMunicipality}   
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
                                    value={deceasedBarangay}   
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
                                    value={deceasedPurok}  
                                    disabled={true}
                                />
                            </div>   

                            
                            <div className="col-3">
                                <br /> 
                                <label htmlFor="extName" className="form-label">Gender:</label>
                                
                                <select
                                    className="form-control"
                                    id="hospital"   
                                    value={deceasedGender}  
                                    disabled={true} >
                                        <option value="">Select Gender</option> 
                                        <option value="Male">Male</option> 
                                        <option value="Female">Female</option> 
                                </select>
                            </div>

                            <div className="col-3">
                                <br /> 
                                <label htmlFor="extName" className="form-label">Death of Death:</label>
                                
                                <input
                                    type="date"
                                    className="form-control"
                                    value={deceasedDeathDate}  
                                    disabled={true}
                                />
                            </div> 
                            
                            {/* <div className="col-6">
                                <br /> 
                                <label htmlFor="extName" className="form-label">Death Certificate:</label>
                                
                                <input
                                    type="file"
                                    className="form-control"  
                                    accept="image/*"  
                                    disabled={true}
                                />
                            </div> */}
 
                            {/* Display the preview dynamically */}
                            {deathCertificatePreview && (
                                <div className="col-12">
                                    <br />
                                    <img 
                                        src={deathCertificatePreview} 
                                        alt="Death Certificate Preview" 
                                        style={{ width: "300px", height: "auto", border: "1px solid #ccc" }} 
                                    />
                                </div>
                            )}


                            <div className="col-12">
                                <br /> 
                                <label htmlFor="extName" className="form-label">Cause of Death:</label>
                                
                                <input
                                    type="text"
                                    className="form-control"
                                    value={deceasedCauseDeath}  
                                    disabled={true}
                                />
                            </div>

                        </div> 
                        <br />  
                        <h3>Contact Person</h3><br />
                        <div className="row">
                            <div className="col-3"> 
                                <label htmlFor="firstName" className="form-label">First Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={contactPersonFirstname}  
                                    disabled={true}
                                />
                            </div>

                            <div className="col-3"> 
                                <label htmlFor="middleName" className="form-label">Middle Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="middleName"
                                    value={contactPersonMiddlename}  
                                    disabled={true}
                                />
                            </div>
                            
                            <div className="col-3"> 
                                <label htmlFor="lastName" className="form-label">Last Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={contactPersonLastname} 
                                    disabled={true}
                                />
                            </div>
                            
                            <div className="col-3">              
                                <label htmlFor="extName" className="form-label">Ext Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="extName"
                                    value={contactPersonExtName}  
                                    disabled={true}
                                />
                            </div>
                            
                            <div className="col-3">          
                                <br />    
                                <label htmlFor="extName" className="form-label">Contact Number:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contactNumber"
                                    value={contactNumber}  
                                    disabled={true}
                                />
                            </div>
                            
                            <div className="col-3">          
                                <br />    
                                <label htmlFor="extName" className="form-label">Relationship:</label>
                                
                                <select
                                    className="form-control"
                                    id="relationship"
                                    value={contactRelationship}  
                                    disabled={true}
                                >
                                    <option value="">Select Relationship</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Father">Father</option>
                                    <option value="Child">Child</option>
                                    <option value="Father">Self</option>
                                    <option value="Parent">Parent</option>
                                    <option value="Sibling">Sibling</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Grandparent">Grandparent</option>
                                    <option value="Relative">Relative</option>
                                    <option value="Friend">Friend</option>
                                    <option value="Guardian">Guardian</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            
                            <div className="col-3">
                                <br />
                                <label htmlFor="relationship" className="form-label">Service Covered:</label>
                                <select
                                    className="form-control"
                                    id="relationship"
                                    value={contactPersonServiceCovered}  
                                    disabled={true}
                                >
                                    <option value="">Select Service Covered</option>
                                    <option value="Full Service">Full Service</option>
                                    <option value="Viewing">Viewing</option> 
                                </select>
                            </div>
                            
                            <div className="col-3">
                                <br />
                                <label htmlFor="relationship" className="form-label">Funeral Service:</label>
                                <select
                                    className="form-control"
                                    id="relationship"
                                    value={contactPersonFuneralService}  
                                    disabled={true}
                                >
                                    <option value="">Select Funeral Service</option>
                                    <option value="SAAVEDRA FUNERAL">SAAVEDRA FUNERAL</option>
                                    <option value="ARANA FUNERAL">ARANA FUNERAL</option>
                                    <option value="BELMONTE DAET">BELMONTE DAET</option>
                                    <option value="ADEA OF JOSE PANGANIBAN">ADEA OF JOSE PANGANIBAN</option>
                                    <option value="ST RAPHAEL FUNERARIA">ST RAPHAEL FUNERARIA</option>  
                                </select>
                            </div>
                            
                            <div className="col-3">
                                <br />
                                <label htmlFor="relationship" className="form-label">ENCODED/REVIEWED BY:</label>
                                <select
                                    className="form-control"
                                    id="relationship"
                                    value={contactPersonEncoded}  
                                    disabled={true}
                                >
                                    <option value="">Select Encoded/Reviewed By:</option>
                                    <option value="DENNIS">DENNIS</option>
                                    <option value="JAYSON OF GSO SE">JAYSON OF GSO SE</option>
                                    <option value="LARRY CASTRO">LARRY CASTRO</option>
                                    <option value="ROBERT PARIS">ROBERT PARIS</option>
                                    <option value="REYNNIER VINLUAN">REYNNIER VINLUAN</option>
                                    <option value="OWEN ABANTO">OWEN ABANTO</option>
                                    <option value="CHRIS CAMA">CHRIS CAMA</option>
                                    <option value="MARI MAR">MARI MAR</option>
                                    <option value="DAVE BUITRE">DAVE BUITRE</option>
                                    <option value="MARY GRACE MAGANA">MARY GRACE MAGANA</option>
                                    <option value="DAYANG TALAVERA">DAYANG TALAVERA</option>  
                                </select>
                            </div>

                                                                            
                            <div className="col-3">
                                <br />
                                <label htmlFor="relationship" className="form-label">Petty Cash Amount:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="contactNumber"
                                    value={pettyCashAmount}  
                                    disabled={true}
                                />
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
                                    <h3>Burial Status: </h3><br/>
                                    <p>Current Status: <b>{burialStatus}</b></p><br/>  

                                    <select
                                        className="form-control"
                                        id="relationship"
                                        value={burialStatus}  
                                        disabled={true}
                                    > 
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option> 
                                        <option value="Cancelled">Cancelled</option> 
                                    </select>

                                </div>
                                <br/>
                            </div>

                            
                            <div className="col-12">  
                                <div className="formContainer">
                                    <h3>Requirements Checklist:</h3>             
                                    <br/>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <input className="form-check-input me-1" type="checkbox" id="checkBarangayIndigency" 
                                                checked={checkedItems.checkBarangayIndigency}  />
                                            <label className="form-check-label" htmlFor="checkBarangayIndigency">&nbsp; Barangay Indigency (2 Original)</label>
                                        </li>
                                        <li className="list-group-item">
                                            <input className="form-check-input me-1" type="checkbox" id="checkDeathCertificate" 
                                                checked={checkedItems.checkDeathCertificate}  />
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
                                <br/>
                                <div className="formContainer">
                                    <h3>Remarks:</h3>             
                                    <br/>

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

export default AlayPagdamayModalContent;
