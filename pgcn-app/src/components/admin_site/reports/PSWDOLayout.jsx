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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
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
        borderWidth: 1,
        borderColor: '#000',
    },

    /* Brief Background */
    briefBackgroundContent: {
        position: 'absolute',
        top: 345,
        left: 35,
        width: 525,
        height: 70,
        paddingLeft: 10,
        textAlign: 'left', 
        overflow: 'hidden', 
        whiteSpace: 'nowrap', 
        fontSize: 11,
        borderWidth: 1,
        borderColor: '#000',
        lineHeight: 1.3
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
                    <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text> 
                </View>

            </Page>
        </Document>
    );
};
