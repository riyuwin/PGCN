require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool({
    host: process.env.VITE_DB_HOST,
    user: process.env.VITE_DB_USER,
    password: process.env.VITE_DB_PASSWORD,
    database: process.env.VITE_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Adjust based on server load
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
    } else {
        console.log("Connected to MySQL database.");
        connection.release(); // Release connection back to the pool
    }
});

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(session({
    secret: process.env.VITE_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    }
}));

app.get("/accounts", (req, res) => {
    db.query("SELECT * FROM accounts", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.get("/basic_information", (req, res) => {
    db.query("SELECT * FROM basic_information", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

const bcrypt = require("bcrypt");

app.post("/create_account", (req, res) => {
    const { firstName, middleName, lastName, extName, gender, birthday, phoneNumber, address, membership, email, password, currentDate } = req.body;

    // Check if the email already exists
    db.query("SELECT * FROM accounts WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.error("Email Check Error:", err);
            return res.status(500).json({ error: "Internal server error." });
        }

        // If email already exists, return an error
        if (results.length > 0) {
            return res.status(400).json({ error: "Email is already taken." });
        }

        // Hash the password before saving it
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error("Password Hashing Error:", err);
                return res.status(500).json({ error: "Failed to hash password." });
            }

            // If email doesn't exist, proceed with the insert
            const insertAccountQuery = "INSERT INTO accounts (email, password, user_level, date_added) VALUES (?, ?, ?, ?)";
            const insertBasicInfoQuery = "INSERT INTO basic_information (account_id, fname, mname, lname, ext, gender, bdate, phoneNumber, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

            db.getConnection((err, connection) => {
                if (err) {
                    console.error("Transaction Error:", err);
                    return res.status(500).json({ error: err.message });
                }

                connection.beginTransaction((err) => {
                    if (err) {
                        console.error("Transaction Error:", err);
                        return connection.rollback(() => {
                            res.status(500).json({ error: err.message });
                        });
                    }

                    // Insert into accounts table with hashed password
                    connection.query(insertAccountQuery, [email, hashedPassword, membership, currentDate], (err, accountResult) => {
                        if (err) {
                            console.error("Account Insertion Error:", err);
                            return connection.rollback(() => {
                                res.status(500).json({ error: err.message });
                            });
                        }

                        const accountId = accountResult.insertId;

                        // Insert into basic_information table with the account_id
                        connection.query(insertBasicInfoQuery, [accountId, firstName, middleName, lastName, extName, gender, birthday, phoneNumber, address], (err, infoResult) => {
                            if (err) {
                                console.error("Basic Information Insertion Error:", err);
                                return connection.rollback(() => {
                                    res.status(500).json({ error: err.message });
                                });
                            }

                            // Commit transaction
                            connection.commit((err) => {
                                if (err) {
                                    console.error("Commit Error:", err);
                                    return connection.rollback(() => {
                                        res.status(500).json({ error: err.message });
                                    });
                                }
                                connection.release(); // Release the connection back to the pool
                                res.json({ message: "Account created successfully", account_id: accountId });
                            });
                        });
                    });
                });
            });

        });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check if the email exists in the accounts table
    db.query("SELECT * FROM accounts WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Internal server error." });
        }

        // If the email doesn't exist
        if (results.length === 0) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        const user = results[0];

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Password Comparison Error:", err);
                return res.status(500).json({ error: "Internal server error." });
            }

            // If the password does not match
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid email or password." });
            }

            // Store user details in session
            req.session.user = { account_id: user.account_id, email: user.email };

            // Force save the session
            /* req.session.save((err) => {
                if (err) {
                    console.error("Session Save Error:", err);
                    return res.status(500).json({ error: "Session not saved properly." });
                }
                console.log("Session Created:", req.session.user);
                res.json({ message: "Login successful", account_id: user.account_id });
            }); */

            /* res.json({ loggedIn: true, user: req.session.user }); */

            // Console log session details
            console.log("Session Created:", req.session.user);

            res.json({ message: "Login successful", account_id: user.account_id, email: user.email });
        });
    });
});

app.get("/session", (req, res) => {
    if (req.session.user) {
        console.log("Active Session:", req.session); // Log full session data
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        console.log("No active session");
        res.json({ loggedIn: false });
    }
});

// Logout
app.post("/logout", (req, res) => {
    if (!req.session) {
        return res.status(400).json({ error: "No active session" });
    }

    req.session.destroy((err) => {
        if (err) {
            console.error("Session destruction error:", err);
            return res.status(500).json({ error: "Logout failed" });
        }
        res.json({ message: "Logged out successfully" });
    });
});

