import { getEntryById } from "../../helper";

async function getActivity(event, context) {
    const internalId = "neighbourhood-house-activities";
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

export const handler = getActivity;
