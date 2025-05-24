import { useState, useEffect, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchLocalUserDetails from "./scripts/FetchLocalUser";
import * as port from "../ports/DatabaseRouting" 

function ManageHospitalBillContent() {
    const { localUserDetails } = FetchLocalUserDetails();
    const [account_id, setLocalUserId] = useState(null);

    const navigate = useNavigate(); // Use navigate for redirection 

    // Variables for inputs ------------------------------------------------------------
    const [billId, setHospitalId] = useState('');
    const [patientFirstName, setPatientFirstName] = useState('');
    const [patientMiddleName, setPatientMiddleName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const [patientExtName, setPatientExtName] = useState('');
    const [patientPurok, setPatientPurok] = useState('');
    const [patientBarangay, setPatientBarangay] = useState('');
    const [patientMunicipality, setPatientMunicipality] = useState('');
    const [patientProvince, setPatientProvince] = useState('Camarines Norte');
    const [barangayList, setBarangayList] = useState([]);
    const [patientHospital, setPatientHospital] = useState('');
    const [dateConfinement, setDateConfinement] = useState('');

    const [claimantFirstname, setClaimantFname] = useState('');
    const [claimantMiddlename, setClaimantMname] = useState('');
    const [claimantLastname, setClaimantLname] = useState('');
    const [claimantExtName, setClaimantExtName] = useState('');
    const [claimantRelationship, setClaimantRelationship] = useState('');
    const [claimantContact, setClaimantContact] = useState('');
    const [claimantAmount, setClaimantAmount] = useState('');

    const [hospitalBillStatus, setHospitalBillStatus] = useState('Pending');
    const [checkedItems, setCheckedItems] = useState({
        checkBarangayIndigency: 0,
        checkMedicalCertificate: 0,
        checkFinalBill: 0,
        checkValidId: 0
    });

    const [remarks, setRemarks] = useState('');
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
    };
    
    // Variables for inputs ------------------------------------------------------------

    const [contactPersonFirstname, setContactPersonFname] = useState('');
    const [contactPersonMiddlename, setContactPersonMname] = useState('');
    const [contactPersonLastname, setContactPersonLname] = useState('');
    const [contactPersonExtName, setContactPersonExtName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [contactPersonAmount, setContactPersonAmount] = useState('');

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
    const [contactPersonProvince, setContactPersonProvince] = useState('Camarines Norte');
    const [contactPersonMunicipality, setContactPersonMuncipality] = useState('');
    const [contactPersonBarangay, setContactPersonBarangay] = useState('');
    const [contactBarangayList, setContactBarangayList] = useState([]);
    const [contactPersonPurok, setContactPersonPurok] = useState('');

    const [PSWDOInterviewStatus, setPSWDOInterviewStatus] = useState(false);
    const [PSWDOId, setPSWDOId] = useState("");
    const [typeOfAssistance, setTypeOfAssistance] = useState('Medical');
    const [member4Ps, setMember4Ps] = useState('No');

    const [familyCount, setFamilyCount] = useState(0);
    const [familyComposition, setFamilyComposition] = useState([]);

    // Variables for hospital bills -------------------------------
    const [hospitalBills, setHospitalBills] = useState([]);
    // Variables for hospital bills -------------------------------

    // Variables for pagination -------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const [selectedBill, setSelectedBill] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [modalName, setModalName] = useState();
    // Variables for pagination -------------------------------

    const [formPage, setFormPage] = useState("Basic Information");
 
    const handleAddHospitalBill = async (e) => {
        e.preventDefault();

        const currentDateTime = new Date().toISOString().slice(0, 19).replace("T", " ");
        const transactionName = "Hospital Bill";
        const alayPagDamayID = null;

        try {
            const hospitalBillPayload = {
                account_id, patientFirstName, patientMiddleName, patientLastName, patientExtName,
                patientPurok, patientBarangay, patientMunicipality, patientProvince, dateConfinement, patientHospital,
                claimantFirstname, claimantMiddlename, claimantLastname, claimantExtName, claimantRelationship, claimantContact,
                claimantAmount, hospitalBillStatus,
                barangayIndigency: checkedItems.checkBarangayIndigency,
                checkMedicalCertificate: checkedItems.checkMedicalCertificate,
                checkFinalBill: checkedItems.checkFinalBill,
                validId: checkedItems.checkValidId,
                remarks,
                currentDateTime
            }; 

            // 🔹 Step 1: Insert Hospital Bill
            const billResponse = await fetch(port.PortInsertHospitalBill, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(hospitalBillPayload)
            });

            const billData = await billResponse.json();

            if (!billResponse.ok) {
                throw new Error(billData.error || "Failed to insert hospital bill.");
            }

            const hospitalId = billData.bill_id;
            if (!hospitalId) {
                throw new Error("Hospital ID not returned from server.");
            } 

            const contactPersonMobileNum = claimantContact;

            // 🔹 Step 2: Insert PSWDO Interview
            const interviewPayload = {
                hospitalId, alayPagDamayID, contactPersonAge, contactPersonCivilStatus, contactPersonOccupation,
                contactPersonIncome, contactPersonGender, contactPersonMobileNum, contactPersonPettyAmount: claimantAmount,
                patientProvince, patientMunicipality, patientBarangay, patientPurok,
                familyComposition, transactionName, typeOfAssistance, member4Ps
            };

            const interviewResponse = await fetch(port.PortInsertPSWDOInterview, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(interviewPayload)
            });

            const interviewData = await interviewResponse.json();

            if (!interviewResponse.ok) {
                throw new Error(interviewData.error || "Failed to insert PSWDO interview.");
            }

            // 🔹 Success
            Swal.fire({
                icon: "success",
                title: "Transaction Successful",
                text: "Hospital bill and PSWDO interview have been recorded successfully!",
            }).then(() => {
                ResetForms(); // Clear form on success
            });

        } catch (err) {
            console.error("Error:", err.message);
            Swal.fire({
                icon: "error",
                title: "Transaction Failed",
                text: err.message || "An error occurred while saving the data.",
            });
        }
    };  

    const handleDeleteHospitalBill = async (e, billId) => {
        e.preventDefault(); 

        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the hospital bill record permanently!",
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
                    const response = await fetch(port.PortDeleteHospitalBill, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ billId }) // Send the billId to the server
                    });

                    const serverResult = await response.json(); // Renamed result to serverResult

                    if (response.ok) {
                        Swal.fire('Deleted!', serverResult.message, 'success'); // Success message 
                    } else {
                        Swal.fire('Error!', serverResult.error, 'error');
                    }
                } catch (error) {
                    console.error("Error deleting hospital bill:", error);
                    Swal.fire('Error!', 'An error occurred while deleting the bill.', 'error');
                }
            } else {
                // If canceled
                Swal.fire('Cancelled', 'The hospital bill was not deleted.', 'info');
            }
        });
    };



    const handleUpdateHospitalBill = async (e) => {
        e.preventDefault();

        const currentDateTime = new Date().toISOString().slice(0, 19).replace("T", " "); 

        try {
            // 🔹 Update Hospital Bill
            const billResponse = await fetch(port.PortUpdateHospitalBill, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    billId, account_id,
                    patientFirstName, patientMiddleName, patientLastName, patientExtName,
                    patientPurok, patientBarangay, patientMunicipality, patientProvince, dateConfinement, patientHospital,
                    claimantFirstname, claimantMiddlename, claimantLastname, claimantExtName, claimantRelationship, claimantContact,
                    claimantAmount, hospitalBillStatus,
                    barangayIndigency: checkedItems.checkBarangayIndigency,
                    checkMedicalCertificate: checkedItems.checkMedicalCertificate,
                    checkFinalBill: checkedItems.checkFinalBill,
                    validId: checkedItems.checkValidId,
                    remarks,
                    currentDateTime
                })
            });

            const billData = await billResponse.json();

            if (!billResponse.ok) {
                throw new Error(billData.error || "Failed to update hospital bill.");
            }

            // 🔹 Update PSWDO Interview
            const contactPersonMobileNum = claimantContact;
            const id = billId;
            const transactionName = "Hospital Bill";

            const interviewResponse = await fetch(port.PortUpdatePSDOInterview, {
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
                        id: member.family_id || null,
                        name: member.name,
                        relationship: member.relationship,
                        age: member.age,
                        civilStatus: member.civilStatus,
                        occupation: member.occupation,
                        monthlyIncome: member.monthlyIncome,
                    })),
                }),
            });

            const interviewData = await interviewResponse.json();

            if (!interviewResponse.ok) {
                throw new Error(interviewData.error || "Failed to update PSWDO interview.");
            }

            // 🔹 Success
            Swal.fire({
                icon: "success",
                title: "Transaction Successful",
                text: "Hospital bill and PSWDO interview have been updated successfully!",
            });

        } catch (err) {
            console.error("Error:", err.message);
            Swal.fire({
                icon: "error",
                title: "Transaction Failed",
                text: err.message || "An error occurred while updating the data.",
            });
        }
    };


    const fetchHospitalBills = async () => {
        try {
            const response = await fetch(port.PortRetrieveHospitalBill);
            const data = await response.json();
            setHospitalBills(data);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    // Handle any real-time updates (for example, using WebSockets or polling)
    useEffect(() => {
        const interval = setInterval(() => {
            fetchHospitalBills();
        }, 2000); // Refresh every 5 seconds (you can adjust the time)

        return () => clearInterval(interval); // Cleanup interval when the component unmounts
    }, []);

    // Pagination Logic
    /* const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = hospitalBills.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(hospitalBills.length / recordsPerPage); */

    /* const filteredRecords = hospitalBills.filter((bill) => {
        const fullName = `${bill.patient_fname} ${bill.patient_mname} ${bill.patient_lname} ${bill.patient_ext_name || ""}`.toLowerCase();
        return fullName.includes(searchTerm);
    });
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage); */

    // 1. Sort first, THEN paginate
    const sortedRecords = [...hospitalBills].sort(
        (a, b) => new Date(b.datetime_added) - new Date(a.datetime_added)
    );

    // 2. Apply search filter
    const filteredRecords = sortedRecords.filter((bill) => {
        const fullName = `${bill.patient_fname} ${bill.patient_mname} ${bill.patient_lname} ${bill.patient_ext_name || ""}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    // 3. Paginate
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);


    const fetchPSWDOInterviewId = async (hospitalId) => {
        try {
            const response = await fetch(port.RetrievePSWDOInterview(hospitalId, "Hospital Bill"));
            const data = await response.json();
 
            PopulatePSWDOInterview(data);

        } catch (error) {
            console.error("Error fetching hospital bill assistance:", error); // Fix the log message
        }
    };
    

    // Open modal and set selected bill
    const handleOpenModal = (bill, editMode = false, modalName) => {
        setSelectedBill(bill);
        setIsEditMode(editMode);
        setModalName(modalName);
        PopulateForms(bill); 
        fetchPSWDOInterviewId(bill['hospital_bill_id'])

        if (modalName == "View") {

            navigate(`/admin/view_hospital_bill/${bill['hospital_bill_id']}`);
        }
    };

    const handleAddRecord = (editMode = false, modalName) => {
        /* ResetForms(); */
        setIsEditMode(editMode);
        setModalName(modalName)
    };

    const PopulateForms = (bill) => { 
        setHospitalId(bill['hospital_bill_id']);
        setPatientFirstName(bill['patient_fname']);
        setPatientMiddleName(bill['patient_mname']);
        setPatientLastName(bill['patient_lname']);
        setPatientExtName(bill['patient_ext_name']);
        setPatientPurok(bill['patient_purok']);
        setPatientBarangay(bill['patient_barangay']);
        setPatientMunicipality(bill['patient_municipality']);
        setPatientProvince(bill['patient_province']);setDateConfinement(new Date(bill['date_confinement']).toISOString().split('T')[0]);
        setDateConfinement(new Date(bill['date_confinement']).toISOString().split('T')[0]);
        setPatientHospital(bill['patient_hospital']);
        setClaimantFname(bill['claimant_fname']);
        setClaimantMname(bill['claimant_mname']);
        setClaimantLname(bill['claimant_lname']);
        setClaimantExtName(bill['claimant_extname']);

        // ✅ Fix for the select tag issue
        setClaimantRelationship(bill['claimant_relationship']?.trim() || "");

        setClaimantContact(bill['claimant_contact']);
        setClaimantAmount(bill['claimant_amount']);

        document.getElementById("relationship").value = bill['claimant_relationship']

        setHospitalBillStatus(bill['hospital_bill_status']);
        setCheckedItems({
            checkBarangayIndigency: bill['check_barangay_indigency'] == "1",
            checkMedicalCertificate: bill['check_med_certificate'] == "1",
            checkFinalBill: bill['check_hospital_bill'] == "1",
            checkValidId: bill['check_valid_id'] == "1",
        });

        setRemarks(bill['remarks']); 
    };

    const PopulatePSWDOInterview = (PSWDOInterview) => {

        if (!PSWDOInterview?.error) {
            const interview = PSWDOInterview.interview || {};

            console.log(PSWDOInterview)

            setPSWDOInterviewStatus(true);

            setPSWDOId(interview.pswdo_interview_id || '');
            setContactPersonAge(interview.age || '');
            setContactPersonCivilStatus(interview.civil_status || '');
            setContactPersonOccupation(interview.occupation || '');
            setContactPersonIncome(interview.monthly_income || '');
            setContactPersonGender(interview.gender || '');
            setContactPersonMobileNum(interview.mobile_num || '');
            setContactPersonPettyAmount(interview.petty_amount || '');
            setContactPersonProvince(interview.province || '');
            setContactPersonMuncipality(interview.municipality || '');
            setContactPersonBarangay(interview.barangay || '');
            setContactPersonPurok(interview.purok || '');
            setContactPersonTransactionName(interview.transaction_name || '');
            setTypeOfAssistance(interview.type_assistance || 'Medical');
            setMember4Ps(interview.member_4ps || 'No');

            if (Array.isArray(PSWDOInterview.familyComposition)) {
                const filledData = PSWDOInterview.familyComposition.map(member => ({
                    name: member.family_member_name || '',
                    relationship: member.relationship || '',
                    age: member.age || '',
                    civilStatus: member.civil_status || '',
                    occupation: member.occupation || '',
                    monthlyIncome: member.monthly_income || '',
                }));

                setFamilyCount(filledData.length);
                setFamilyComposition(filledData); 
            }
        }  
    };

    const ResetForms = () => {
        // ✅ Reset all input fields after successful save
        setPatientFirstName('');
        setPatientMiddleName('');
        setPatientLastName('');
        setPatientExtName('');
        setPatientPurok('');
        setPatientBarangay('');
        setPatientMunicipality('');
        setPatientProvince('');
        setPatientHospital('');
        setClaimantFname('');
        setClaimantMname('');
        setClaimantLname('');
        setClaimantExtName('');
        setClaimantRelationship('');
        setClaimantContact('');
        setClaimantAmount('');
        setHospitalBillStatus('');
        setCheckedItems({
            checkBarangayIndigency: 0,
            checkMedicalCertificate: 0,
            checkFinalBill: 0,
            checkValidId: 0,
        });
        setRemarks('');

        setPSWDOInterviewStatus(false);

        setPSWDOId('');
        setContactPersonAge('');
        setContactPersonCivilStatus('');
        setContactPersonOccupation('');
        setContactPersonIncome('');
        setContactPersonGender('');
        setContactPersonMobileNum('');
        setContactPersonPettyAmount('');
        setContactPersonProvince('');
        setContactPersonMuncipality('');
        setContactPersonBarangay('');
        setContactPersonPurok('');
        setContactPersonTransactionName('');
        setTypeOfAssistance('Medical');
        setMember4Ps('No');
 
        setFamilyCount(0);

    }

    useEffect(() => {
        if (localUserDetails) { 
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
            "Bulhao", "Cabatuhan", "Cabusay", "Calabasa", "Canapawan", "Daguit", "Dalas", "Dumagmang", "Exciban", "Fundado", "Guinacutan", "Guisican", "Gumamela", "Iberica",
            "Kalamunding", "Lugui", "Mabilo I", "Mabilo II", "Macogon", "Mahawan-hawan", "Malangcao-Basud", "Malasugui", "Malatap", "Malaya", "Malibago", "Maot", "Masalong",
            "Matanlang", "Napaod", "Pag-asa", "Pangpang", "Pinya", "San Antonio", "San Francisco", "Santa Cruz", "Submakin", "Talobatib", "Tigbinan", "Tulay na Lupa"],

        "Mercedes": [
            "Apuao", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Barangay V", "Barangay VI", "Barangay VII", "Caringo", "Catandunganon", "Cayucyucan", "Colasi",
            "Del Rosario", "Gaboc", "Hamoraon", "Hinipaan", "Lalawigan", "Lanot", "Mambungalon", "Manguisoc", "Masalongsalong", "Matoogtoog", "Pambuhan", "Quinapaguian", "San Roque", "Tarum"
        ],

        "Paracale": [
            "Awitan", "Bagumbayan", "Bakal", "Batobalani", "Calaburnay", "Capacuan", "Casalugan", "Dagang", "Dalnac", "Dancalan", "Gumaus", "Labnig", "Macolabo Island",
            "Malacbang", "Malaguit", "Mampungo", "Mangkasay", "Maybato", "Palanas", "Pinagbirayan Malaki", "Pinagbirayan Munti", "Poblacion Norte", "Poblacion Sur",
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

    const handleMunicipalityClaimantChange = (e) => {
        const selectedMunicipality = e.target.value.trim();
        setContactPersonMuncipality(selectedMunicipality);
        setContactPersonBarangay(''); // Reset barangay selection
        setContactBarangayList(municipalityBarangays[selectedMunicipality] || []);
    };

    const handleFormPageUpdate = (formPageNumber) => {
        setFormPage(formPageNumber);
    }

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setCheckedItems((prevState) => ({
            ...prevState, 
            [id]: checked ? 1 : 0
        })); 
    };


    return (
        <>
            <main id="main" className="main">
                <div className="content">
                    <h1 style={{ fontWeight: 'bold', color: '#08533F' }}>Manage Hospital Bill</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item" style={{ fontWeight: 'lighter', color: '#08533F' }}>
                                <a>Assistance Registry Management</a>
                            </li>
                            <li className="breadcrumb-item active" style={{ color: '#08533F' }}>Hospital Bill</li>
                        </ol>
                    </nav>
                </div>

                <hr style= {{border: '1px solid #0A3622'}}/>

                <main className="py-6"  >
                    <div className="container-fluid">
                        <section className="section dashboard">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-xxl-12 col-md-12">
                                            <div className="card info-card sales-card">
                                                <div className="card-body"style={{backgroundColor: '#F2FFEE'}}>
                                                    <div className="d-flex justify-content-between align-items-center" >
                                                        <h5 className="card-title" style={{fontWeight: 'bold', color: '#08533F', fontSize: '25px'}}>List of Hospital Bill</h5>
                                                    </div>

                                                    {/* Filter and Search Section */}
                                                    <div className="row mb-3">
                                                        <div className="col-sm-3">
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="searchInput"
                                                                    placeholder="Search Client Name"
                                                                    onChange={handleSearch}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6"></div>
                                                        <div className="input-group-btn col-sm-3">
                                                            <div className="input-group d-flex justify-content-end" >
                                                                <button
                                                                    className="addbutton btn btn-sm"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#addHospitalBillModal"
                                                                    onClick={() => handleAddRecord(true, "Add")}
                                                                >
                                                                    + Add Record to Hospital Bill
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="table-responsive">
                                                        <table className="table datatable table-custom">
                                                            <thead>
                                                                <tr>
                                                                    <th>No.</th>
                                                                    <th>Patient Name</th>
                                                                    <th>Claimant Name</th>
                                                                    <th>Contact</th>
                                                                    <th>Datetime Registered</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {currentRecords.length > 0 ? (
                                                                    currentRecords.map((bill, index) => (
                                                                        <tr key={bill.id}>
                                                                            <td>{indexOfFirstRecord + index + 1}</td>
                                                                            <td>{`${bill.patient_fname} ${bill.patient_mname} ${bill.patient_lname} ${bill.patient_ext_name || ""}`}</td>
                                                                            <td>{`${bill.claimant_fname} ${bill.claimant_mname} ${bill.claimant_lname} ${bill.claimant_extname || ""}`}</td>
                                                                            <td>{bill.claimant_contact}</td>
                                                                            <td>{new Date(bill.datetime_added).toLocaleString("en-PH", { hour12: false })}</td>
                                                                            <td>
                                                                                <button className="btn btn-success" onClick={() => handleOpenModal(bill, true, "View")}>
                                                                                    <i className='bx bx-info-circle'></i>
                                                                                </button>
                                                                                <button className="btn btn-primary"
                                                                                    onClick={() => handleOpenModal(bill, true, "Edit")}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#addHospitalBillModal">
                                                                                    <i className='bx bx-edit'></i>
                                                                                </button>
                                                                                <button className="btn btn-danger"
                                                                                    onClick={(e) => handleDeleteHospitalBill(e, bill['hospital_bill_id'])}>
                                                                                    <i className='bx bx-trash'></i>
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="6" className="text-center">No records found</td>
                                                                    </tr>
                                                                )}

                                                            </tbody>

                                                        </table>

                                                        <br />

                                                        {/* Pagination Controls */}
                                                        <div className="d-flex justify-content-between mt-3" >
                                                            <button
                                                                className="nextprevbutton btn" style={{width: '10%'}}
                                                                disabled={currentPage === 1 || totalPages === 0}
                                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                            >
                                                                Previous
                                                            </button>
                                                            <span>Page {totalPages > 0 ? currentPage : 0} of {totalPages}</span>
                                                            <button
                                                                className="nextprevbutton btn" style={{width: '10%'}}
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
            <div className="modal fade" id="addHospitalBillModal" tabIndex="-1" aria-labelledby="addHospitalBillModal" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addHospitalBillModalLabel" style={{fontWeight: 'bold', color: '#0C623A', fontSize: '30px'}}> 
                            &nbsp;&nbsp;&nbsp;Add Record to Hospital Bill
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>

                                <div className="generateContainer" style={{border: '1.5px solid #CDCDCD'}}>
                                    <br />
                                    <h5 style={{color: '#0C623A'}}>Select Section: </h5>
                                    
                                    <div className="row">
                                        <div className="col-4">
                                            <button
                                                type="button"
                                                className={`btn w-100 ${formPage === "Basic Information" ? "selebtn" : "selesuccbtn"}`}
                                                onClick={() => handleFormPageUpdate("Basic Information")}
                                            >
                                                <i class="bi bi-person-vcard"></i> Basic Information
                                            </button>
                                        </div>

                                        <div className="col-4">
                                            <button
                                                type="button"
                                                className={`btn w-100 ${formPage === "Checklist" ? "selebtn" : "selesuccbtn"}`}
                                                onClick={() => handleFormPageUpdate("Checklist")}
                                            >
                                                <i class="bi bi-card-checklist"></i> Hospital Bill Requirements
                                            </button>
                                        </div>
 
                                        <div className="col-4">
                                            <button
                                                type="button"
                                                className={`btn w-100 ${formPage === "PSWDO Interview" ? "selebtn" : "selesuccbtn"}`}
                                                onClick={() => handleFormPageUpdate("PSWDO Interview")}
                                            >
                                                <i class="bi bi-card-checklist"></i> PSWDO Interview
                                            </button>
                                        </div>


                                    </div>
                                </div>

                                {formPage == "Basic Information" &&
                                    <>

                                        <div className="formContainer" style={{border: '1.5px solid #CDCDCD'}}>
                                            <h3 style={{fontWeight: 'bold', color: '#0C623A', fontSize: '26px'}}>Patient Information</h3><br />
                                            <div className="row">
                                                <div className="col-3">
                                                    <label htmlFor="firstName" className="form-label">First Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="firstName"
                                                        value={patientFirstName}
                                                        onChange={(e) => setPatientFirstName(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-3">
                                                    <label htmlFor="middleName" className="form-label">Middle Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="middleName"
                                                        value={patientMiddleName}
                                                        onChange={(e) => setPatientMiddleName(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-3">
                                                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="lastName"
                                                        value={patientLastName}
                                                        onChange={(e) => setPatientLastName(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-3">
                                                    <label htmlFor="extName" className="form-label">Ext Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="extName"
                                                        value={patientExtName}
                                                        onChange={(e) => setPatientExtName(e.target.value.trim())}
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
                                                        value={patientBarangay}
                                                        onChange={(e) => setPatientBarangay(e.target.value.trim())}
                                                        disabled={barangayList.length === 0}
                                                    >
                                                        <option value="">Select Barangay</option>
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

                                                <div className="col-3">
                                                    <br />
                                                    <label htmlFor="extName" className="form-label">Date of Confinement:</label>

                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={dateConfinement}
                                                        onChange={(e) => {
                                                            setDateConfinement(e.target.value); 
                                                        }}
                                                    />

                                                </div>

                                                <div className="col-3">
                                                    <br />
                                                    <label htmlFor="extName" className="form-label">Hospital:</label>


                                                    <select
                                                        className="form-control"
                                                        id="hospital"
                                                        value={patientHospital}
                                                        onChange={(e) => setPatientHospital(e.target.value)} >
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
                                            <hr/>
                                            <br />
                                            <h3 style={{fontWeight: 'bold', color: '#0C623A', fontSize: '26px'}}>Claimant Information</h3><br />
                                            <div className="row">
                                                <div className="col-3">
                                                    <label htmlFor="firstName" className="form-label">First Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="firstName"
                                                        value={claimantFirstname}
                                                        onChange={(e) => setClaimantFname(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-3">
                                                    <label htmlFor="middleName" className="form-label">Middle Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="middleName"
                                                        value={claimantMiddlename}
                                                        onChange={(e) => setClaimantMname(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-3">
                                                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="lastName"
                                                        value={claimantLastname}
                                                        onChange={(e) => setClaimantLname(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-3">
                                                    <label htmlFor="extName" className="form-label">Ext Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="extName"
                                                        value={claimantExtName}
                                                        onChange={(e) => setClaimantExtName(e.target.value)}
                                                    />
                                                </div>


                                                <div className="col-3">
                                                    <br />
                                                    <label htmlFor="relationship" className="form-label">Relationship:</label>
                                                    <select
                                                        className="form-control"                  
                                                        id="relationship"
                                                        value={claimantRelationship}
                                                        onChange={(e) => setClaimantRelationship(e.target.value)}
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
                                                        onChange={(e) => setClaimantContact(e.target.value)}
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
                                                        onChange={(e) => setClaimantAmount(e.target.value)}
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
                                                <div className="formContainer" style={{border: '1.5px solid #CDCDCD'}}>
                                                    <h3 style={{fontWeight: 'bold', color: '#0C623A', fontSize: '26px'}}>Hospital Bill Status: </h3><br />
                                                    <p style={{color: '#0C623A'}}>Current Status: <b>{hospitalBillStatus}</b></p>

                                                    <select
                                                        className="form-control"
                                                        id="relationship"
                                                        value={hospitalBillStatus}
                                                        onChange={(e) => setHospitalBillStatus(e.target.value)}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>

                                                </div>
                                                <br />
                                            </div>


                                            <div className="col-12">
                                                <div className="formContainer" style={{border: '1.5px solid #CDCDCD'}}>
                                                    <h3 style={{fontWeight: 'bold', color: '#0C623A', fontSize: '26px'}}>Requirements Checklist:</h3>
                                                    <br />
                                                    <ul className="list-group">
                                                        <li className="list-group-item">
                                                            <input className="form-check-input me-1" type="checkbox" id="checkBarangayIndigency"
                                                                checked={checkedItems.checkBarangayIndigency}
                                                                onChange={handleCheckboxChange} />
                                                            <label className="form-check-label" htmlFor="checkBarangayIndigency">&nbsp; Barangay Indigency (2 Original)</label>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <input className="form-check-input me-1" type="checkbox" id="checkMedicalCertificate"
                                                                checked={checkedItems.checkMedicalCertificate}
                                                                onChange={handleCheckboxChange} />
                                                            <label className="form-check-label" htmlFor="checkMedicalCertificate">&nbsp; Medical Certificate or Medical Abstract (2 Copies)</label>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <input className="form-check-input me-1" type="checkbox" id="checkFinalBill"
                                                                checked={checkedItems.checkFinalBill}
                                                                onChange={handleCheckboxChange} />
                                                            <label className="form-check-label" htmlFor="checkFinalBill">&nbsp; Hospital Bill (2 Copies)</label>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <input className="form-check-input me-1" type="checkbox" id="checkValidId"
                                                                checked={checkedItems.checkValidId}
                                                                onChange={handleCheckboxChange} />
                                                            <label className="form-check-label" htmlFor="checkValidId">&nbsp; Valid Identification (2 Copies)</label>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <br />
                                                <div className="formContainer" style={{border: '1.5px solid #CDCDCD'}}> 
                                                    <h3 style={{fontWeight: 'bold', color: '#0C623A', fontSize: '26px'}}>Remarks:</h3>
                                                    <br />

                                                    <textarea className="form-control" id="remarks" placeholder="Enter your remarks here" rows={5}
                                                        value={remarks}
                                                        onChange={(e) => setRemarks(e.target.value)} >
                                                    </textarea>

                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {formPage === "PSWDO Interview" && (
                                    <> 

                                        <div className="col-lg-12">
                                            <div className="row">
                                                <div className="col-xxl-12 col-md-12">
                                                    <div className="card info-card sales-card">
                                                        <div className="card-body" style={{border: '1.5px solid #CDCDCD'}}>

                                                            <br/>
         
                                                            <div >
                                                                <b className="form-label" style={{fontSize: '20px'}}>PSWDO Interview</b>
                                                                <hr />

                                                                <div className="row">

                                                                    <div className="col-12">
                                                                        <p htmlFor="firstName" className="formtitle">Claimant Information</p>
                                                                    </div>

                                                                    <div className="col-3">
                                                                        <label htmlFor="firstName" className="interviewform">First Name:</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="firstName"
                                                                            value={patientFirstName}
                                                                            onChange={(e) => setPatientFirstName(e.target.value)}
                                                                            placeholder="First Name"
                                                                            disabled={true}
                                                                        />
                                                                    </div>

                                                                    <div className="col-3">
                                                                        <label htmlFor="firstName" className="interviewform">Middle Name:</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="firstName"
                                                                            value={patientMiddleName}
                                                                            onChange={(e) => setPatientMiddleName(e.target.value)}
                                                                            placeholder="Middle Name"
                                                                            disabled={true}
                                                                        />
                                                                    </div>

                                                                    <div className="col-3">
                                                                        <label htmlFor="firstName" className="interviewform">Last Name:</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="firstName"
                                                                            value={patientLastName}
                                                                            onChange={(e) => setPatientLastName(e.target.value)}
                                                                            placeholder="Last Name"
                                                                            disabled={true}
                                                                        />
                                                                    </div>

                                                                    <div className="col-3">
                                                                        <label htmlFor="firstName" className="interviewform">Ext Name:</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="firstName"
                                                                            value={patientExtName}
                                                                            onChange={(e) => setPatientExtName(e.target.value)}
                                                                            placeholder="Ext"
                                                                            disabled={true}
                                                                        />
                                                                    </div>


                                                                    <div className="col-3">
                                                                        <br />
                                                                        <label htmlFor="firstName" className="interviewform">Age:</label>
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
                                                                        <br />
                                                                        <label htmlFor="firstName" className="interviewform">Civil Status:</label>
                                                                        <select
                                                                            className="form-control"
                                                                            value={contactPersonCivilStatus}
                                                                            onChange={(e) => setContactPersonCivilStatus(e.target.value)}>
                                                                            <option value="">Select Civil Status</option>
                                                                            <option value="Single">Single</option>
                                                                            <option value="Married">Married</option>
                                                                            <option value="Widowed">Widowed</option>
                                                                            <option value="Separated">Separated</option>
                                                                            <option value="Common-Law Married">Common-Law Married</option>
                                                                            <option value="Lived-in-Partener">Lived-in-Partener</option> 
                                                                        </select>
                                                                    </div>

                                                                    <div className="col-3">
                                                                        <br />
                                                                        <label htmlFor="firstName" className="interviewform">Occupation:</label>
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
                                                                        <br />
                                                                        <label htmlFor="firstName" className="interviewform">Monthly Income:</label>
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            id="firstName"
                                                                            value={contactPersonIncome}
                                                                            onChange={(e) => setContactPersonIncome(e.target.value)}
                                                                            placeholder="Monthly  Income"
                                                                        />
                                                                    </div>

                                                                    <div className="col-3">
                                                                        <br />
                                                                        <label htmlFor="firstName" className="interviewform">Gender:</label>
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
                                                                        <br />
                                                                        <label htmlFor="firstName" className="interviewform">Mobile Number:</label>
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            id="firstName"
                                                                            value={claimantContact}
                                                                            onChange={(e) => setClaimantContact(e.target.value)}
                                                                            placeholder="Mobile Number"
                                                                            disabled={true}
                                                                        />
                                                                    </div>

                                                                    <div className="col-3">
                                                                        <br />
                                                                        <label htmlFor="firstName" className="interviewform">Petty Amount:</label>
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            id="firstName"
                                                                            disabled={true}
                                                                            value={claimantAmount}
                                                                            onChange={(e) => setClaimantAmount(e.target.value)}
                                                                            placeholder="Petty Amount"
                                                                        />
                                                                    </div>

                                                                    <div className="col-3">
                                                                        <br />
                                                                    </div>

                                                                    <div className="col-3">
                                                                        <br />
                                                                        <label className="interviewform">Province:</label>
                                                                        <select
                                                                            className="form-control"
                                                                            value={contactPersonProvince}
                                                                            disabled
                                                                        >
                                                                            <option value="Camarines Norte">Camarines Norte</option>
                                                                        </select>
                                                                    </div>

                                                                    {/* Municipality */}
                                                                    <div className="col-3">
                                                                        <br />
                                                                        <label className="interviewform">Municipality:</label>
                                                                        <select
                                                                            className="form-control"
                                                                            value={contactPersonMunicipality}
                                                                            onChange={handleMunicipalityClaimantChange} 
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
                                                                        <label className="interviewform">Barangay:</label>
                                                                        <select
                                                                            className="form-control"
                                                                            value={contactPersonBarangay}
                                                                            onChange={(e) => setContactPersonBarangay(e.target.value.trim())}
                                                                            disabled={contactBarangayList.length === 0}
                                                                        >
                                                                            <option value="">Select Barangay</option>
                                                                            {contactBarangayList.map((barangay) => (
                                                                                <option key={barangay} value={barangay}>
                                                                                    {barangay}
                                                                                </option>
                                                                            ))} : {
                                                                                <option key={contactPersonBarangay} value={contactPersonBarangay}>
                                                                                    {contactPersonBarangay}
                                                                                </option>
                                                                            }
                                                                        </select>
                                                                    </div>

                                                                    {/* Purok */}
                                                                    <div className="col-3">
                                                                        <br />
                                                                        <label className="interviewform">Purok:</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={contactPersonPurok}
                                                                            onChange={(e) => setContactPersonPurok(e.target.value)}
                                                                        />
                                                                    </div>

                                                                    <div className="col-12"> 
                                                                        <hr /> 
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
                                                                        
                                                                        <hr />
                                                                        <p htmlFor="firstName" className="formtitle">Family Composition</p>
                                                                    </div>

                                                                    <div className="col-12">
                                                                        
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
                                                                                    monthlyIncome: '',
                                                                                });
                                                                                setFamilyComposition(newComposition);
                                                                            }}
                                                                        />
                                                                    </div>


                                                                    {/* --------- */}
                                                                    {familyComposition.map((member, index) => (
                                                                        <Fragment key={member.id || index}>
                                                                            <div className="col-12">
                                                                                <br /> <hr/>
                                                                                <label className="form-label" style={{fontWeight: 'bold'}}>Family Member {index + 1}</label>
                                                                            </div>

                                                                            <div className="col-4">
                                                                                    <br/>   
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
                                                                                <select
                                                                                    className="form-control"
                                                                                    value={member.relationship || ''}
                                                                                    onChange={(e) => {
                                                                                        const updated = familyComposition.map((item, i) =>
                                                                                            i === index ? { ...item, relationship: e.target.value } : item
                                                                                        );
                                                                                        setFamilyComposition(updated);
                                                                                    }}>
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
                                                                                <select
                                                                                    className="form-control"
                                                                                    value={member.civilStatus || ''}
                                                                                    onChange={(e) => {
                                                                                        const updated = familyComposition.map((item, i) =>
                                                                                            i === index ? { ...item, civilStatus: e.target.value } : item
                                                                                        );
                                                                                        setFamilyComposition(updated);
                                                                                    }}>
                                                                                    <option value="">Select Civil Status</option>
                                                                                    <option value="Single">Single</option>
                                                                                    <option value="Married">Married</option>
                                                                                    <option value="Widowed">Widowed</option>
                                                                                    <option value="Separated">Separated</option>
                                                                                    <option value="Common-Law Married">Common-Law Married</option>
                                                                                    <option value="Lived-in-Partener">Lived-in-Partener</option> 
                                                                                </select>
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
                                                                <hr/>


                                                                {/* {PSWDOInterviewStatus === true &&
                                                                    <>
                                                                        <button
                                                                            className="editinterview btn btn-sm w-100"
                                                                            type="submit"
                                                                            onClick={handleUpdatePSWDOInterview}
                                                                        >
                                                                            Edit PSWDO Interview Details
                                                                        </button>
                                                                    </>
                                                                }

                                                                {PSWDOInterviewStatus === false &&
                                                                    <>
                                                                        <button
                                                                            className="btn btn-primary btn-sm w-100"
                                                                            type="submit"
                                                                            onClick={handleAddPSWDOInterview}
                                                                        >
                                                                            Save PSWDO Interview Details
                                                                        </button>
                                                                    </>
                                                                } */}
                                                                


                                                            </div>
                                                            <br/>
         
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )}

                                <div className="modal-footer">

                                    <button type="button" className="btn closebtn " style={{width: '15%'}} data-bs-dismiss="modal">
                                        Cancel
                                    </button>

                                    {modalName == "Add" &&
                                        <>
                                            <button type="submit" className="btn savebtn " style={{width: '15%'}} 
                                                onClick={handleAddHospitalBill}>
                                                Save
                                            </button>
                                        </>
                                    }

                                    {modalName == "Edit" &&
                                        <>
                                            <button type="submit" className="btn savebtn " style={{width: '15%'}} 
                                                onClick={handleUpdateHospitalBill}>
                                                Save
                                            </button>
                                        </>
                                    }
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ManageHospitalBillContent;