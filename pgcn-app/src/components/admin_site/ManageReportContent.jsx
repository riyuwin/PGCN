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
import { PettyCashLayout } from "./reports/PettyCashLayout";
import { PSWDOLayout } from "./reports/PSWDOLayout";

function ManageReportContent(){ 
    const [transactions, setTransactions] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [generateButton, setGenerateButton] = useState(false); 
     
    const [patientPurok, setPatientPurok] = useState(''); 
    const [patientBarangay, setPatientBarangay] = useState('');
    const [patientMunicipality, setPatientMunicipality] = useState('');
    const [patientProvince, setPatientProvince] = useState('Camarines Norte'); 
    const [barangayList, setBarangayList] = useState([]);  
    
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

    // BURIAL ASSISTANCE - Variables for inputs -------------------------------------------------------
    const [burialId, setBurialId] = useState('');
    const [deceasedFirstName, setDeceasedFirstName] = useState('');
    const [deceasedMiddleName, setDeceasedMiddleName] = useState('');
    const [deceasedLastName, setDeceasedLastName] = useState('');
    const [deceasedExtName, setDeceasedExtName] = useState('');  

    const [deceasedPurok, setDeceasedPurok] = useState('');
    const [deceasedBarangay, setDeceasedBarangay] = useState('');
    const [deceasedMunicipality, setDeceasedMunicipality] = useState('');
    const [deceasedProvince, setDeceasedProvince] = useState('Camarines Norte'); 
    const [deceasedBarangayList, setDeceasedBarangayList] = useState([]);  

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
    
    const [burialStatus, setBurialStatus] = useState(''); 
    const [checkedItems, setCheckedItems] = useState({
        checkBarangayIndigency: false, 
        checkDeathCertificate: false,
        checkFuneralContract: false,
        checkValidId: false
    });
    
    const [remarks, setRemarks] = useState('');
    
    const [currentDateToday, setCurrentDateToday] = useState(''); 
    // BURIAL ASSISTANCE - Variables for inputs -------------------------------------------------------
    
    // HOSPITAL BILL - Variables for inputs ------------------------------------------------------------
    const [billId, setHospitalId] = useState('');
    const [patientFirstName, setPatientFirstName] = useState('');
    const [patientMiddleName, setPatientMiddleName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const [patientExtName, setPatientExtName] = useState('');
    const [patientAddress, setPatientAddress] = useState('');
    const [patientHospital, setPatientHospital] = useState('');

    const [claimantFirstname, setClaimantFname] = useState('');
    const [claimantMiddlename, setClaimantMname] = useState('');
    const [claimantLastname, setClaimantLname] = useState('');
    const [claimantExtName, setClaimantExtName] = useState('');
    const [claimantRelationship, setClaimantRelationship] = useState('');
    const [claimantContact, setClaimantContact] = useState('');
    const [claimantAmount, setClaimantAmount] = useState('');
    // HOSPITAL BILL - Variables for inputs ------------------------------------------------------------ 

    // Variables for hospital bills
    const [hospitalBills, setHospitalBills] = useState([]);
    const [burialAssistance, setBurialAsisstanceData] = useState([]);

    const [selectedBill, setSelectedBill] = useState(null);

    const [formPage, setFormPage] = useState("Form 1");

    useEffect(() => {
        if (transactions !== "" && startDate !== "" && endDate !== "") {
            setGenerateButton(true); 

            if (transactions === "Hospital Bill"){
                fetchHospitalBills();  
            } else if (transactions === "Burial Assistance"){
                fetchBurialAssitance();
            }
        } else {
            setGenerateButton(false);
        }
    }, [transactions, startDate, endDate]); // ✅ Runs when any of these values change 

    const fetchBurialAssitance = async () => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_burial_assistance");
            const data = await response.json();
            setBurialAsisstanceData(data);
        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    const fetchHospitalBills = async () => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_hospital_bill");
            const data = await response.json();
            setHospitalBills(data); 
        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };
    
    const [filteredRecords, setAssistanceRecord] = useState([]);
    useEffect(() => {
        if (transactions === "Hospital Bill") {
            const records = hospitalBills.filter((bill) => {
                const billDate = new Date(bill.datetime_added);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;
    
                return (
                    (!start || billDate >= start) &&
                    (!end || billDate <= end) &&
                    (patientMunicipality === "All" || bill.patient_municipality === patientMunicipality || patientMunicipality === "") &&
                    (patientBarangay === "All" || bill.patient_barangay === patientBarangay || patientBarangay === "")
                );
            });
    
            setAssistanceRecord(records);
        } 
        else if (transactions === "Burial Assistance") {
            const records = burialAssistance.filter((burial) => { 
                const burialDate = new Date(burial.savedAt);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;
    
                return (
                    (!start || burialDate >= start) &&
                    (!end || burialDate <= end) &&
                    (patientMunicipality === "All" || burial.deceased_municipality === patientMunicipality || patientMunicipality === "") &&
                    (patientBarangay === "All" || burial.deceased_barangay === patientBarangay || patientBarangay === "")
                );
            });
            
            console.log("Test burial: ", records)
    
            setAssistanceRecord(records);
        }
    }, [transactions, hospitalBills, burialAssistance, startDate, endDate, patientMunicipality, patientBarangay, deceasedMunicipality, deceasedBarangay]);     


    /* filteredRecords = hospitalBills.filter((bill) => {
        const billDate = new Date(bill.datetime_added);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
    
        return (
            (!start || billDate >= start) &&
            (!end || billDate <= end) &&
            (patientMunicipality === "All" || bill.patient_municipality === patientMunicipality || patientMunicipality === "") &&
            (patientBarangay === "All" || bill.patient_barangay === patientBarangay || patientBarangay === "")
        );
    }); */

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    
    // Open modal and set selected bill
    const handlePopulateDetails = (data, transactionName) => {
        PopulateForms(data, transactionName);
    };

    const handleFormPageUpdate = (formPageNumber) => {
        setFormPage(formPageNumber);
    }
    
    const PopulateForms = (data, transactionName) => {
        if (transactionName === "Hospital Bill"){
            setHospitalId(data['hospital_bill_id']);
            setPatientFirstName(data['patient_fname']);
            setPatientMiddleName(data['patient_mname']);
            setPatientLastName(data['patient_lname']);
            setPatientExtName(data['patient_ext_name']);
            setPatientPurok(data['patient_purok']);
            setPatientBarangay(data['patient_barangay']);
            setPatientMunicipality(data['patient_municipality']);
            setPatientProvince(data['patient_province']);
            setPatientHospital(data['patient_hospital']);
            setClaimantFname(data['claimant_fname']);
            setClaimantMname(data['claimant_mname']);
            setClaimantLname(data['claimant_lname']);
            setClaimantExtName(data['claimant_extname']);
            setClaimantRelationship(data['claimant_relationship']);
            setClaimantContact(data['claimant_contact']);
            setClaimantAmount(data['claimant_amount']);     

        } else if (transactionName === "Burial Assistance"){

            setBurialId(data['burial_id']);
            setDeceasedFirstName(data['deceased_fname']);
            setDeceasedMiddleName(data['deceased_mname']);
            setDeceasedLastName(data['deceased_lname']);
            setDeceasedExtName(data['deceased_ext_name']); 
            setDeceasedPurok(data['deceased_purok']);
            setDeceasedBarangay(data['deceased_barangay']);
            setDeceasedMunicipality(data['deceased_municipality']);
            setDeceasedProvince(data['deceased_province']);
            setDeceasedGender(data['deceased_gender']);
            setDeceasedDeathDate(data['deceased_deathdate']);
            setContactPersonFname(data['contact_fname']);
            setContactPersonMname(data['contact_mname']);
            setContactPersonLname(data['contact_lname']);
            setContactPersonExtName(data['contact_ext_name']);
            setContactNumber(data['contact_number']);
            setContactPersonServiceCovered(data['contact_service_covered']);
            setContactPersonFuneralCovered(data['contact_funeral_service']);
            setContactPersonEncoded(data['contact_person_encoded']);
            
            setBurialStatus(data['burial_status']); 
            setCheckedItems({
                checkBarangayIndigency: data['check_barangay_indigency'] === 1 || data['check_barangay_indigency'] === "true",
                checkDeathCertificate: data['check_death_certificate'] === 1 || data['check_death_certificate'] === "true",
                checkFuneralContract: data['check_funeral_contract'] === 1 || data['check_funeral_contract'] === "true",
                checkValidId: data['check_valid_id'] === 1 || data['check_valid_id'] === "true",
            });
            
    
            setRemarks(data['remarks']);
            
            // Convert BLOB to Base64 if it's present
            if (data['death_certificate']) {
                const base64String = `data:image/png;base64,${data['death_certificate']}`;
                setDeathCertificate(base64String); // Set as image src
                setDeathCertificatePreview(base64String);
            } else {
                setDeathCertificate(null);
                setDeathCertificatePreview(null);
            }
        }
    }

    const ResetForms = () => {
        // ✅ Reset all input fields after successful save
        setPatientFirstName('');
        setPatientMiddleName('');
        setPatientLastName('');
        setPatientExtName('');
        setPatientAddress('');
        setPatientHospital('');
        setClaimantFname('');
        setClaimantMname('');
        setClaimantLname('');
        setClaimantExtName('');
        setClaimantRelationship('');
        setClaimantContact('');
        setClaimantAmount('');
        
    } 
    
    const handleMunicipalityChange = (e) => {
        const selectedMunicipality = e.target.value.trim();
        setPatientMunicipality(selectedMunicipality);
        setPatientBarangay(''); // Reset barangay selection
        setBarangayList(municipalityBarangays[selectedMunicipality] || []);
    };  
     
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleDownload = async () => {
        const blob = await pdf(
            <GuaranteeLetterLayout
                patientFirstName={patientFirstName}
                patientMiddleName={patientMiddleName}
                patientLastName={patientLastName}
                patientExtName={patientExtName}
                claimantFirstName={claimantFirstname}
                claimantMiddleName={claimantMiddlename}
                claimantLastName={claimantLastname}
                claimantExtName={claimantExtName}
                patientPurok={patientPurok}
                patientBarangay={patientBarangay}
                patientMunicipality={patientMunicipality}
                patientProvince={patientProvince}
                claimantAmount={claimantAmount}
            />
        ).toBlob();

        saveAs(blob, 'Guarantee_Letter.pdf');
    };
 

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        });
    
        console.log("Formatted Date:", formattedDate); // Debugging
        setCurrentDateToday(formattedDate);
    }, []);
    

 
    return(
        <>
            <main id="main" className="main">
                <div className="content">
                    <h1>Generate Reports</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Admin</a></li>
                            <li className="breadcrumb-item active">Generate Reports</li>
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
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h5 className="card-title">Manage Reports</h5>
                                                    </div>

                                                    {/* Filter and Search Section */}
                                                    <div className="row mb-3">   
                                                        <div className="col-sm-3">
                                                            <div className="input-group">
                                                                <label className="form-label">Select Transactions: </label> 
                                                                <select
                                                                    className="form-control"
                                                                    id="hospital" 
                                                                    value={transactions}
                                                                    onChange={(e) => setTransactions(e.target.value)} >
                                                                        <option value="">Select Transactions</option>
                                                                        <option value="Hospital Bill">Hospital Bill</option>
                                                                        <option value="Burial Assistance">Burial Assistance</option> 
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-3">
                                                            <div className="input-group">
                                                                <label className="form-label">Start Date: </label>
                                                                <input
                                                                    type="date"
                                                                    className="form-control"
                                                                    value={startDate}
                                                                    onChange={(e) => setStartDate(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
  
                                                        <div className="col-sm-3">
                                                            <div className="input-group">
                                                                <label className="form-label">End Date: </label>
                                                                <input
                                                                    type="date"
                                                                    className="form-control"
                                                                    value={endDate}
                                                                    onChange={(e) => setEndDate(e.target.value)}
                                                                />
                                                            </div>
                                                        </div> 

                                                        <div className="col-sm-3">
                                                            <div className="input-group">
                                                                <label className="form-label">Generate Masterlist: </label>   
                                                                <ExcelExport data={currentRecords} buttonStatus={generateButton} />
                                                            </div> 
                                                        </div>

                                                    </div> 

                                                    { transactions === "Hospital Bill" && 
                                                        <> 
                                                            <div className="row">
                                                                
                                                                <div className="col-sm-12">
                                                                    <hr/><br/>
                                                                    <label className="form-label mb-0">Filter Address:</label>
                                                                    <br/><br/>
                                                                </div>
 
                                                                
                                                                <div className="col-sm-3"> 
                                                                    <div className="input-group">
                                                                        <label className="form-label">Province: </label>
                                                                        
                                                                        <select
                                                                            className="form-control"
                                                                            id="hospital"
                                                                            disabled={true}>
                                                                                <option value="">Camarines Norte</option> 
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-3"> 
                                                                    <label className="form-label">Municipality:</label>
                                                                    <select
                                                                        className="form-control"
                                                                        value={patientMunicipality}
                                                                        onChange={handleMunicipalityChange}
                                                                    >
                                                                        <option value="All">All</option>
                                                                        {Object.keys(municipalityBarangays).map((municipality) => (
                                                                            <option key={municipality} value={municipality}>
                                                                                {municipality}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                            
                                                                <div className="col-3"> 
                                                                    <label className="form-label">Barangay:</label>
                                                                    <select
                                                                        className="form-control"
                                                                        value={patientBarangay}
                                                                        onChange={(e) => setPatientBarangay(e.target.value.trim())}
                                                                        /* disabled={barangayList.length === 0} */
                                                                    >
                                                                        <option value="">All</option>
                                                                        {barangayList.map((barangay) => (
                                                                            <option key={barangay} value={barangay}>
                                                                                {barangay}
                                                                            </option>
                                                                        ))} : {
                                                                            <option key={patientBarangay} value={patientBarangay}>
                                                                                {patientBarangay}
                                                                            </option>
                                                                        }
                                                            
                                                                    </select>
                                                                </div>

                                                                <div className="col-sm-12">
                                                                    <br />
                                                                    <div className="table-responsive">
                                                                        <table className="table datatable table-custom">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>No.</th>
                                                                                    <th>Patient Name</th>
                                                                                    <th>Claimant Name</th>
                                                                                    <th>Municipality</th>
                                                                                    <th>Barangay</th>
                                                                                    <th>Contact</th>
                                                                                    <th>Date Registered</th>
                                                                                    <th>Action</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody> 
                                                                                {filteredRecords.length > 0 ? (
                                                                                    filteredRecords.map((bill, index) => (
                                                                                        <tr key={bill.id}>
                                                                                            <td>{indexOfFirstRecord + index + 1}</td>
                                                                                            <td>{`${bill.patient_fname} ${bill.patient_mname} ${bill.patient_lname} ${bill.patient_ext_name || ""}`}</td>
                                                                                            <td>{`${bill.claimant_fname} ${bill.claimant_mname} ${bill.claimant_lname} ${bill.claimant_extname || ""}`}</td>
                                                                                            <td>{bill.patient_municipality}</td>
                                                                                            <td>{bill.patient_barangay}</td>
                                                                                            <td>{bill.claimant_contact}</td>
                                                                                            <td>{new Date(bill.datetime_added).toLocaleString()}</td>
                                                                                            <td>
                                                                                                <button className="btn btn-link" 
                                                                                                    onClick={() => handlePopulateDetails(bill, transactions)}
                                                                                                    data-bs-toggle="modal"
                                                                                                    data-bs-target="#viewReportModal">
                                                                                                    View
                                                                                                </button> 
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))
                                                                                ) : (
                                                                                    <tr>
                                                                                        <td colSpan="8" className="text-center">No records found</td>
                                                                                    </tr>
                                                                                )}

                                                                            </tbody>
                                                                        </table>

                                                                        <br />

                                                                        {/* Pagination Controls */}
                                                                        <div className="d-flex justify-content-between mt-3">
                                                                            <button 
                                                                                className="btn btn-secondary"
                                                                                disabled={currentPage === 1}
                                                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                                            >
                                                                                Previous
                                                                            </button>
                                                                            <span>Page {currentPage} of {totalPages}</span>
                                                                            <button 
                                                                                className="btn btn-secondary"
                                                                                disabled={currentPage === totalPages}
                                                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                                            >
                                                                                Next
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                            </div>
                                                        </> 
                                                    }


                                                    { transactions === "Burial Assistance" && 
                                                        <> 
                                                            <div className="row">
                                                                
                                                                <div className="col-sm-12">
                                                                    <hr/><br/>
                                                                    <label className="form-label mb-0">Filter Address:</label>
                                                                    <br/><br/>
                                                                </div>
 
                                                                
                                                                <div className="col-sm-3"> 
                                                                    <div className="input-group">
                                                                        <label className="form-label">Province: </label>
                                                                        
                                                                        <select
                                                                            className="form-control"
                                                                            id="hospital"
                                                                            disabled={true}>
                                                                                <option value="">Camarines Norte</option> 
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-3"> 
                                                                    <label className="form-label">Municipality:</label>
                                                                    <select
                                                                        className="form-control"
                                                                        value={patientMunicipality}
                                                                        onChange={handleMunicipalityChange}
                                                                    >
                                                                        <option value="All">All</option>
                                                                        {Object.keys(municipalityBarangays).map((municipality) => (
                                                                            <option key={municipality} value={municipality}>
                                                                                {municipality}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                            
                                                                <div className="col-3"> 
                                                                    <label className="form-label">Barangay:</label>
                                                                    <select
                                                                        className="form-control"
                                                                        value={patientBarangay}
                                                                        onChange={(e) => setPatientBarangay(e.target.value.trim())}
                                                                        /* disabled={barangayList.length === 0} */
                                                                    >
                                                                        <option value="">All</option>
                                                                        {barangayList.map((barangay) => (
                                                                            <option key={barangay} value={barangay}>
                                                                                {barangay}
                                                                            </option>
                                                                        ))} : {
                                                                            <option key={patientBarangay} value={patientBarangay}>
                                                                                {patientBarangay}
                                                                            </option>
                                                                        }
                                                            
                                                                    </select>
                                                                </div>

                                                                <div className="col-sm-12">
                                                                    <br />
                                                                    <div className="table-responsive">
                                                                        <table className="table datatable table-custom">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>No.</th>
                                                                                    <th>Deceased Name</th>
                                                                                    <th>Date of Death</th>
                                                                                    <th>Deceased Municipality</th>
                                                                                    <th>Deceased Barangay</th>
                                                                                    <th>Contact Person</th>
                                                                                    <th>Contact Number</th>
                                                                                    <th>Date Registered</th> 
                                                                                    <th>Action</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody> 
                                                                                {filteredRecords.length > 0 ? (
                                                                                    filteredRecords.map((burial, index) => (
                                                                                        <tr key={burial.burial_id}>
                                                                                            <td>{indexOfFirstRecord + index + 1}</td>
                                                                                            <td>{`${burial.deceased_fname} ${burial.deceased_mname} ${burial.deceased_lname} ${burial.deceased_ext_name || ""}`}</td>
                                                                                            <td>{new Date(burial.deceased_deathdate).toLocaleString()}</td>
                                                                                            <td>{burial.deceased_municipality}</td> 
                                                                                            <td>{burial.deceased_barangay}</td>
                                                                                            <td>{`${burial.contact_fname} ${burial.contact_mname} ${burial.contact_lname} ${burial.contact_ext_name || ""}`}</td>
                                                                                            <td>{burial.contact_number}</td> 
                                                                                            <td>{new Date(burial.savedAt).toLocaleString()}</td>
                                                                                            <td>
                                                                                                <button className="btn btn-link" 
                                                                                                    onClick={() => handlePopulateDetails(burial, transactions)}
                                                                                                    data-bs-toggle="modal"
                                                                                                    data-bs-target="#viewReportModal">
                                                                                                    View
                                                                                                </button> 
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))
                                                                                ) : (
                                                                                    <tr>
                                                                                        <td colSpan="8" className="text-center">No records found</td>
                                                                                    </tr>
                                                                                )}

                                                                            </tbody>
                                                                        </table>

                                                                        <br />

                                                                        {/* Pagination Controls */}
                                                                        <div className="d-flex justify-content-between mt-3">
                                                                            <button 
                                                                                className="btn btn-secondary"
                                                                                disabled={currentPage === 1}
                                                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                                            >
                                                                                Previous
                                                                            </button>
                                                                            <span>Page {currentPage} of {totalPages}</span>
                                                                            <button 
                                                                                className="btn btn-secondary"
                                                                                disabled={currentPage === totalPages}
                                                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                                            >
                                                                                Next
                                                                            </button>
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
                                View Reports
                            </h5>  
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">

                            { transactions === "Hospital Bill" && 
                                <>
                                    <div className="generateContainer">
                                        <h5>Generate Forms: </h5>
                                        <br />

                                        <div className="row">  
                                            <div className="col-4">
                                                <button 
                                                    type="button" 
                                                    className={`btn w-100 ${formPage === "Form 1" ? "btn-secondary" : "btn-success"}`} 
                                                    onClick={() => handleFormPageUpdate("Form 1")}
                                                >
                                                    <i className='bx bxs-file-pdf' ></i> Form 1
                                                </button>
                                            </div>

                                            <div className="col-4">
                                                <button 
                                                    type="button" 
                                                    className={`btn w-100 ${formPage === "Form 2" ? "btn-secondary" : "btn-success"}`} 
                                                    onClick={() => handleFormPageUpdate("Form 2")}
                                                >
                                                    <i className='bx bxs-file-pdf' ></i> Form 2
                                                </button>
                                            </div>

                                            <div className="col-4">
                                                <button 
                                                    type="button" 
                                                    className={`btn w-100 ${formPage === "Form 3" ? "btn-secondary" : "btn-success"}`} 
                                                    onClick={() => handleFormPageUpdate("Form 3")}
                                                >
                                                    <i className='bx bxs-file-pdf' ></i> Form 3
                                                </button>
                                            </div>

        

                                        </div>  
                                    </div> 

                                    <div className="generateContainer"> 
                                        <br />
        
                                        { formPage == "Form 1" && 
                                            <>

                                                <div className="formContent">
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

                                                            <div className="col-12">
                                                                <br />
                                                                <br />
                                                            </div>

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
                                                                    <h6 className="headerFormText">{currentDate}</h6><br/><br/>
                                                                    <p className="guaranteeLetterContent"> 
                                                                        Respectfully referred to <b>{patientFirstName} {patientMiddleName} {patientLastName}</b>, the herein attached approved request of <b>MR./MS. {claimantFirstname} {claimantMiddlename} {claimantLastname}</b> from Purok - {patientPurok}, Barangay {patientBarangay}, {patientMunicipality}, {patientProvince} for hospital bill assistance stated below:
                                                                    </p><br/><br/>

                                                                    <h5 >AMOUNT OF THE HOSPITAL BILL ASSISTANCE</h5>
                                                                    <h3 className="headerFormText">P {Number(claimantAmount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</h3><br/>

                                                                </div>
                                                            </div> 
                                                        </div>   
                                                    </div> 

                                                </div>

                                                
                                            </> 

                                        }

                                        { formPage == "Form 2" && 
                                            <> 

                                                <div className="formContent"> 
                                                    
                                                    <div className="col-12 d-flex justify-content-end"> 
                                                        <button 
                                                            type="button" 
                                                            className={`btn w-500  btn-secondary`}  
                                                            onClick={handleDownload}
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
                                                                    <b>Payee / Office:</b> {claimantFirstname} {claimantMiddlename} {claimantLastname} {claimantExtName}
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
                                                                    <b>{claimantAmount}</b>
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
                                                                    <p class="text-center"><u><b class="text-center">{claimantFirstname} {claimantMiddlename} {claimantLastname} {claimantExtName}</b></u></p>  
                                                                    <p class="text-center">Signature over Printed Name of Payee</p>    
                                                                    <p class="text-start">Date: <u>{currentDateToday}</u></p> 
                                                                </td> 
                                                            </tr>  

                                                        </tbody>
                                                    </table>

                                                 </div> 

                                            </> 
                                        }

                                        { formPage == "Form 3" && 
                                            <>
                                                <PDFViewer style={{ width: "100%", height: "800px" }}>
                                                    <PettyCashLayout                                            
                                                        claimantFirstname={claimantFirstname}                   
                                                        claimantMiddlename={claimantMiddlename}                   
                                                        claimantLastname={claimantLastname}                   
                                                        claimantExtName={claimantExtName}                   
                                                        patientPurok={patientPurok}                   
                                                        patientBarangay={patientBarangay}                   
                                                        patientMunicipality={patientMunicipality}                   
                                                        patientProvince={patientProvince}                   
                                                        claimantAmount={claimantAmount}
                                                    />
                                                </PDFViewer>
                                            </>
                                        } 
                                        

                                    </div>    
                                </>
                            }

                            { transactions === "Burial Assistance" && 
                                <>
                                    <div className="generateContainer">
                                        <h5>Generate Forms: </h5>
                                        <br />

                                        <div className="row">  
                                            <div className="col-4">
                                                <button 
                                                    type="button" 
                                                    className={`btn w-100 ${formPage === "Form 1" ? "btn-secondary" : "btn-success"}`} 
                                                    onClick={() => handleFormPageUpdate("Form 1")}
                                                >
                                                    <i className='bx bxs-file-pdf' ></i> Form 1
                                                </button>
                                            </div>

                                            <div className="col-4">
                                                <button 
                                                    type="button" 
                                                    className={`btn w-100 ${formPage === "Form 2" ? "btn-secondary" : "btn-success"}`} 
                                                    onClick={() => handleFormPageUpdate("Form 2")}
                                                >
                                                    <i className='bx bxs-file-pdf' ></i> Form 2
                                                </button>
                                            </div>

                                            <div className="col-4">
                                                <button 
                                                    type="button" 
                                                    className={`btn w-100 ${formPage === "Form 3" ? "btn-secondary" : "btn-success"}`} 
                                                    onClick={() => handleFormPageUpdate("Form 3")}
                                                >
                                                    <i className='bx bxs-file-pdf' ></i> Form 3
                                                </button>
                                            </div>

        

                                        </div>  
                                    </div> 

                                    <div className="generateContainer"> 
                                        <br />
        
                                        { formPage == "Form 1" && 
                                            <>
                                                <div className="col-12 d-flex justify-content-end"> 
                                                    <button 
                                                        type="button" 
                                                        className={`btn w-500  btn-secondary`}  
                                                        onClick={handleDownload}
                                                    >
                                                        <i className='bx bxs-file-pdf' ></i> Download
                                                    </button>
                                                </div><br />
 
                                            </> 

                                        }
 
                                        

                                    </div>    
                                </>
                            }

                            

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

export default ManageReportContent;
 