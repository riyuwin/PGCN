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

function ViewHospitalBillContent() {

    const { id } = useParams(); // Get burialId from URL
    // Variables for hospital bills -------------------------------
    const [burialAssitance, setBurialAssitance] = useState([]);
    // Variables for hospital bills -------------------------------

    // Variables for inputs ------------------------------------------------------------
    const [burialId, setBurialId] = useState('');
    const [clientFirstName, setClientFirstName] = useState('');
    const [clientMiddleName, setClientMiddleName] = useState('');
    const [clientLastName, setClientLastName] = useState('');
    const [clientExtName, setClientExtName] = useState('');

    const [clientPurok, setClientPurok] = useState('');
    const [clientBarangay, setClientBarangay] = useState('');
    const [clientMunicipality, setClientMunicipality] = useState('');
    const [clientProvince, setClientProvince] = useState('Camarines Norte'); 

    const [clientGender, setClientGender] = useState('');
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

    
    const [patientPurok, setPatientPurok] = useState('');
    const [patientBarangay, setPatientBarangay] = useState('');
    const [patientMunicipality, setPatientMunicipality] = useState('');
    const [patientProvince, setPatientProvince] = useState('Camarines Norte'); 
    const [barangayList, setBarangayList] = useState([]);  

    const [burialStatus, setBurialStatus] = useState('');
    const [checkedItems, setCheckedItems] = useState({
        checkBarangayIndigency: false,
        checkDeathCertificate: false,
        checkFuneralContract: false,
        checkValidId: false
    });

    const [remarks, setRemarks] = useState('');
    // Variables for inputs ------------------------------------------------------------

    useEffect(() => {
        if (id) {
            fetchHospitalBillAssistance(id);
        }
    }, [id]);

    const fetchHospitalBillAssistance = async (hospitalId) => {
        try {
            const response = await fetch(`http://localhost:5000/retrieve_hospital_bill_id?hospitalId=${hospitalId}`);
            const data = await response.json();
    
            PopulateForms(data);
        } catch (error) {
            console.error("Error fetching hospital bill assistance:", error); // Fix the log message
        }
    };    

    const PopulateForms = (burial) => {
        console.log("Populating forms with:", burial); // Check all values 

        setBurialId(burial['hospital_bill_id']);
        setClientFirstName(burial['patient_fname']);
        setClientMiddleName(burial['patient_mname']);
        setClientLastName(burial['patient_lname']);
        setClientExtName(burial['patient_ext_name']);
        setClientPurok(burial['patient_purok']);
        setClientBarangay(burial['patient_barangay']);
        setClientMunicipality(burial['patient_municipality']);
        setClientProvince(burial['patient_province']); 
        
        setContactPersonFname(burial['claimant_fname']); 
        setContactPersonMname(burial['claimant_mname']); 
        setContactPersonLname(burial['claimant_lname']); 
        setContactPersonExtName(burial['claimant_extname']); 
        setContactNumber(burial['claimant_contact']); 
        

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
        setPatientMunicipality(selectedMunicipality);
        setPatientBarangay(''); // Reset barangay selection
        setBarangayList(municipalityBarangays[selectedMunicipality] || []);
    };

    return (
        <>
            <main id="main" className="main">
                <div className="content">
                    <h1>Hospital Bill Details</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Admin</a></li>
                            <li className="breadcrumb-item active">Hospital Bill Details</li>
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
                                                            <div className="col-sm-7">
                                                                <br />
                                                                <div className="row">

                                                                    <div /* className="columnContainer" */>
                                                                        {/* <h5>Burial Assistance Information</h5><br /> */}

                                                                        <div className="infoContainer">
                                                                            <div className="row">
                                                                                <div className="col-sm-12">
                                                                                    <div className="input-group">
                                                                                        <b className="form-label">Hospital Bill Information</b> <hr />
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
                                                                                        <b className="form-label">Patient Information</b> <hr />
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">First Name:<br /> <b>{clientFirstName}</b></label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Middle Name:<br /> <b>{clientMiddleName}</b></label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">First Name:<br /> <b>{clientLastName}</b></label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Ext Name:<br /> <b>{clientExtName}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-12">
                                                                                    <br />
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Purok:<br /> <b>{clientPurok}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Barangay:<br /> <b>{clientBarangay}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Municipality:<br /> <b>{clientMunicipality}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-sm-3">
                                                                                    <div className="input-group">
                                                                                        <label className="form-label">Province:<br /> <b>{clientProvince}</b></label>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <br />

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

                                                                        <div className="infoContainer">


                                                                            <div className="col-sm-12">
                                                                                <div className="input-group">
                                                                                    <b className="form-label">Burial Requirements</b> 
                                                                                </div>
                                                                            </div>

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
                                                                        
                                                                    </div>

                                                                </div>

                                                            </div>

                                                            <div className="col-sm-5">
                                                                <br />
                                                                <div className="row">
                                                                    <div className="col-sm-12"> 

                                                                        <div className="columnContainer">
                                                                            <b className="form-label">PSWDO Interview</b>
                                                                            <br/>
                                                                            <hr/>

                                                                            
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
                                                                                        disabled={true}
                                                                                    />
                                                                                </div>
                                                                                
                                                                                <div className="col-3">               
                                                                                    <label htmlFor="firstName" className="form-label">Middle Name:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="firstName"
                                                                                        value={clientFirstName}
                                                                                        onChange={(e) => setClientFirstName(e.target.value)} 
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
                                                                                        value={clientFirstName}
                                                                                        onChange={(e) => setClientFirstName(e.target.value)} 
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
                                                                                        value={clientFirstName}
                                                                                        onChange={(e) => setClientFirstName(e.target.value)} 
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
                                                                                        value={clientFirstName}
                                                                                        onChange={(e) => setClientFirstName(e.target.value)} 
                                                                                        placeholder="Age" 
                                                                                    />
                                                                                </div>
                                                                                
                                                                                <div className="col-3">         
                                                                                    <br/>           
                                                                                    <label htmlFor="firstName" className="form-label">Civil Status:</label> 
                                                                                    <select
                                                                                        className="form-control"
                                                                                        value={clientProvince} >
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
                                                                                        value={clientFirstName}
                                                                                        onChange={(e) => setClientFirstName(e.target.value)} 
                                                                                        placeholder="Occupation" 
                                                                                    />
                                                                                </div>

                                                                                <div className="col-3">      
                                                                                    <br/>              
                                                                                    <label htmlFor="firstName" className="form-label">Income:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="firstName"
                                                                                        value={clientFirstName}
                                                                                        onChange={(e) => setClientFirstName(e.target.value)} 
                                                                                        placeholder="Income" 
                                                                                    />
                                                                                </div>
                                                                                 
                                                                                <div className="col-3">         
                                                                                    <br/>           
                                                                                    <label htmlFor="firstName" className="form-label">Gender:</label> 
                                                                                    <select
                                                                                        className="form-control"
                                                                                        value={clientProvince} >
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
                                                                                        value={clientFirstName}
                                                                                        onChange={(e) => setClientFirstName(e.target.value)} 
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
                                                                                        value={clientFirstName}
                                                                                        onChange={(e) => setClientFirstName(e.target.value)} 
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
                                                                                        onChange={(e) => setPatientBarangay(e.target.value.trim())}
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
                                                                                        onChange={(e) => setPatientPurok(e.target.value)}
                                                                                    />
                                                                                </div>  
                                                                                




                                                                            </div>

                                                                            <br/>
                                                                            <br/>
                                                                            
                                                                            <button
                                                                                className="btn btn-primary btn-sm w-100"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#addBurialContentModal" 
                                                                            >
                                                                                Save PSWDO Interview 
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
                        </section>
                    </div>
                </main>
            </main>


        </>
    );
}

export default ViewHospitalBillContent;
