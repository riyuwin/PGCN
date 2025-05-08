import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import * as port from "../ports/DatabaseRouting" 
import { RetrieveAllAssistance } from "../ports/DatabaseRouting"; 

function DashboardContent() {

    const [totalPatientNumber, setTotalPatientNumber] = useState('');
    const [hopitalBillPettyCashAmount, setHopitalBillPettyCashAmount] = useState('');
    const [alayPagdamayCashAmount, setAlayPagdamayCashAmount] = useState('');
    const [burialAssistanceCashAmount, setBurialAssistanceCashAmount] = useState('');


    const [multipleRadialBarChartData, setMultipleRadialBarChartData] = useState({
        series: [0, 0, 0],
        options: {
            chart: {
                type: "radialBar",
                height: 350
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: "16px"
                        },
                        value: {
                            fontSize: "14px"
                        },
                        total: {
                            show: true,
                            label: "Total",
                            formatter: function (w) {
                                // Optional total computation
                                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                            }
                        }
                    }
                }
            },
            labels: ["Hospital Bill", "Alay Pagdamay", "Burial Assistance"],
            colors: ["#2196F3", "#4CAF50", "#FF5722"]
        }
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

    const [donutPieChartData, setDonutPieChartData] = useState({
        series: [10, 15, 20, 25, 30, 40, 50],  // Data values for each category
        options: {
            chart: { type: "donut", height: 350 },
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],  // Pie chart labels
            colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD", "#E74C3C", "#2E86C1"],
            legend: { position: "bottom" }
        }
    });

    const [pieChartData, setPieChartData] = useState({
        series: [10, 15, 20],  // Data values for each category
        options: {
            chart: { type: "pie", height: 350 },
            labels: ["Hospital Bill", "Alay Pagdamay", "Burial Assistance",],  // Pie chart labels
            colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD", "#E74C3C", "#2E86C1"],
            legend: { position: "right" }
        }
    });

    const [hospitalPieChartData, setHospitalPieChartData] = useState({
        series: [10, 15, 20],  // Data values for each category
        options: {
            chart: { type: "pie", height: 250 },
            labels: ["Hospital Bill", "Alay Pagdamay", "Burial Assistance",],  // Pie chart labels
            colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD", "#E74C3C", "#2E86C1"],
            legend: { position: "right" }
        }
    });

    const [alayPagdamayPieChartData, setAlayPagdamayPieChartData] = useState({
        series: [10, 15, 20],  // Data values for each category
        options: {
            chart: { type: "pie", height: 250 },
            labels: ["Hospital Bill", "Alay Pagdamay", "Burial Assistance",],  // Pie chart labels
            colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD", "#E74C3C", "#2E86C1"],
            legend: { position: "right" }
        }
    });

    const [burialAssistancePieChartData, setBurialAssistancePieChartData] = useState({
        series: [10, 15, 20],  // Data values for each category
        options: {
            chart: { type: "pie", height: 250 },
            labels: ["Hospital Bill", "Alay Pagdamay", "Burial Assistance",],  // Pie chart labels
            colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD", "#E74C3C", "#2E86C1"],
            legend: { position: "right" }
        }
    });


    /* const [barChartData, setBarChartData] = useState({
        series: [{
            name: "Active Services",
            data: [25, 10, 5, 30, 6, 30, 5]
        }],
        options: {
            chart: { type: "bar", height: 350 },
            xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
            colors: ["#2196F3"],
        }
    }); */

    const [barChartData, setBarChartData] = useState({
        series: [
            {
                name: "Hospital Bill Records",
                data: [25, 10, 5, 30, 6, 30, 5],
            },
            {
                name: "Alay Pagdamay Records",
                data: [15, 20, 10, 20, 15, 25, 10],
            },
            {
                name: "Burial Assistance Records",
                data: [10, 5, 8, 15, 12, 10, 20],
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
                toolbar: {
                    show: true, // 👈 ito ang nagpapakita ng burger menu
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true,
                        customIcons: []
                    }
                }
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            },
            colors: ["#2196F3", "#FFC107", "#4CAF50"],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                position: "top",
            },
        }

    });


    useEffect(() => {
        fetchAllBarChartData("All", "Annual Report");
        fetchHospitalBillPettyCash("All", "Annual Report")
        fetchAlayPagdamayPettyCash("All", "Annual Report");
        fetchBurialAssistancePettyCash("All", "Annual Report");
        fetchAllAssistanceBarChartData(0, "Annual Report");
        fetchHospitalBillPatientBarangay("All", "Annual Report");
        fetchAlayPagdamayBarangay("All", "Annual Report");
        fetchBurialAssistanceBarangay("All", "Annual Report");
    }, []);

    const fetchAllBarChartData = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const endpoints = {
                hospital: port.PortRetrieveTotalHospitalBill,
                alay: port.PortRetrieveTotalAlayPagdamay,
                burial: port.PortRetrieveTotalBurialAssistance,
            };

            const bodyData = JSON.stringify({
                patientBarangay: "All",
                patientMunicipality: filterNamePatientMunicipality,
                patientProvince: "All",
                reportClassification
            });

            const [hospitalRes, alayRes, burialRes] = await Promise.all([
                fetch(endpoints.hospital, { method: "POST", headers: { "Content-Type": "application/json" }, body: bodyData }),
                fetch(endpoints.alay, { method: "POST", headers: { "Content-Type": "application/json" }, body: bodyData }),
                fetch(endpoints.burial, { method: "POST", headers: { "Content-Type": "application/json" }, body: bodyData }),
            ]);

            const [hospitalData, alayData, burialData] = await Promise.all([
                hospitalRes.json(),
                alayRes.json(),
                burialRes.json()
            ]);

            // Determine labels (categories) and series per report type
            let categories = [];
            let series = [[], [], []]; // [hospital, alay, burial]

            if (reportClassification === "Annual Report") {
                categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const toMonthlyCounts = (data) => {
                    const counts = Array(12).fill(0);
                    data.forEach(record => {
                        const monthIndex = new Date(record.label + "-01").getMonth();
                        counts[monthIndex] = record.totalRecords;
                    });
                    return counts;
                };
                series = [
                    toMonthlyCounts(hospitalData),
                    toMonthlyCounts(alayData),
                    toMonthlyCounts(burialData),
                ];
            } else if (reportClassification === "This Month Report") {
                categories = hospitalData.map(r => r.label); // Assume all datasets follow same dates
                const mapCounts = (data) => {
                    const map = {};
                    data.forEach(r => { map[r.label] = r.totalRecords; });
                    return categories.map(date => map[date] || 0);
                };
                series = [
                    mapCounts(hospitalData),
                    mapCounts(alayData),
                    mapCounts(burialData),
                ];
            } else if (reportClassification === "This Week Report") {
                const now = new Date();
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday

                const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                const weekDates = weekdays.map((_, i) => {
                    const d = new Date(startOfWeek);
                    d.setDate(d.getDate() + i);
                    return d.toISOString().split("T")[0];
                });

                const toWeeklyCounts = (data) => {
                    const map = {};
                    data.forEach(r => { map[r.label] = r.totalRecords; });
                    return weekDates.map(date => map[date] || 0);
                };

                categories = weekdays;
                series = [
                    toWeeklyCounts(hospitalData),
                    toWeeklyCounts(alayData),
                    toWeeklyCounts(burialData),
                ];
            }

            // Final bar chart update
            setBarChartData(prevData => ({
                ...prevData,
                series: [
                    { name: "Hospital Bill Records", data: series[0] },
                    { name: "Alay Pagdamay Records", data: series[1] },
                    { name: "Burial Assistance Records", data: series[2] },
                ],
                options: {
                    ...prevData.options,
                    xaxis: {
                        ...prevData.options.xaxis,
                        categories
                    }
                }
            }));
        } catch (error) {
            console.error("Error fetching combined bar chart data:", error);
        }
    };

    const fetchHospitalBillPettyCash = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch(port.PortRetrieveHospitalBillPettyCash, {
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

            setHopitalBillPettyCashAmount(data.totalAmount);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    const fetchAlayPagdamayPettyCash = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch(port.PortRetrieveAlayPagdamayPettyCash, {
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

            setAlayPagdamayCashAmount(data.totalAmount);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    const fetchBurialAssistancePettyCash = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch(port.PortRetrieveBurialAssistancePettyCash, {
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

            setBurialAssistanceCashAmount(data.totalAmount);

        } catch (error) {
            console.error("Error fetching hospital bills:", error);
        }
    };

    const fetchAllAssistanceBarChartData = async (barangayIndigencyValue, reportClassification) => {
        try {
            const queryParam = encodeURIComponent(barangayIndigencyValue);
            const reportParam = encodeURIComponent(reportClassification);

            const response = await fetch(RetrieveAllAssistance(queryParam, reportParam));

            const counts = await response.json(); // { hospital: 10, alay: 5, burial: 7 }

            console.log("HAHAHA: ", counts);

            setMultipleRadialBarChartData(prevData => ({
                ...prevData,
                series: [
                    parseInt(counts.hospital) || 0,
                    parseInt(counts.alay) || 0,
                    parseInt(counts.burial) || 0
                ],
                options: {
                    ...prevData.options
                    // `labels` can stay unchanged if static
                }
            }));
        } catch (error) {
            console.error("Error fetching combined assistance data:", error);
        }
    };


    const fetchAlayPagdamayBarangay = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch(port.PortRetrieveTotalAlayPagdamayBarangay, {
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
            setAlayPagdamayPieChartData(prevData => ({
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

    const fetchHospitalBillPatientBarangay = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch(port.PortRetrieveTotalHospitalBillBarangay, {
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
            setHospitalPieChartData(prevData => ({
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

    const fetchBurialAssistanceBarangay = async (filterNamePatientMunicipality, reportClassification) => {
        try {
            const response = await fetch(port.PortRetrieveTotalBurialAssistanceBarangay, {
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
            setBurialAssistancePieChartData(prevData => ({
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


    function formatToPesos(amount) {
        return new Intl.NumberFormat('en-PH', {
            minimumFractionDigits: 0
        }).format(Math.abs(amount));
    }

    return (
        <>
            <main id="main" className="main">
                <div className="content">
                    <h1 style={{ fontWeight: 'bold', color: '#08533F' }}>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"style={{ fontWeight: 'lighter', color: '#08533F' }}>
                                <a>Menu</a></li>
                            <li className="breadcrumb-item active"style={{ color: '#08533F' }}>Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <hr />


                <div className="container-fluid">
                    <section className="section dashboard">
                        <div className="row ">

                            <div className="col-xxl-4 col-md-4">
                                <div className="statscard card info-card sales-card h-100">
                                    <div className="filter">
                                        <Link
                                            className="icon"
                                            to="#"
                                            data-bs-toggle="dropdown"
                                        >
                                            <i className="bi bi-three-dots"></i>
                                        </Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                                <h6>Filter</h6>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="#">
                                                    Today
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="#">
                                                    This Month
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="#">
                                                    This Year
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title" style={{fontWeight: 'bold', color: '#0C623A'}}>
                                            Hospital Bill
                                            <span style={{fontWeight: 'lighter', color: '#0C623A'}} > | This Month Report</span>
                                        </h5><br />
                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <img src="../../assets/img/med_logo.png" alt="1" className="dashboardSymbols" />
                                            </div>
                                            <div className="ps-3">
                                                <div className="ps-3">
                                                    <h6 id="dashboardAmounts">₱ {formatToPesos(hopitalBillPettyCashAmount)}</h6>
                                                    <span className="text-muted small pt-2 ps-1">total amount of cash beneficiaries</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-xxl-4 col-md-4">
                                <div className="statscard card info-card revenue-card h-100">
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
                                        <h5 className="card-title "style={{fontWeight: 'bold', color: '#0C623A'}}>Alay Pagdamay 
                                            <span style={{fontWeight: 'lighter', color: '#0C623A'}}> | This Month Report</span></h5>
                                        <br />
                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <img src="../../assets/img/burial_icon.png" alt="1" className="dashboardSymbols" />
                                            </div>
                                            <div className="ps-3">
                                                <h6 id="dashboardAmounts">₱ {formatToPesos(alayPagdamayCashAmount)}</h6>
                                                <span className="text-muted small pt-2 ps-1">total amount of cash beneficiaries</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4">
                                <div className="statscard card info-card revenue-card h-100">
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
                                        <h5 className="card-title" style={{fontWeight: 'bold', color: '#0C623A'}}>Burial Assistance 
                                            <span style={{fontWeight: 'lighter', color: '#0C623A'}}> | This Month Report</span></h5>
                                        <br />
                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <img src="../../assets/img/financial_icon.png" alt="1" className="dashboardSymbols" />
                                            </div>
                                            <div className="ps-3">
                                                <h6 id="dashboardAmounts"> ₱ {formatToPesos(burialAssistanceCashAmount)}</h6>
                                                <span className="text-muted small pt-2 ps-1">total amount of cash beneficiaries</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 ">
                                <br></br>
                            </div>

                            <div className="row align-items-stretch">
                                <div className="col-lg-8" >
                                    <div className="card">
                                        <div className="statscard card-body">
                                            <h5 className="card-title"style={{fontWeight: 'bold', color: '#0C623A'}}>Dong Tulong Records 
                                                <span style={{fontWeight: 'lighter', color: '#0C623A'}}> | This Year</span></h5>
                                            <Chart options={barChartData.options} series={barChartData.series} type="bar" height={350} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="statscard card-body">
                                            <h5 className="card-title"style={{fontWeight: 'bold', color: '#0C623A', padding: '12px'}}>Number of Missing Barangay Indigency 
                                                <span style={{fontWeight: 'lighter', color: '#0C623A'}}> | This Year</span></h5>
                                            <Chart options={multipleRadialBarChartData.options} series={multipleRadialBarChartData.series} type="radialBar" height={350} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row align-items-stretch">
                                <div className="col-lg-4 mb-4">
                                    <div className="card h-100">
                                        <div className="statscard card-body">
                                            <h5 className="card-title" style={{fontWeight: 'bold', color: '#0C623A'}}>Hospital Bill Per Barangay 
                                                <span style={{fontWeight: 'lighter', color: '#0C623A'}}> | This Month</span></h5>
                                            <Chart options={hospitalPieChartData.options} series={hospitalPieChartData.series} type="pie" height={250} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <div className="card h-100">
                                        <div className="statscard card-body">
                                            <h5 className="card-title "style={{fontWeight: 'bold', color: '#0C623A'}}>Alay Pagdamay Per Barangay 
                                                <span style={{fontWeight: 'lighter', color: '#0C623A'}}> | This Month</span></h5>
                                            <Chart options={alayPagdamayPieChartData.options} series={alayPagdamayPieChartData.series} type="pie" height={250} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 mb-4">
                                    <div className="card h-100">
                                        <div className="statscard card-body">
                                            <h5 className="card-title" style={{fontWeight: 'bold    ', color: '#0C623A'}}>Burial Assistance Per Barangay 
                                                <span style={{fontWeight: 'lighter', color: '#0C623A'}}> | This Month</span></h5>
                                            <Chart options={burialAssistancePieChartData.options} series={burialAssistancePieChartData.series} type="pie" height={250} />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-lg-12 m-12">
                                    
                                </div>
                            </div>


                        </div>
                    </section>
                </div>
                
                

            </main>

            {/* <div className="admin_footer">
                    
            </div> */}
        </>
    );
}

export default DashboardContent;