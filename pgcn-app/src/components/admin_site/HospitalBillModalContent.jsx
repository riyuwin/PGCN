
import { useState, useEffect } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

function HospitalBillModalContent({
        patientFirstName, patientMiddleName, patientLastName, patientExtName, 
        patientProvince, patientMunicipality, patientBarangay, patientPurok, 
        patientHospital, dateConfinement, claimantFirstname, claimantMiddlename, claimantLastname, claimantExtName,
        claimantRelationship, claimantContact, claimantAmount, hospitalBillStatus, checkedItems, remarks
    }) {    
        
   // Variables for inputs ------------------------------------------------------------
 
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
 

                { formPage == "Basic Information" && 
                    <>

                        <div className="formContainer">
                            <h3>Patient Information</h3><br />
                            <div className="row"> 
                                <div className="col-3">               
                                    <label htmlFor="firstName" className="form-label">First Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        value={patientFirstName} 
                                    />
                                </div>

                                <div className="col-3"> 
                                    <label htmlFor="middleName" className="form-label">Middle Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="middleName"
                                        value={patientMiddleName}
                                    />
                                </div>
                                
                                <div className="col-3"> 
                                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        value={patientLastName}
                                    />
                                </div>
                                
                                <div className="col-3"> 
                                    <label htmlFor="extName" className="form-label">Ext Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="extName"
                                        value={patientExtName}
                                    />
                                </div>

                                <div className="col-3">
                                    <br />
                                    <label className="form-label">Province:</label>
                                    <select
                                        className="form-control"
                                        value={patientProvince}
                                        disabled
                                    >
                                        <option value="Camarines Norte">Camarines Norte</option>
                                    </select>
                                </div>

                                <div className="col-3">
                                    <br />
                                    <label className="form-label">Municipality:</label>
                                    <select
                                        className="form-control"
                                        value={patientMunicipality}
                                    >
                                        <option value="">Select Municipality</option>
                                    </select>
                                </div>

                                <div className="col-3">
                                    <br />
                                    <label className="form-label">Barangay:</label>
                                    <select
                                        className="form-control"
                                        value={patientBarangay} 
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
                                        value={patientPurok}
                                    />
                                </div>  
                                
                                <div className="col-3">
                                    <br /> 
                                    <label htmlFor="extName" className="form-label">Date of Confinement:</label>
                                    
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={dateConfinement}
                                    />
                                </div>
                                
                                <div className="col-3">
                                    <br /> 
                                    <label htmlFor="extName" className="form-label">Hospital:</label>
                                    

                                    <select
                                        className="form-control"
                                        id="hospital"   
                                        value={patientHospital} >
                                            <option value="">Select Hospital</option>
                                            <option value="LEON D. HERNANDEZ MEMORIAL HOSPITAL">LEON D. HERNANDEZ MEMORIAL HOSPITAL</option>
                                            <option value="DAET DOCTORS HOSPITAL">DAET DOCTORS HOSPITAL</option>
                                            <option value="DR. MOISES V. CACAWA HOSPITAL">DR. MOISES V. CACAWA HOSPITAL</option>
                                            <option value="OUR LADY OF LOURDES HOSPITAL">OUR LADY OF LOURDES HOSPITAL</option>
                                            <option value="SANTISSIMA TRINIDAD OF DAET">SANTISSIMA TRINIDAD OF DAET</option>
                                            <option value="RACELIS TIONGSON MEDICAL CLINIC">RACELIS TIONGSON MEDICAL CLINIC</option>
                                            <option value="LIZASO HOSPITAL">LIZASO HOSPITAL</option>
                                            <option value="DR. MIGUEL V. ALEGRE HOSPITAL">DR. MIGUEL V. ALEGRE HOSPITAL</option>
                                            <option value="BARRIOS-BUSIÑOS MEDICAL CLINIC AND HOSPITAL">BARRIOS-BUSIÑOS MEDICAL CLINIC AND HOSPITAL</option>
                                            <option value="JOSE PANGANIBAN PRIMARY HOSPITAL">JOSE PANGANIBAN PRIMARY HOSPITAL</option> 
                                    </select>
                                </div>

                            </div> 
                            <br />
                            <hr /> 
                            <br />  
                            <h3>Claimant Information</h3><br />
                            <div className="row">
                                <div className="col-3"> 
                                    <label htmlFor="firstName" className="form-label">First Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        value={claimantFirstname}
                                    />
                                </div>

                                <div className="col-3"> 
                                    <label htmlFor="middleName" className="form-label">Middle Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="middleName"
                                        value={claimantMiddlename}
                                    />
                                </div>
                                
                                <div className="col-3"> 
                                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        value={claimantLastname} 
                                    />
                                </div>
                                
                                <div className="col-3">              
                                    <label htmlFor="extName" className="form-label">Ext Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="extName"
                                        value={claimantExtName} 
                                    />
                                </div>

                                
                                <div className="col-3">
                                    <br />
                                    <label htmlFor="relationship" className="form-label">Relationship:</label>
                                    <select
                                        className="form-control"
                                        id="relationship"
                                        value={claimantRelationship} 
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
                                    <label htmlFor="extName" className="form-label">Contact:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="extName"
                                        value={claimantContact} 
                                    />
                                </div>
                                
                                <div className="col-3">
                                    <br />
                                    <label htmlFor="extName" className="form-label">Amount:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="extName"
                                        value={claimantAmount} 
                                    />
                                </div>
                                
                                
                            </div>

                            <br />

                        </div>

                    </>
                } 

                {formPage === "Checklist" && (
                    <> 
                        <div className="row"> 
                            <div className="col-12">
                                <div className="formContainer">
                                    <h3>Hospital Bill Status: </h3><br/>
                                    <p>Current Status: <b>{hospitalBillStatus}</b></p><br/>  

                                    <select
                                        className="form-control"
                                        id="relationship"
                                        value={hospitalBillStatus} 
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
                                            <input className="form-check-input me-1" type="checkbox" id="checkMedCertificate" 
                                                checked={checkedItems.checkMedCertificate}  />
                                            <label className="form-check-label" htmlFor="checkMedicalCertificate">&nbsp; Medical Certificate or Medical Abstract (2 Copies)</label>
                                        </li>
                                        <li className="list-group-item">
                                            <input className="form-check-input me-1" type="checkbox" id="checkFinalBill" 
                                                checked={checkedItems.checkFinalBill} />
                                            <label className="form-check-label" htmlFor="checkFinalBill">&nbsp; Hospital Bill (2 Copies)</label>
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
                                        onChange={(e) => setRemarks(e.target.value)} > 
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

export default HospitalBillModalContent;