app.post("/insert_hospital_bill", (req, res) => {
    const {
        account_id,
        patientFirstName, patientMiddleName, patientLastName, patientExtName,
        patientPurok, patientBarangay, patientMunicipality, patientProvince, dateConfinement, patientHospital,
        claimantFirstname, claimantMiddlename, claimantLastname, claimantExtName, claimantRelationship, claimantContact, claimantAmount,
        hospitalBillStatus,
        barangayIndigency,
        checkMedicalCertificate,
        checkFinalBill,
        validId,
        remarks // Added remarks
    } = req.body;

    const sanitizedHospital = patientHospital && patientHospital.trim() !== "" ? patientHospital : null;
    const currentDateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

    const insertHospitalBillQuery = `
        INSERT INTO hospital_bill
        (account_id, patient_fname, patient_mname, patient_lname, patient_ext_name, 
        patient_purok, patient_barangay, patient_municipality, patient_province, date_confinement,
        patient_hospital, claimant_fname, claimant_mname, claimant_lname, claimant_extname, 
        claimant_relationship, claimant_contact, claimant_amount, 
        hospital_bill_status, check_barangay_indigency, check_med_certificate, check_hospital_bill, check_valid_id, remarks, 
        datetime_added) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Database Connection Error:", err);
            return res.status(500).json({ error: "Database connection failed." });
        }

        connection.beginTransaction((err) => {
            if (err) {
                console.error("Transaction Error:", err);
                connection.release();
                return res.status(500).json({ error: "Transaction initialization failed." });
            }

            connection.query(insertHospitalBillQuery, [
                account_id, patientFirstName, patientMiddleName, patientLastName, patientExtName,
                patientPurok, patientBarangay, patientMunicipality, patientProvince, dateConfinement, sanitizedHospital,
                claimantFirstname, claimantMiddlename, claimantLastname, claimantExtName, claimantRelationship, claimantContact,
                claimantAmount,  // Fixed order
                hospitalBillStatus,
                barangayIndigency === 1,
                checkMedicalCertificate === 1,
                checkFinalBill === 1,
                validId === 1,
                remarks,  // Included remarks
                currentDateTime
            ], (err, result) => {
                if (err) {
                    console.error("Hospital Bill Insertion Error:", err.sqlMessage || err);
                    return connection.rollback(() => {
                        connection.release();
                        res.status(500).json({ error: "Failed to insert hospital bill." });
                    });
                }

                connection.commit((err) => {
                    if (err) {
                        console.error("Transaction Commit Error:", err);
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).json({ error: "Transaction commit failed." });
                        });
                    }

                    connection.release();
                    res.json({ message: "Hospital bill inserted successfully!", bill_id: result.insertId });
                });
            });
        });
    });
});

app.post("/update_hospital_bill", (req, res) => {
    const {
        billId, account_id,
        patientFirstName, patientMiddleName, patientLastName, patientExtName,
        patientPurok, patientBarangay, patientMunicipality, patientProvince, dateConfinement, patientHospital,
        claimantFirstname, claimantMiddlename, claimantLastname, claimantExtName, claimantRelationship, claimantContact,
        claimantAmount, hospitalBillStatus,
        barangayIndigency,
        checkMedicalCertificate,
        checkFinalBill, // Ensure consistency
        validId,
        remarks
    } = req.body;

    if (!billId) {
        return res.status(400).json({ error: "Missing hospital bill ID." });
    }

    const sanitizedHospital = patientHospital?.trim() || null;
    const currentDateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

    const updateHospitalBillQuery = `
        UPDATE hospital_bill
        SET 
            account_id = ?, 
            patient_fname = ?, 
            patient_mname = ?, 
            patient_lname = ?, 
            patient_ext_name = ?, 
            patient_purok = ?,
            patient_barangay = ?,
            patient_municipality = ?,
            patient_province = ?, 
            date_confinement = ?,
            patient_hospital = ?, 
            claimant_fname = ?, 
            claimant_mname = ?, 
            claimant_lname = ?, 
            claimant_extname = ?, 
            claimant_relationship = ?, 
            claimant_contact = ?, 
            claimant_amount = ?,
            hospital_bill_status = ?,
            check_barangay_indigency = ?,
            check_med_certificate = ?,
            check_hospital_bill = ?, 
            check_valid_id = ?,
            remarks = ?,
            datetime_added = ?
        WHERE hospital_bill_id = ?;
    `;

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Database Connection Error:", err);
            return res.status(500).json({ error: "Database connection failed." });
        }

        connection.beginTransaction((err) => {
            if (err) {
                console.error("Transaction Error:", err);
                connection.release();
                return res.status(500).json({ error: "Transaction initialization failed." });
            }

            connection.query(updateHospitalBillQuery, [
                account_id, patientFirstName, patientMiddleName, patientLastName, patientExtName,
                patientPurok, patientBarangay, patientMunicipality, patientProvince, dateConfinement, sanitizedHospital,
                claimantFirstname, claimantMiddlename, claimantLastname, claimantExtName, claimantRelationship, claimantContact,
                claimantAmount, hospitalBillStatus,
                barangayIndigency,
                checkMedicalCertificate,
                checkFinalBill, // Ensure consistency
                validId,
                remarks,
                currentDateTime, billId
            ], (err, result) => {
                if (err) {
                    console.error("Hospital Bill Update Error:", err.sqlMessage || err);
                    return connection.rollback(() => {
                        connection.release();
                        res.status(500).json({ error: "Failed to update hospital bill." });
                    });
                }

                if (result.affectedRows === 0) {
                    connection.release();
                    return res.status(404).json({ error: "Hospital bill not found for update." });
                }

                connection.commit((err) => {
                    if (err) {
                        console.error("Transaction Commit Error:", err);
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).json({ error: "Transaction commit failed." });
                        });
                    }

                    connection.release();
                    res.json({ message: "Hospital bill updated successfully!", bill_id: billId });
                });
            });
        });
    });
});


app.get("/retrieve_hospital_bill", (req, res) => {
    db.query("SELECT * FROM hospital_bill", (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results); // Ensure this is an array
    });
});

app.post("/delete_hospital_bill", (req, res) => {
    const { billId } = req.body;


    // Ensure that billId is provided
    if (!billId) {
        return res.status(400).json({ error: "billId is required." });
    }

    // SQL query to delete the hospital bill by billId
    const deleteHospitalBillQuery = "DELETE FROM hospital_bill WHERE hospital_bill_id = ?";

    // Execute the DELETE query
    db.query(deleteHospitalBillQuery, [billId], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Internal server error." });
        }

        // If no rows were affected, it means no record with the given billId was found
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Hospital bill not found." });
        }

        // Successfully deleted the hospital bill
        res.json({ message: "Hospital bill deleted successfully!" });
    });
});

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

app.post("/insert_alay_pagdamay", upload.single("deathCertificate"), (req, res) => {
    const {
        account_id,
        deceasedFirstName, deceasedMiddleName, deceasedLastName, deceasedExtName,
        deceasedPurok, deceasedBarangay, deceasedMunicipality, deceasedProvince, deceasedGender, deceasedDeathDate,
        contactPersonFirstname, contactPersonMiddlename, contactPersonLastname, contactPersonExtName, contactNumber, contactRelationship,
        contactPersonServiceCovered, contactPersonFuneralService, contactPersonEncoded,
        barangayIndigency, checkDeathCertificate, funeralContract, validId, burialStatus,
        remarks, pettyCashAmount, deceasedCauseDeath,
        currentDateTime
    } = req.body;

    console.log(
        contactPersonEncoded, 'Testttt'
    )

    const deathCertificate = req.file ? req.file.path : null; // Store file path instead of binary

    const insertBurialAssistanceQuery = `
        INSERT INTO alay_pagdamay 
            (account_id, deceased_fname, deceased_mname, deceased_lname, deceased_ext_name, 
            deceased_purok, deceased_barangay, deceased_municipality, deceased_province, 
            deceased_gender, deceased_deathdate, death_certificate, 
            contact_fname, contact_mname, contact_lname, contact_ext_name, contact_number, contact_relationship,
            contact_service_covered, contact_funeral_service, contact_person_encoded, 
            check_barangay_indigency, check_death_certificate, check_funeral_contract, check_valid_id, burial_status,
            remarks, petty_cash, death_cause, savedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Database Connection Error:", err);
            return res.status(500).json({ error: "Database connection failed." });
        }

        connection.beginTransaction((err) => {
            if (err) {
                console.error("Transaction Error:", err);
                connection.release();
                return res.status(500).json({ error: "Transaction initialization failed." });
            }

            connection.query(insertBurialAssistanceQuery, [
                account_id,
                deceasedFirstName, deceasedMiddleName, deceasedLastName, deceasedExtName,
                deceasedPurok, deceasedBarangay, deceasedMunicipality, deceasedProvince, deceasedGender, deceasedDeathDate, deathCertificate,
                contactPersonFirstname, contactPersonMiddlename, contactPersonLastname, contactPersonExtName, contactNumber, contactRelationship,
                contactPersonServiceCovered, contactPersonFuneralService, contactPersonEncoded,
                barangayIndigency, checkDeathCertificate, funeralContract, validId, burialStatus,
                remarks, pettyCashAmount, deceasedCauseDeath, currentDateTime
            ], (err, result) => {
                if (err) {
                    console.error("Burial Assistance Insertion Error:", err.sqlMessage || err);
                    return connection.rollback(() => {
                        connection.release();
                        res.status(500).json({ error: "Failed to insert burial assistance record." });
                    });
                }

                connection.commit((err) => {
                    connection.release(); // Ensure connection is always released
                    if (err) {
                        console.error("Transaction Commit Error:", err);
                        return res.status(500).json({ error: "Transaction commit failed." });
                    }

                    res.json({ message: "Burial assistance record inserted successfully!", burial_id: result.insertId });
                });
            });
        });
    });
});


