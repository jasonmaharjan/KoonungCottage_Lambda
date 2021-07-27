import axios from "../../api/axios";

async function createMember(event, context) {
    const internalId = "neighbourhood-house-members";
    const url = `/${internalId}/entries`;
    const { firstName, lastName, email, phone } = JSON.parse(event.body);

    const member = {
        entry: {
            childImmunised: [],
            familyDoctor: "",
            leadSource: [],
            doctorAddress: "",
            medicalConditionDetails: "",
            question2: [],
            emergencyPhoneMobile: "",
            privateHealthDetails: "",
            emergencyPhoneLandline: "",
            parentGuardians: [],
            question3: [],
            photoOptOut: true,
            question1: [],
            dateOfBirth: "",
            specialNeedsDetails: "",
            phoneMobile: phone,
            pilRenewalDate: "",
            privateHealthFund: [],
            question5: [],
            relationship: "",
            unsubscribed: true,
            question6: [],
            medicalCondition: true,
            emergencyContact: "",
            question7: [],
            doctorPhone: "",
            newsletterSignUpFromWebsite: true,
            address: "",
            suburb: "",
            specialNeeds: true,
            carerAccompanyingChild: "",
            fullName: firstName + lastName,
            phoneHome: "",
            email: email,
            question4: [],
            postcode: "",
            allergies: "",
            healthForms: [],
            languageSpoken: [],
            termsAndConditions: true,
            lastUpdated: "",
            type: [],
            medicareNo: "",
            signedEnrolmentForm: [],
            exerciseHistoty: "",
            attendedClassBefore: [],
            memberStatus: [],
            ambulanceSubscription: [],
            permissionToAdministerMedication: true,
            firstName: firstName,
            healthInformationLastUpdated: "",
            lastName: lastName,
        },
        subrecords: {},
    };

    console.log(member);

    try {
        const resData = await axios.post(url, member);
        console.log(resData);
        return {
            statusCode: 201,
            body: JSON.stringify({
                data: { resData },
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                errorMessage: error,
            }),
        };
    }
}

export const handler = createMember;
