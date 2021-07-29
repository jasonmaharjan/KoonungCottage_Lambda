import { getAPI } from "../../api/getApi";

async function getActivityTypes(event, context) {
    const internalId = "neighbourhood-house-activity-types";
    const url = `/${internalId}/entries`;
    const activityTypes = await getAPI(url, {});

    console.log(activityTypes);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(activityTypes),
    };
}

export const handler = getActivityTypes;