app.get("/retrieve_alay_pagdamay", (req, res) => {
    db.query("SELECT * FROM alay_pagdamay", (err, results) => {
        if (err) {
            console.error("Error retrieving burial assistance records:", err);
            return res.status(500).json({ error: "Database error." });
        }

        // Convert BLOB to Base64 if it exists
        const burialRecords = results.map(row => ({
            ...row,
            death_certificate: row.death_certificate
                ? Buffer.from(row.death_certificate).toString("base64")
                : null
        }));

        res.json(burialRecords);
    });
});

app.get("/retrieve_alay_pagdamay_id", (req, res) => {
    const { burialId } = req.query; // Use req.query instead of req.body for GET requests

    if (!burialId) {
        return res.status(400).json({ error: "Missing burialId parameter." });
    }

    const sqlQuery = "SELECT * FROM alay_pagdamay WHERE burial_id = ?";

    db.query(sqlQuery, [burialId], (err, results) => {
        if (err) {
            console.error("Error retrieving burial assistance records:", err);
            return res.status(500).json({ error: "Database error." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No records found." });
        }

        // Convert BLOB to Base64 if it exists
        const burialRecords = results.map(row => ({
            ...row,
            death_certificate: row.death_certificate
                ? Buffer.from(row.death_certificate).toString("base64")
                : null
        }));

        res.json(burialRecords[0]); // Send only the first record
    });
});


app.post("/update_alay_pagdamay", upload.single("deathCertificate"), (req, res) => {
    const {
        burialId, account_id,
        deceasedFirstName, deceasedMiddleName, deceasedLastName, deceasedExtName,
        deceasedPurok, deceasedBarangay, deceasedMunicipality, deceasedProvince, deceasedGender, deceasedDeathDate,
        contactPersonFirstname, contactPersonMiddlename, contactPersonLastname, contactPersonExtName, contactNumber, contactRelationship,
        contactPersonServiceCovered, contactPersonFuneralService, contactPersonEncoded,
        barangayIndigency, checkDeathCertificate, funeralContract, validId, burialStatus,
        remarks, pettyCashAmount, deceasedCauseDeath, currentDateTime
    } = req.body;

    const deathCertificate = req.file ? req.file.buffer : null;

    let updateBurialAssistanceQuery = `
        UPDATE alay_pagdamay SET 
        account_id = ?, deceased_fname = ?, deceased_mname = ?, deceased_lname = ?, deceased_ext_name = ?, 
        deceased_purok = ?, deceased_barangay = ?, deceased_municipality = ?, deceased_province = ?,
        deceased_gender = ?, deceased_deathdate = ?, contact_fname = ?, contact_mname = ?, contact_lname = ?, contact_ext_name = ?, contact_number = ?, contact_relationship = ?,
        contact_service_covered = ?, contact_funeral_service = ?, contact_person_encoded = ?, 
        check_barangay_indigency = ?, check_death_certificate = ?, check_funeral_contract = ?, check_valid_id = ?, burial_status = ?,
        remarks = ?, petty_cash = ?, death_cause = ?, savedAt = ?
    `;

    const queryParams = [
        account_id,
        deceasedFirstName, deceasedMiddleName, deceasedLastName, deceasedExtName,
        deceasedPurok, deceasedBarangay, deceasedMunicipality, deceasedProvince, deceasedGender, deceasedDeathDate,
        contactPersonFirstname, contactPersonMiddlename, contactPersonLastname, contactPersonExtName, contactNumber, contactRelationship,
        contactPersonServiceCovered, contactPersonFuneralService, contactPersonEncoded,
        barangayIndigency, checkDeathCertificate, funeralContract, validId, burialStatus,
        remarks, pettyCashAmount, deceasedCauseDeath, currentDateTime
    ];

    if (deathCertificate) {
        updateBurialAssistanceQuery += ", death_certificate = ?";
        queryParams.push(deathCertificate);
    }

    updateBurialAssistanceQuery += " WHERE burial_id = ?";
    queryParams.push(burialId);

    db.query(updateBurialAssistanceQuery, queryParams, (err, result) => {
        if (err) {
            console.error("Burial Assistance Update Error:", err.sqlMessage || err);
            return res.status(500).json({ error: "Failed to update burial assistance record." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No record updated. Burial ID may not exist." });
        }

        res.json({ message: "Burial assistance record updated successfully!" });
    });
});


app.post("/delete_alay_pagdamay", (req, res) => {
    const { burialId } = req.body;

    if (!burialId) {
        return res.status(400).json({ error: "burialId is required." });
    }

    // SQL query to delete the hospital bill by billId
    const deleteBurialAssistanceQuery = "DELETE FROM alay_pagdamay WHERE burial_id = ?";

    // Execute the DELETE query
    db.query(deleteBurialAssistanceQuery, [burialId], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Internal server error." });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Burial assistance not found." });
        }

        res.json({ message: "Burial assistance deleted successfully!" });
    });
});

app.post("/update_burial_assistance", (req, res) => {
    const {
        burialId, account_id,
        clientFirstName, clientMiddleName, clientLastName, clientExtName,
        clientProvince, clientMunicipality, clientBarangay, clientPurok, clientRelationship,
        clientContactNumber, clientGender, clientAge, clientDateDeath, clientCauseDeath, clientAmount, clientTypeAssistance, clientStatusRemarks,
        clientApplication, clientInterviewer, burialAssistanceStatus,
        checkBarangayIndigency, checkDeathCertificate, checkFuneralContract, checkValidId,
        remarks, currentDateTime
    } = req.body;

    // Convert 1 or 0 to true or false
    const checkBarangayIndigencyBool = Boolean(checkBarangayIndigency);
    const checkDeathCertificateBool = Boolean(checkDeathCertificate);
    const checkFuneralContractBool = Boolean(checkFuneralContract);
    const checkValidIdBool = Boolean(checkValidId);

    const updateBurialAssistanceQuery = `
        UPDATE burial_assistance
        SET 
            account_id = ?, 
            client_fname = ?, 
            client_mname = ?, 
            client_lname = ?, 
            client_ext_name = ?, 
            client_province = ?, 
            client_municipality = ?, 
            client_barangay = ?, 
            client_purok = ?, 
            client_relationship = ?, 
            client_contact_num = ?, 
            client_gender = ?, 
            client_age = ?, 
            death_date = ?,
            death_cause = ?,
            amount = ?, 
            type_assistance = ?, 
            status_remarks = ?, 
            status_application = ?, 
            interviewer = ?, 
            savedAt = ?, 
            burial_status = ?, 
            check_barangay_indigency = ?, 
            check_death_certificate = ?, 
            check_funeral_contract = ?, 
            check_valid_id = ?, 
            remarks = ?
        WHERE burial_assistance_id = ?;
    `;

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Database Connection Error:", err.message);
            return res.status(500).json({ error: "Database connection failed." });
        }

        connection.beginTransaction((err) => {
            if (err) {
                console.error("Transaction Error:", err.message);
                connection.release();
                return res.status(500).json({ error: "Transaction initialization failed." });
            }

            connection.query(updateBurialAssistanceQuery, [
                account_id, clientFirstName, clientMiddleName, clientLastName, clientExtName,
                clientProvince, clientMunicipality, clientBarangay, clientPurok, clientRelationship,
                clientContactNumber, clientGender, clientAge, clientDateDeath, clientCauseDeath, clientAmount, clientTypeAssistance,
                clientStatusRemarks, clientApplication, clientInterviewer, currentDateTime, burialAssistanceStatus,
                checkBarangayIndigencyBool, checkDeathCertificateBool, checkFuneralContractBool, checkValidIdBool,
                remarks, burialId
            ], (err, result) => {
                if (err) {
                    console.error("Burial Assistance Update Error:", err.sqlMessage || err);
                    return connection.rollback(() => {
                        connection.release();
                        res.status(500).json({ error: "Failed to update burial assistance." });
                    });
                }

                connection.commit((err) => {
                    if (err) {
                        console.error("Transaction Commit Error:", err.message);
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).json({ error: "Transaction commit failed." });
                        });
                    }

                    if (result.affectedRows === 0) {
                        connection.release();
                        return res.status(404).json({ error: "Burial assistance not found for update." });
                    }

                    connection.release();
                    res.json({ message: "Burial assistance updated successfully!" });
                });
            });
        });
    });
});



