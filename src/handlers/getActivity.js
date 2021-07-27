import { getAPI } from "../../api/getApi";

async function getActivity(event, context) {
    const internalId = "neighbourhood-house-activities";
    const { id } = event.pathParameters;
    let entry = await getAPI(`/${internalId}/entries/${id}`, {});

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ entry: entry }),
    };
}

export const handler = getActivity;
