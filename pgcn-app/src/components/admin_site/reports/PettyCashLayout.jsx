import React from 'react';
import { Font, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


Font.register({
    family: 'Roboto',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf' }, // Regular
        { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 'bold' }, // Bold
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
        //fontFamily: 'Montserrat',
        //fontWeight: '900', // Bold text
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
    },
    boldLetter: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    }
});

const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

function formatToPesos(amount) {
    return new Intl.NumberFormat('en-PH', {
        minimumFractionDigits: 0
    }).format(Math.abs(amount));
}

export const PettyCashLayout = ({ claimantFirstname, claimantMiddlename, claimantLastname, claimantExtName, patientPurok, patientBarangay, patientMunicipality, patientProvince, claimantAmount, transactionName }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {[...Array(2)].map((_, index) => (
                <View key={index} style={styles.column}>
                    <View style={styles.section}>
                        <Text style={[styles.boldLetter, styles.title]}>PETTY CASH VOUCHER</Text>
                        <Text style={styles.centeredText}>Provincial Government of Camarines Norte</Text>
                        <Text style={[styles.boldLetter, styles.centeredText]}>LGU</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.text}>Payee / Office: <Text style={ styles.boldLetter }> {claimantFirstname} {claimantMiddlename} {claimantLastname} {claimantExtName}</Text></Text> 
                    </View>
                    
                    <View style={styles.section}> 
                        <Text style={styles.text}>Address: <Text style={ styles.boldLetter }>Purok - {patientPurok} Barangay {patientBarangay}, {patientMunicipality} {patientProvince}</Text></Text>
                    </View>

                    <View style={styles.section}>
                    <Text style={styles.text}><Text style={ styles.boldLetter }>I. To be filled up upon request</Text></Text> 
                    </View>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColParticulars}><Text style={styles.tableHeader}>Particulars</Text></View>
                            <View style={styles.tableColAmount}><Text style={styles.tableHeader}>Amount</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColParticulars}><Text style={[styles.boldLetter, styles.centeredText]}>{transactionName}</Text></View>
                            <View style={styles.tableColAmount}><Text style={[styles.boldLetter, styles.centeredText]}>{formatToPesos(claimantAmount)}</Text></View>
                        </View>
                    </View>

                    <View style={styles.sectionPerson}>
                        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>A.</Text> Approved by:</Text>
                        <Text style={styles.text}></Text>
                        <Text style={styles.centeredText}><Text style={ styles.boldLetter }>CYNTHIA R. DELA CRUZ</Text></Text>
                    </View>

                    <View style={styles.sectionPerson}>
                        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>B.</Text> Paid by:</Text>
                        <Text style={styles.text}></Text>
                        <Text style={styles.centeredText}><Text style={ styles.boldLetter }>RITA G. GUEVARRA</Text></Text>
                        <Text style={styles.centeredText}>Social Worker</Text>
                    </View>

                    <View style={styles.sectionPerson}>
                        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>C.</Text> Cash Received by:</Text>
                        <Text style={styles.text}></Text>
                        <Text style={styles.centeredText}><Text style={[{ fontWeight: 'bold', textDecoration: 'underline' }, styles.boldLetter]}>{claimantFirstname} {claimantMiddlename} {claimantLastname} {claimantExtName}</Text></Text>
                        <Text style={styles.centeredText}>Signature over Printed Name of Payee</Text>
                        <Text style={styles.text}></Text>
                        <Text style={styles.text}></Text>
                        <Text style={styles.text}>Date: <Text style={[{ textDecoration: 'underline', marginTop: '10px'}, styles.boldLetter ]}>{currentDate}</Text></Text>
                    </View>
                </View>
            ))}
            
        </Page>
    </Document>
);