app.post("/insert_burial_assistance", (req, res) => {
    const {
        account_id,
        clientFirstName, clientMiddleName, clientLastName, clientExtName,
        clientProvince, clientMunicipality, clientBarangay, clientPurok, clientRelationship,
        clientContactNumber, clientGender, clientAge, clientDateDeath, clientCauseDeath, clientAmount, clientTypeAssistance,
        clientStatusRemarks, clientApplication, clientInterviewer, burialAssistanceStatus,
        checkBarangayIndigency, checkDeathCertificate, checkFuneralContract, checkValidId,
        remarks, currentDateTime
    } = req.body;

    const insertBurialAssistanceQuery = `
        INSERT INTO burial_assistance (
            account_id, client_fname, client_mname, client_lname, client_ext_name,
            client_province, client_municipality, client_barangay, client_purok, client_relationship,
            client_contact_num, client_gender, client_age, death_date, death_cause, amount, type_assistance,
            status_remarks, status_application, interviewer, savedAt, burial_status,
            check_barangay_indigency, check_death_certificate, check_funeral_contract, check_valid_id, remarks
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Database Connection Error:", err.message);
            return res.status(500).json({ error: "Database connection failed." });
        }

        connection.beginTransaction((err) => {
            if (err) {
                console.error("Transaction Error:", err.message);
                connection.release();
                return res.status(500).json({ error: "Transaction initialization failed." });
            }

            connection.query(insertBurialAssistanceQuery, [
                account_id, clientFirstName, clientMiddleName, clientLastName, clientExtName,
                clientProvince, clientMunicipality, clientBarangay, clientPurok, clientRelationship,
                clientContactNumber, clientGender, clientAge, clientDateDeath, clientCauseDeath, clientAmount, clientTypeAssistance,
                clientStatusRemarks, clientApplication, clientInterviewer, currentDateTime, burialAssistanceStatus,
                checkBarangayIndigency, checkDeathCertificate, checkFuneralContract, checkValidId, remarks
            ], (err, result) => {
                if (err) {
                    console.error("Burial Assistance Insert Error:", err.sqlMessage || err);
                    return connection.rollback(() => {
                        connection.release();
                        res.status(500).json({ error: "Failed to insert burial assistance." });
                    });
                }

                connection.commit((err) => {
                    if (err) {
                        console.error("Transaction Commit Error:", err.message);
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).json({ error: "Transaction commit failed." });
                        });
                    }

                    connection.release();
                    res.json({ message: "Burial assistance added successfully!" });
                });
            });
        });
    });
});


app.get("/retrieve_burial_assistance", (req, res) => {
    db.query("SELECT * FROM burial_assistance", (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results); // Ensure this is an array
    });
});

app.post("/delete_burial_assistance", (req, res) => {
    const { burialId } = req.body;

    if (!burialId) {
        return res.status(400).json({ error: "burialId is required." });
    }

    // SQL query to delete the hospital bill by billId
    const deleteBurialAssistanceQuery = "DELETE FROM burial_assistance WHERE burial_assistance_id = ?";

    // Execute the DELETE query
    db.query(deleteBurialAssistanceQuery, [burialId], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Internal server error." });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Burial assistance not found." });
        }

        res.json({ message: "Burial assistance deleted successfully!" });
    });
});

app.get("/retrieve_hospital_bill_id", (req, res) => {
    const { hospitalId } = req.query; // Correct parameter

    if (!hospitalId) {  // Fix the incorrect variable name
        return res.status(400).json({ error: "Missing hospitalId parameter." });
    }

    const sqlQuery = "SELECT * FROM hospital_bill WHERE hospital_bill_id = ?";

    db.query(sqlQuery, [hospitalId], (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bill records:", err);
            return res.status(500).json({ error: "Database error." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No records found." });
        }

        res.status(200).json(results[0]); // Send the retrieved data
    });
});

app.post("/insert_pswdo_interview", (req, res) => {
    const {
        hospitalId, alayPagDamayID, burialAssistanceID, contactPersonAge, contactPersonCivilStatus, contactPersonOccupation,
        contactPersonIncome, contactPersonGender, contactPersonMobileNum, contactPersonPettyAmount,
        patientProvince, patientMunicipality, patientBarangay, patientPurok,
        familyComposition = [], transactionName, typeOfAssistance, member4Ps
    } = req.body;

    const savedAt = new Date().toISOString().slice(0, 19).replace("T", " ");

    const insertInterviewQuery = `
        INSERT INTO pswdo_interview
        (hospital_bill_id, burial_id, burial_assistance_id, age, civil_status, occupation, monthly_income, gender, 
        mobile_num, petty_amount, province, municipality, barangay, purok, type_assistance, member_4ps, transaction_name, savedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertFamilyQuery = `
        INSERT INTO family_composition
        (pswdo_interview_id, family_member_name, relationship, age, civil_status, occupation, monthly_income, savedAt)
        VALUES ?
    `;

    db.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Database connection failed." });

        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                return res.status(500).json({ error: "Transaction start failed." });
            }

            connection.query(insertInterviewQuery, [
                hospitalId, alayPagDamayID, burialAssistanceID, contactPersonAge, contactPersonCivilStatus, contactPersonOccupation,
                contactPersonIncome, contactPersonGender, contactPersonMobileNum, contactPersonPettyAmount,
                patientProvince, patientMunicipality, patientBarangay, patientPurok, typeOfAssistance, member4Ps, transactionName, savedAt
            ], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        connection.release();
                        res.status(500).json({ error: "Failed to insert PSWDO interview." });
                    });
                }

                const interviewId = result.insertId;

                // Prepare bulk family insert values
                const familyValues = familyComposition.map(member => [
                    interviewId,
                    member.name || "",
                    member.relationship || "",
                    member.age || "",
                    member.civilStatus || "",
                    member.occupation || "",
                    member.monthlyIncome || "",
                    savedAt
                ]);

                if (familyValues.length === 0) {
                    // No family members, commit directly
                    return connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                res.status(500).json({ error: "Transaction commit failed." });
                            });
                        }
                        connection.release();
                        res.json({ message: "PSWDO interview inserted with no family data." });
                    });
                }

                // Insert family composition
                connection.query(insertFamilyQuery, [familyValues], (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).json({ error: "Failed to insert family data." });
                        });
                    }

                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                res.status(500).json({ error: "Final commit failed." });
                            });
                        }

                        connection.release();
                        res.json({ message: "PSWDO interview and family data inserted successfully!" });
                    });
                });
            });
        });
    });
});

