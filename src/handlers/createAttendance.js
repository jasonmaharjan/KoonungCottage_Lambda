import axios from "../../api/axios";

async function createAttendance(event, context) {
    const internalId = "neighbourhood-house-attendances";
    const url = `/${internalId}/entries`;
    const { memberId, activityId } = JSON.parse(event.body);

    const attendance = {
        entry: {
            activity: [`${activityId}`],
            member: [`${memberId}`],
        },
        subrecords: {},
    };

    try {
        const resData = await axios.post(url, attendance);
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

export const handler = createAttendance;
