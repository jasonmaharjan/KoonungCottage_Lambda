import axios from "../../api/axios";

async function createMember(event, context) {
    const internalId = "neighbourhood-house-members";
    const url = `/${internalId}/entries`;
    const { firstName, lastName, email, phone } = JSON.parse(event.body);
    const member = {
        entry: {
            "full-name": firstName + " " + lastName,
            email,
            "first-name": firstName,
            "last-name": lastName,
            "phone-mobile": phone,
            type: [],
        },
        subrecords: {},
    };

    try {
        const resData = await axios.post(url, member);
        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(resData),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error,
            }),
        };
    }
}

export const handler = createMember;