app.get("/retrieve_pswdo_interview_id", (req, res) => {
    const { Id, transactionName } = req.query;

    if (!Id) {
        return res.status(400).json({ error: "Missing Id parameter." });
    }

    let interviewQuery = ""; // Use 'let' to allow reassignment

    if (transactionName === "Hospital Bill") {
        interviewQuery = "SELECT * FROM pswdo_interview WHERE hospital_bill_id = ?";
    } else if (transactionName === "Alay Pagdamay") {
        interviewQuery = "SELECT * FROM pswdo_interview WHERE burial_id = ?";
    } else if (transactionName === "Burial Assistance") {
        interviewQuery = "SELECT * FROM pswdo_interview WHERE burial_assistance_id = ?";
    } else {
        return res.status(400).json({ error: "Invalid transaction name." });
    }

    db.query(interviewQuery, [Id], (err, interviewResults) => {
        if (err) {
            console.error("Error retrieving interview:", err);
            return res.status(500).json({ error: "Database error." });
        }

        if (interviewResults.length === 0) {
            return res.status(404).json({ error: "No interview found." });
        }

        const interview = interviewResults[0];

        const compositionQuery = "SELECT * FROM family_composition WHERE pswdo_interview_id = ?";

        db.query(compositionQuery, [interview.pswdo_interview_id], (err, compositionResults) => {
            if (err) {
                console.error("Error retrieving family composition:", err);
                return res.status(500).json({ error: "Database error (composition)." });
            }

            res.status(200).json({
                interview,
                familyComposition: compositionResults
            });
        });
    });
});



