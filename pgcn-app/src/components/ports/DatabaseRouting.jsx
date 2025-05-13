// AUTH
export const PortLogin = 'http://localhost:5000/login';
export const PortSession = 'http://localhost:5000/session';
export const PortSignup = 'http://localhost:5000/create_account';
export const PortLogout = 'http://localhost:5000/logout';
export const PortAccountSession = 'http://localhost:5000/accounts_id';
 
export async function RetrievePortAccountSession(accountId) {
    try {
        const response = await fetch(`http://localhost:5000/accounts_id?accountId=${accountId}`); // Sending accountId as query parameter
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to retrieve account details:", error);
        return null;
    }
}

// Fetch Total Records
export const PortRetrieveTotalHospitalBill = "http://localhost:5000/retrieve_total_hospital_bill";
export const PortRetrieveTotalAlayPagdamay = "http://localhost:5000/retrieve_total_alay_pagdamay";
export const PortRetrieveTotalBurialAssistance = "http://localhost:5000/retrieve_total_burial_assistance";
export const PortRetrieveHospitalBillPettyCash = 'http://localhost:5000/retrieve_hospital_bill_petty_cash';
export const PortRetrieveAlayPagdamayPettyCash = 'http://localhost:5000/retrieve_alay_pagdamay_petty_cash';
export const PortRetrieveBurialAssistancePettyCash = 'http://localhost:5000/retrieve_burial_assistance_petty_cash';
export const PortRetrieveHospitalBillStatus = 'http://localhost:5000/retrieve_hospital_bill_status';  
export const PortRetrieveHospitalBillHospitalName = 'http://localhostlocalhost:5000/retrieve_total_hospital_bill_hospital_name';
export const PortRetrieveAlayPagdamayStatus = 'http://localhost:5000/retrieve_alay_pagdamay_status';    
export const PortRetrieveAlayPagdamayFuneralName = 'http://localhost:5000/retrieve_total_alay_pagdamay_funeral_name'; 
export const PortRetrieveBurialAssistanceStatus = 'http://localhost:5000/retrieve_burial_assistance_status';       


export const PortRetrieveTotalAlayPagdamayBarangay = 'http://localhost:5000/retrieve_total_alay_pagdamay_barangay'; 
export const PortRetrieveTotalHospitalBillBarangay = 'http://localhost:5000/retrieve_total_hospital_bill_barangay';
export const PortRetrieveTotalBurialAssistanceBarangay = 'http://localhost:5000/retrieve_total_burial_assistance_barangay';

// apiEndpoints.js
export function RetrieveAllAssistance(queryParam, reportParam) {
    return `http://localhost:5000/retrieve_all_assistance?check_barangay_indigency=${encodeURIComponent(queryParam)}&reportClassification=${encodeURIComponent(reportParam)}`;
}
  
// Hospital Bill 
export const PortInsertHospitalBill = 'http://localhost:5000/insert_hospital_bill';
export const PortDeleteHospitalBill = 'http://localhost:5000/delete_hospital_bill';
export const PortUpdateHospitalBill = 'http://localhost:5000/update_hospital_bill';
export const PortRetrieveHospitalBill = 'http://localhost:5000/retrieve_hospital_bill';

// AlayPagdamay
export const PortInsertAlayPagdamay = 'http://localhost:5000/insert_alay_pagdamay';
export const PortDeleteAlayPagdamay = 'http://localhost:5000/delete_alay_pagdamay';
export const PortUpdateAlayPagdamay = "http://localhost:5000/update_alay_pagdamay";
export const PortRetrieveAlayPagdamay = "http://localhost:5000/retrieve_alay_pagdamay";

// Burial Assistance
export const PortInsertBurialAssistance = 'http://localhost:5000/insert_burial_assistance';
export const PortDeleteBurialAssistance = 'http://localhost:5000/delete_burial_assistance';
export const PortUpdateBurialAssistance = "http://localhost:5000/update_burial_assistance";
export const PortRetrieveBurialAssistance = "http://localhost:5000/retrieve_burial_assistance";

// PSWDO Interview
export const PortInsertPSWDOInterview = "http://localhost:5000/insert_pswdo_interview";
export const PortUpdatePSDOInterview = "http://localhost:5000/update_pswdo_interview"; 
 
export function RetrievePSWDOInterview(id, transactionName) {
    return `http://localhost:5000/retrieve_pswdo_interview_id?Id=${encodeURIComponent(id)}&transactionName=${encodeURIComponent(transactionName)}` 
}

export function RetrieveAlayPagdamayId(burialId) {
    return `http://localhost:5000/retrieve_alay_pagdamay_id?burialId=${burialId}` 
}

export function RetrieveBurialAssistanceId(burialId) {
    return `http://localhost:5000/retrieve_burial_assistance_id?burialId=${burialId}` 
}

export function RetrieveHospitalBillId(hospitalId) {
    return `http://localhost:5000/retrieve_hospital_bill_id?hospitalId=${hospitalId}` 
}