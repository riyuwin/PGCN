import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ExcelExport from "./ExportExcel";
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { GuaranteeLetterLayout } from "./reports/GuaranteeLetterLayout";
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useParams } from "react-router-dom";
import { PSWDOLayout } from "./reports/PSWDOLayout";

function ViewAlayPagdamayContent() {

    const [familyCount, setFamilyCount] = useState(0);
    const [familyComposition, setFamilyComposition] = useState([]);

    const { id } = useParams(); // Get burialId from URL
    // Variables for hospital bills -------------------------------
    const [burialAssitance, setBurialAssitance] = useState([]);
    // Variables for hospital bills -------------------------------

    // Variables for inputs ------------------------------------------------------------
    const [hospitalId, setBurialId] = useState('');
    const [deceasedFirstName, setDeceasedFirstName] = useState('');
    const [deceasedMiddleName, setDeceasedMiddleName] = useState('');
    const [deceasedLastName, setDeceasedLastName] = useState('');
    const [deceasedExtName, setDeceasedExtName] = useState('');

    const [deceasedPurok, setDeceasedPurok] = useState('');
    const [deceasedBarangay, setDeceasedBarangay] = useState('');
    const [deceasedMunicipality, setDeceasedMunicipality] = useState('');
    const [deceasedProvince, setDeceasedProvince] = useState('Camarines Norte');
    const [barangayList, setBarangayList] = useState([]);

    const [deceasedGender, setDeceasedGender] = useState('');
    const [deceasedDeathDate, setDeceasedDeathDate] = useState('');
    const [deathCertificate, setDeathCertificate] = useState(null);
    const [deathCertificatePreview, setDeathCertificatePreview] = useState(null);


    const [contactPersonFirstname, setContactPersonFname] = useState('');
    const [contactPersonMiddlename, setContactPersonMname] = useState('');
    const [contactPersonLastname, setContactPersonLname] = useState('');
    const [contactPersonExtName, setContactPersonExtName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [contactPersonServiceCovered, setContactPersonServiceCovered] = useState('');
    const [contactPersonFuneralService, setContactPersonFuneralCovered] = useState('');
    const [contactPersonEncoded, setContactPersonEncoded] = useState('');

    const [PSWDOInterviewId, setPSWDOInterviewId] = useState('');
    const [contactPersonAge, setContactPersonAge] = useState('');
    const [contactPersonCivilStatus, setContactPersonCivilStatus] = useState('');
    const [contactPersonOccupation, setContactPersonOccupation] = useState('');
    const [contactPersonIncome, setContactPersonIncome] = useState('');
    const [contactPersonGender, setContactPersonGender] = useState('');
    const [contactPersonMobileNum, setContactPersonMobileNum] = useState('');
    const [contactPersonPettyAmount, setContactPersonPettyAmount] = useState('');
    const [contactPersonTransactionName, setContactPersonTransactionName] = useState('');
    const [contactPersonRelationship, setContactPersonRelationship] = useState('');
    const [patientProvince, setContactPersonProvince] = useState('Camarines Norte');
    const [patientMunicipality, setContactPersonMuncipality] = useState('');
    const [patientBarangay, setContactPersonBarangay] = useState('');
    const [patientPurok, setContactPersonPurok] = useState('');
    const [contactPersonBarangayList, setContactPersonBarangayList] = useState([]);



    const [burialStatus, setBurialStatus] = useState('');
    const [checkedItems, setCheckedItems] = useState({
        checkBarangayIndigency: false,
        checkDeathCertificate: false,
        checkFuneralContract: false,
        checkValidId: false
    });

    const [remarks, setRemarks] = useState('');
    // Variables for inputs ------------------------------------------------------------

    const [formPage, setFormPage] = useState("Guarantee Letter");
    
    const [PSWDOInterviewStatus, setPSWDOInterviewStatus] = useState(false);
    const [PSWDOId, setPSWDOId] = useState("");
    const [typeOfAssistance, setTypeOfAssistance] = useState('');
    const [member4Ps, setMember4Ps] = useState('');

    // Variables for inputs ------------------------------------------------------------

    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleFormPageUpdate = (formPageNumber) => {
        setFormPage(formPageNumber);
    }

    const handleDownload = async () => {
        const blob = await pdf(
            <GuaranteeLetterLayout
                patientFirstName={deceasedFirstName}
                patientMiddleName={deceasedMiddleName}
                patientLastName={deceasedLastName}
                patientExtName={deceasedExtName}
                claimantFirstName={contactPersonFirstname}
                claimantMiddleName={contactPersonMiddlename}
                claimantLastName={contactPersonLastname}
                claimantExtName={contactPersonExtName}
                patientPurok={deceasedPurok}
                patientBarangay={deceasedBarangay}
                patientMunicipality={deceasedMunicipality}
                patientProvince={deceasedProvince}
                claimantAmount={deceasedProvince}
            />
        ).toBlob();

        saveAs(blob, 'Guarantee_Letter.pdf');
    };

    const handleAddPSWDOInterview = async (e) => {
        e.preventDefault();
    
        const currentDateTime = new Date().toISOString().slice(0, 19).replace("T", " ");
        const transactionName = "Alay Pagdamay";
        try {
            const response = await fetch("http://localhost:5000/insert_pswdo_interview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id, contactPersonAge, contactPersonCivilStatus, contactPersonOccupation, 
                    contactPersonIncome, contactPersonGender, contactPersonMobileNum, contactPersonPettyAmount,
                    patientProvince, patientMunicipality, patientBarangay, patientPurok,
                    familyComposition, transactionName, typeOfAssistance, member4Ps
                })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || "Failed to insert PSWDO data.");
            }
    
            Swal.fire({
                icon: "success",
                title: "Transaction Successful",
                text: "PSWDO interview and family data saved!",
            }) 
        } catch (err) {
            console.error("Error:", err.message);
            Swal.fire({
                icon: "error",
                title: "Transaction Failed",
                text: err.message || "An error occurred.",
            });
        }
    };

    const handleUpdatePSWDOInterview = async (e) => {
        e.preventDefault();
        const transactionName = "Alay Pagdamay";
    
        try {
            const response = await fetch("http://localhost:5000/update_pswdo_interview", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    PSWDOId,
                    contactPersonAge,
                    contactPersonCivilStatus,
                    contactPersonOccupation,
                    contactPersonIncome,
                    contactPersonGender,
                    contactPersonMobileNum,
                    contactPersonPettyAmount,
                    patientProvince,
                    patientMunicipality,
                    patientBarangay,
                    patientPurok,
                    typeOfAssistance, 
                    member4Ps,
                    transactionName,
                    familyComposition: familyComposition.map(member => ({
                        id: member.family_id || null, // Include ID if it's an existing record
                        name: member.name,
                        relationship: member.relationship,
                        age: member.age,
                        civilStatus: member.civilStatus,
                        occupation: member.occupation,
                        monthlyIncome: member.monthlyIncome,
                    })),
                    hospitalId
                }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || "Failed to update PSWDO data.");
            }
    
            Swal.fire({
                icon: "success",
                title: "Update Successful",
                text: "PSWDO interview and family data updated!",
            });
    
        } catch (err) {
            console.error("Update Error:", err.message);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: err.message || "An error occurred during update.",
            });
        }
    };
    

    useEffect(() => {
        if (id) {
            fetchBurialAssistance(id);
        }
    }, [id]);

    const fetchBurialAssistance = async (burialId) => {
        try {
            const response = await fetch(`http://localhost:5000/retrieve_alay_pagdamay_id?burialId=${burialId}`);
            const data = await response.json();

            PopulateForms(data);
        } catch (error) {
            console.error("Error fetching burial assistance:", error);
        }
    };

    const PopulateForms = (burial) => {
        console.log("Populating forms with:", burial); // Check all values 

        setBurialId(burial['burial_id']);
        setDeceasedFirstName(burial['deceased_fname']);
        setDeceasedMiddleName(burial['deceased_mname']);
        setDeceasedLastName(burial['deceased_lname']);
        setDeceasedExtName(burial['deceased_ext_name']);
        setDeceasedPurok(burial['deceased_purok']);
        setDeceasedBarangay(burial['deceased_barangay']);
        setDeceasedMunicipality(burial['deceased_municipality']);
        setDeceasedProvince(burial['deceased_province']);
        setDeceasedGender(burial['deceased_gender']);
        setDeceasedDeathDate(burial['deceased_deathdate']);
        setContactPersonFname(burial['contact_fname']);
        setContactPersonMname(burial['contact_mname']);
        setContactPersonLname(burial['contact_lname']);
        setContactPersonExtName(burial['contact_ext_name']);
        setContactNumber(burial['contact_number']);
        setContactPersonServiceCovered(burial['contact_service_covered']);
        setContactPersonFuneralCovered(burial['contact_funeral_service']);
        setContactPersonEncoded(burial['contact_person_encoded']);

        setBurialStatus(burial['burial_status']);
        setCheckedItems({
            checkBarangayIndigency: burial['check_barangay_indigency'] === 1 || burial['check_barangay_indigency'] === "true",
            checkDeathCertificate: burial['check_death_certificate'] === 1 || burial['check_death_certificate'] === "true",
            checkFuneralContract: burial['check_funeral_contract'] === 1 || burial['check_funeral_contract'] === "true",
            checkValidId: burial['check_valid_id'] === 1 || burial['check_valid_id'] === "true",
        });


        setRemarks(burial['remarks']);

        // Convert BLOB to Base64 if it's present
        if (burial['death_certificate']) {
            const base64String = `data:image/png;base64,${burial['death_certificate']}`;
            setDeathCertificate(base64String); // Set as image src
            setDeathCertificatePreview(base64String);
        } else {
            setDeathCertificate(null);
            setDeathCertificatePreview(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Handle null or undefined dates

        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    
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
        setContactPersonMuncipality(selectedMunicipality);
        setContactPersonBarangay(''); // Reset barangay selection
        setBarangayList(municipalityBarangays[selectedMunicipality] || []);
    };


    return (
        <>
            <main id="main" className="main">
                <div className="content">
                    <h1>Alay Pagdamay Details</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Admin</a></li>
                            <li className="breadcrumb-item active">Alay Pagdamay Details</li>
                        </ol>
                    </nav>
                </div>

                <hr />

                <main className="py-6">
                    <div className="container-fluid">
                        <section className="section dashboard">
                            <div className="row">

                            <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-xxl-12 col-md-12">
                                            <div className="card info-card sales-card">
                                                <div className="card-body">

                                                    <div className="row mb-3">
                                                        <div className="row">

                                                            <div className="col-sm-12">
                                                                <br />
                                                                <div className="row">

                                                                    <div /* className="columnContainer" */>
                                                                        <h5>Generate Reports</h5><br />

                                                                        <div className="row"> 
                                                                            <div className="col-4">
                                                                                <button 
                                                                                    type="button" 
                                                                                    className={`btn w-100 btn-success`} 
                                                                                    onClick={() => handleFormPageUpdate("Guarantee Letter")}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#viewReportModal"
                                                                                >
                                                                                    <i className='bx bxs-file-pdf' ></i> Guarantee Letter
                                                                                </button>
                                                                            </div>

                                                                            <div className="col-4">
                                                                                <button 
                                                                                    type="button" 
                                                                                    className={`btn w-100 btn-success`}
                                                                                    onClick={() => handleFormPageUpdate("Petty Cash Voucher")}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#viewReportModal"
                                                                                >
                                                                                    <i className='bx bxs-file-pdf' ></i> Petty Cash Voucher
                                                                                </button>
                                                                            </div>

                                                                            <div className="col-4">
                                                                                <button 
                                                                                    type="button" 
                                                                                    className={`btn w-100 btn-success`}
                                                                                    onClick={() => handleFormPageUpdate("PSWDO Interview")}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#viewReportModal"
                                                                                >
                                                                                    <i className='bx bxs-file-pdf' ></i> PSWDO Interview
                                                                                </button>
                                                                            </div> 
                                                                        </div>
 


                                                                    </div>
                                                                </div>
                                                            </div>

                                                            
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="col-lg-7">
                                    <div className="row">
                                        <div className="col-xxl-12 col-md-12">
                                            <div className="card info-card sales-card">
                                                <div className="card-body">

                                                    <div className="row mb-3">
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <br />
                                                                <div className="row">

                                                                    <div /* className="columnContainer" */>
                                                                        {/* <h5>Burial Assistance Information</h5><br /> */}

                                                                        <div className="infoContainer">
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="input-group">
                                                                                        <b className="form-label">Burial Assistance Information</b> <hr />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-4">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Burial Status:<br /><b>{burialStatus}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-4">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">
                                                                                            Date of Death:<br />
                                                                                            <b>{formatDate(deceasedDeathDate)}</b>
                                                                                        </label>
                                                                                        <br />
                                                                                    </div>
                                                                                </div>


                                                                                <div className="col-sm-4">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Remarks:<br /> <b >{remarks}</b></label>
                                                                                    </div>
                                                                                </div>



                                                                            </div>
                                                                        </div>

                                                                        <div className="infoContainer">
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="input-group">
                                                                                        <b className="form-label">Deceased Information</b> <hr />
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">First Name:<br /> <b>{deceasedFirstName}</b></label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Middle Name:<br /> <b>{deceasedMiddleName}</b></label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">First Name:<br /> <b>{deceasedLastName}</b></label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Ext Name:<br /> <b>{deceasedExtName}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-12">
                                                                                    <br />
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Purok:<br /> <b>{deceasedPurok}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Barangay:<br /> <b>{deceasedBarangay}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Municipality:<br /> <b>{deceasedMunicipality}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Province:<br /> <b>{deceasedProvince}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div> 

                                                                        <div className="infoContainer">
                                                                            <div className="row">

                                                                                <div className="col-sm-12">
                                                                                    <div className="input-group">
                                                                                        <b className="form-label">Claimant Information</b> <hr />
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">First Name:<br /> <b>{contactPersonFirstname}</b></label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Middle Name:<br /> <b>{contactPersonMiddlename}</b></label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Last Name:<br /> <b>{contactPersonLastname}</b></label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Ext Name:<br /> <b>{contactPersonExtName}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-12">
                                                                                    <br />
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Contact Number:<br /> <b>{contactNumber}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Serviced Covered:<br /> <b>{contactPersonFuneralService}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Funeral Covered:<br /> <b>{contactPersonFuneralService}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Encoded/Reviewed By:<br /> <b>{contactPersonEncoded}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>



                                                                        
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="col-sm-12">
                                                                <br />
                                                                <div className="row">
                                                                    <div className="col-sm-12">


                                                                        <div className="columnContainer">

                                                                            <b className="form-label">Burial Requirements:</b>

                                                                            <div className="col-sm-12">
                                                                                <br />
                                                                                <ul className="list-group">
                                                                                    <li className="list-group-item">
                                                                                        <input className="form-check-input me-1" type="checkbox" id="checkBarangayIndigency"
                                                                                            checked={Boolean(checkedItems?.checkBarangayIndigency)} />
                                                                                        <label className="form-check-label" htmlFor="checkBarangayIndigency">
                                                                                            &nbsp; Barangay Indigency (2 Original)
                                                                                        </label>
                                                                                    </li>
                                                                                    <li className="list-group-item">
                                                                                        <input className="form-check-input me-1" type="checkbox" id="checkDeathCertificate"
                                                                                            checked={Boolean(checkedItems?.checkDeathCertificate)} />
                                                                                        <label className="form-check-label" htmlFor="checkDeathCertificate">
                                                                                            &nbsp; Death Certificate (2 Copies)
                                                                                        </label>
                                                                                    </li>
                                                                                    <li className="list-group-item">
                                                                                        <input className="form-check-input me-1" type="checkbox" id="checkFuneralContract"
                                                                                            checked={Boolean(checkedItems?.checkFuneralContract)} />
                                                                                        <label className="form-check-label" htmlFor="checkFuneralContract">
                                                                                            &nbsp; Funeral Contract (2 Copies)
                                                                                        </label>
                                                                                    </li>
                                                                                    <li className="list-group-item">
                                                                                        <input className="form-check-input me-1" type="checkbox" id="checkValidId"
                                                                                            checked={Boolean(checkedItems?.checkValidId)} />
                                                                                        <label className="form-check-label" htmlFor="checkValidId">
                                                                                            &nbsp; Valid Identification (2 Copies)
                                                                                        </label>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>



                                                                        </div>

                                                                        <div className="columnContainer">
                                                                            <b className="form-label">Death Certificate</b>

                                                                            <div className="col-12 d-flex justify-content-end">
                                                                                {deathCertificatePreview && (
                                                                                    <a
                                                                                        href={deathCertificatePreview}
                                                                                        download="death_certificate.png"
                                                                                        className="btn w-500 btn-secondary"
                                                                                    >
                                                                                        <i className='bx bxs-download'></i> Download
                                                                                    </a>
                                                                                )}
                                                                            </div>
                                                                            <br />
                                                                            <br />
                                                                            {deathCertificatePreview ? (
                                                                                <img src={deathCertificatePreview} alt="Death Certificate" className="dashboardSymbols" />
                                                                            ) : (
                                                                                <p>No death certificate available</p>
                                                                            )}
                                                                        </div>



                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-5">
                                    <div className="row">
                                        <div className="col-xxl-12 col-md-12">
                                            <div className="card info-card sales-card">
                                                <div className="card-body">

                                                    <div className="row mb-3">
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <br />
                                                                <div className="row">

                                                                        <div className="columnContainer">
                                                                            <b className="form-label">PSWDO Interview</b>
                                                                            <br/><hr/> 
                                                                            
                                                                            <div className="row"> 
                                                                                
                                                                                <div className="col-12">               
                                                                                    <p htmlFor="firstName" className="form-label"><i>Claimant Information </i></p><br/>
                                                                                </div>
    
                                                                                <div className="col-3">               
                                                                                    <label htmlFor="firstName" className="form-label">First Name:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="firstName"
                                                                                        value={contactPersonFirstname}
                                                                                        onChange={(e) => setContactPersonFname(e.target.value)} 
                                                                                        placeholder="First Name"
                                                                                        disabled={true}
                                                                                    />
                                                                                </div>
                                                                                
                                                                                <div className="col-3">               
                                                                                    <label htmlFor="firstName" className="form-label">Middle Name:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="firstName"
                                                                                        value={contactPersonMiddlename}
                                                                                        onChange={(e) => setContactPersonMname(e.target.value)} 
                                                                                        placeholder="First Name"
                                                                                        disabled={true}
                                                                                    />
                                                                                </div>
                                                                                
                                                                                <div className="col-3">               
                                                                                    <label htmlFor="firstName" className="form-label">Last Name:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="firstName"
                                                                                        value={contactPersonLastname}
                                                                                        onChange={(e) => setContactPersonLname(e.target.value)} 
                                                                                        placeholder="First Name"
                                                                                        disabled={true}
                                                                                    />
                                                                                </div>

                                                                                <div className="col-3">               
                                                                                    <label htmlFor="firstName" className="form-label">Ext Name:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="firstName"
                                                                                        value={contactPersonExtName}
                                                                                        onChange={(e) => setContactPersonExtName(e.target.value)} 
                                                                                        placeholder="First Name"
                                                                                        disabled={true}
                                                                                    />
                                                                                </div>
                                                                                
                                                                                
                                                                                <div className="col-3">    
                                                                                    <br/>        
                                                                                    <label htmlFor="firstName" className="form-label">Age:</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        className="form-control"
                                                                                        id="firstName"
                                                                                        value={contactPersonAge}
                                                                                        onChange={(e) => setContactPersonAge(e.target.value)} 
                                                                                        placeholder="Age" 
                                                                                    />
                                                                                </div>
                                                                                
                                                                                <div className="col-3">         
                                                                                    <br/>           
                                                                                    <label htmlFor="firstName" className="form-label">Civil Status:</label> 
                                                                                    <select
                                                                                        className="form-control"
                                                                                        value={contactPersonCivilStatus} 
                                                                                        onChange={(e) => setContactPersonCivilStatus(e.target.value)}>
                                                                                        <option value="">Select Civil Status</option>
                                                                                        <option value="Single">Single</option>
                                                                                        <option value="Married">Married</option>
                                                                                        <option value="Widowed">Widowed</option>
                                                                                        <option value="Widowed">Separed</option>
                                                                                        <option value="Widowed">Common-Law Married</option>
                                                                                        <option value="Widowed">Lived-in-Partener</option> 
                                                                                        <option value=""></option>
                                                                                    </select>
                                                                                </div>
                                                                                
                                                                                <div className="col-3">      
                                                                                    <br/>              
                                                                                    <label htmlFor="firstName" className="form-label">Occupation:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="firstName"
                                                                                        value={contactPersonOccupation}
                                                                                        onChange={(e) => setContactPersonOccupation(e.target.value)} 
                                                                                        placeholder="Occupation" 
                                                                                    />
                                                                                </div>

                                                                                <div className="col-3">      
                                                                                    <br/>              
                                                                                    <label htmlFor="firstName" className="form-label">Income:</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        className="form-control"
                                                                                        id="firstName"
                                                                                        value={contactPersonIncome}
                                                                                        onChange={(e) => setContactPersonIncome(e.target.value)} 
                                                                                        placeholder="Income" 
                                                                                    />
                                                                                </div>
                                                                                 
                                                                                <div className="col-3">         
                                                                                    <br/>           
                                                                                    <label htmlFor="firstName" className="form-label">Gender:</label> 
                                                                                    <select
                                                                                        className="form-control"
                                                                                        value={contactPersonGender} 
                                                                                        onChange={(e) => setContactPersonGender(e.target.value)} >
                                                                                        <option value="">Select Gender</option>
                                                                                        <option value="Male">Male</option>
                                                                                        <option value="Female">Female</option> 
                                                                                    </select>
                                                                                </div>
                                                                                
                                                                                <div className="col-3">      
                                                                                    <br/>              
                                                                                    <label htmlFor="firstName" className="form-label">Mobile Number:</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        className="form-control"
                                                                                        id="firstName"
                                                                                        value={contactPersonMobileNum}
                                                                                        onChange={(e) => setContactPersonMobileNum(e.target.value)} 
                                                                                        placeholder="Income" 
                                                                                    />
                                                                                </div>
                                                                                
                                                                                <div className="col-3">      
                                                                                    <br/>              
                                                                                    <label htmlFor="firstName" className="form-label">Petty Amount:</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        className="form-control"
                                                                                        id="firstName"
                                                                                        value={contactPersonPettyAmount}
                                                                                        onChange={(e) => setContactPersonPettyAmount(e.target.value)} 
                                                                                        placeholder="Income" 
                                                                                    />
                                                                                </div>

                                                                                <div className="col-3">      
                                                                                    <br/>               
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

                                                                                {/* Municipality */}
                                                                                <div className="col-3">
                                                                                    <br />
                                                                                    <label className="form-label">Municipality:</label>
                                                                                    <select
                                                                                        className="form-control"
                                                                                        value={patientMunicipality}
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

                                                                                {/* Barangay */}
                                                                                <div className="col-3">
                                                                                    <br />
                                                                                    <label className="form-label">Barangay:</label>
                                                                                    <select
                                                                                        className="form-control"
                                                                                        value={patientBarangay}
                                                                                        onChange={(e) => setContactPersonBarangay(e.target.value.trim())}
                                                                                        disabled={barangayList.length === 0}
                                                                                    >
                                                                                        <option value="">Select Barangay</option>
                                                                                        {barangayList.map((barangay) => (
                                                                                            <option key={barangay} value={barangay}>
                                                                                                {barangay}
                                                                                            </option>
                                                                                        ))}
                                                                                    </select>
                                                                                </div>

                                                                                {/* Purok */}
                                                                                <div className="col-3">
                                                                                    <br />
                                                                                    <label className="form-label">Purok:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        value={patientPurok}
                                                                                        onChange={(e) => setContactPersonPurok(e.target.value)}
                                                                                    />
                                                                                </div>  
                                                                                
                                                                                <div className="col-12">    
                                                                                    <br/>         
                                                                                    <hr/>
                                                                                    <p htmlFor="firstName" className="form-label"><i>Type of Assistance </i></p> 
                                                                                </div>

                                                                                <div className="col-12">         
                                                                                    <br/>           
                                                                                    <label htmlFor="firstName" className="form-label">Select Type of Assistance:</label> 
                                                                                    <select
                                                                                        className="form-control"
                                                                                        value={typeOfAssistance} 
                                                                                        onChange={(e) => setTypeOfAssistance(e.target.value)}>
                                                                                        <option value="">Select Type of Assistance</option>
                                                                                        <option value="Medical">Medical</option>
                                                                                        <option value="Burial">Burial</option>
                                                                                        <option value="Food">Food</option>
                                                                                        <option value="Educational">Educational</option>
                                                                                        <option value="Transportation">Transportation</option>
                                                                                        <option value="Emergency Shelter">Emergency Shelter</option>
                                                                                        <option value="Others">Others</option>  
                                                                                    </select>
                                                                                </div>

                                                                                
                                                                                <div className="col-12">         
                                                                                    <br/>           
                                                                                    <label htmlFor="firstName" className="form-label">Are you a 4Ps Member?:</label> 
                                                                                    <select
                                                                                        className="form-control"
                                                                                        value={member4Ps} 
                                                                                        onChange={(e) => setMember4Ps(e.target.value)}> 
                                                                                        <option value="No">No</option> 
                                                                                        <option value="Yes">Yes</option>
                                                                                    </select>
                                                                                </div>

                                                                                <div className="col-12">    
                                                                                    <br/>         
                                                                                    <hr/>
                                                                                    <p htmlFor="firstName" className="form-label"><i>Family Composition </i></p> 
                                                                                </div>

                                                                                <div className="col-12">
                                                                                    <br />
                                                                                    <label className="form-label">Number of Family Members:</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        className="form-control"
                                                                                        min="0"
                                                                                        max="6"
                                                                                        value={familyCount}
                                                                                        onChange={(e) => {
                                                                                            const count = Math.min(Math.max(Number(e.target.value), 0), 6); // keep between 0-6
                                                                                            setFamilyCount(count);

                                                                                            // initialize composition with empty objects
                                                                                            const newComposition = Array.from({ length: count }, (_, i) => familyComposition[i] || {
                                                                                                name: '',
                                                                                                relationship: '',
                                                                                                age: '',
                                                                                                civilStatus: '',
                                                                                                purok: '',
                                                                                            });
                                                                                            setFamilyComposition(newComposition);
                                                                                        }}
                                                                                    />
                                                                                </div>


                                                                                {/* --------- */}
                                                                                {familyComposition.map((member, index) => (
                                                                                    <Fragment key={member.id || index}>
                                                                                        <div className="col-12">
                                                                                            <br />
                                                                                            <label className="form-label"><i>Family Member {index + 1}</i></label>
                                                                                        </div>

                                                                                        <div className="col-4">
                                                                                            <br />
                                                                                            <label className="form-label">Family Member:</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                value={member.name || ''}
                                                                                                onChange={(e) => {
                                                                                                    const updated = familyComposition.map((item, i) =>
                                                                                                        i === index ? { ...item, name: e.target.value } : item
                                                                                                    );
                                                                                                    setFamilyComposition(updated);
                                                                                                }}
                                                                                            />
                                                                                        </div>

                                                                                        <div className="col-4">
                                                                                            <br />
                                                                                            <label className="form-label">Relationship:</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                value={member.relationship || ''}
                                                                                                onChange={(e) => {
                                                                                                    const updated = familyComposition.map((item, i) =>
                                                                                                        i === index ? { ...item, relationship: e.target.value } : item
                                                                                                    );
                                                                                                    setFamilyComposition(updated);
                                                                                                }}
                                                                                            />
                                                                                        </div>

                                                                                        <div className="col-4">
                                                                                            <br />
                                                                                            <label className="form-label">Age:</label>
                                                                                            <input
                                                                                                type="number"
                                                                                                className="form-control"
                                                                                                min="0"
                                                                                                value={member.age || ''}
                                                                                                onChange={(e) => {
                                                                                                    const updated = familyComposition.map((item, i) =>
                                                                                                        i === index ? { ...item, age: e.target.value } : item
                                                                                                    );
                                                                                                    setFamilyComposition(updated);
                                                                                                }}
                                                                                            />
                                                                                        </div>

                                                                                        <div className="col-4">
                                                                                            <br />
                                                                                            <label className="form-label">Civil Status:</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                value={member.civilStatus || ''}
                                                                                                onChange={(e) => {
                                                                                                    const updated = familyComposition.map((item, i) =>
                                                                                                        i === index ? { ...item, civilStatus: e.target.value } : item
                                                                                                    );
                                                                                                    setFamilyComposition(updated);
                                                                                                }}
                                                                                            />
                                                                                        </div>

                                                                                        <div className="col-4">
                                                                                            <br />
                                                                                            <label className="form-label">Occupation:</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                value={member.occupation || ''}
                                                                                                onChange={(e) => {
                                                                                                    const updated = familyComposition.map((item, i) =>
                                                                                                        i === index ? { ...item, occupation: e.target.value } : item
                                                                                                    );
                                                                                                    setFamilyComposition(updated);
                                                                                                }}
                                                                                            />
                                                                                        </div>

                                                                                        <div className="col-4">
                                                                                            <br />
                                                                                            <label className="form-label">Monthly Income:</label>
                                                                                            <input
                                                                                                type="number"
                                                                                                className="form-control"
                                                                                                value={member.monthlyIncome || ''}
                                                                                                onChange={(e) => {
                                                                                                    const updated = familyComposition.map((item, i) =>
                                                                                                        i === index ? { ...item, monthlyIncome: e.target.value } : item
                                                                                                    );
                                                                                                    setFamilyComposition(updated);
                                                                                                }}
                                                                                            />
                                                                                        </div>

                                                                                        <div className="col-12">
                                                                                            <br />
                                                                                            <hr />
                                                                                        </div>
                                                                                    </Fragment>
                                                                                ))}



                                                                            </div>
 
                                                                            <br/>
                                                                            
                                                                            { PSWDOInterviewStatus === true && 
                                                                                <>
                                                                                    <button
                                                                                        className="btn btn-primary btn-sm w-100" 
                                                                                        type="submit" 
                                                                                        onClick={handleUpdatePSWDOInterview} 
                                                                                    >
                                                                                        Edit PSWDO Interview Details 
                                                                                    </button>
                                                                                </>
                                                                            }

                                                                            { PSWDOInterviewStatus === false && 
                                                                                <>
                                                                                    <button
                                                                                        className="btn btn-primary btn-sm w-100" 
                                                                                        type="submit" 
                                                                                        onClick={handleAddPSWDOInterview}
                                                                                    >
                                                                                        Save PSWDO Interview Details
                                                                                    </button>
                                                                                </>
                                                                            }
 

                                                                        </div>

                                                                </div>
                                                            </div>
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
            <div className="modal fade" id="viewReportModal" tabIndex="-1" aria-labelledby="viewReportModal" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewReportModal">
                                {formPage}
                            </h5>  
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
    
                            <div className="generateContainer"> 
                                <br />

                                { formPage == "Guarantee Letter" && 
                                    <>

                                        <div  >
                                            <div className="col-12 d-flex justify-content-end"> 
                                                <button 
                                                    type="button" 
                                                    className={`btn w-500  btn-secondary`}  
                                                    onClick={handleDownload}
                                                >
                                                    <i className='bx bxs-file-pdf' ></i> Download
                                                </button>
                                            </div><br />


                                            <div className="formContainer">
                                                <div className="row"> 
    

                                                    <div className="col-4 d-flex justify-content-center">
                                                        <img src="/assets/img/cam_norte_logo.png" className="seal_logo_container"/> 
                                                    </div>

                                                    <div className="col-4 d-flex flex-column align-items-center header_form"> 
                                                        <p className="d-flex flex-column align-items-center text-center m-auto">
                                                            Republic of the Philippines<br/>
                                                            Province of Camarines Norte<br/>
                                                            Dong Tulong
                                                        </p> 
                                                    </div>
                
                                                    <div className="col-4 d-flex justify-content-center">
                                                        <img src="/assets/img/dong_tulong_logo.jpg" className="seal_logo_container"/> 
                                                    </div>

                                                    <div className="col-12">
                                                        <br/><hr/><br/>
                                                    </div>


                                                    <div className="col-12  d-flex flex-column align-items-start body_form">
                                                        <div className="body_container">
                                                            <h2 className="headerFormText">OFFICE OF THE GOVERNOR</h2><br/>
                                                            <h4 className="headerFormText">GUARANTEE LETTER</h4><br/>
                                                            <h5 className="headerFormText">{currentDate}</h5><br/><br/>
                                                            <p className="guaranteeLetterContent"> 
                                                                Respectfully referred to <b>{deceasedFirstName} {deceasedMiddleName} {deceasedLastName} {deceasedExtName}</b>, the herein attached approved request of <b>MR/MS. {contactPersonFirstname} {contactPersonMiddlename} {contactPersonLastname} {contactPersonExtName}</b> from Purok - {deceasedPurok}, Barangay {deceasedBarangay}, {deceasedMunicipality}, {deceasedMunicipality} for hospital bill assistance stated below:
                                                            </p><br/><br/>

                                                            <h5 >AMOUNT OF THE HOSPITAL BILL ASSISTANCE</h5>
                                                            {/* <h3 className="headerFormText">P {Number(contactPersonAmount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</h3><br/> */}

                                                        </div>
                                                    </div> 
                                                </div>   
                                            </div> 

                                        </div>

                                        
                                    </> 

                                }

                                {/* { formPage == "Petty Cash Voucher" && 
                                    <> 

                                        <div className="formContent"> 
                                            
                                            <div className="col-12 d-flex justify-content-end"> 
                                                <button 
                                                    type="button" 
                                                    className={`btn w-500  btn-secondary`}  
                                                    onClick={handlePettyCashDownload}
                                                >
                                                    <i className='bx bxs-file-pdf' ></i> Download
                                                </button>
                                            </div><br />

                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td colSpan="2" class="text-center">
                                                            <br/>
                                                            <b>PETTY CASH VOUCHER</b> <br/>
                                                            Provincial Government of Camarines Norte <br/>
                                                            LGU
                                                            <br/><br/>
                                                        </td>   
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td colSpan="2" class="text-start">
                                                            <b>Payee / Office:</b> {contactPersonFirstname} {contactPersonMiddlename} {contactPersonLastname} {contactPersonExtName}
                                                        </td>   
                                                    </tr>

                                                    <tr>
                                                        <td colSpan="2" class="text-start">
                                                            <b>Address:</b> Purok - {patientPurok} Barangay {patientBarangay}, {patientMunicipality} {patientProvince}
                                                        </td>   
                                                    </tr> 

                                                    <tr>
                                                        <td colSpan="2" class="text-start">
                                                            <b>I. To be filled up upon request</b>
                                                        </td>   
                                                    </tr> 

                                                    <tr>
                                                        <td class="text-center">
                                                            Particulars
                                                        </td>   
                                                        <td class="text-center">
                                                            Amount
                                                        </td>   
                                                    </tr> 
                                                    
                                                    <tr>
                                                        <td class="text-center">
                                                            <b>Hospital Bill</b>
                                                        </td>   
                                                        <td class="text-center">
                                                            <b>{Number(contactPersonAmount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</b>
                                                        </td>   
                                                    </tr> 
                                                    
                                                    <tr>
                                                        <td colSpan="2" > 
                                                            <p class="text-start"><b>A. </b> Approved by: </p>  
                                                            <p class="text-center"><b>CYNTHIA R. DELA CRUZ</b></p>  
                                                        </td> 
                                                    </tr> 
                                                    
                                                    <tr>
                                                        <td colSpan="2" > 
                                                            <p class="text-start"><b>B. </b> Paid by: </p>  
                                                            <p class="text-center"><b class="text-center">RITA G. GUEVARRA</b> <br/> Social Worker </p>  
                                                        </td> 
                                                    </tr> 
                                                    
                                                    <tr>
                                                        <td colSpan="2">
                                                            <p class="text-start"><b>C. </b> Cash Received by: </p>  
                                                            <p class="text-center"><u><b class="text-center">{contactPersonFirstname} {contactPersonMiddlename} {contactPersonLastname} {contactPersonExtName}</b></u></p>  
                                                            <p class="text-center">Signature over Printed Name of Payee</p>    
                                                            <p class="text-start">Date: <u>{currentDate}</u></p> 
                                                        </td> 
                                                    </tr>  

                                                </tbody>
                                            </table>

                                        </div> 

                                    </> 
                                }

                                { formPage == "PSWDO Interview" && 
                                    <>
                                        <PDFViewer style={{ width: "100%", height: "800px" }}>
                                            <PSWDOLayout    
                                                claimantFirstname={contactPersonFirstname}
                                                claimantMiddlename={contactPersonMiddlename}
                                                claimantLastname={contactPersonLastname}
                                                claimantExtName={contactPersonExtName}    
                                                claimantAge={contactPersonAge}    
                                                claimantCivilStatus={contactPersonCivilStatus} 
                                                claimantPurok={patientPurok}    
                                                claimantBarangay={patientBarangay}    
                                                claimantMunicipality={patientMunicipality}    
                                                claimantProvince={patientProvince}     
                                                claimantMobileNum={contactPersonMobileNum}
                                                claimantOccupation={contactPersonOccupation}    
                                                claimantMonthlyIncome={contactPersonIncome}
                                                familyComposition={familyComposition}
                                                claimantRelationship={contactPersonRelationship}
                                                dateOfDeath={deceasedDeathDate} 
                                                typeOfAssistance={typeOfAssistance}
                                                member4Ps={member4Ps}
                                                contactPersonPettyAmount={contactPersonPettyAmount}


                                            
                                            /> 
                                        </PDFViewer> 

                                    </>
                                }  */}
                                

                            </div>     

                            

                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div> 
            </div>


        </>
    );
}

export default ViewAlayPagdamayContent;
