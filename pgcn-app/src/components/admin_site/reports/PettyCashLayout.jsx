import React from 'react';
import { Font, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Register a custom font with ExtraBold weight
Font.register({
    family: 'Montserrat',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTUHjIg1_i6t8kCHKm45_dJE3gTD_u50.woff2', fontWeight: 'normal' },
        { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_cJD3gTD_u50.woff2', fontWeight: 'bold' },
        { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3gTD_u50.woff2', fontWeight: '900' }
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
    },
    column: {
        width: '50%',
        padding: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 10, 
        fontFamily: 'Montserrat',
        fontWeight: '900', // Bold text
    },
    text: {
        fontSize: 10,
        marginBottom: 5,
    },
    section: {
        /* marginBottom: 10, */
        borderWidth: 1,
        borderColor: '#000',
        padding: '2px'
    },
    sectionPerson: {
        /* marginBottom: 10, */
        borderWidth: 1,
        borderColor: '#000',
        padding: '10px'
    },
    table: {
        width: '100%',
        /* borderWidth: 1, */
        borderColor: '#000',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        fontSize: 10,
        width: '50%',
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
    },
    tableColParticulars: {
        fontSize: 10,
        width: '65%',
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
    },
    tableColAmount: {
        fontSize: 10,
        width: '35%',
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
    },
    tableHeader: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    centeredText: {
        fontSize: 10,
        textAlign: 'center',
    }
});

const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export const PettyCashLayout = ({ claimantFirstname, claimantMiddlename, claimantLastname, claimantExtName, patientPurok, patientBarangay, patientMunicipality, patientProvince, claimantAmount }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {[...Array(2)].map((_, index) => (
                <View key={index} style={styles.column}>
                    <View style={styles.section}>
                        <Text style={styles.title}>PETTY CASH VOUCHER</Text>
                        <Text style={styles.centeredText}>Provincial Government of Camarines Norte</Text>
                        <Text style={styles.centeredText}>LGU</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Payee / Office:</Text> {claimantFirstname} {claimantMiddlename} {claimantLastname} {claimantExtName}</Text> 
                    </View>
                    
                    <View style={styles.section}> 
                        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Address:</Text> Purok - {patientPurok} Barangay {patientBarangay}, {patientMunicipality} {patientProvince}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold', fontSize: '10px' }}>I. To be filled up upon request</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColParticulars}><Text style={styles.tableHeader}>Particulars</Text></View>
                            <View style={styles.tableColAmount}><Text style={styles.tableHeader}>Amount</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColParticulars}><Text style={styles.centeredText}>Hospital Bill</Text></View>
                            <View style={styles.tableColAmount}><Text style={styles.centeredText}>{claimantAmount}</Text></View>
                        </View>
                    </View>

                    <View style={styles.sectionPerson}>
                        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>A.</Text> Approved by:</Text>
                        <Text style={styles.text}></Text>
                        <Text style={styles.centeredText}><Text style={{ fontWeight: 'bold' }}>CYNTHIA R. DELA CRUZ</Text></Text>
                    </View>

                    <View style={styles.sectionPerson}>
                        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>B.</Text> Paid by:</Text>
                        <Text style={styles.text}></Text>
                        <Text style={styles.centeredText}><Text style={{ fontWeight: 'bold' }}>RITA G. GUEVARRA</Text></Text>
                        <Text style={styles.centeredText}>Social Worker</Text>
                    </View>

                    <View style={styles.sectionPerson}>
                        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>C.</Text> Cash Received by:</Text>
                        <Text style={styles.text}></Text>
                        <Text style={styles.centeredText}><Text style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{claimantFirstname} {claimantMiddlename} {claimantLastname} {claimantExtName}</Text></Text>
                        <Text style={styles.centeredText}>Signature over Printed Name of Payee</Text>
                        <Text style={styles.text}></Text>
                        <Text style={styles.text}></Text>
                        <Text style={styles.text}>Date: <Text style={{ textDecoration: 'underline', marginTop: '10px'}}>{currentDate}</Text></Text>
                    </View>
                </View>
            ))}
            
        </Page>
    </Document>
);
