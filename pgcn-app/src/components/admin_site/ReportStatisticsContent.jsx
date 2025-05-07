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
import Chart from "react-apexcharts";

function ReportStatisticsContent() {
    const [transactions, setTransactions] = useState('');
    const [reportClassification, setReportClassification] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [generateButton, setGenerateButton] = useState(false);

    const [patientPurok, setPatientPurok] = useState('');
    const [patientBarangay, setPatientBarangay] = useState('');
    const [patientMunicipality, setPatientMunicipality] = useState('');
    const [patientProvince, setPatientProvince] = useState('Camarines Norte');
    const [barangayList, setBarangayList] = useState([]);

    // Variables for inputs ------------------------------------------------------------  
    const [pettyCashAmount, setPettyCashAmount] = useState('');

    const [filterName, setFilterName] = useState('');
    const [filterNamePatientMunicipality, setFilterPatientMunicipality] = useState('All');
    // Variables for inputs ------------------------------------------------------------ 

    // Variables for hospital bills
    const [hospitalBills, setHospitalBills] = useState([]);
    const [hospitalNames, setHospitalNames] = useState([]);

    const [selectedBill, setSelectedBill] = useState(null);

    const [formPage, setFormPage] = useState("Form 1");

    const retrieveFilter = () => {
        if (
            transactions === "Hospital Bill" &&
            ["Annual Report", "This Month Report", "This Week Report"].includes(reportClassification)
        ) {
            const municipalityFilter = patientMunicipality === "All" ? "All" : patientMunicipality;

            setFilterPatientMunicipality(municipalityFilter);

            // Pass both filter and classification to functions that need them
            fetchTotalHospitalBills(municipalityFilter, reportClassification);
            fetchHospitalBillStatus(municipalityFilter, reportClassification);
            fetchHospitalBills(municipalityFilter, reportClassification);
            fetchHospitalBillPettyCash(municipalityFilter, reportClassification);
            fetchHospitalBillHospitalName(municipalityFilter, reportClassification);
            fetchHospitalBillPatientBarangay(municipalityFilter, reportClassification);

            setFilterName('Hospital Bill');
            console.log("Hey:", barChartData);
        } else if (
            transactions === "Alay Pagdamay" &&
            ["Annual Report", "This Month Report", "This Week Report"].includes(reportClassification)
        ) {
            const municipalityFilter = patientMunicipality === "All" ? "All" : patientMunicipality;

            setFilterPatientMunicipality(municipalityFilter);

            // Pass both filter and classification to functions that need them
            fetchTotalAlayPagdamay(municipalityFilter, reportClassification);
            fetchAlayPagdamayStatus(municipalityFilter, reportClassification);
            fetchAlayPagdamayPettyCash(municipalityFilter, reportClassification);
            fetchAlayPagdamayFuneralName(municipalityFilter, reportClassification);
            fetchAlayPagdamayBarangay(municipalityFilter, reportClassification);

            setFilterName('Alay Pagdamay');
            console.log("Hey:", barChartData);
        } else if (
            transactions === "Burial Assistance" &&
            ["Annual Report", "This Month Report", "This Week Report"].includes(reportClassification)
        ) {
            const municipalityFilter = patientMunicipality === "All" ? "All" : patientMunicipality;

            setFilterPatientMunicipality(municipalityFilter);

            // Pass both filter and classification to functions that need them
            fetchTotalBurialAssistance(municipalityFilter, reportClassification);
            fetchBurialAssistanceStatus(municipalityFilter, reportClassification);
            fetchBurialAssistancePettyCash(municipalityFilter, reportClassification);
            fetchBurialAssistanceBarangay(municipalityFilter, reportClassification);

            setFilterName('Burial Assistance');
            console.log("Hey:", barChartData);
        } else {
            console.log("No matching filter conditions.");
            setFilterName('');
            setFilterPatientMunicipality('');
        }
    };

    /* useEffect(() => {
        if (transactions !== "" && startDate !== "" && endDate !== "") {
            setGenerateButton(true);  

            console.log("Hey: ", barChartData);
        } else {
            setGenerateButton(false);
        }
    }, [transactions, startDate, endDate]); */

    const fetchHospitalBillStatus = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_hospital_bill_status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    municipality: filterNamePatientMunicipality,
                    reportClassification: reportClassification
                }),
            });

            const data = await response.json();

            console.log("Hospital Bill Status Data: ", data);

            let labels = [];
            let series = [];

            if (Array.isArray(data) && data.length > 0) {
                labels = data.map(item => item.hospital_bill_status ?? "Unknown");
                series = data.map(item => item.totalCount ?? 0);

                const isAllZero = series.every(value => value === 0);

                if (isAllZero) {
                    labels = ["No Data"];
                    series = [0];
                }
            } else {
                labels = ["No Data"];
                series = [0];
            }

            setRadialChartData(prevData => ({
                ...prevData,
                series: series,
                options: {
                    ...prevData.options,
                    labels: labels
                }
            }));
        } catch (error) {
            console.error("Error fetching hospital bill status data:", error);
            setRadialChartData(prevData => ({
                ...prevData,
                series: [0],
                options: {
                    ...prevData.options,
                    labels: ["No Data"]
                }
            }));
        }
    };

    const fetchHospitalBillPettyCash = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_hospital_bill_petty_cash", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    municipality: filterNamePatientMunicipality,
                    reportClassification: reportClassification
                }),
            });
            /* const response = await fetch("http://localhost:5000/retrieve_hospital_bill_petty_cash"); */
            const data = await response.json();

            setPettyCashAmount(data.totalAmount);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    const fetchHospitalBills = async (filterNamePatientMunicipality) => {
        console.log("HEHEHE: ", filterNamePatientMunicipality)
        try {
            const response = await fetch("http://localhost:5000/retrieve_hospital_bill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    municipality: filterNamePatientMunicipality
                }),
            });

            const data = await response.json();
            setHospitalBills(data);
        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };


    const fetchHospitalBillHospitalName = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_total_hospital_bill_hospital_name", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientMunicipality: filterNamePatientMunicipality,
                    reportClassification: reportClassification
                }),
            });

            const data = await response.json();

            // Provide fallback if no records are returned
            const hasData = data.length > 0;

            const labels = hasData
                ? data.map(item => item.patient_hospital)
                : ["No Data"];

            const series = hasData
                ? data.map(item => item.totalBills ?? 0)
                : [0];

            // Update the chart data
            setPolarChartData(prevData => ({
                ...prevData,
                options: {
                    ...prevData.options,
                    labels: labels
                },
                series: series,
            }));

            console.log("Updated Labels:", labels);
            console.log("Updated Series:", series);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };



    const fetchHospitalBillPatientBarangay = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_total_hospital_bill_barangay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientMunicipality: filterNamePatientMunicipality,
                    reportClassification: reportClassification
                }),
            });

            const data = await response.json();

            // Check if the data contains any entries
            const hasData = data.length > 0;

            // Use real data if available, otherwise provide fallback
            const labels = hasData
                ? data.map(item => item.patient_barangay)
                : ["No Data"];

            const series = hasData
                ? data.map(item => item.patientBarangay ?? 0)
                : [0];

            // Update pie chart data
            setPieChartData(prevData => ({
                ...prevData,
                options: {
                    ...prevData.options,
                    labels: labels
                },
                series: series,
            }));

            console.log("Updated Labels123:", labels);
            console.log("Updated Series:123", series);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };


    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const [chartData, setChartData] = useState({
        series: [{
            name: "Patient Care Records",
            data: [25, 10, 5, 10, 6, 1, 5]
        }],
        options: {
            chart: { type: "line", height: 350 },
            xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
            colors: ["#E42424"],
            stroke: { curve: "straight" },
        }
    });

    const [barChartData, setBarChartData] = useState({
        series: [{
            name: "Active Services",
            data: [25, 10, 5, 30, 6, 30, 5, 10, 21, 2, 10, 25]
        }],
        options: {
            chart: { type: "bar", height: 350 },
            xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "October", "November", "December"] },
            colors: ["#2196F3"],
        }
    });

    const [pieChartData, setPieChartData] = useState({
        series: [10, 15, 20, 25, 30, 40, 50],  // Data values for each category
        options: {
            chart: { type: "pie", height: 350 },
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],  // Pie chart labels
            colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD", "#E74C3C", "#2E86C1"],
            legend: { position: "bottom" }
        }
    });

    const [piePolarChartData, setPolarChartData] = useState({
        series: [10, 15, 20, 25, 30, 40, 50],  // Data values for each category
        options: {
            chart: { type: "pie", height: 350 },
            labels: [],  // Pie chart labels
            colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD", "#E74C3C", "#2E86C1"],
            legend: { position: "right" }
        }
    });


    const [radialChartData, setRadialChartData] = useState({
        series: [10000],  // Example: 10,000 pesos
        options: {
            chart: { type: "radialBar", height: 350 },
            labels: ["Petty Cash"],
            colors: ["#FF6384", "#36A2EB", "#FFCE56",],
            legend: { position: "bottom" },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        value: {
                            formatter: function (val) {
                                return Number(val).toLocaleString();
                            },
                            fontSize: "18px",
                            color: "#111",
                            offsetY: 5
                        },
                        name: {
                            fontSize: "16px",
                            offsetY: -5
                        }
                    }
                }
            }
        }
    });


    const [totalPatientNumber, setTotalPatientNumber] = useState('');

    const fetchTotalHospitalBills = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_total_hospital_bill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    patientBarangay: "All",
                    patientMunicipality: filterNamePatientMunicipality,
                    patientProvince: "All",
                    reportClassification
                })
            });

            const data = await response.json();

            // Set total patient number
            const totalPatients = data.reduce((sum, record) => sum + record.totalRecords, 0);
            setTotalPatientNumber(totalPatients);

            if (reportClassification === "Annual Report") {
                const monthlyCounts = Array(12).fill(0);
                data.forEach(record => {
                    const monthIndex = new Date(record.label + "-01").getMonth(); // '2025-04' → 3
                    monthlyCounts[monthIndex] = record.totalRecords;
                });

                setBarChartData(prevData => ({
                    ...prevData,
                    series: [{
                        ...prevData.series[0],
                        data: monthlyCounts
                    }],
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: [
                                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                            ]
                        }
                    }
                }));

            } else if (reportClassification === "This Month Report") {
                // Only use dates with actual records
                const labels = data.map(record => record.label); // e.g., '2025-04-15'
                const seriesData = data.map(record => record.totalRecords);

                setBarChartData(prevData => ({
                    ...prevData,
                    series: [{
                        ...prevData.series[0],
                        data: seriesData
                    }],
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: labels
                        }
                    }
                }));

            } else if (reportClassification === "This Week Report") {
                const now = new Date();
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday

                const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                const weekDates = weekdays.map((_, i) => {
                    const d = new Date(startOfWeek);
                    d.setDate(d.getDate() + i);
                    return d.toISOString().split("T")[0]; // e.g., '2025-04-28'
                });

                const dataMap = {};
                data.forEach(record => {
                    dataMap[record.label] = record.totalRecords;
                });

                const seriesData = weekDates.map(date => dataMap[date] || 0);

                setBarChartData(prevData => ({
                    ...prevData,
                    series: [{
                        ...prevData.series[0],
                        data: seriesData
                    }],
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: weekdays
                        }
                    }
                }));
            }

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };


    // Alay Pagdamay

    const [alayPagdamayNumber, setTotalAlayPagdamayNumber] = useState('');

    const fetchTotalAlayPagdamay = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_total_alay_pagdamay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    patientBarangay: "All",
                    patientMunicipality: filterNamePatientMunicipality,
                    patientProvince: "All",
                    reportClassification
                })
            });

            const data = await response.json();

            // Set total patient number
            const totalPatients = data.reduce((sum, record) => sum + record.totalRecords, 0);
            setTotalAlayPagdamayNumber(totalPatients);

            if (reportClassification === "Annual Report") {
                const monthlyCounts = Array(12).fill(0);
                data.forEach(record => {
                    const monthIndex = new Date(record.label + "-01").getMonth(); // '2025-04' → 3
                    monthlyCounts[monthIndex] = record.totalRecords;
                });

                setBarChartData(prevData => ({
                    ...prevData,
                    series: [{
                        ...prevData.series[0],
                        data: monthlyCounts
                    }],
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: [
                                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                            ]
                        }
                    }
                }));

            } else if (reportClassification === "This Month Report") {
                // Only use dates with actual records
                const labels = data.map(record => record.label); // e.g., '2025-04-15'
                const seriesData = data.map(record => record.totalRecords);

                setBarChartData(prevData => ({
                    ...prevData,
                    series: [{
                        ...prevData.series[0],
                        data: seriesData
                    }],
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: labels
                        }
                    }
                }));

            } else if (reportClassification === "This Week Report") {
                const now = new Date();
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday

                const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                const weekDates = weekdays.map((_, i) => {
                    const d = new Date(startOfWeek);
                    d.setDate(d.getDate() + i);
                    return d.toISOString().split("T")[0]; // e.g., '2025-04-28'
                });

                const dataMap = {};
                data.forEach(record => {
                    dataMap[record.label] = record.totalRecords;
                });

                const seriesData = weekDates.map(date => dataMap[date] || 0);

                setBarChartData(prevData => ({
                    ...prevData,
                    series: [{
                        ...prevData.series[0],
                        data: seriesData
                    }],
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: weekdays
                        }
                    }
                }));
            }

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    const fetchAlayPagdamayStatus = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_alay_pagdamay_status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    municipality: filterNamePatientMunicipality,
                    reportClassification: reportClassification
                }),
            });

            const data = await response.json();

            console.log("Hospital Bill Status Data: ", data);

            let labels = [];
            let series = [];

            if (Array.isArray(data) && data.length > 0) {
                labels = data.map(item => item.burial_status ?? "Unknown");
                series = data.map(item => item.totalCount ?? 0);

                const isAllZero = series.every(value => value === 0);

                if (isAllZero) {
                    labels = ["No Data"];
                    series = [0];
                }
            } else {
                labels = ["No Data"];
                series = [0];
            }

            setRadialChartData(prevData => ({
                ...prevData,
                series: series,
                options: {
                    ...prevData.options,
                    labels: labels
                }
            }));
        } catch (error) {
            console.error("Error fetching hospital bill status data:", error);
            setRadialChartData(prevData => ({
                ...prevData,
                series: [0],
                options: {
                    ...prevData.options,
                    labels: ["No Data"]
                }
            }));
        }
    };

    const fetchAlayPagdamayPettyCash = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_alay_pagdamay_petty_cash", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    municipality: filterNamePatientMunicipality,
                    reportClassification: reportClassification
                }),
            });
            /* const response = await fetch("http://localhost:5000/retrieve_hospital_bill_petty_cash"); */
            const data = await response.json();

            setPettyCashAmount(data.totalAmount);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    const fetchAlayPagdamayFuneralName = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_total_alay_pagdamay_funeral_name", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientMunicipality: filterNamePatientMunicipality,
                    reportClassification: reportClassification
                }),
            });

            const data = await response.json();

            // Provide fallback if no records are returned
            const hasData = data.length > 0;

            const labels = hasData
                ? data.map(item => item.contact_funeral_service)
                : ["No Data"];

            const series = hasData
                ? data.map(item => item.totalBills ?? 0)
                : [0];

            // Update the chart data
            setPolarChartData(prevData => ({
                ...prevData,
                options: {
                    ...prevData.options,
                    labels: labels
                },
                series: series,
            }));

            console.log("Updated Labels:", labels);
            console.log("Updated Series:", series);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    const fetchAlayPagdamayBarangay = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_total_alay_pagdamay_barangay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientMunicipality: filterNamePatientMunicipality,
                    reportClassification: reportClassification
                }),
            });

            const data = await response.json();

            // Check if the data contains any entries
            const hasData = data.length > 0;

            // Use real data if available, otherwise provide fallback
            const labels = hasData
                ? data.map(item => item.deceased_barangay)
                : ["No Data"];

            const series = hasData
                ? data.map(item => item.deceasedBarangay ?? 0)
                : [0];

            // Update pie chart data
            setPieChartData(prevData => ({
                ...prevData,
                options: {
                    ...prevData.options,
                    labels: labels
                },
                series: series,
            }));

            console.log("Updated Labels123:", labels);
            console.log("Updated Series:123", series);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };


    // Alay Pagdamay


    //Burial Assistance

    const [burialAssistanceNumber, setTotalBurialAssistanceNumber] = useState('');

    const fetchTotalBurialAssistance = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_total_burial_assistance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    patientBarangay: "All",
                    patientMunicipality: filterNamePatientMunicipality,
                    patientProvince: "All",
                    reportClassification
                })
            });

            const data = await response.json();

            // Set total patient number
            const totalPatients = data.reduce((sum, record) => sum + record.totalRecords, 0);
            setTotalBurialAssistanceNumber(totalPatients);

            if (reportClassification === "Annual Report") {
                const monthlyCounts = Array(12).fill(0);
                data.forEach(record => {
                    const monthIndex = new Date(record.label + "-01").getMonth(); // '2025-04' → 3
                    monthlyCounts[monthIndex] = record.totalRecords;
                });

                setBarChartData(prevData => ({
                    ...prevData,
                    series: [{
                        ...prevData.series[0],
                        data: monthlyCounts
                    }],
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: [
                                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                            ]
                        }
                    }
                }));

            } else if (reportClassification === "This Month Report") {
                // Only use dates with actual records
                const labels = data.map(record => record.label); // e.g., '2025-04-15'
                const seriesData = data.map(record => record.totalRecords);

                setBarChartData(prevData => ({
                    ...prevData,
                    series: [{
                        ...prevData.series[0],
                        data: seriesData
                    }],
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: labels
                        }
                    }
                }));

            } else if (reportClassification === "This Week Report") {
                const now = new Date();
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday

                const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                const weekDates = weekdays.map((_, i) => {
                    const d = new Date(startOfWeek);
                    d.setDate(d.getDate() + i);
                    return d.toISOString().split("T")[0]; // e.g., '2025-04-28'
                });

                const dataMap = {};
                data.forEach(record => {
                    dataMap[record.label] = record.totalRecords;
                });

                const seriesData = weekDates.map(date => dataMap[date] || 0);

                setBarChartData(prevData => ({
                    ...prevData,
                    series: [{
                        ...prevData.series[0],
                        data: seriesData
                    }],
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: weekdays
                        }
                    }
                }));
            }

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    const fetchBurialAssistanceStatus = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_burial_assistance_status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    municipality: filterNamePatientMunicipality,
                    reportClassification: reportClassification
                }),
            });

            const data = await response.json();

            console.log("Hospital Bill Status Data: ", data);

            let labels = [];
            let series = [];

            if (Array.isArray(data) && data.length > 0) {
                labels = data.map(item => item.burial_status ?? "Unknown");
                series = data.map(item => item.totalCount ?? 0);

                const isAllZero = series.every(value => value === 0);

                if (isAllZero) {
                    labels = ["No Data"];
                    series = [0];
                }
            } else {
                labels = ["No Data"];
                series = [0];
            }

            setRadialChartData(prevData => ({
                ...prevData,
                series: series,
                options: {
                    ...prevData.options,
                    labels: labels
                }
            }));
        } catch (error) {
            console.error("Error fetching hospital bill status data:", error);
            setRadialChartData(prevData => ({
                ...prevData,
                series: [0],
                options: {
                    ...prevData.options,
                    labels: ["No Data"]
                }
            }));
        }
    };

    const fetchBurialAssistancePettyCash = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_burial_assistance_petty_cash", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    municipality: filterNamePatientMunicipality,
                    reportClassification: reportClassification
                }),
            });
            /* const response = await fetch("http://localhost:5000/retrieve_hospital_bill_petty_cash"); */
            const data = await response.json();

            setPettyCashAmount(data.totalAmount);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    const fetchBurialAssistanceBarangay = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch("http://localhost:5000/retrieve_total_burial_assistance_barangay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientMunicipality: filterNamePatientMunicipality,
                    reportClassification: reportClassification
                }),
            });

            const data = await response.json();

            // Check if the data contains any entries
            const hasData = data.length > 0;

            // Use real data if available, otherwise provide fallback
            const labels = hasData
                ? data.map(item => item.client_barangay)
                : ["No Data"];

            const series = hasData
                ? data.map(item => item.clientBarangay ?? 0)
                : [0];

            // Update pie chart data
            setPieChartData(prevData => ({
                ...prevData,
                options: {
                    ...prevData.options,
                    labels: labels
                },
                series: series,
            }));

            console.log("Updated Labels123:", labels);
            console.log("Updated Series:123", series);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    // Burial Assistance


    function formatToPesos(amount) {
        return new Intl.NumberFormat('en-PH', {
            minimumFractionDigits: 0
        }).format(Math.abs(amount));
    }



    return (
        <>
            <main id="main" className="main">
                <div className="content">
                    <h1 style={{ fontWeight: 'bold', color: '#08533F' }}>Reports and Statistics</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"style={{ fontWeight: 'lighter', color: '#08533F' }}>
                                <a>Assistance Registry Reports</a></li>
                            <li className="breadcrumb-item active"style={{ color: '#08533F' }}>Reports and Statistics</li>
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

                                                <div className="card-body"style={{backgroundColor: '#F2FFEE'}}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h5 className="card-title"style={{fontWeight: 'bold', color: '#08533F', fontSize: '25px'}}>Filter Reports and Statistics</h5>
                                                    </div>

                                                    {/* Filter and Search Section */}
                                                    <div className="filterContainer" style={{border: "1px solid #000000"}}>
                                                        <h5>Filter: </h5><hr />

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
                                                                        <option value="Alay Pagdamay">Alay Pagdamay</option>
                                                                        <option value="Burial Assistance">Burial Assistance</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-3">
                                                                <div className="input-group">
                                                                    <label className="form-label">Select Report Classification: </label>
                                                                    <select
                                                                        className="form-control"
                                                                        id="hospital"
                                                                        value={reportClassification}
                                                                        onChange={(e) => setReportClassification(e.target.value)} >
                                                                        <option value="">Select Report Classification</option>
                                                                        <option value="This Week Report">This Week Report</option>
                                                                        <option value="This Month Report">This Month Report</option>
                                                                        <option value="Annual Report">Annual Report</option>
                                                                    </select>

                                                                </div>
                                                            </div>

                                                            <div className="col-sm-3">
                                                                <div className="input-group">
                                                                    <label className="form-label">Select Municipality: </label>
                                                                    <select
                                                                        className="form-control"
                                                                        id="hospital"
                                                                        value={patientMunicipality}
                                                                        onChange={(e) => setPatientMunicipality(e.target.value)} >
                                                                        <option value="All">All</option>
                                                                        <option value="Basud">Basud</option>
                                                                        <option value="Capalonga">Capalonga</option>
                                                                        <option value="Daet">Daet</option>
                                                                        <option value="Jose Panganiban">Jose Panganiban</option>
                                                                        <option value="Labo">Labo</option>
                                                                        <option value="Mercedes">Mercedes</option>
                                                                        <option value="Paracale">Paracale</option>
                                                                        <option value="San Lorenzo Ruiz">San Lorenzo Ruiz</option>
                                                                        <option value="San Vicente">San Vicente</option>
                                                                        <option value="Santa Elena">Santa Elena</option>
                                                                        <option value="Talisay">Talisay</option>
                                                                        <option value="Vinzons">Vinzons</option>
                                                                    </select>

                                                                </div>
                                                            </div>

                                                            <div className="col-sm-3">
                                                                <div className="input-group">
                                                                    <label className="form-label">Search: </label>
                                                                    <button onClick={retrieveFilter} type="button"
                                                                        className="reportbtn btn w-100" >
                                                                        Filter
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-12">
                                                                <div className="input-group">

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            {filterName === "Hospital Bill" &&
                                                <>
                                                    <div >

                                                        <div className="row">

                                                            <div className="col-xxl-6 col-md-6">
                                                                <div className="card info-card revenue-card h-100">
                                                                    <div className="filter">
                                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                                            <li className="dropdown-header text-start">
                                                                                <h6>Filter</h6>
                                                                            </li>

                                                                            <li><a className="dropdown-item" href="#">Today</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Month</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Year</a></li>
                                                                        </ul>
                                                                    </div>

                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Patient Number <span>| {reportClassification}</span></h5>
                                                                        <br />
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                <img src="../../assets/img/patient_logo.png" alt="1" className="dashboardSymbols" />
                                                                            </div>
                                                                            <div className="ps-3">
                                                                                <h6 id="dashboardAmounts">{formatToPesos(totalPatientNumber)}</h6>
                                                                                <span className="text-muted small pt-2 ps-1">total patient number</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-xxl-6 col-md-6">
                                                                <div className="card info-card revenue-card h-100">
                                                                    <div className="filter">
                                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                                            <li className="dropdown-header text-start">
                                                                                <h6>Filter</h6>
                                                                            </li>

                                                                            <li><a className="dropdown-item" href="#">Today</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Month</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Year</a></li>
                                                                        </ul>
                                                                    </div>

                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Petty Cash <span>| {reportClassification}</span></h5>
                                                                        <br />
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                <img src="../../assets/img/financial_icon.png" alt="1" className="dashboardSymbols" />
                                                                            </div>
                                                                            <div className="ps-3">
                                                                                <h6 id="dashboardAmounts">₱ {formatToPesos(pettyCashAmount)}</h6>
                                                                                <span className="text-muted small pt-2 ps-1">total amount of petty cash</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="col-lg-8">
                                                                <br />
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Patient Records</h5><br />
                                                                        <Chart options={barChartData.options} series={barChartData.series} type="bar" height={400} />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="col-lg-4">
                                                                <br />
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Hospital Bill Status</h5><br />
                                                                        <Chart options={radialChartData.options} series={radialChartData.series} type="donut" height={400} />
                                                                    </div>
                                                                </div>
                                                            </div>



                                                            <div className="col-lg-8">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Patient Per Hospital</h5><br />
                                                                        <Chart options={piePolarChartData.options} series={piePolarChartData.series} type="polarArea" height={400} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-4">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Patient Per Barangay</h5><br />
                                                                        <Chart options={pieChartData.options} series={pieChartData.series} type="donut" height={400} />
                                                                    </div>

                                                                    {/* <div className="card-body">
                                                                    <h5 className="card-title"></h5>
                                                                    <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
                                                                </div> */}
                                                                </div>
                                                            </div>

                                                            {/* <div className="col-lg-4">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">Total Patient Status</h5><br/>
                                                                    <Chart options={pieChartData.options} series={pieChartData.series} type="donut" height={400} />
                                                                </div> 
                                                            </div>
                                                        </div> */}


                                                        </div>

                                                    </div>

                                                </>
                                            }


                                            {filterName === "Alay Pagdamay" &&
                                                <>
                                                    <div >

                                                        <div className="row">

                                                            <div className="col-xxl-6 col-md-6">
                                                                <div className="card info-card revenue-card h-100">
                                                                    <div className="filter">
                                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                                            <li className="dropdown-header text-start">
                                                                                <h6>Filter</h6>
                                                                            </li>

                                                                            <li><a className="dropdown-item" href="#">Today</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Month</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Year</a></li>
                                                                        </ul>
                                                                    </div>

                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Alay Pagdamay <span>| {reportClassification}</span></h5>
                                                                        <br />
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                <img src="../../assets/img/patient_logo.png" alt="1" className="dashboardSymbols" />
                                                                            </div>
                                                                            <div className="ps-3">
                                                                                <h6 id="dashboardAmounts">{formatToPesos(alayPagdamayNumber)}</h6>
                                                                                <span className="text-muted small pt-2 ps-1">total alay pagdamay</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-xxl-6 col-md-6">
                                                                <div className="card info-card revenue-card h-100">
                                                                    <div className="filter">
                                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                                            <li className="dropdown-header text-start">
                                                                                <h6>Filter</h6>
                                                                            </li>

                                                                            <li><a className="dropdown-item" href="#">Today</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Month</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Year</a></li>
                                                                        </ul>
                                                                    </div>

                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Petty Cash <span>| {reportClassification}</span></h5>
                                                                        <br />
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                <img src="../../assets/img/financial_icon.png" alt="1" className="dashboardSymbols" />
                                                                            </div>
                                                                            <div className="ps-3">
                                                                                <h6 id="dashboardAmounts">₱ {formatToPesos(pettyCashAmount)}</h6>
                                                                                <span className="text-muted small pt-2 ps-1">total amount of petty cash</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-8">
                                                                <br />
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Alay Pagdamay Records</h5><br />
                                                                        <Chart options={barChartData.options} series={barChartData.series} type="bar" height={400} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-4">
                                                                <br />
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Alay Pagdamay Status</h5><br />
                                                                        <Chart options={radialChartData.options} series={radialChartData.series} type="donut" height={400} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-8">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Deceased Per Funeral</h5><br />
                                                                        <Chart options={piePolarChartData.options} series={piePolarChartData.series} type="polarArea" height={400} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-4">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Deceased Per Barangay</h5><br />
                                                                        <Chart options={pieChartData.options} series={pieChartData.series} type="donut" height={400} />
                                                                    </div>
                                                                </div>
                                                            </div>



                                                        </div>

                                                    </div>

                                                </>
                                            }

                                            {filterName === "Burial Assistance" &&
                                                <>
                                                    <div >

                                                        <div className="row">

                                                            <div className="col-xxl-6 col-md-6">
                                                                <div className="card info-card revenue-card h-100">
                                                                    <div className="filter">
                                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                                            <li className="dropdown-header text-start">
                                                                                <h6>Filter</h6>
                                                                            </li>

                                                                            <li><a className="dropdown-item" href="#">Today</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Month</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Year</a></li>
                                                                        </ul>
                                                                    </div>

                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Burial Assistance <span>| {reportClassification}</span></h5>
                                                                        <br />
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                <img src="../../assets/img/patient_logo.png" alt="1" className="dashboardSymbols" />
                                                                            </div>
                                                                            <div className="ps-3">
                                                                                <h6 id="dashboardAmounts">{formatToPesos(burialAssistanceNumber)}</h6>
                                                                                <span className="text-muted small pt-2 ps-1">total burial assistance</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-xxl-6 col-md-6">
                                                                <div className="card info-card revenue-card h-100">
                                                                    <div className="filter">
                                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                                            <li className="dropdown-header text-start">
                                                                                <h6>Filter</h6>
                                                                            </li>

                                                                            <li><a className="dropdown-item" href="#">Today</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Month</a></li>
                                                                            <li><a className="dropdown-item" href="#">This Year</a></li>
                                                                        </ul>
                                                                    </div>

                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Petty Cash <span>| {reportClassification}</span></h5>
                                                                        <br />
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                <img src="../../assets/img/financial_icon.png" alt="1" className="dashboardSymbols" />
                                                                            </div>
                                                                            <div className="ps-3">
                                                                                <h6 id="dashboardAmounts">₱ {formatToPesos(pettyCashAmount)}</h6>
                                                                                <span className="text-muted small pt-2 ps-1">total amount of petty cash</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-12">
                                                                <br />
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Alay Pagdamay Records</h5><br />
                                                                        <Chart options={barChartData.options} series={barChartData.series} type="bar" height={400} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Alay Pagdamay Status</h5><br />
                                                                        <Chart options={radialChartData.options} series={radialChartData.series} type="donut" height={400} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Deceased Per Barangay</h5><br />
                                                                        <Chart options={pieChartData.options} series={pieChartData.series} type="donut" height={400} />
                                                                    </div>
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
                        </section>
                    </div>
                </main>
            </main>


        </>
    );
}

export default ReportStatisticsContent;
