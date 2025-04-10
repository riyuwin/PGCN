import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf' }, // Regular
    { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 'bold' }, // Bold
  ]
});



// ✅ PDF Layout
export const PSWDOLayout = ({ claimantFirstname, claimantMiddlename, claimantLastname, claimantExtName}) => {
        
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

    const getBriefBackgroundResponsiveFontSize = (text, maxWidth, baseFontSize) => {
        const estimatedCharWidth = baseFontSize * 0.55; // Approximate width per character
        const estimatedTextWidth = text.length * estimatedCharWidth; // Estimated total text width

        if (estimatedTextWidth > maxWidth) {
            const scaleFactor = maxWidth / estimatedTextWidth; // Shrink factor
            return Math.max(baseFontSize * scaleFactor, 7.8); // Ensure font is at least size 6
        }
        return baseFontSize;
    };


    // Sample data
    const payeeName = `${claimantFirstname} ${claimantMiddlename} ${claimantLastname} ${claimantExtName}`;
    const addressName = "P-1 Brgy. Camambugan Daet, Camarines Norte";
    const baseFontSize = 11;
    const briefBackground = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry123. Lorem Ipsum is simply dummy text of the printing and typesetting industry123435s. Lorem Ipsum is simply dummy text of the printing and typesetting industry123435124s.";
    const amount = "FIFTEEN THOUSAND PESOS ONLY ";
    const amountNumber = 15000;

    const familyName = "Juan Dela Cruz Cruz Jr";
    const clientName = "Juan Dela Cruz";

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
            /* borderWidth: 1,
            borderColor: '#000', */
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
            /* borderWidth: 1,
            borderColor: '#000', */
        }, 

        /* Family Member 1 */
        familyMember1Content: {
            position: 'absolute',
            top: 255,
            left: 35,
            width: 155,
            paddingLeft: 5,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11,  
        },
        relationship1Content: {
            position: 'absolute',
            top: 255,
            left: 190,
            width: 87,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11,
        },
        age1Content: {
            position: 'absolute',
            top: 255,
            left: 275,
            width: 45,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        civilStatus1Content: {
            position: 'absolute',
            top: 255,
            left: 320,
            width: 73,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        occupation1Content: {
            position: 'absolute',
            top: 255,
            left: 393,
            width: 91,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        monthlyIncome1Content: {
            position: 'absolute',
            top: 255,
            left: 483,
            width: 78,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },

        /* Family Member 2 */
        familyMember2Content: {
            position: 'absolute',
            top: 268,
            left: 35,
            width: 155,
            paddingLeft: 5,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11,  
        },
        relationship2Content: {
            position: 'absolute',
            top: 268,
            left: 190,
            width: 87,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        age2Content: {
            position: 'absolute',
            top: 268,
            left: 275,
            width: 45,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        civilStatus2Content: {
            position: 'absolute',
            top: 268,
            left: 320,
            width: 73,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        occupation2Content: {
            position: 'absolute',
            top: 268,
            left: 393,
            width: 91,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        monthlyIncome2Content: {
            position: 'absolute',
            top: 268,
            left: 483,
            width: 78,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },

        /* Family Member 3 */
        familyMember3Content: {
            position: 'absolute',
            top: 281,
            left: 35,
            width: 155,
            paddingLeft: 5,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11,  
        },
        relationship3Content: {
            position: 'absolute',
            top: 281,
            left: 190,
            width: 87,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        age3Content: {
            position: 'absolute',
            top: 281,
            left: 275,
            width: 45,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        civilStatus3Content: {
            position: 'absolute',
            top: 281,
            left: 320,
            width: 73,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        occupation3Content: {
            position: 'absolute',
            top: 281,
            left: 393,
            width: 91,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        monthlyIncome3Content: {
            position: 'absolute',
            top: 281,
            left: 483,
            width: 78,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        
        /* Family Member 4 */
        familyMember4Content: {
            position: 'absolute',
            top: 294,
            left: 35,
            width: 155,
            paddingLeft: 5,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11,  
        },
        relationship4Content: {
            position: 'absolute',
            top: 294,
            left: 190,
            width: 87,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        age4Content: {
            position: 'absolute',
            top: 294,
            left: 275,
            width: 45,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        civilStatus4Content: {
            position: 'absolute',
            top: 294,
            left: 320,
            width: 73,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        occupation4Content: {
            position: 'absolute',
            top: 294,
            left: 393,
            width: 91,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        monthlyIncome4Content: {
            position: 'absolute',
            top: 294,
            left: 483,
            width: 78,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },  
        
        /* Family Member 5 */
        familyMember5Content: {
            position: 'absolute',
            top: 308,
            left: 35,
            width: 155,
            paddingLeft: 5,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11,  
        },
        relationship5Content: {
            position: 'absolute',
            top: 308,
            left: 190,
            width: 87,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        age5Content: {
            position: 'absolute',
            top: 308,
            left: 275,
            width: 45,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        civilStatus5Content: {
            position: 'absolute',
            top: 308,
            left: 320,
            width: 73,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        occupation5Content: {
            position: 'absolute',
            top: 308,
            left: 393,
            width: 91,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },
        monthlyIncome5Content: {
            position: 'absolute',
            top: 308,
            left: 483,
            width: 78,
            textAlign: 'center', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
        },

        /* Brief Background */
        briefBackgroundContent: {
            position: 'absolute',
            top: 347,
            left: 35,
            width: 525,
            height: 75,
            paddingLeft: 3,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
            lineHeight: 1.3,
        },

        
        /* Type of Assistance */
        medicalTypeAssistanceContent: {
            position: 'absolute',
            top: 452.5,
            left: 29,
            width: 25,
            height: 20,
            paddingLeft: 10,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
            lineHeight: 1.3
        },
        
        burialTypeAssistanceContent: {
            position: 'absolute',
            top: 452.5,
            left: 95,
            width: 25,
            height: 20,
            paddingLeft: 10,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
            lineHeight: 1.3
        },
        foodTypeAssistanceContent: {
            position: 'absolute',
            top: 452.5,
            left: 153,
            width: 25,
            height: 20,
            paddingLeft: 10,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
            lineHeight: 1.3
        },
        educationTypeAssistanceContent: {
            position: 'absolute',
            top: 452.5,
            left: 207,
            width: 25,
            height: 20,
            paddingLeft: 10,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
            lineHeight: 1.3
        },
        transportationTypeAssistanceContent: {
            position: 'absolute',
            top: 452.5,
            left: 294,
            width: 25,
            height: 20,
            paddingLeft: 10,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
            lineHeight: 1.3
        },
        emergencyShelterTypeAssistanceContent: {
            position: 'absolute',
            top: 452.5,
            left: 394,
            width: 25,
            height: 20,
            paddingLeft: 10,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
            lineHeight: 1.3
        },
        otherTypeAssistanceContent: {
            position: 'absolute',
            top: 452.5,
            left: 508,
            width: 25,
            height: 20,
            paddingLeft: 10,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
            lineHeight: 1.3
        },
        yes4PsTypeAssistanceContent: {
            position: 'absolute',
            top: 474,
            left: 196,
            width: 25,
            height: 20,
            paddingLeft: 10,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
            lineHeight: 1.3
        },
        no4PsTypeAssistanceContent: {
            position: 'absolute',
            top: 474,
            left: 265,
            width: 25,
            height: 20,
            paddingLeft: 10,
            textAlign: 'left', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap', 
            fontSize: 11, 
            lineHeight: 1.3
        },       
        certifyNameContent: {
            position: 'absolute',
            top: 529,
            left: 170,
            width: 155,
            height: 13,
            display: 'flex',
            alignItems: 'center',        
            justifyContent: 'flex-start', 
            paddingLeft: 2,              
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: 11,
            textAlign: 'left',  
            fontFamily: 'Roboto',
            fontWeight: 'bold',             
        },
        certifyAddressContent: {
            position: 'absolute',
            top: 543,
            left: 45,
            width: 215,
            height: 13,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'left', 
            fontFamily: 'Roboto',
            fontWeight: 'bold',  
        },
        eligbleToContent:{
            position: 'absolute',
            top: 541,
            left: 365,
            width: 110,
            height: 15,
            fontSize: 10,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'left',  
            fontFamily: 'Roboto',
            fontWeight: 'bold',  
        },
        caseDateContent:{
            position: 'absolute',
            top: 570,
            left: 190,
            width: 90,
            height: 15,
            fontSize: 10,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'left',  
            fontFamily: 'Roboto',
            fontWeight: 'bold',  
        },
        amountContent:{
            position: 'absolute',
            top: 598,
            left: 328,
            width: 200,
            height: 15,
            fontSize: 10,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'left',  
            fontFamily: 'Roboto',
            fontWeight: 'bold',  
        },
        amountNumberContent:{
            position: 'absolute',
            top: 612,
            left: 37,
            width: 120,
            height: 15,
            fontSize: 9,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'left',  
            fontFamily: 'Roboto',
            fontWeight: 'bold',  
        },
        clientCompleteNameContent:{
            position: 'absolute',
            top: 660,
            left: 325,
            width: 220,
            height: 15,
            fontSize: 11,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'left', 
        }
    });

    const nameFontSize = getResponsiveFontSize(payeeName, maxWidth, baseFontSize);
    const addressFontSize = getResponsiveFontSize(addressName, maxWidth, baseFontSize);
    const familyNameFontSize = getResponsiveFontSize(familyName, maxWidth, baseFontSize);
    const briefBackgroundFontSize = getBriefBackgroundResponsiveFontSize(briefBackground, 250, baseFontSize);
    const certifyNameFontSize = getResponsiveFontSize(payeeName, 150, 10);
    const amountFontSize = getResponsiveFontSize(amount, 120, 11);
    const amountNumberFontSize = getResponsiveFontSize(amountNumber, maxWidth, baseFontSize);
    const clientNameFontSize = getResponsiveFontSize(clientName, maxWidth, baseFontSize);

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
                
                {/* Family Member 1 */}
                <View style={styles.familyMember1Content}>
                    <Text>John Erwin S. Albos</Text> 
                </View>

                <View style={styles.relationship1Content}>
                    <Text>Mother</Text> 
                </View>

                <View style={styles.age1Content}>
                    <Text>12</Text> 
                </View>
                
                <View style={styles.civilStatus1Content}>
                    <Text>Single</Text> 
                </View>
                
                <View style={styles.occupation1Content}>
                    <Text>Farmer</Text> 
                </View>

                <View style={styles.monthlyIncome1Content}>
                    <Text>15,000</Text> 
                </View>

                {/* Family Member 2 */} 
                <View style={styles.familyMember2Content}>
                    <Text>John Erwin S. Albos</Text> 
                </View>

                <View style={styles.relationship2Content}>
                    <Text>Mother</Text> 
                </View>

                <View style={styles.age2Content}>
                    <Text>12</Text> 
                </View>
                
                <View style={styles.civilStatus2Content}>
                    <Text>Single</Text> 
                </View>
                
                <View style={styles.occupation2Content}>
                    <Text>Farmer</Text> 
                </View>

                <View style={styles.monthlyIncome2Content}>
                    <Text>15,000</Text> 
                </View>

                {/* Family Member 3 */} 
                <View style={styles.familyMember3Content}>
                    <Text>John Erwin S. Albos</Text> 
                </View>

                <View style={styles.relationship3Content}>
                    <Text>Mother</Text> 
                </View>

                <View style={styles.age3Content}>
                    <Text>12</Text> 
                </View>
                
                <View style={styles.civilStatus3Content}>
                    <Text>Single</Text> 
                </View>
                
                <View style={styles.occupation3Content}>
                    <Text>Farmer</Text> 
                </View>

                <View style={styles.monthlyIncome3Content}>
                    <Text>15,000</Text> 
                </View>

                {/* Family Member 4 */} 
                <View style={styles.familyMember4Content}>
                    <Text>John Erwin S. Albos</Text> 
                </View>

                <View style={styles.relationship4Content}>
                    <Text>Mother</Text> 
                </View>

                <View style={styles.age4Content}>
                    <Text>12</Text> 
                </View>
                
                <View style={styles.civilStatus4Content}>
                    <Text>Single</Text> 
                </View>
                
                <View style={styles.occupation4Content}>
                    <Text>Farmer</Text> 
                </View>

                <View style={styles.monthlyIncome4Content}>
                    <Text>15,000</Text> 
                </View>


                {/* Family Member 4 */} 
                <View style={styles.familyMember5Content}>
                    <Text>John Erwin S. Albos</Text> 
                </View>

                <View style={styles.relationship5Content}>
                    <Text>Mother</Text> 
                </View>

                <View style={styles.age5Content}>
                    <Text>12</Text> 
                </View>
                
                <View style={styles.civilStatus5Content}>
                    <Text>Single</Text> 
                </View>
                
                <View style={styles.occupation5Content}>
                    <Text>Farmer</Text> 
                </View>

                <View style={styles.monthlyIncome5Content}>
                    <Text>15,000</Text> 
                </View>
                
                <View style={styles.briefBackgroundContent}>
                    <Text style={{ fontSize: briefBackgroundFontSize }}>{briefBackground}</Text> 
                </View>

                <View style={styles.medicalTypeAssistanceContent}>
                    <Text>/</Text> 
                </View>
                
                <View style={styles.burialTypeAssistanceContent}>
                    <Text>/</Text> 
                </View>
                
                <View style={styles.foodTypeAssistanceContent}>
                    <Text>/</Text> 
                </View>

                <View style={styles.educationTypeAssistanceContent}>
                    <Text>/</Text> 
                </View>

                <View style={styles.transportationTypeAssistanceContent}>
                    <Text>/</Text> 
                </View>

                <View style={styles.emergencyShelterTypeAssistanceContent}>
                    <Text>/</Text> 
                </View>

                <View style={styles.otherTypeAssistanceContent}>
                    <Text>/</Text> 
                </View>

                <View style={styles.yes4PsTypeAssistanceContent}>
                    <Text>/</Text> 
                </View>

                <View style={styles.no4PsTypeAssistanceContent}>
                    <Text>/</Text> 
                </View>
 
                <View style={[styles.certifyNameContent, styles.textContainer]}>
                    <Text style={{ fontSize: certifyNameFontSize }}>{payeeName}</Text> 
                </View>
 
                <View style={[styles.certifyAddressContent, styles.textContainer]}>
                    <Text style={{ fontSize: addressFontSize }}>{addressName}</Text> 
                </View>

                <View style={[styles.eligbleToContent, styles.textContainer]}>
                    <Text >Financial Assistance</Text> 
                </View>

                <View style={[styles.caseDateContent, styles.textContainer]}>
                    <Text >January 05, 2005</Text> 
                </View>
 
                <View style={[styles.amountContent, styles.textContainer]}>
                    <Text style={{ fontSize: amountFontSize }}>{amount}</Text>  
                </View>

                <View style={[styles.amountNumberContent, styles.textContainer]}>
                    <Text style={{ fontSize: addressFontSize }}>{amountNumber}</Text>  
                </View>

                <View style={[styles.clientCompleteNameContent, styles.textContainer]}>
                    <Text style={{ fontSize: clientNameFontSize }}>{clientName}</Text>  
                </View>
                
            </Page>
        </Document>
    );
};
