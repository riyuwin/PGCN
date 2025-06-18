
import { useState, useEffect, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchLocalUserDetails from "./scripts/FetchLocalUser";
import * as port from "../ports/DatabaseRouting"

function AlayPagdamayContent() {
    const { localUserDetails } = FetchLocalUserDetails();
    const [account_id, setLocalUserId] = useState(null);

    const navigate = useNavigate(); // Use navigate for redirection 

    // Variables for inputs ------------------------------------------------------------
    const [burialId, setBurialId] = useState('');
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
    const [contactRelationship, setContactRelationship] = useState('');
    const [contactPersonServiceCovered, setContactPersonServiceCovered] = useState('');
    const [contactPersonFuneralService, setContactPersonFuneralCovered] = useState('');
    const [contactPersonEncoded, setContactPersonEncoded] = useState('');
    const [pettyCashAmount, setPettyCashAmount] = useState('');
    const [deceasedCauseDeath, setDeceasedCauseDeath] = useState('');

    const [burialStatus, setBurialStatus] = useState('Pending');
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
    const [contactPersonMunicipality, setContactPersonMunicipality] = useState('');
    const [contactPersonBarangay, setContactPersonBarangay] = useState('');
    const [contactPersonPurok, setContactPersonPurok] = useState('');
    const [contactBarangayList, setContactBarangayList] = useState([]);

    const [PSWDOInterviewStatus, setPSWDOInterviewStatus] = useState(false);
    const [PSWDOId, setPSWDOId] = useState("");
    const [typeOfAssistance, setTypeOfAssistance] = useState('Burial');
    const [member4Ps, setMember4Ps] = useState('No');

    const [familyCount, setFamilyCount] = useState(0);
    const [familyComposition, setFamilyComposition] = useState([]);

    const [formPage, setFormPage] = useState("Basic Information");

    const handleAddBurialAssistance = async (e) => {
        e.preventDefault();

        const currentDateTimePH = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Manila",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });

        // Convert MM/DD/YYYY, HH:MM:SS format to YYYY-MM-DD HH:MM:SS
        const [month, day, yearAndTime] = currentDateTimePH.split('/');
        const [year, time] = yearAndTime.split(', ');
        const currentDateTime = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${time}`;

        const formData = new FormData();
        formData.append("account_id", account_id);
        formData.append("deceasedFirstName", deceasedFirstName);
        formData.append("deceasedMiddleName", deceasedMiddleName);
        formData.append("deceasedLastName", deceasedLastName);
        formData.append("deceasedExtName", deceasedExtName);
        formData.append("deceasedPurok", deceasedPurok);
        formData.append("deceasedBarangay", deceasedBarangay);
        formData.append("deceasedMunicipality", deceasedMunicipality);
        formData.append("deceasedProvince", deceasedProvince);
        formData.append("deceasedGender", deceasedGender);
        formData.append("deceasedDeathDate", deceasedDeathDate);
        formData.append("contactPersonFirstname", contactPersonFirstname);
        formData.append("contactPersonMiddlename", contactPersonMiddlename);
        formData.append("contactPersonLastname", contactPersonLastname);
        formData.append("contactPersonExtName", contactPersonExtName);
        formData.append("contactNumber", contactNumber);
        formData.append("contactRelationship", contactRelationship);
        formData.append("contactPersonServiceCovered", contactPersonServiceCovered);
        formData.append("contactPersonFuneralService", contactPersonFuneralService);
        formData.append("contactPersonEncoded", contactPersonEncoded);
        formData.append("barangayIndigency", checkedItems.checkBarangayIndigency);
        formData.append("deathCertificateStatus", checkedItems.checkDeathCertificate);
        formData.append("funeralContract", checkedItems.checkFuneralContract);
        formData.append("validId", checkedItems.checkValidId);
        formData.append("burialStatus", burialStatus);
        formData.append("remarks", remarks);
        formData.append("pettyCashAmount", pettyCashAmount);
        formData.append("deceasedCauseDeath", deceasedCauseDeath);
        formData.append("currentDateTime", currentDateTime);

        if (deathCertificate) {
            formData.append("deathCertificate", deathCertificate);
        }

        try {
            const burialResponse = await fetch(port.PortInsertAlayPagdamay, {
                method: "POST",
                body: formData
            });

            if (!burialResponse.ok) {
                const errorData = await burialResponse.json();
                throw new Error(errorData.error || "Failed to insert burial assistance.");
            }

            const burialData = await burialResponse.json();
            const burialId = burialData.burial_id;
            const hospitalId = null;
            const transactionName = "Alay Pagdamay";

            const interviewPayload = {
                hospitalId,
                alayPagDamayID: burialId,
                burialAssistanceID: null,
                contactPersonAge,
                contactPersonCivilStatus,
                contactPersonOccupation,
                contactPersonIncome,
                contactPersonGender,
                contactPersonMobileNum: contactNumber,
                contactPersonPettyAmount: pettyCashAmount,
                patientProvince: contactPersonProvince,
                patientMunicipality: contactPersonMunicipality,
                patientBarangay: contactPersonBarangay,
                patientPurok: contactPersonPurok,
                familyComposition,
                transactionName,
                typeOfAssistance,
                member4Ps
            };

            const interviewResponse = await fetch(port.PortInsertPSWDOInterview, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(interviewPayload)
            });

            if (!interviewResponse.ok) {
                const interviewError = await interviewResponse.json();
                throw new Error(interviewError.error || "Failed to insert PSWDO interview.");
            }

            Swal.fire({
                icon: "success",
                title: "Transaction Successful",
                text: "Burial assistance has been recorded successfully!",
            }).then(() => {
                ResetForms();
            });

        } catch (err) {
            console.error("Error:", err.message);
            Swal.fire({
                icon: "error",
                title: "Transaction Failed",
                text: err.message || "An error occurred while saving the burial assistance.",
            });
        }
    };

    const fetchPSWDOInterviewId = async (burialId) => {
        try {
            const response = await fetch(port.RetrievePSWDOInterview(burialId, "Alay Pagdamay"));
            const data = await response.json();

            PopulatePSWDOInterview(data);

        } catch (error) {
            console.error("Error fetching alay pagdamay assistance:", error); // Fix the log message
        }
    };

    const PopulatePSWDOInterview = (PSWDOInterview) => {

        if (!PSWDOInterview?.error) {
            const interview = PSWDOInterview.interview || {};

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
            setContactPersonMunicipality(interview.municipality || '');
            setContactPersonBarangay(interview.barangay || '');
            setContactPersonPurok(interview.purok || '');
            setContactPersonTransactionName(interview.transaction_name || '');
            setTypeOfAssistance(interview.type_assistance || 'Alay Pagdamay');
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
                    const response = await fetch(port.PortDeleteAlayPagdamay, {
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

        try {

            const currentDateTimePH = new Date().toLocaleString("en-US", {
                timeZone: "Asia/Manila",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });

            // Convert MM/DD/YYYY, HH:MM:SS format to YYYY-MM-DD HH:MM:SS
            const [month, day, yearAndTime] = currentDateTimePH.split('/');
            const [year, time] = yearAndTime.split(', ');
            const currentDateTime = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${time}`;

            // 🔹 Create FormData for burial assistance update
            const formData = new FormData();
            formData.append("burialId", burialId);
            formData.append("account_id", account_id);
            formData.append("deceasedFirstName", deceasedFirstName);
            formData.append("deceasedMiddleName", deceasedMiddleName);
            formData.append("deceasedLastName", deceasedLastName);
            formData.append("deceasedExtName", deceasedExtName);
            formData.append("deceasedPurok", deceasedPurok);
            formData.append("deceasedBarangay", deceasedBarangay);
            formData.append("deceasedMunicipality", deceasedMunicipality);
            formData.append("deceasedProvince", deceasedProvince);
            formData.append("deceasedGender", deceasedGender);
            formData.append("deceasedDeathDate", deceasedDeathDate);
            formData.append("contactPersonFirstname", contactPersonFirstname);
            formData.append("contactPersonMiddlename", contactPersonMiddlename);
            formData.append("contactPersonLastname", contactPersonLastname);
            formData.append("contactPersonExtName", contactPersonExtName);
            formData.append("contactNumber", contactNumber);
            formData.append("contactRelationship", contactRelationship);
            formData.append("contactPersonServiceCovered", contactPersonServiceCovered);
            formData.append("contactPersonFuneralService", contactPersonFuneralService);
            formData.append("contactPersonEncoded", contactPersonEncoded);
            formData.append("barangayIndigency", checkedItems.checkBarangayIndigency);
            formData.append("deathCertificate", checkedItems.checkDeathCertificate);
            formData.append("funeralContract", checkedItems.checkFuneralContract);
            formData.append("validId", checkedItems.checkValidId);
            formData.append("burialStatus", burialStatus);
            formData.append("remarks", remarks);
            formData.append("pettyCashAmount", pettyCashAmount);
            formData.append("deceasedCauseDeath", deceasedCauseDeath);
            formData.append("currentDateTime", currentDateTime);

            if (deathCertificate) {
                formData.append("deathCertificateFile", deathCertificate); // Ensure it's the file input
            }

            // 🔹 Send POST request to update burial assistance
            const response = await fetch(port.PortUpdateAlayPagdamay, {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update burial assistance.");
            }

            // 🔹 Prepare payload for PSWDO interview update
            const interviewPayload = {
                id: burialId,
                PSWDOId,
                contactPersonAge,
                contactPersonCivilStatus,
                contactPersonOccupation,
                contactPersonIncome,
                contactPersonGender,
                contactPersonMobileNum: contactNumber,
                contactPersonPettyAmount: pettyCashAmount,
                patientProvince: contactPersonProvince,
                patientMunicipality: contactPersonMunicipality,
                patientBarangay: contactPersonBarangay,
                patientPurok: contactPersonPurok,
                typeOfAssistance,
                member4Ps,
                transactionName: "Alay Pagdamay",
                familyComposition: familyComposition.map(member => ({
                    id: member.family_id || null,
                    name: member.name,
                    relationship: member.relationship,
                    age: member.age,
                    civilStatus: member.civilStatus,
                    occupation: member.occupation,
                    monthlyIncome: member.monthlyIncome,
                })),
            };

            // 🔹 Send PUT request to update PSWDO Interview
            const interviewResponse = await fetch(port.PortUpdatePSDOInterview, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(interviewPayload),
            });

            const interviewData = await interviewResponse.json();

            if (!interviewResponse.ok) {
                throw new Error(interviewData.error || "Failed to update PSWDO interview.");
            }

            // 🔹 Show success message
            Swal.fire({
                icon: "success",
                title: "Transaction Successful",
                text: "Burial assistance has been updated successfully!",
            });

        } catch (err) {
            console.error("❌ Update Error:", err.message);
            Swal.fire({
                icon: "error",
                title: "Transaction Failed",
                text: err.message || "An error occurred while updating burial assistance.",
            });
        }
    };




    const fetchBurialAssistance = async () => {
        try {
            const response = await fetch(port.PortRetrieveAlayPagdamay);
            const data = await response.json();
            setBurialAssitance(data);
        } catch (error) {
            console.error("Error fetching alay pagdamay records:", error);
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
    /* const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = burialAssitance.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(burialAssitance.length / recordsPerPage); */


    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
    };

    /* const filteredRecords = burialAssitance.filter((burial) => {
        const fullName = `${burial.deceased_fname} ${burial.deceased_mname} ${burial.deceased_lname} ${burial.deceased_ext_name || ""}`.toLowerCase();
        return fullName.includes(searchTerm);
    });
    
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage); */

    const sortedRecords = [...burialAssitance].sort(
        (a, b) => new Date(b.savedAt) - new Date(a.savedAt)
    );

    const filteredRecords = sortedRecords.filter((burial) => {
        const fullName = `${burial.deceased_fname} ${burial.deceased_mname} ${burial.deceased_lname} ${burial.deceased_ext_name || ""}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);


    // Open modal and set selected bill
    const handleOpenModal = (burial, editMode = false, modalName) => {
        setSelectedBurial(burial);
        setIsEditMode(editMode);
        setModalName(modalName);
        PopulateForms(burial);
        fetchPSWDOInterviewId(burial['burial_id'])

        if (modalName == "View") {

            navigate(`/admin/view_alay_pagdamay/${burial['burial_id']}`);
        }
    };

    const handleAddRecord = (editMode = false, modalName) => {
        /* ResetForms(); */
        setIsEditMode(editMode);
        setModalName(modalName)
    };

    const PopulateForms = (burial) => {
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
        setPettyCashAmount(burial['petty_cash']);
        setDeceasedCauseDeath(burial['death_cause']);
        setContactRelationship(burial['contact_relationship'])

        setBurialStatus(burial['burial_status']);
        setCheckedItems({
            checkBarangayIndigency: burial['check_barangay_indigency'] == 1,
            checkDeathCertificate: burial['check_death_certificate'] == 1,
            checkFuneralContract: burial['check_funeral_contract'] == 1,
            checkValidId: burial['check_valid_id'] == 1,
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



    const ResetForms = () => {
        // ✅ Reset all input fields after successful save
        setBurialId('');
        setDeceasedFirstName('');
        setDeceasedMiddleName('');
        setDeceasedLastName('');
        setDeceasedExtName('');
        setDeceasedPurok('');
        setDeceasedBarangay('');
        setDeceasedMunicipality('');
        setDeceasedProvince('');
        setDeceasedGender('');
        setDeceasedDeathDate('');
        setContactPersonFname('');
        setContactPersonMname('');
        setContactPersonLname('');
        setContactPersonExtName('');
        setContactNumber('');
        setContactRelationship('');
        setDeceasedCauseDeath('');
        setContactPersonServiceCovered('');
        setContactPersonFuneralCovered('');
        setContactPersonEncoded('');
        setDeathCertificate(null);
        setPettyCashAmount('');

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
        setTypeOfAssistance('Alay Pagdamay');
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
        setDeceasedMunicipality(selectedMunicipality);
        setDeceasedBarangay(''); // Reset barangay selection
        setBarangayList(municipalityBarangays[selectedMunicipality] || []);
    };

    const handleMunicipalityClaimantChange = (e) => {
        const selectedMunicipality = e.target.value.trim();
        setContactPersonMunicipality(selectedMunicipality);
        setContactPersonBarangay(''); // Reset barangay selection
        setContactBarangayList(municipalityBarangays[selectedMunicipality] || []);
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
            [id]: checked ? 1 : 0
        }));
    };

    // Utility to format JS Date to yyyy-mm-dd
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const day = (`0${d.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };



    return (
        <>
            <main id="main" className="main">
                <div className="content">
                    <h1 style={{ fontWeight: 'bold', color: '#08533F' }}>Manage Alay Pagdamay</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item" style={{ fontWeight: 'lighter', color: '#08533F' }}>
                                <a>Assistance Registry Management</a>
                            </li>
                            <li className="breadcrumb-item" style={{ fontWeight: 'lighter', color: '#08533F' }}>
                                <a>Burial Transactions</a>
                            </li>
                            <li className="breadcrumb-item active" style={{ color: '#08533F' }}>Alay Pagdamay</li>
                        </ol>
                    </nav>
                </div>

                <hr style={{ border: '1px solid #0A3622' }} />

                <main className="py-6  ">
                    <div className="container-fluid">
                        <section className="section dashboard">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-xxl-12 col-md-12">
                                            <div className="card info-card sales-card">
                                                <div className="card-body" style={{ backgroundColor: '#F2FFEE' }}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h5 className="card-title" style={{ fontWeight: 'bold', color: '#08533F', fontSize: '25px' }}>List of Alay Pagdamay</h5>
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
                                                                    onChange={handleSearch}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6"></div>
                                                        <div className="col-sm-3">
                                                            <div className="input-group d-flex justify-content-end">
                                                                <button
                                                                    className="addbutton btn btn-sm"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#addHospitalBillModal"
                                                                    onClick={() => handleAddRecord(true, "Add")}
                                                                >
                                                                    + Add Record to Alay Pagdamay
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="table-responsive">
                                                        <table className="table datatable table-custom">
                                                            <thead>
                                                                <tr>
                                                                    <th>No.</th>
                                                                    <th>Deceased Name</th>
                                                                    <th>Date of Death</th>
                                                                    <th>Contact Person</th>
                                                                    <th>Contact Number</th>
                                                                    <th>Date Registered</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {currentRecords.length > 0 ? (
                                                                    currentRecords.map((burial, index) => (
                                                                        <tr key={burial.id}>
                                                                            <td>{indexOfFirstRecord + index + 1}</td>
                                                                            <td>{`${burial.deceased_fname} ${burial.deceased_mname} ${burial.deceased_lname} ${burial.deceased_ext_name || ""}`}</td>
                                                                            <td>{new Date(burial.deceased_deathdate).toLocaleDateString()}</td>
                                                                            <td>{`${burial.contact_fname} ${burial.contact_mname} ${burial.contact_lname} ${burial.contact_extname || ""}`}</td>
                                                                            <td>{burial.contact_number}</td>
                                                                            <td>{new Date(burial.savedAt).toLocaleString()}</td>
                                                                            <td>
                                                                                <button className="btn btn-success" onClick={() => handleOpenModal(burial, true, "View")}>
                                                                                    <i className='bx bx-info-circle'></i>
                                                                                </button>
                                                                                <button className="btn btn-primary"
                                                                                    onClick={() => handleOpenModal(burial, true, "Edit")}
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#addHospitalBillModal">
                                                                                    <i className='bx bx-edit'></i>
                                                                                </button>
                                                                                <button className="btn btn-danger"
                                                                                    onClick={(e) => handleDeleteBurialAssistance(e, burial['burial_id'])}>
                                                                                    <i className='bx bx-trash'></i>
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="7" className="text-center">No records found</td>
                                                                    </tr>
                                                                )}

                                                            </tbody>

                                                        </table>

                                                        <br />

                                                        {/* Pagination Controls */}
                                                        <div className="d-flex justify-content-between mt-3">
                                                            <button
                                                                className="nextprevbutton btn" style={{ width: '10%' }}
                                                                disabled={currentPage === 1 || totalPages === 0}
                                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                            >
                                                                Previous
                                                            </button>
                                                            <span>Page {totalPages > 0 ? currentPage : 0} of {totalPages}</span>
                                                            <button
                                                                className="nextprevbutton btn" style={{ width: '10%' }}
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
                            <h5 className="modal-title" id="addHospitalBillModalLabel" style={{ fontWeight: 'bold', color: '#0C623A', fontSize: '30px' }}>
                                &nbsp;&nbsp;&nbsp;Add Record of Deceased to Alay Pagdamay
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>

                                <div className="generateContainer" style={{ border: '1.5px solid #CDCDCD' }}>
                                    <br />
                                    <h5 style={{ color: '#0C623A' }}>Select Section: </h5>

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
                                                <i class="bi bi-card-checklist"></i> Burial Assistance Requirements
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


                                    <div className="formContainer" style={{ border: '1.5px solid #CDCDCD' }}>
                                        <h3 style={{ fontWeight: 'bold', color: '#0C623A', fontSize: '26px' }}>Deceased Information</h3><br />
                                        <div className="row">
                                            <div className="col-3">
                                                <label htmlFor="firstName" className="form-label">First Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="firstName"
                                                    value={deceasedFirstName}
                                                    onChange={(e) => setDeceasedFirstName(e.target.value)}
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
                                                    value={deceasedMiddleName}
                                                    onChange={(e) => setDeceasedMiddleName(e.target.value)}
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
                                                    onChange={(e) => setDeceasedLastName(e.target.value)}
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
                                                    onChange={(e) => setDeceasedExtName(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-3">
                                                <br />
                                                <label className="form-label">Province:</label>
                                                <select
                                                    className="form-control"
                                                    value={deceasedProvince}
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
                                                    value={deceasedMunicipality}
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
                                                    value={deceasedBarangay}
                                                    onChange={(e) => setDeceasedBarangay(e.target.value.trim())}
                                                    disabled={barangayList.length === 0}
                                                >
                                                    <option value="">Select Barangay</option>
                                                    {barangayList.map((barangay) => (
                                                        <option key={barangay} value={barangay}>
                                                            {barangay}
                                                        </option>
                                                    ))} : {
                                                        <option key={deceasedBarangay} value={deceasedBarangay}>
                                                            {deceasedBarangay}
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
                                                    value={deceasedPurok}
                                                    onChange={(e) => setDeceasedPurok(e.target.value)}
                                                />
                                            </div>


                                            <div className="col-3">
                                                <br />
                                                <label htmlFor="extName" className="form-label">Gender:</label>

                                                <select
                                                    className="form-control"
                                                    id="hospital"
                                                    value={deceasedGender}
                                                    onChange={(e) => setDeceasedGender(e.target.value)} >
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
                                                    value={formatDate(deceasedDeathDate)}
                                                    onChange={(e) => setDeceasedDeathDate(e.target.value)}
                                                />

                                            </div>

                                            <div className="col-6">
                                                <br />
                                                <label htmlFor="extName" className="form-label">Death Certificate:</label>

                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    /* value={deathCertificate} */
                                                    /* onChange={(e) => setDeathCertificate(e.target.files[0])} */

                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                            </div>


                                            {/* {deathCertificate && (
                                                    <div className="col-12">
                                                        <br />
                                                            <img 
                                                                src={deathCertificate} 
                                                                alt="Death Certificate" 
                                                                style={{ width: "300px", height: "auto", border: "1px solid #ccc" }} 
                                                            />
                                                    </div>
                                                )} */}

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
                                                    onChange={(e) => setDeceasedCauseDeath(e.target.value)}
                                                />
                                            </div>

                                        </div>
                                        <br />
                                        <hr />
                                        <h3 style={{ fontWeight: 'bold', color: '#0C623A', fontSize: '26px' }}>Contact Person</h3><br />
                                        <div className="row">
                                            <div className="col-3">
                                                <label htmlFor="firstName" className="form-label">First Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="firstName"
                                                    value={contactPersonFirstname}
                                                    onChange={(e) => setContactPersonFname(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-3">
                                                <label htmlFor="middleName" className="form-label">Middle Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="middleName"
                                                    value={contactPersonMiddlename}
                                                    onChange={(e) => setContactPersonMname(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-3">
                                                <label htmlFor="lastName" className="form-label">Last Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    value={contactPersonLastname}
                                                    onChange={(e) => setContactPersonLname(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-3">
                                                <label htmlFor="extName" className="form-label">Ext Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="extName"
                                                    value={contactPersonExtName}
                                                    onChange={(e) => setContactPersonExtName(e.target.value)}
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
                                                    onChange={(e) => setContactNumber(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-3">
                                                <br />
                                                <label htmlFor="extName" className="form-label">Relationship:</label>

                                                <select
                                                    className="form-control"
                                                    id="relationship"
                                                    value={contactRelationship}
                                                    onChange={(e) => setContactRelationship(e.target.value)}
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
                                                    onChange={(e) => setContactPersonServiceCovered(e.target.value)}
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
                                                    onChange={(e) => setContactPersonFuneralCovered(e.target.value)}
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
                                                    onChange={(e) => setContactPersonEncoded(e.target.value)}
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
                                                    onChange={(e) => setPettyCashAmount(e.target.value)}
                                                />
                                            </div>

                                        </div>

                                        <br />
                                    </div>

                                }

                                {formPage === "Checklist" && (
                                    <>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="formContainer">
                                                    <h3 style={{ fontWeight: 'bold', color: '#0C623A', fontSize: '26px' }}>Burial Status: </h3><br />
                                                    <p style={{ color: '#0C623A' }}>Current Status: <b>{burialStatus}</b></p>

                                                    <select
                                                        className="form-control"
                                                        id="relationship"
                                                        value={burialStatus}
                                                        onChange={(e) => setBurialStatus(e.target.value)}
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
                                                    <h3 style={{ fontWeight: 'bold', color: '#0C623A', fontSize: '26px' }}>Requirements Checklist:</h3>
                                                    <br />
                                                    <ul className="list-group">
                                                        <li className="list-group-item">
                                                            <input className="form-check-input me-1" type="checkbox" id="checkBarangayIndigency"
                                                                checked={checkedItems.checkBarangayIndigency} // Matches state key
                                                                onChange={handleCheckboxChange} />
                                                            <label className="form-check-label" htmlFor="checkBarangayIndigency">&nbsp; Barangay Indigency (2 Original)</label>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <input className="form-check-input me-1" type="checkbox" id="checkDeathCertificate"
                                                                checked={checkedItems.checkDeathCertificate}
                                                                onChange={handleCheckboxChange} />
                                                            <label className="form-check-label" htmlFor="checkDeathCertificate">&nbsp; Death Certificate (2 Copies)</label>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <input className="form-check-input me-1" type="checkbox" id="checkFuneralContract"
                                                                checked={checkedItems.checkFuneralContract}
                                                                onChange={handleCheckboxChange} />
                                                            <label className="form-check-label" htmlFor="checkFuneralContract">&nbsp; Funeral Contract/ Balance (2 Copies)</label>
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
                                                <div className="formContainer">
                                                    <h3 style={{ fontWeight: 'bold', color: '#0C623A', fontSize: '26px' }}>Remarks:</h3>
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
                                                        <div className="card-body" style={{ border: '1.5px solid #CDCDCD' }}>

                                                            <br />

                                                            <div >
                                                                <b className="form-label" style={{ fontSize: '20px' }}>PSWDO Interview</b>
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
                                                                            value={contactPersonFirstname}
                                                                            onChange={(e) => setContactPersonFname(e.target.value)}
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
                                                                            value={contactPersonMiddlename}
                                                                            onChange={(e) => setContactPersonMname(e.target.value)}
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
                                                                            value={contactPersonLastname}
                                                                            onChange={(e) => setContactPersonLname(e.target.value)}
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
                                                                            value={contactPersonExtName}
                                                                            onChange={(e) => setContactPersonExtName(e.target.value)}
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
                                                                            value={contactNumber}
                                                                            onChange={(e) => setContactNumber(e.target.value)}
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
                                                                            value={pettyCashAmount}
                                                                            onChange={(e) => setPettyCashAmount(e.target.value)}
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
                                                                        <br />
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
                                                                                <br /> <hr />
                                                                                <label className="form-label" style={{ fontWeight: 'bold' }}>Family Member {index + 1}</label>
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

                                                                <br />
                                                                <hr />


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
                                                            <br />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )}

                                <div className="modal-footer">
                                    <button type="button" className="btn closebtn" style={{ width: '15%' }} data-bs-dismiss="modal">
                                        Cancel
                                    </button>

                                    {modalName == "Add" &&
                                        <>
                                            <button type="submit" className="btn savebtn" style={{ width: '15%' }}
                                                onClick={handleAddBurialAssistance}>
                                                Save
                                            </button>
                                        </>
                                    }

                                    {modalName == "Edit" &&
                                        <>
                                            <button type="submit" className="btn savebtn" style={{ width: '15%' }}
                                                onClick={handleUpdateBurialAssistance}>
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

export default AlayPagdamayContent;
