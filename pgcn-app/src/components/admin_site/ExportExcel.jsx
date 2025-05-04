import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ExcelExport = ({ data, fileName, buttonStatus }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US'); // MM-DD-YYYY
  };

  const exportToExcel = () => {
    let sortedData = [...data];
    let formattedData;

    if (fileName === "Hospital Bill") {
      sortedData.sort((a, b) => new Date(a.datetime_added) - new Date(b.datetime_added));

      formattedData = sortedData.map((item, index) => ({
        "No.": index + 1,
        "First Name": item.patient_fname,
        "Middle Name": item.patient_mname,
        "Last Name": item.patient_lname,
        "Extension Name": item.patient_ext_name,
        "Purok": item.patient_purok,
        "Barangay": item.patient_barangay,
        "Municipality": item.patient_municipality,
        "Province": item.patient_province,
        "Date of Confinement (MM-DD-YYYY)": formatDate(item.date_confinement),
        "Hospital": item.patient_hospital,
        "Claimant First Name": item.claimant_fname,
        "Claimant Middle Name": item.claimant_mname,
        "Claimant Last Name": item.claimant_lname,
        "Claimant Extension Name": item.claimant_extname,
        "Relationship to Patient": item.claimant_relationship,
        "Claimant Contact": item.claimant_contact,
        "Claim Amount": item.claimant_amount,
        "Status": item.hospital_bill_status,
        "Barangay Indigency": item.check_barangay_indigency === 1 ? "True" : "False",
        "Medical Certificate": item.check_med_certificate === 1 ? "True" : "False",
        "Hospital Bill": item.check_hospital_bill === 1 ? "True" : "False",
        "Valid ID": item.check_valid_id === 1 ? "True" : "False",
        "Remarks": item.remarks,
        "Date Submitted (MM-DD-YYYY)": formatDate(item.datetime_added)
      }));
    }

    else if (fileName === "Alay Pagdamay") {
      sortedData.sort((a, b) => new Date(a.savedAt) - new Date(b.savedAt));

      formattedData = sortedData.map((item, index) => ({
        "No.": index + 1,
        "Deceased First Name": item.deceased_fname,
        "Deceased Middle Name": item.deceased_mname,
        "Deceased Last Name": item.deceased_lname,
        "Deceased Extension Name": item.deceased_ext_name,
        "Purok": item.deceased_purok,
        "Barangay": item.deceased_barangay,
        "Municipality": item.deceased_municipality,
        "Province": item.deceased_province,
        "Gender": item.deceased_gender,
        "Date of Death (MM-DD-YYYY)": formatDate(item.deceased_deathdate),
        "Cause of Death": item.death_cause,
        "Death Certificate": item.death_certificate,
        "Contact First Name": item.contact_fname,
        "Contact Middle Name": item.contact_mname,
        "Contact Last Name": item.contact_lname,
        "Contact Extension Name": item.contact_ext_name,
        "Contact Number": item.contact_number,
        "Relationship to Deceased": item.contact_relationship,
        "Service Covered": item.contact_service_covered,
        "Funeral Service": item.contact_funeral_service,
        "Person Encoded": item.contact_person_encoded,
        "Barangay Indigency": item.check_barangay_indigency === 1 ? "True" : "False",
        "Funeral Contract": item.check_funeral_contract === 1 ? "True" : "False",
        "Valid ID": item.check_valid_id === 1 ? "True" : "False",
        "Burial Status": item.burial_status,
        "Remarks": item.remarks,
        "Petty Cash": item.petty_cash,
        "Date Submitted (MM-DD-YYYY)": formatDate(item.savedAt)
      }));
    }

    else if (fileName === "Burial Assistance") {
      sortedData.sort((a, b) => new Date(a.savedAt) - new Date(b.savedAt));

      formattedData = sortedData.map((item, index) => ({
        "No.": index + 1,
        "Client First Name": item.client_fname,
        "Client Middle Name": item.client_mname,
        "Client Last Name": item.client_lname,
        "Client Extension Name": item.client_ext_name,
        "Province": item.client_province,
        "Municipality": item.client_municipality,
        "Barangay": item.client_barangay,
        "Purok": item.client_purok,
        "Relationship": item.client_relationship,
        "Contact Number": item.client_contact_num,
        "Gender": item.client_gender,
        "Age": item.client_age,
        "Assistance Amount": item.amount,
        "Type of Assistance": item.type_assistance,
        "Application Status": item.status_application,
        "Remarks Status": item.status_remarks,
        "Burial Status": item.burial_status,
        "Interviewer": item.interviewer,
        "Barangay Indigency": item.check_barangay_indigency === 1 ? "True" : "False",
        "Death Certificate": item.check_death_certificate === 1 ? "True" : "False",
        "Funeral Contract": item.check_funeral_contract === 1 ? "True" : "False",
        "Valid ID": item.check_valid_id === 1 ? "True" : "False",
        "Remarks": item.remarks,
        "Date Submitted (MM-DD-YYYY)": formatDate(item.savedAt)
      }));
    }

    else {
      formattedData = sortedData.map((item, index) => ({
        "No.": index + 1,
        ...item
      }));
    }

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName} Masterlist.xlsx`);
  };

  return (
    <button
      onClick={exportToExcel}
      type="button"
      className="btn btn-primary w-100"
      disabled={!buttonStatus}
    >
      Export to Excel
    </button>
  );
};

export default ExcelExport;
