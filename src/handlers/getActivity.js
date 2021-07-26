import { getAPI } from "../../api/getApi";

async function getActivity(event, context) {
    const internalId = "neighbourhood-house-activities";
    let entry = await getAPI(`/${internalId}/entries/${event.queryStringParameters}`);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: event, entry }),
    };
}

export const handler = getActivity;
