
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';  
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import FetchLocalUserDetails from "./scripts/FetchLocalUser";  

function ManageBurialContent(){
    const { localUserDetails } = FetchLocalUserDetails();
    const [ account_id, setLocalUserId ] = useState(null);
    
    const navigate = useNavigate(); // Use navigate for redirection 

    // Variables for inputs ------------------------------------------------------------
    const [burialId, setBurialId] = useState('');
    const [clientFirstName, setClientFirstName] = useState('');
    const [clientMiddleName, setClientMiddleName] = useState('');
    const [clientLastName, setClientLastName] = useState('');
    const [clientExtName, setClientExtName] = useState('');  

    const [clientProvince, setClientProvince] = useState('Camarines Norte');
    const [clientMunicipality, setClientMunicipality] = useState(''); 
    const [clientBarangay, setClientBarangay] = useState('');
    const [barangayList, setBarangayList] = useState([]);  
    const [clientPurok, setClientPurok] = useState('');

    const [clientRelationship, setClientRelationship] = useState('');
    const [clientContactNumber, setClientContactNumber] = useState('');
    const [clientGender, setClientGender] = useState(null);
    const [clientAge, setClientAge] = useState(null);
    const [clientAmount, setClientAmount] = useState(null);
    const [clientTypeAssistance, setClientTypeAssistance] = useState(null);
    const [clientStatusRemarks, setClientStatusRemarks] = useState(null);
    const [clientApplication, setClientApplication] = useState(null);
    const [clientInterviewer, setClientInterviewer] = useState(null); 
 
    const [burialAssistanceStatus, setBurialAssistanceStatus] = useState(''); 
    const [checkedItems, setCheckedItems] = useState({
        checkBarangayIndigency: false, 
        checkDeathCertificate: false,
        checkFuneralContract: false,
        checkValidId: false
    });
    
    const [remarks, setRemarks] = useState('');
    // Variables for inputs ------------------------------------------------------------

    // Variables for hospital bills -------------------------------
    const [burialAssitance, setBurialAssitance] = useState([]);
    // Variables for hospital bills -------------------------------

    // Variables for pagination -------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const [selectedBurial, setSelectedBurial] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [modalName, setModalName] = useState();
    // Variables for pagination -------------------------------
    
    const [formPage, setFormPage] = useState("Basic Information");

    const handleAddBurialAssistance = async (e) => {
        e.preventDefault();
    
        // Convert boolean values using !!
        const checkBarangayIndigency = checkedItems?.checkBarangayIndigency === true || checkedItems?.checkBarangayIndigency === 'true';
        const checkDeathCertificate = checkedItems?.checkDeathCertificate === true || checkedItems?.checkDeathCertificate === 'true';
        const checkFuneralContract = checkedItems?.checkFuneralContract === true || checkedItems?.checkFuneralContract === 'true';
        const checkValidId = checkedItems?.checkValidId === true || checkedItems?.checkValidId === 'true';
            
        const currentDateTime = new Date().toISOString().slice(0, 19).replace("T", " ");
    
        const data = {
            account_id,
            clientFirstName, clientMiddleName, clientLastName, clientExtName,
            clientProvince, clientMunicipality, clientBarangay, clientPurok, clientRelationship,
            clientContactNumber, clientGender, clientAge, clientAmount, clientTypeAssistance,
            clientStatusRemarks, clientApplication, clientInterviewer, burialAssistanceStatus,
            checkBarangayIndigency, checkDeathCertificate, checkFuneralContract, checkValidId,
            remarks, currentDateTime
        };
    
        try {
            const response = await fetch("http://localhost:5000/insert_burial_assistance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                throw new Error(result.error || "Failed to insert burial assistance.");
            }
    
            Swal.fire({
                icon: "success",
                title: "Transaction Successful",
                text: "Burial assistance has been recorded successfully!",
            })/* .then(() => {
                ResetForms();
            }); */
    
        } catch (err) {
            console.error("Error:", err.message);
            Swal.fire({
                icon: "error",
                title: "Transaction Failed",
                text: err.message || "An error occurred while saving the burial assistance.",
            });
        }
    };

    const handleDeleteBurialAssistance = async (e, burialId) => {
        e.preventDefault();
     
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the burial assistance record permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        }).then(async (swalResult) => {
            if (swalResult.isConfirmed) {
                try {
                    // Sending DELETE request to the backend
                    const response = await fetch('http://localhost:5000/delete_burial_assistance', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ burialId }) // Send the billId to the server
                    });
    
                    const serverResult = await response.json(); // Renamed result to serverResult
    
                    if (response.ok) { 
                        Swal.fire('Deleted!', serverResult.message, 'success'); // Success message 
                    } else { 
                        Swal.fire('Error!', serverResult.error, 'error');  
                    }
                } catch (error) {
                    console.error("Error deleting burial assistance id:", error);
                    Swal.fire('Error!', 'An error occurred while deleting the burial.', 'error');
                }
            } else {
                // If canceled
                Swal.fire('Cancelled', 'The burial assistance was not deleted.', 'info');
            }
        });
    };
     

    const handleUpdateBurialAssistance = async (e) => {
        e.preventDefault();

        console.log("Burial ID: ", burialId);
    
        const requestData = {
            burialId, account_id, clientFirstName, clientMiddleName, clientLastName, clientExtName,
            clientProvince, clientMunicipality, clientBarangay, clientPurok, clientRelationship,
            clientContactNumber, clientGender, clientAge, clientAmount, clientTypeAssistance,
            clientStatusRemarks, clientApplication, clientInterviewer, burialAssistanceStatus,
            checkBarangayIndigency: checkedItems?.checkBarangayIndigency,
            checkDeathCertificate: checkedItems?.checkDeathCertificate,
            checkFuneralContract: checkedItems?.checkFuneralContract,
            checkValidId: checkedItems?.checkValidId,
            remarks, currentDateTime: new Date().toISOString().slice(0, 19).replace("T", " "),
        };
    
        try {
            const response = await fetch("http://localhost:5000/update_burial_assistance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || "Failed to update burial assistance.");
            }
    
            Swal.fire({
                icon: "success",
                title: "Transaction Successful",
                text: "Burial assistance has been updated successfully!",
            }).then(() => {
                ResetForms();
            });
        } catch (err) {
            console.error("Error:", err.message);
            Swal.fire({
                icon: "error",
                title: "Transaction Failed",
                text: err.message || "An error occurred while updating burial assistance.",
            });
        }
    };
    
    
    

    const fetchBurialAssistance = async () => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_burial_assistance");
            const data = await response.json();
            setBurialAssitance(data);

            console.log("Test123", data)
 
        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    // Handle any real-time updates (for example, using WebSockets or polling)
    useEffect(() => { 
        const interval = setInterval(() => {
            fetchBurialAssistance(); // Refresh the records periodically
        }, 2000); // Refresh every 5 seconds (you can adjust the time)

        return () => clearInterval(interval); // Cleanup interval when the component unmounts
    }, []); 

    // Pagination Logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = burialAssitance.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(burialAssitance.length / recordsPerPage);

    // Open modal and set selected bill
    const handleOpenModal = (burial, editMode = false, modalName) => {
        setSelectedBurial(burial);
        setIsEditMode(editMode);
        setModalName(modalName);
        PopulateForms(burial);  

        /* if (modalName == "View"){
            
            navigate(`/admin/view_burial_assistance/${burial['burial_id']}`);
        }    */
    }; 
 
    const handleAddRecord = (editMode = false, modalName) => { 
        /* ResetForms(); */
        setIsEditMode(editMode);
        setModalName(modalName)  
    };
 
    const PopulateForms = (burial) => {
        console.log("Populating forms with:", burial); // Check all values 
    
        setBurialId(burial['burial_assistance_id']);
        setClientFirstName(burial['client_fname']);
        setClientMiddleName(burial['client_mname']);
        setClientLastName(burial['client_lname']);
        setClientExtName(burial['client_ext_name']); 
        setClientPurok(burial['client_purok']);
        setClientBarangay(burial['client_barangay']);
        setClientMunicipality(burial['client_municipality']);
        setClientProvince(burial['client_province']);
        setClientRelationship(burial['client_relationship']);
        setClientContactNumber(burial['client_contact_num']);
        setClientGender(burial['client_gender']);
        setClientAge(burial['client_age']);
        setClientAmount(burial['amount']);
        setClientTypeAssistance(burial['type_assistance']);
        setClientStatusRemarks(burial['status_remarks']);
        setClientApplication(burial['status_application']);
        setClientInterviewer(burial['interviewer']);
        
        setBurialAssistanceStatus(burial['burial_status']); 
        setCheckedItems({
            checkBarangayIndigency: burial['check_barangay_indigency'] == 1,  
            checkDeathCertificate: burial['check_death_certificate'] == 1,  
            checkFuneralContract: burial['check_funeral_contract'] == 1,  
            checkValidId: burial['check_valid_id'] == 1,  
        });
        
        

        setRemarks(burial['remarks']);
        
        // Convert BLOB to Base64 if it's present
        /* if (burial['death_certificate']) {
            const base64String = `data:image/png;base64,${burial['death_certificate']}`;
            setDeathCertificate(base64String); // Set as image src
            setDeathCertificatePreview(base64String);
        } else {
            setDeathCertificate(null);
            setDeathCertificatePreview(null);
        } */
    }; 
    


    const ResetForms = () => {
        // ✅ Reset all input fields after successful save
        setBurialId('');
        setClientFirstName('');
        setClientMiddleName('');
        setClientLastName('');
        setClientExtName(''); 
        setClientProvince('');
        setClientMunicipality('');
        setBarangayList('');
        setClientPurok('');
        setClientRelationship('');
        setClientContactNumber('');
        setClientGender('');
        setClientAge('');
        setClientTypeAssistance('');
        setClientStatusRemarks('');
        setClientApplication('');
        setClientInterviewer('');
        setBurialAssistanceStatus('');
        setCheckedItems({
            checkBarangayIndigency: false,
            checkDeathCertificate: false,
            checkFuneralContract: false,
            checkValidId: false,
        });
    }  

    useEffect(() => {
        if (localUserDetails){
            console.log("Test: ", localUserDetails['account_id']);

            setLocalUserId(localUserDetails['account_id']);
        }
    })

    const municipalityBarangays = {
        "Basud": ["Angas", "Bactas", "Binatagan", "Caayunan", "Guinatungan", "Hinampacan", "Langa", "Laniton", "Lidong", "Mampili", "Mandazo", "Mangcamagong", "Manmuntay", 
            "Mantugawe", "Matnog", "Mocong", "Oliva", "Pagsangahan", "Pinagwarasan", "Plaridel", "Poblacion 1", "Poblacion 2", "San Felipe", "San Jose", "San Pascual", "Taba-taba", "Tacad", "Taisan", "Tuaca"],

        "Capalonga": ["Alayao", "Binawangan", "Calabaca", "Camagsaan", "Catabaguangan", "Catioan", "Del Pilar", "Itok", "Lucbanan", "Mabini", "Mactang", "Magsaysay", "Mataque", 
            "Old Camp", "Poblacion", "San Antonio", "San Isidro", "San Roque", "Tanawan", "Ubang", "Villa Aurora", "Villa Belen"],

        "Daet": ["Alawihao", "Awitan", "Bagasbas", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Barangay VI", "Barangay VII", "Barangay VIII", 
            "Bibirao", "Borabod", "Calasgasan", "Camambugan", "Cobangbang", "Dogongan", "Gahonon", "Gubat", "Lag-on", "Magang", "Mambalite", "Mancruz", "Pamorangon", "San Isidro"],

        "Jose Panganiban": [
            "Bagong Bayan", "Calero", "Dahican", "Dayhagan", "Larap", "Luklukan Norte", "Luklukan Sur", "Motherlode", "Nakalaya", "North Poblacion",
            "Osmeña", "Pag-asa", "Parang", "Plaridel", "Salvacion", "San Isidro", "San Jose", "San Martin", "San Pedro", "San Rafael",
            "Santa Cruz", "Santa Elena", "Santa Milagrosa", "Santa Rosa Norte", "Santa Rosa Sur", "South Poblacion", "Tamisan"
        ], 

        "Labo": [
            "Anahaw", "Anameam", "Awitan", "Baay", "Bagacay", "Bagong Silang I", "Bagong Silang II", "Bagong Silang III", "Bakiad", "Bautista", "Bayabas", "Bayan-bayan", "Benit", 
            "Bulhao", "Cabatuhan", "Cabusay",  "Calabasa", "Canapawan", "Daguit", "Dalas", "Dumagmang", "Exciban", "Fundado", "Guinacutan", "Guisican", "Gumamela", "Iberica", 
            "Kalamunding", "Lugui", "Mabilo I", "Mabilo II", "Macogon", "Mahawan-hawan", "Malangcao-Basud", "Malasugui", "Malatap", "Malaya", "Malibago", "Maot", "Masalong", 
            "Matanlang", "Napaod", "Pag-asa", "Pangpang", "Pinya", "San Antonio", "San Francisco", "Santa Cruz", "Submakin", "Talobatib", "Tigbinan", "Tulay na Lupa"],

        "Mercedes": [
            "Apuao", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Barangay VI", "Barangay VII", "Caringo", "Catandunganon", "Cayucyucan", "Colasi",
            "Del Rosario", "Gaboc", "Hamoraon", "Hinipaan", "Lalawigan", "Lanot", "Mambungalon", "Manguisoc", "Masalongsalong", "Matoogtoog", "Pambuhan", "Quinapaguian", "San Roque", "Tarum"
        ], 

        "Paracale": [
            "Awitan", "Bagumbayan", "Bakal", "Batobalani", "Calaburnay", "Capacuan","Casalugan", "Dagang", "Dalnac", "Dancalan", "Gumaus", "Labnig", "Macolabo Island",
            "Malacbang", "Malaguit", "Mampungo", "Mangkasay", "Maybato", "Palanas","Pinagbirayan Malaki", "Pinagbirayan Munti", "Poblacion Norte", "Poblacion Sur",
            "Tabas", "Talusan", "Tawig", "Tugos"
        ],

        "San Lorenzo Ruiz": [
            "Daculang Bolo", "Dagotdotan", "Langga", "Laniton", "Maisog", "Mampurog",
            "Manlimonsito", "Matacong", "Salvacion", "San Antonio", "San Isidro", "San Ramon"
        ],

        "San Vicente": [
            "Asdum", "Cabanbanan", "Calabagas", "Fabrica", "Iraya Sur", 
            "Man-ogob", "Poblacion District I", "Poblacion District II", "San Jose"
        ],

        "Santa Elena": [
            "Basiad", "Bulala", "Don Tomas", "Guitol", "Kabuluan", "Kagtalaba",
            "Maulawin", "Patag Ibaba", "Patag Iraya", "Plaridel", "Polungguitguit",
            "Rizal", "Salvacion", "San Lorenzo", "San Pedro", "San Vicente",
            "Santa Elena", "Tabugon", "Villa San Isidro"
        ],
        
        "Talisay": [
            "Binanuaan", "Caawigan", "Cahabaan", "Calintaan", "Del Carmen",
            "Gabon", "Itomang", "Poblacion", "San Francisco", "San Isidro",
            "San Jose", "San Nicolas", "Santa Cruz", "Santa Elena", "Santo Niño"
        ],

        "Vinzons": [
            "Aguit-it", "Banocboc", "Barangay I", "Barangay II", "Barangay III",
            "Cagbalogo", "Calangcawan Norte", "Calangcawan Sur", "Guinacutan",
            "Mangcawayan", "Mangcayo", "Manlucugan", "Matango", "Napilihan",
            "Pinagtigasan", "Sabang", "Santo Domingo", "Singi", "Sula"
        ]

    };
    

    const handleMunicipalityChange = (e) => {
        const selectedMunicipality = e.target.value.trim();
        setClientMunicipality(selectedMunicipality);
        setClientBarangay(''); // Reset barangay selection
        setBarangayList(municipalityBarangays[selectedMunicipality] || []);
    };  
 
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDeathCertificate(file);
            setDeathCertificatePreview(URL.createObjectURL(file)); // Generate preview
        } else {
            setDeathCertificate(null);
            setDeathCertificatePreview(null);
        }
    };
    
    const handleFormPageUpdate = (formPageNumber) => {
        setFormPage(formPageNumber);
    }

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setCheckedItems((prevState) => ({
            ...prevState,
            [id]: checked
        }));
    };

    return(
        <>
            <main id="main" className="main">
                <div className="content">
                    <h1>Manage Burial Assistance</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a>Admin</a>
                            </li>
                            <li className="breadcrumb-item active">Manage Burial Assistance</li>
                        </ol>
                    </nav>
                </div>

                <hr />

                <main className="py-6  ">
                    <div className="container-fluid">
                        <section className="section dashboard">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-xxl-12 col-md-12">
                                            <div className="card info-card sales-card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h5 className="card-title">List of Burial Assistance</h5>
                                                    </div>

                                                    {/* Filter and Search Section */}
                                                    <div className="row mb-3">
                                                        <div className="col-sm-3">
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="searchInput"
                                                                    placeholder="Search Patient Name"
                                                                    /* onChange={handleSearch} */
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6"></div>
                                                        <div className="col-sm-3">
                                                            <div className="input-group d-flex justify-content-end">
                                                                <button
                                                                    className="btn btn-primary btn-sm"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#addBurialContentModal"
                                                                    onClick={() => handleAddRecord(true, "Add")}
                                                                >
                                                                    + Add Burial Assistance
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="table-responsive">
                                                        <table className="table datatable table-custom">
                                                            <thead>
                                                                <tr>
                                                                    <th>No.</th>
                                                                    <th>Client Name</th>
                                                                    {/* <th>Municipality</th>
                                                                    <th>Barangay</th> */}
                                                                    <th>Status / Remarks</th>
                                                                    <th>Status of Application</th>
                                                                    <th>Amount</th>
                                                                    <th>Interviewer</th>
                                                                    <th>Date Registered</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {currentRecords.length > 0 ? (
                                                                    currentRecords.map((burial, index) => (
                                                                        <tr key={burial.id}>
                                                                            <td>{indexOfFirstRecord + index + 1}</td>
                                                                            <td>{`${burial.client_fname} ${burial.client_mname} ${burial.client_lname} ${burial.client_ext_name || ""}`}</td>
                                                                            {/* <td>{burial.client_municipality}</td>
                                                                            <td>{`${burial.client_barangay}`}</td> */}
                                                                            <td>{burial.type_assistance}</td>
                                                                            <td>{burial.status_application}</td>
                                                                            <td><b>{burial.amount}</b></td>
                                                                            <td>{burial.interviewer}</td>
                                                                            <td>{new Date(burial.savedAt).toLocaleString()}</td>
                                                                            <td>
                                                                                <button className="btn btn-success" onClick={() => handleOpenModal(burial, true, "View")}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#addBurialContentModal">
                                                                                    <i className='bx bx-info-circle' ></i> View
                                                                                </button>
                                                                                <button className="btn btn-primary" onClick={() => handleOpenModal(burial, true, "Edit")}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#addBurialContentModal">
                                                                                    <i className='bx bx-edit' ></i> Edit
                                                                                </button>
                                                                                <button className="btn btn-danger" 
                                                                                    onClick={(e) => handleDeleteBurialAssistance(e, burial['burial_assistance_id'])} >
                                                                                    <i className='bx bx-trash' ></i> Delete
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="10" className="text-center">No records found</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>

                                                        <br />

                                                        {/* Pagination Controls */}
                                                        <div className="d-flex justify-content-between mt-3">
                                                            <button 
                                                                className="btn btn-secondary"
                                                                disabled={currentPage === 1 || totalPages === 0}
                                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                            >
                                                                Previous
                                                            </button>
                                                            <span>Page {totalPages > 0 ? currentPage : 0} of {totalPages}</span>
                                                            <button 
                                                                className="btn btn-secondary"
                                                                disabled={currentPage === totalPages || totalPages === 0}
                                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                            </div>
                        </section>
                    </div>
                </main>
            </main>

            {/* Modal */}
            <div className="modal fade" id="addBurialContentModal" tabIndex="-1" aria-labelledby="addBurialContentModal" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addHospitalBillModalLabel">
                                + Bukas ang Pag-asa
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>

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

                                            <h3>Client Information</h3><br />
                                            <div className="row"> 
                                                <div className="col-3">               
                                                    <label htmlFor="firstName" className="form-label">First Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="firstName"
                                                        value={clientFirstName}
                                                        onChange={(e) => setClientFirstName(e.target.value)} 
                                                        placeholder="First Name"
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
                                                        onChange={(e) => setClientMiddleName(e.target.value)} 
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
                                                        onChange={(e) => setClientLastName(e.target.value)} 
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
                                                        onChange={(e) => setClientExtName(e.target.value)} 
                                                    />
                                                </div>    

                                                <div className="col-3">
                                                    <br />
                                                    <label className="form-label">Province:</label>
                                                    <select
                                                        className="form-control"
                                                        value={clientProvince}
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
                                                        value={clientMunicipality} 
                                                        onChange={handleMunicipalityChange}
                                                    >
                                                        <option value="">Select Municipality</option>
                                                        {Object.keys(municipalityBarangays).map((municipality) => (
                                                            <option key={municipality} value={municipality}>
                                                                {municipality}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
            
                                                <div className="col-3">
                                                    <br />
                                                    <label className="form-label">Barangay:</label>
                                                    <select
                                                        className="form-control"
                                                        value={clientBarangay}
                                                        onChange={(e) => setClientBarangay(e.target.value.trim())}
                                                        disabled={barangayList.length === 1}
                                                    >
                                                        <option value="">Select Barangay</option>
                                                        {(barangayList && Array.isArray(barangayList)) ? (
                                                        barangayList.map((barangay) => (
                                                            <option key={barangay} value={barangay}>
                                                            {barangay}
                                                            </option>
                                                        ))
                                                        ) : (
                                                        <option disabled>No barangays available</option>
                                                        )}

                                            
                                                    </select>
                                                </div>
            
                                                <div className="col-3">
                                                    <br />
                                                    <label className="form-label">Purok:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={clientPurok}
                                                        onChange={(e) => setClientPurok(e.target.value)}
                                                    />
                                                </div>   

                                                
                                                <div className="col-3">
                                                    <br />
                                                    <label htmlFor="relationship" className="form-label">Relationship:</label>
                                                    <select
                                                        className="form-control"
                                                        id="relationship"
                                                        value={clientRelationship}
                                                        onChange={(e) => setClientRelationship(e.target.value)}
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
                                                        onChange={(e) => setClientContactNumber(e.target.value)}
                                                    />
                                                </div>   

                                                
                                                <div className="col-3">
                                                    <br /> 
                                                    <label htmlFor="extName" className="form-label">Gender:</label>
                                                    
                                                    <select
                                                        className="form-control"
                                                        id="hospital"   
                                                        value={clientGender}
                                                        onChange={(e) => setClientGender(e.target.value)} >
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
                                                        onChange={(e) => setClientAge(e.target.value)}
                                                    />
                                                </div>
                                                
                                                <div className="col-3">
                                                    <br /> 
                                                    <label htmlFor="extName" className="form-label">Amount:</label>
                                                    
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={clientAmount}
                                                        onChange={(e) => setClientAmount(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-3">
                                                    <br />
                                                    <label htmlFor="relationship" className="form-label">Type of Assistance:</label>
                                                    <select
                                                        className="form-control"
                                                        id="relationship"
                                                        value={clientTypeAssistance}
                                                        onChange={(e) => setClientTypeAssistance(e.target.value)}
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
                                                        onChange={(e) => setClientStatusRemarks(e.target.value)}
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
                                                        onChange={(e) => setClientApplication(e.target.value)}
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
                                                        onChange={(e) => setClientInterviewer(e.target.value)}
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
                                                        <h3>Burial Assistance Status: </h3><br/>
                                                        <p>Current Status: <b>Pending</b></p><br/>  
 
                                                        <select
                                                            className="form-control"
                                                            id="relationship"
                                                            value={burialAssistanceStatus}
                                                            onChange={(e) => setBurialAssistanceStatus(e.target.value)}
                                                        > 
                                                            <option value="Pending">Pending</option>
                                                            <option value="Pending">Completed</option>
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
                                                                    checked={checkedItems.checkBarangayIndigency} // Matches state key
                                                                    onChange={handleCheckboxChange}/>
                                                                <label className="form-check-label" htmlFor="checkBarangayIndigency">&nbsp; Barangay Indigency (2 Original)</label>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <input className="form-check-input me-1" type="checkbox" id="checkDeathCertificate" 
                                                                    checked={checkedItems.checkDeathCertificate} 
                                                                    onChange={handleCheckboxChange}/>
                                                                <label className="form-check-label" htmlFor="checkDeathCertificate">&nbsp; Death Certificate (2 Copies)</label>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <input className="form-check-input me-1" type="checkbox" id="checkFuneralContract" 
                                                                    checked={checkedItems.checkFuneralContract}
                                                                    onChange={handleCheckboxChange}/>
                                                                <label className="form-check-label" htmlFor="checkFuneralContract">&nbsp; Funeral Contract (2 Copies)</label>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <input className="form-check-input me-1" type="checkbox" id="checkValidId" 
                                                                    checked={checkedItems.checkValidId}
                                                                    onChange={handleCheckboxChange}/>
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
                                    
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                            Close
                                        </button>

                                        { modalName == "Add" && 
                                            <>
                                                <button type="submit" className="btn btn-primary"
                                                onClick={handleAddBurialAssistance}>
                                                    Save
                                                </button> 
                                            </>
                                        }

                                        { modalName == "Edit" && 
                                            <>
                                                <button type="submit" className="btn btn-primary"
                                                onClick={handleUpdateBurialAssistance}>
                                                    Save Changes
                                                </button> 
                                            </>
                                        }
                                    </div>
                                    
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
 

        </>
    )
}

export default ManageBurialContent;
 