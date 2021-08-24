import { getEntryById } from "../../helper";

async function getCourse(event, context) {
    const internalId = "neighbourhood-house-courses";
    const { id } = event.pathParameters;
    let entry = await getEntryById(id, internalId);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(entry),
    };
}

export const handler = getCourse;