app.put("/update_pswdo_interview", (req, res) => {
    const {
        id, PSWDOId, contactPersonAge, contactPersonCivilStatus, contactPersonOccupation,
        contactPersonIncome, contactPersonGender, contactPersonMobileNum, contactPersonPettyAmount,
        patientProvince, patientMunicipality, patientBarangay, patientPurok, typeOfAssistance, member4Ps,
        transactionName, familyComposition = []
    } = req.body;

    let updateInterviewQuery = ""; // <-- Change from const to let

    if (transactionName === "Hospital Bill") {
        updateInterviewQuery = `
            UPDATE pswdo_interview SET
            age = ?, civil_status = ?, occupation = ?, monthly_income = ?, gender = ?, 
            mobile_num = ?, petty_amount = ?, province = ?, municipality = ?, barangay = ?, 
            purok = ?, type_assistance = ?, member_4ps = ?, transaction_name = ?
            WHERE hospital_bill_id = ?
        `;
    } else if (transactionName === "Alay Pagdamay") {
        updateInterviewQuery = `
            UPDATE pswdo_interview SET
            age = ?, civil_status = ?, occupation = ?, monthly_income = ?, gender = ?, 
            mobile_num = ?, petty_amount = ?, province = ?, municipality = ?, barangay = ?, 
            purok = ?, type_assistance = ?, member_4ps = ?, transaction_name = ?
            WHERE burial_id = ?
        `;
    } else if (transactionName === "Burial Assistance") {
        updateInterviewQuery = `
            UPDATE pswdo_interview SET
            age = ?, civil_status = ?, occupation = ?, monthly_income = ?, gender = ?, 
            mobile_num = ?, petty_amount = ?, province = ?, municipality = ?, barangay = ?, 
            purok = ?, type_assistance = ?, member_4ps = ?, transaction_name = ?
            WHERE burial_assistance_id = ?
        `;
    } else {
        return res.status(400).json({ error: "Invalid transaction name." });
    }

    const deleteFamilyQuery = `
        DELETE FROM family_composition WHERE pswdo_interview_id = ?
    `;

    const insertFamilyQuery = `
        INSERT INTO family_composition
        (pswdo_interview_id, family_member_name, relationship, age, civil_status, occupation, monthly_income)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Database connection error:", err);
            return res.status(500).json({ error: "Database connection failed." });
        }

        connection.beginTransaction(err => {
            if (err) {
                console.error("Transaction start error:", err);
                connection.release();
                return res.status(500).json({ error: "Transaction start failed." });
            }

            connection.query(updateInterviewQuery, [
                contactPersonAge, contactPersonCivilStatus, contactPersonOccupation,
                contactPersonIncome, contactPersonGender, contactPersonMobileNum, contactPersonPettyAmount,
                patientProvince, patientMunicipality, patientBarangay, patientPurok,
                typeOfAssistance, member4Ps, transactionName, id
            ], (err) => {
                if (err) {
                    console.error("Update interview error:", err);
                    return connection.rollback(() => {
                        connection.release();
                        res.status(500).json({ error: "Failed to update PSWDO interview." });
                    });
                }

                connection.query(deleteFamilyQuery, [PSWDOId], (err) => {
                    if (err) {
                        console.error("Delete family composition error:", err);
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).json({ error: "Failed to delete old family composition." });
                        });
                    }

                    const insertPromises = familyComposition.map(member => {
                        return new Promise((resolve, reject) => {
                            const values = [
                                PSWDOId,
                                member.name || '',
                                member.relationship || '',
                                member.age || '',
                                member.civilStatus || '',
                                member.occupation || '',
                                member.monthlyIncome || ''
                            ];
                            connection.query(insertFamilyQuery, values, (err) => {
                                if (err) return reject(err);
                                resolve();
                            });
                        });
                    });

                    Promise.all(insertPromises)
                        .then(() => {
                            connection.commit(err => {
                                if (err) {
                                    console.error("Commit error:", err);
                                    return connection.rollback(() => {
                                        connection.release();
                                        res.status(500).json({ error: "Final commit failed." });
                                    });
                                }

                                connection.release();
                                res.json({ message: "PSWDO interview and family data updated successfully!" });
                            });
                        })
                        .catch(err => {
                            console.error("Insert family composition error:", err);
                            connection.rollback(() => {
                                connection.release();
                                res.status(500).json({ error: "Failed to insert updated family composition." });
                            });
                        });
                });
            });
        });
    });
});

app.get("/retrieve_burial_assistance_id", (req, res) => {
    const { burialId } = req.query; // Correct parameter

    if (!burialId) {  // Fix the incorrect variable name
        return res.status(400).json({ error: "Missing burialAssitanceId parameter." });
    }

    const sqlQuery = "SELECT * FROM burial_assistance WHERE burial_assistance_id = ?";

    db.query(sqlQuery, [burialId], (err, results) => {
        if (err) {
            console.error("Error retrieving burial assistance records:", err);
            return res.status(500).json({ error: "Database error." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No records found." });
        }

        res.status(200).json(results[0]); // Send the retrieved data
    });
});

app.post("/retrieve_total_hospital_bill", (req, res) => {
    const { patientBarangay, patientMunicipality, patientProvince, reportClassification } = req.body;

    let selectField = "DATE_FORMAT(datetime_added, '%Y-%m') AS label"; // default: monthly
    let groupByField = "label";
    const conditions = [];
    const values = [];
    const now = new Date();

    // Location filters
    if (patientBarangay && patientBarangay !== "All") {
        conditions.push("patient_barangay = ?");
        values.push(patientBarangay);
    }
    if (patientMunicipality && patientMunicipality !== "All") {
        conditions.push("patient_municipality = ?");
        values.push(patientMunicipality);
    }
    if (patientProvince && patientProvince !== "All") {
        conditions.push("patient_province = ?");
        values.push(patientProvince);
    }

    // Report classification filters
    if (reportClassification === "This Month Report") {
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        selectField = "DATE_FORMAT(datetime_added, '%Y-%m-%d') AS label"; // group by date
        conditions.push("MONTH(datetime_added) = ?");
        values.push(currentMonth);
        conditions.push("YEAR(datetime_added) = ?");
        values.push(currentYear);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        selectField = "DATE_FORMAT(datetime_added, '%Y-%m-%d') AS label"; // group by date
        conditions.push("DATE(datetime_added) BETWEEN ? AND ?");
        values.push(startOfWeek.toISOString().slice(0, 10));
        values.push(endOfWeek.toISOString().slice(0, 10));
    }

    // Final query
    let query = `
        SELECT ${selectField}, COUNT(*) AS totalRecords
        FROM hospital_bill
    `;

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    query += ` GROUP BY ${groupByField} ORDER BY ${groupByField} ASC`;

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results);
    });
});


/* app.post("/retrieve_total_hospital_bill", (req, res) => {
    const { patientBarangay, patientMunicipality, patientProvince, reportClassification } = req.body;

    let query = `
        SELECT 
            DATE_FORMAT(datetime_added, '%Y-%m') AS month, 
            COUNT(*) AS totalRecords 
        FROM hospital_bill
    `;
    
    const conditions = [];
    const values = [];

    // Location filters
    if (patientBarangay && patientBarangay !== "All") {
        conditions.push("patient_barangay = ?");
        values.push(patientBarangay);
    }
    if (patientMunicipality && patientMunicipality !== "All") {
        conditions.push("patient_municipality = ?");
        values.push(patientMunicipality);
    }
    if (patientProvince && patientProvince !== "All") {
        conditions.push("patient_province = ?");
        values.push(patientProvince);
    }

    // Report classification filters
    const now = new Date();
    if (reportClassification === "This Month Report") {
        const currentMonth = now.getMonth() + 1; // JS months are 0-indexed
        const currentYear = now.getFullYear();
        conditions.push("MONTH(datetime_added) = ?");
        values.push(currentMonth);
        conditions.push("YEAR(datetime_added) = ?");
        values.push(currentYear);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday

        conditions.push("DATE(datetime_added) BETWEEN ? AND ?");
        values.push(startOfWeek.toISOString().slice(0, 10));
        values.push(endOfWeek.toISOString().slice(0, 10));
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    query += " GROUP BY month ORDER BY month ASC";

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results);


        console.log("Test: ", results)
    });
}); */

app.post("/retrieve_hospital_bill_status", (req, res) => {
    const now = new Date();
    const { municipality, reportClassification } = req.body;

    let query = `
        SELECT hospital_bill_status, COUNT(*) AS totalCount 
        FROM hospital_bill 
        WHERE 1=1
    `;
    const values = [];

    // Apply date filters
    if (reportClassification === "Annual Report") {
        const currentYear = now.getFullYear();
        query += " AND YEAR(datetime_added) = ?";
        values.push(currentYear);
    } else if (reportClassification === "This Month Report") {
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        query += " AND MONTH(datetime_added) = ? AND YEAR(datetime_added) = ?";
        values.push(currentMonth, currentYear);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

        query += " AND DATE(datetime_added) BETWEEN ? AND ?";
        values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
    }

    // Apply location filter
    if (municipality && municipality !== "All") {
        query += " AND patient_municipality = ?";
        values.push(municipality);
    }

    query += " GROUP BY hospital_bill_status";

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bill status counts:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results); // returns array like: [{ hospital_bill_status: "Approved", totalCount: 10 }, ...]
    });
});

app.post("/retrieve_hospital_bill_petty_cash", (req, res) => {
    const now = new Date();
    const { municipality, reportClassification } = req.body;

    let query = `SELECT SUM(claimant_amount) AS totalAmount FROM hospital_bill WHERE 1=1`;
    const values = [];

    // Apply date filters based on reportClassification
    if (reportClassification === "Annual Report") {
        const currentYear = now.getFullYear();
        query += " AND YEAR(datetime_added) = ?";
        values.push(currentYear);
    } else if (reportClassification === "This Month Report") {
        const currentMonth = now.getMonth() + 1; // 0-indexed
        const currentYear = now.getFullYear();
        query += " AND MONTH(datetime_added) = ? AND YEAR(datetime_added) = ?";
        values.push(currentMonth, currentYear);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

        query += " AND DATE(datetime_added) BETWEEN ? AND ?";
        values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
    }

    // Apply location filter
    if (municipality && municipality !== "All") {
        query += " AND patient_municipality = ?";
        values.push(municipality);
    }

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results[0]); // return single object: { totalAmount: ... }
    });
});


app.post("/retrieve_total_hospital_bill_hospital_name", (req, res) => {
    const now = new Date();
    const { patientMunicipality, reportClassification } = req.body;

    let query = `
        SELECT patient_hospital, COUNT(*) AS totalBills
        FROM hospital_bill
        WHERE 1=1
    `;
    const values = [];

    // Apply reportClassification date filters
    if (reportClassification === "Annual Report") {
        const currentYear = now.getFullYear();
        query += " AND YEAR(datetime_added) = ?";
        values.push(currentYear);
    } else if (reportClassification === "This Month Report") {
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        query += " AND YEAR(datetime_added) = ? AND MONTH(datetime_added) = ?";
        values.push(currentYear, currentMonth);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

        query += " AND DATE(datetime_added) BETWEEN ? AND ?";
        values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
    }

    // Municipality filter
    if (patientMunicipality && patientMunicipality !== "All") {
        query += " AND patient_municipality = ?";
        values.push(patientMunicipality);
    }

    query += " GROUP BY patient_hospital";

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results);
        console.log("Test: ", results);
    });
});

app.post("/retrieve_total_hospital_bill_barangay", (req, res) => {
    const now = new Date();
    const { patientMunicipality, reportClassification } = req.body;

    let query = `
        SELECT patient_barangay, COUNT(*) AS patientBarangay
        FROM hospital_bill
        WHERE 1=1
    `;
    const values = [];

    // Report classification date filter
    if (reportClassification === "Annual Report") {
        const currentYear = now.getFullYear();
        query += " AND YEAR(datetime_added) = ?";
        values.push(currentYear);
    } else if (reportClassification === "This Month Report") {
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        query += " AND YEAR(datetime_added) = ? AND MONTH(datetime_added) = ?";
        values.push(currentYear, currentMonth);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

        query += " AND DATE(datetime_added) BETWEEN ? AND ?";
        values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
    }

    // Municipality filter
    if (patientMunicipality && patientMunicipality !== "All") {
        query += " AND patient_municipality = ?";
        values.push(patientMunicipality);
    }

    query += " GROUP BY patient_barangay";

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results);
        console.log("Barangay Result: ", results);
    });
});

app.post("/retrieve_total_alay_pagdamay", (req, res) => {
    const { patientBarangay, patientMunicipality, patientProvince, reportClassification } = req.body;

    let selectField = "DATE_FORMAT(savedAt, '%Y-%m') AS label"; // default: monthly
    let groupByField = "label";
    const conditions = [];
    const values = [];
    const now = new Date();

    // Location filters
    if (patientBarangay && patientBarangay !== "All") {
        conditions.push("deceased_barangay = ?");
        values.push(patientBarangay);
    }
    if (patientMunicipality && patientMunicipality !== "All") {
        conditions.push("deceased_municipality = ?");
        values.push(patientMunicipality);
    }
    if (patientProvince && patientProvince !== "All") {
        conditions.push("deceased_province = ?");
        values.push(patientProvince);
    }

    // Report classification filters
    if (reportClassification === "This Month Report") {
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        selectField = "DATE_FORMAT(savedAt, '%Y-%m-%d') AS label"; // group by date
        conditions.push("MONTH(savedAt) = ?");
        values.push(currentMonth);
        conditions.push("YEAR(savedAt) = ?");
        values.push(currentYear);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        selectField = "DATE_FORMAT(savedAt, '%Y-%m-%d') AS label"; // group by date
        conditions.push("DATE(savedAt) BETWEEN ? AND ?");
        values.push(startOfWeek.toISOString().slice(0, 10));
        values.push(endOfWeek.toISOString().slice(0, 10));
    }

    // Final query
    let query = `
        SELECT ${selectField}, COUNT(*) AS totalRecords
        FROM alay_pagdamay
    `;

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    query += ` GROUP BY ${groupByField} ORDER BY ${groupByField} ASC`;

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results);
    });
});

app.post("/retrieve_alay_pagdamay_status", (req, res) => {
    const now = new Date();
    const { municipality, reportClassification } = req.body;

    let query = `
        SELECT burial_status, COUNT(*) AS totalCount 
        FROM alay_pagdamay 
        WHERE 1=1
    `;
    const values = [];

    // Apply date filters
    if (reportClassification === "Annual Report") {
        const currentYear = now.getFullYear();
        query += " AND YEAR(savedAt) = ?";
        values.push(currentYear);
    } else if (reportClassification === "This Month Report") {
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        query += " AND MONTH(savedAt) = ? AND YEAR(savedAt) = ?";
        values.push(currentMonth, currentYear);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

        query += " AND DATE(savedAt) BETWEEN ? AND ?";
        values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
    }

    // Apply location filter
    if (municipality && municipality !== "All") {
        query += " AND deceased_municipality = ?";
        values.push(municipality);
    }

    query += " GROUP BY burial_status";

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bill status counts:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results); // returns array like: [{ hospital_bill_status: "Approved", totalCount: 10 }, ...]
    });
});

app.post("/retrieve_alay_pagdamay_petty_cash", (req, res) => {
    const now = new Date();
    const { municipality, reportClassification } = req.body;

    let query = `SELECT SUM(petty_cash) AS totalAmount FROM alay_pagdamay WHERE 1=1`;
    const values = [];

    // Apply date filters based on reportClassification
    if (reportClassification === "Annual Report") {
        const currentYear = now.getFullYear();
        query += " AND YEAR(savedAt) = ?";
        values.push(currentYear);
    } else if (reportClassification === "This Month Report") {
        const currentMonth = now.getMonth() + 1; // 0-indexed
        const currentYear = now.getFullYear();
        query += " AND MONTH(savedAt) = ? AND YEAR(savedAt) = ?";
        values.push(currentMonth, currentYear);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

        query += " AND DATE(savedAt) BETWEEN ? AND ?";
        values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
    }

    // Apply location filter
    if (municipality && municipality !== "All") {
        query += " AND deceased_municipality = ?";
        values.push(municipality);
    }

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results[0]); // return single object: { totalAmount: ... }
    });
});

app.post("/retrieve_total_alay_pagdamay_funeral_name", (req, res) => {
    const now = new Date();
    const { patientMunicipality, reportClassification } = req.body;

    let query = `
        SELECT contact_funeral_service, COUNT(*) AS totalBills
        FROM alay_pagdamay
        WHERE 1=1
    `;
    const values = [];

    // Apply reportClassification date filters
    if (reportClassification === "Annual Report") {
        const currentYear = now.getFullYear();
        query += " AND YEAR(savedAt) = ?";
        values.push(currentYear);
    } else if (reportClassification === "This Month Report") {
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        query += " AND YEAR(savedAt) = ? AND MONTH(savedAt) = ?";
        values.push(currentYear, currentMonth);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

        query += " AND DATE(savedAt) BETWEEN ? AND ?";
        values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
    }

    // Municipality filter
    if (patientMunicipality && patientMunicipality !== "All") {
        query += " AND deceased_municipality = ?";
        values.push(patientMunicipality);
    }

    query += " GROUP BY contact_funeral_service";

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results);
        console.log("Test: ", results);
    });
});

app.post("/retrieve_total_alay_pagdamay_barangay", (req, res) => {
    const now = new Date();
    const { patientMunicipality, reportClassification } = req.body;

    let query = `
        SELECT deceased_barangay, COUNT(*) AS deceasedBarangay
        FROM alay_pagdamay
        WHERE 1=1
    `;
    const values = [];

    // Report classification date filter
    if (reportClassification === "Annual Report") {
        const currentYear = now.getFullYear();
        query += " AND YEAR(savedAt) = ?";
        values.push(currentYear);
    } else if (reportClassification === "This Month Report") {
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        query += " AND YEAR(savedAt) = ? AND MONTH(savedAt) = ?";
        values.push(currentYear, currentMonth);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

        query += " AND DATE(savedAt) BETWEEN ? AND ?";
        values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
    }

    // Municipality filter
    if (patientMunicipality && patientMunicipality !== "All") {
        query += " AND deceased_municipality = ?";
        values.push(patientMunicipality);
    }

    query += " GROUP BY deceased_barangay";

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results);
        console.log("Barangay Result: ", results);
    });
});


app.post("/retrieve_total_burial_assistance", (req, res) => {
    const { patientBarangay, patientMunicipality, patientProvince, reportClassification } = req.body;

    let selectField = "DATE_FORMAT(savedAt, '%Y-%m') AS label"; // default: monthly
    let groupByField = "label";
    const conditions = [];
    const values = [];
    const now = new Date();

    // Location filters
    if (patientBarangay && patientBarangay !== "All") {
        conditions.push("client_barangay = ?");
        values.push(patientBarangay);
    }
    if (patientMunicipality && patientMunicipality !== "All") {
        conditions.push("client_municipality = ?");
        values.push(patientMunicipality);
    }
    if (patientProvince && patientProvince !== "All") {
        conditions.push("client_province = ?");
        values.push(patientProvince);
    }

    // Report classification filters
    if (reportClassification === "This Month Report") {
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        selectField = "DATE_FORMAT(savedAt, '%Y-%m-%d') AS label"; // group by date
        conditions.push("MONTH(savedAt) = ?");
        values.push(currentMonth);
        conditions.push("YEAR(savedAt) = ?");
        values.push(currentYear);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        selectField = "DATE_FORMAT(savedAt, '%Y-%m-%d') AS label"; // group by date
        conditions.push("DATE(savedAt) BETWEEN ? AND ?");
        values.push(startOfWeek.toISOString().slice(0, 10));
        values.push(endOfWeek.toISOString().slice(0, 10));
    }

    // Final query
    let query = `
        SELECT ${selectField}, COUNT(*) AS totalRecords
        FROM burial_assistance
    `;

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    query += ` GROUP BY ${groupByField} ORDER BY ${groupByField} ASC`;

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results);
    });
});

app.post("/retrieve_burial_assistance_status", (req, res) => {
    const now = new Date();
    const { municipality, reportClassification } = req.body;

    let query = `
        SELECT burial_status, COUNT(*) AS totalCount 
        FROM burial_assistance 
        WHERE 1=1
    `;
    const values = [];

    // Apply date filters
    if (reportClassification === "Annual Report") {
        const currentYear = now.getFullYear();
        query += " AND YEAR(savedAt) = ?";
        values.push(currentYear);
    } else if (reportClassification === "This Month Report") {
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        query += " AND MONTH(savedAt) = ? AND YEAR(savedAt) = ?";
        values.push(currentMonth, currentYear);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

        query += " AND DATE(savedAt) BETWEEN ? AND ?";
        values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
    }

    // Apply location filter
    if (municipality && municipality !== "All") {
        query += " AND client_municipality = ?";
        values.push(municipality);
    }

    query += " GROUP BY burial_status";

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bill status counts:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results); // returns array like: [{ hospital_bill_status: "Approved", totalCount: 10 }, ...]
    });
});

app.post("/retrieve_burial_assistance_petty_cash", (req, res) => {
    const now = new Date();
    const { municipality, reportClassification } = req.body;

    let query = `SELECT SUM(amount) AS totalAmount FROM burial_assistance WHERE 1=1`;
    const values = [];

    // Apply date filters based on reportClassification
    if (reportClassification === "Annual Report") {
        const currentYear = now.getFullYear();
        query += " AND YEAR(savedAt) = ?";
        values.push(currentYear);
    } else if (reportClassification === "This Month Report") {
        const currentMonth = now.getMonth() + 1; // 0-indexed
        const currentYear = now.getFullYear();
        query += " AND MONTH(savedAt) = ? AND YEAR(savedAt) = ?";
        values.push(currentMonth, currentYear);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

        query += " AND DATE(savedAt) BETWEEN ? AND ?";
        values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
    }

    // Apply location filter
    if (municipality && municipality !== "All") {
        query += " AND client_municipality = ?";
        values.push(municipality);
    }

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results[0]); // return single object: { totalAmount: ... }
    });
});

app.post("/retrieve_total_burial_assistance_barangay", (req, res) => {
    const now = new Date();
    const { patientMunicipality, reportClassification } = req.body;

    let query = `
        SELECT client_barangay, COUNT(*) AS clientBarangay
        FROM burial_assistance
        WHERE 1=1
    `;
    const values = [];

    // Report classification date filter
    if (reportClassification === "Annual Report") {
        const currentYear = now.getFullYear();
        query += " AND YEAR(savedAt) = ?";
        values.push(currentYear);
    } else if (reportClassification === "This Month Report") {
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        query += " AND YEAR(savedAt) = ? AND MONTH(savedAt) = ?";
        values.push(currentYear, currentMonth);
    } else if (reportClassification === "This Week Report") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

        query += " AND DATE(savedAt) BETWEEN ? AND ?";
        values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
    }

    // Municipality filter
    if (patientMunicipality && patientMunicipality !== "All") {
        query += " AND client_municipality = ?";
        values.push(patientMunicipality);
    }

    query += " GROUP BY client_barangay";

    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Error retrieving hospital bills:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(results);
        console.log("Barangay Result: ", results);
    });
});
app.get("/retrieve_all_assistance", (req, res) => {
    const checkBarangayIndigency = req.query.check_barangay_indigency;
    const reportClassification = req.query.reportClassification;

    const now = new Date();

    // Helper function to generate condition and values based on date column
    const getDateCondition = (columnName) => {
        const conditions = [];
        const values = [];

        if (reportClassification === "Annual Report") {
            const currentYear = now.getFullYear();
            conditions.push(`YEAR(${columnName}) = ?`);
            values.push(currentYear);
        } else if (reportClassification === "This Month Report") {
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth() + 1;
            conditions.push(`YEAR(${columnName}) = ? AND MONTH(${columnName}) = ?`);
            values.push(currentYear, currentMonth);
        } else if (reportClassification === "This Week Report") {
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

            conditions.push(`DATE(${columnName}) BETWEEN ? AND ?`);
            values.push(startOfWeek.toISOString().slice(0, 10), endOfWeek.toISOString().slice(0, 10));
        }

        return { condition: conditions.length ? ` AND ${conditions.join(" AND ")}` : "", values };
    };

    const hospitalDateFilter = getDateCondition("datetime_added");
    const alayDateFilter = getDateCondition("savedAt");
    const burialDateFilter = getDateCondition("savedAt");

    const queries = {
        hospital: {
            sql: `SELECT COUNT(*) AS count FROM hospital_bill WHERE check_barangay_indigency = ?${hospitalDateFilter.condition}`,
            values: [checkBarangayIndigency, ...hospitalDateFilter.values]
        },
        alay: {
            sql: `SELECT COUNT(*) AS count FROM alay_pagdamay WHERE check_barangay_indigency = ?${alayDateFilter.condition}`,
            values: [checkBarangayIndigency, ...alayDateFilter.values]
        },
        burial: {
            sql: `SELECT COUNT(*) AS count FROM burial_assistance WHERE check_barangay_indigency = ?${burialDateFilter.condition}`,
            values: [checkBarangayIndigency, ...burialDateFilter.values]
        }
    };

    const results = {};

    db.query(queries.hospital.sql, queries.hospital.values, (err, hospitalResult) => {
        if (err) {
            console.error("Hospital Query Error:", err);
            return res.status(500).json({ error: "Database error (hospital)." });
        }

        results.hospital = hospitalResult[0].count;

        db.query(queries.alay.sql, queries.alay.values, (err, alayResult) => {
            if (err) {
                console.error("Alay Query Error:", err);
                return res.status(500).json({ error: "Database error (alay)." });
            }

            results.alay = alayResult[0].count;

            db.query(queries.burial.sql, queries.burial.values, (err, burialResult) => {
                if (err) {
                    console.error("Burial Query Error:", err);
                    return res.status(500).json({ error: "Database error (burial)." });
                }

                results.burial = burialResult[0].count;

                res.json(results);
            });
        });
    });
});


app.listen(process.env.VITE_PORT, () => console.log(`Server running on port ${process.env.VITE_PORT}`));
