import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Function to dynamically adjust font size based on width
const getResponsiveFontSize = (text, maxWidth, baseFontSize) => {
    const estimatedCharWidth = baseFontSize * 0.55; // Approximate width per character
    const estimatedTextWidth = text.length * estimatedCharWidth; // Estimated total text width

    if (estimatedTextWidth > maxWidth) {
        const scaleFactor = maxWidth / estimatedTextWidth; // Shrink factor
        return Math.max(baseFontSize * scaleFactor, 7); // Ensure font is at least size 6
    }
    return baseFontSize;
};

// Sample data
const payeeName = "Juan Dela Cruz ";
const addressName = "P-1 Brgy. Camambugan Daet, Camarines Norte  ";
const maxWidth = 224;
const baseFontSize = 11;

const familyName = "Juan Dela Cruz Cruz Jr";

// ✅ Styles
const styles = StyleSheet.create({
    page: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    nameContent: {
        position: 'absolute',
        top: 151,
        left: 77,
        width: maxWidth,
        height: 13,
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'left', 
    },
    ageContent: {
        position: 'absolute',
        top: 151,
        left: 336,
        width: 35,
        textAlign: 'left', 
        overflow: 'hidden', 
        whiteSpace: 'nowrap', 
        fontSize: 11
    },

    civilStatusContent: {
        position: 'absolute',
        top: 151,
        left: 450,
        width: 35,
        textAlign: 'left', 
        overflow: 'hidden', 
        whiteSpace: 'nowrap', 
        fontSize: 11
    },
    addressContent: {
        position: 'absolute',
        top: 164,
        left: 88,
        width: 212,
        height: 13,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'left',
        borderWidth: 1,
        borderColor: '#000',
    },
    mobileNumberContent: {
        position: 'absolute',
        top: 164,
        left: 400,
        width: 160,
        textAlign: 'left', 
        overflow: 'hidden', 
        whiteSpace: 'nowrap', 
        fontSize: 11, 
    },
    occupationContent: {
        position: 'absolute',
        top: 178,
        left: 110,
        width: 200,
        textAlign: 'left', 
        overflow: 'hidden', 
        whiteSpace: 'nowrap', 
        fontSize: 11, 
    },
    monthlyIncomeContent: {
        position: 'absolute',
        top: 178,
        left: 410,
        width: 120,
        textAlign: 'left', 
        overflow: 'hidden', 
        whiteSpace: 'nowrap', 
        fontSize: 11
    },   
    familyNameContent: {
        position: 'absolute',
        top: 200,
        left: 88,
        width: 212,
        height: 13,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'left',
        borderWidth: 1,
        borderColor: '#000',
    },

});

// ✅ PDF Layout
export const PSWDOLayout = () => { 
    const nameFontSize = getResponsiveFontSize(payeeName, maxWidth, baseFontSize);
    const addressFontSize = getResponsiveFontSize(addressName, maxWidth, baseFontSize);
    const familyNameFontSize = getResponsiveFontSize(familyName, maxWidth, baseFontSize);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Background Image inside a View */}
                <View style={styles.backgroundContainer}>
                    <Image 
                        src="/assets/img/PSWDO_FORM.png" 
                        style={styles.backgroundImage}
                    />
                </View>

                {/* Overlay Text with Dynamic Font Size */}
                
                <View style={[styles.nameContent, styles.textContainer]}>
                    <Text style={{ fontSize: nameFontSize }}>{payeeName}</Text> 
                </View>
 
                <View style={styles.ageContent}>
                    <Text>12</Text> 
                </View>

                <View style={styles.civilStatusContent}>
                    <Text>Single</Text> 
                </View> 
                
                <View style={[styles.addressContent, styles.textContainer]}>
                    <Text style={{ fontSize: addressFontSize }}>{addressName}</Text> 
                </View>

                <View style={styles.mobileNumberContent}>
                    <Text>09126992952</Text> 
                </View>

                <View style={styles.occupationContent}>
                    <Text>Farmer</Text> 
                </View>
 
                <View style={styles.monthlyIncomeContent}>
                    <Text>10,000</Text> 
                </View>

                <View style={[styles.familyName, styles.textContainer]}>
                    <Text style={{ fontSize: familyNameFontSize }}>{familyName}</Text> 
                </View>

            </Page>
        </Document>
    );
};
