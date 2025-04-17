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
export const PSWDOLayout = ({
    claimantFirstname, claimantMiddlename, claimantLastname, claimantExtName, claimantAge, claimantCivilStatus,
    claimantPurok, claimantBarangay, claimantMunicipality, claimantProvince,
    claimantMobileNum, claimantOccupation, claimantMonthlyIncome, familyComposition, claimantRelationship,
    dateOfDeath, typeOfAssistance, member4Ps, contactPersonPettyAmount
}) => {

    console.log("Address: ", typeOfAssistance)

    const maxWidth = 260;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Handle null or undefined dates

        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

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
            return Math.max(baseFontSize * scaleFactor, 10); // Ensure font is at least size 6
        }
        return baseFontSize;
    };

    function formatToPesos(amount) {
        return new Intl.NumberFormat('en-PH', {
            minimumFractionDigits: 0
        }).format(Math.abs(amount));
    }

    // Sample data
    const payeeName = `${claimantFirstname} ${claimantMiddlename} ${claimantLastname} ${claimantExtName}`;
    const addressName = `P-${claimantPurok} Brgy. ${claimantBarangay} ${claimantMunicipality}, ${claimantProvince}`;
    const baseFontSize = 11;
    /* const briefBackground = `Client’s ${claimantRelationship} died last ${dateOfDeath} due to {}. The client's family is in dire need of financial help to cover the needs of the deceased.  As claimed, the client has no financial and no sufficient source of income as she only depends on ${claimantOccupation}, which is not enough to support the needs of the deceased during his/her wake and other financial needs. Hence, this request for assistance. `; */

    const briefBackground = `
            Client’s <span class="boldLetter">${claimantRelationship}</span> died last 
            <span class="boldLetter">${dateOfDeath}</span> due to 
            <span class="boldLetter">{causeOfDeath}</span>. The client's family is in dire need of financial help 
            to cover the needs of the deceased. As claimed, the client has no financial and no sufficient source of income 
            as she only depends on <span class="boldLetter  ">${claimantOccupation}</span>, which is not enough to support 
            the needs of the deceased during his/her wake and other financial needs. Hence, this request for assistance.
            `;


    const amount = "FIFTEEN THOUSAND PESOS ONLY ";
    const amountNumber = 15000;

    const familyName = "Juan Dela Cruz Cruz Jr";
    const clientName = "Juan Dela Cruz ";

    function numberToWords(num) {
        const ones = [
            '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six',
            'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
            'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
            'Seventeen', 'Eighteen', 'Nineteen'
        ];

        const tens = [
            '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
            'Sixty', 'Seventy', 'Eighty', 'Ninety'
        ];

        function convertToWords(n) {
            if (n < 20) return ones[n];
            if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
            if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertToWords(n % 100) : '');
            if (n < 1000000) return convertToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + convertToWords(n % 1000) : '');
            return 'Amount too large';
        }

        const words = convertToWords(num);
        return (words ? words + ' PESOS' : 'ZERO PESOS').toUpperCase();
    }

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
            width: 215,
            height: 13,
            fontSize: 11,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'left',
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
            paddingLeft: 0,
            paddingRight: 0,
            textAlign: 'left',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: 11,
            letterSpacing: 0.1,
            lineHeight: 1.3,
            /* borderWidth: 1,
            borderColor: '#000', */
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
        eligbleToContent: {
            position: 'absolute',
            top: 541,
            left: 365,
            width: 110,
            height: 15,
            fontSize: 11,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'left',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
        },
        caseDateContent: {
            position: 'absolute',
            top: 570,
            left: 190,
            width: 90,
            height: 15,
            fontSize: 11,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'left',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
        },
        amountContent: {
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
        amountNumberContent: {
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
        clientCompleteNameContent: {
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
        },
        boldLetter: {
            fontFamily: 'Roboto',
            fontWeight: 'bold',
        }
    });

    console.log("He", contactPersonPettyAmount)

    const nameFontSize = getResponsiveFontSize(payeeName, maxWidth, baseFontSize);
    const addressFontSize = getResponsiveFontSize(addressName, 230, baseFontSize);
    const familyNameFontSize = getResponsiveFontSize(familyName, maxWidth, baseFontSize);
    const briefBackgroundFontSize = getBriefBackgroundResponsiveFontSize(briefBackground, 200, baseFontSize);
    const certifyNameFontSize = getResponsiveFontSize(payeeName, 160, 10);
    const amountFontSize = getResponsiveFontSize(contactPersonPettyAmount, 160, 11);
    const amountNumberFontSize = getResponsiveFontSize(contactPersonPettyAmount, maxWidth, baseFontSize);
    const clientNameFontSize = getResponsiveFontSize(clientName, maxWidth, baseFontSize);
    const currentDataFontSize = getResponsiveFontSize(currentDate, 88, baseFontSize);

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
                    <Text>{claimantAge}</Text>
                </View>

                <View style={styles.civilStatusContent}>
                    <Text>{claimantCivilStatus}</Text>
                </View>

                <View style={[styles.addressContent, styles.textContainer]}>
                    {claimantPurok && claimantBarangay && claimantMunicipality && claimantProvince &&
                        <>
                            <Text style={{ fontSize: addressFontSize }}>{addressName}</Text>
                        </>
                    }
                </View>

                <View style={styles.mobileNumberContent}>
                    <Text>{claimantMobileNum}</Text>
                </View>

                <View style={styles.occupationContent}>
                    <Text>{claimantOccupation}</Text>
                </View>

                <View style={styles.monthlyIncomeContent}>
                    <Text>{formatToPesos(claimantMonthlyIncome)}</Text>
                </View>

                {/* Family Member 1 */}
                {familyComposition[0] &&
                    <>
                        <View style={styles.familyMember1Content}>
                            <Text>{familyComposition[0].name}</Text>
                        </View>

                        <View style={styles.relationship1Content}>
                            <Text>{familyComposition[0].relationship}</Text>
                        </View>

                        <View style={styles.age1Content}>
                            <Text>{familyComposition[0].age}</Text>
                        </View>

                        <View style={styles.civilStatus1Content}>
                            <Text>{familyComposition[0].civilStatus}</Text>
                        </View>

                        <View style={styles.occupation1Content}>
                            <Text>{familyComposition[0].occupation}</Text>
                        </View>

                        <View style={styles.monthlyIncome1Content}>
                            <Text>{formatToPesos(familyComposition[0].monthlyIncome)}</Text>
                        </View>
                    </>
                }

                {familyComposition[1] &&
                    <>
                        {/* Family Member 2 */}
                        <View style={styles.familyMember2Content}>
                            <Text>{familyComposition[1].name}</Text>
                        </View>

                        <View style={styles.relationship2Content}>
                            <Text>{familyComposition[1].relationship}</Text>
                        </View>

                        <View style={styles.age2Content}>
                            <Text>{familyComposition[1].age}</Text>
                        </View>

                        <View style={styles.civilStatus2Content}>
                            <Text>{familyComposition[1].civilStatus}</Text>
                        </View>

                        <View style={styles.occupation2Content}>
                            <Text>{familyComposition[1].occupation}</Text>
                        </View>

                        <View style={styles.monthlyIncome2Content}>
                            <Text>{formatToPesos(familyComposition[1].monthlyIncome)}</Text>
                        </View>
                    </>
                }

                {familyComposition[2] &&
                    <>
                        {/* Family Member 3 */}
                        <View style={styles.familyMember3Content}>
                            <Text>{familyComposition[2].name}</Text>
                        </View>

                        <View style={styles.relationship3Content}>
                            <Text>{familyComposition[2].relationship}</Text>
                        </View>

                        <View style={styles.age3Content}>
                            <Text>{familyComposition[3].relationship}</Text>
                        </View>

                        <View style={styles.civilStatus3Content}>
                            <Text>{familyComposition[3].civilStatus}</Text>
                        </View>

                        <View style={styles.occupation3Content}>
                            <Text>{familyComposition[3].occupation}</Text>
                        </View>

                        <View style={styles.monthlyIncome3Content}>
                            <Text>{formatToPesos(familyComposition[3].monthlyIncome)}</Text>
                        </View>
                    </>
                }

                {familyComposition[3] &&
                    <>
                        {/* Family Member 4 */}
                        <View style={styles.familyMember4Content}>
                            <Text>{familyComposition[3].name}</Text>
                        </View>

                        <View style={styles.relationship4Content}>
                            <Text>{familyComposition[3].relationship}</Text>
                        </View>

                        <View style={styles.age4Content}>
                            <Text>{familyComposition[3].age}</Text>
                        </View>

                        <View style={styles.civilStatus4Content}>
                            <Text>{familyComposition[3].civilStatus}</Text>
                        </View>

                        <View style={styles.occupation4Content}>
                            <Text>{familyComposition[3].occupation}</Text>
                        </View>

                        <View style={styles.monthlyIncome4Content}>
                            <Text>{formatToPesos(familyComposition[3].monthlyIncome)}</Text>
                        </View>
                    </>
                }

                {familyComposition[4] &&
                    <>
                        {/* Family Member 5 */}
                        <View style={styles.familyMember5Content}>
                            <Text>{familyComposition[4].name}</Text>
                        </View>

                        <View style={styles.relationship5Content}>
                            <Text>{familyComposition[4].relationship}</Text>
                        </View>

                        <View style={styles.age5Content}>
                            <Text>{familyComposition[4].age}</Text>
                        </View>

                        <View style={styles.civilStatus5Content}>
                            <Text>{familyComposition[4].civilStatus}</Text>
                        </View>

                        <View style={styles.occupation5Content}>
                            <Text>{familyComposition[4].occupation}</Text>
                        </View>

                        <View style={styles.monthlyIncome5Content}>
                            <Text>{formatToPesos(familyComposition[4].monthlyIncome)}</Text>
                        </View>
                    </>
                }

                {/* <View style={[styles.briefBackgroundContent, styles.textContainer]} >
                    <Text style={{ fontSize: briefBackgroundFontSize }}>{briefBackground}</Text> 
                </View> */}

                <View style={[styles.briefBackgroundContent, styles.textContainer]}>
                    {typeOfAssistance === "Medical" &&
                        <>
                            <Text style={{ fontSize: briefBackgroundFontSize }}>
                                Client’s <Text style={styles.boldLetter}>{claimantRelationship}</Text> died last{" "}
                                <Text style={styles.boldLetter}>{dateOfDeath}</Text> due to{" "}
                                <Text style={styles.boldLetter}>{ }</Text>. The client's family is in dire need of financial help
                                to cover the needs of the deceased. As claimed, the client has no financial and no sufficient source of income
                                as she only depends on <Text style={styles.boldLetter}>{formatToPesos(claimantMonthlyIncome)}</Text>, which is not enough to support
                                the needs of the deceased during his/her wake and other financial needs. Hence, this request for assistance.
                            </Text>
                        </>
                    }
                </View>

                {typeOfAssistance == "Medical" &&
                    <>
                        <View style={styles.medicalTypeAssistanceContent}>
                            <Text>/</Text>
                        </View>
                    </>
                }

                {typeOfAssistance == "Burial" || typeOfAssistance == "Alay Pagdamay" || typeOfAssistance == "Burial" &&
                    <>
                        <View style={styles.burialTypeAssistanceContent}>
                            <Text>/</Text>
                        </View>
                    </>
                }

                {typeOfAssistance == "Food" &&
                    <>
                        <View style={styles.foodTypeAssistanceContent}>
                            <Text>/</Text>
                        </View>
                    </>
                }


                {typeOfAssistance == "Education" &&
                    <>
                        <View style={styles.educationTypeAssistanceContent}>
                            <Text>/</Text>
                        </View>
                    </>
                }

                {typeOfAssistance == "Transportation" &&
                    <>
                        <View style={styles.transportationTypeAssistanceContent}>
                            <Text>/</Text>
                        </View>
                    </>
                }

                {typeOfAssistance == "Emergency Shelter" &&
                    <>
                        <View style={styles.emergencyShelterTypeAssistanceContent}>
                            <Text>/</Text>
                        </View>
                    </>
                }

                {typeOfAssistance == "Others" &&
                    <>
                        <View style={styles.otherTypeAssistanceContent}>
                            <Text>/</Text>
                        </View>
                    </>
                }

                {member4Ps == "Yes" &&
                    <>
                        <View style={styles.yes4PsTypeAssistanceContent}>
                            <Text>/</Text>
                        </View>
                    </>
                }

                {member4Ps == "No" &&
                    <>
                        <View style={styles.no4PsTypeAssistanceContent}>
                            <Text>/</Text>
                        </View>
                    </>
                }

                <View style={[styles.certifyNameContent, styles.textContainer]}>
                    <Text style={{ fontSize: certifyNameFontSize }}>{payeeName}</Text>
                </View>

                <View style={[styles.certifyAddressContent, styles.textContainer]}>
                    {claimantPurok && claimantBarangay && claimantMunicipality && claimantProvince &&
                        <>
                            <Text style={{ fontSize: addressFontSize }}>{addressName}</Text>
                        </>
                    }
                </View>

                <View style={[styles.eligbleToContent, styles.textContainer]}>
                    {typeOfAssistance &&
                        <>
                            <Text >{typeOfAssistance} Assistance</Text>
                        </>
                    }
                </View>

                <View style={[styles.caseDateContent, styles.textContainer]}>
                    <Text style={{ fontSize: currentDataFontSize }}>{currentDate}</Text>
                </View>

                <View style={[styles.amountContent, styles.textContainer]}>
                    {contactPersonPettyAmount &&
                        <>
                            <Text style={{ fontSize: amountFontSize }}>{numberToWords(contactPersonPettyAmount)} ONLY</Text>
                        </>
                    }
                </View>

                <View style={[styles.amountNumberContent, styles.textContainer]}>
                    {contactPersonPettyAmount &&
                        <>
                            <Text style={{ fontSize: addressFontSize }}>{formatToPesos(contactPersonPettyAmount)}</Text>
                        </>
                    }
                </View>

                <View style={[styles.clientCompleteNameContent, styles.textContainer]}>
                    <Text style={[{ fontSize: clientNameFontSize }, styles.boldLetter]}>
                        {clientName}
                    </Text>
                </View>


            </Page>
        </Document>
    );
};
