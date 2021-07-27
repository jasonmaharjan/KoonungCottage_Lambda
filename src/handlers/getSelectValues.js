import { getAPI } from "../../api/getApi";

async function getSelectValues(event, context) {
    const internalId = "neighbourhood-house-activity-types";
    const url = `/${internalId}/entries`;
    const activities = await getAPI(url, {});

    console.log(activities);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ selectValues: activities }),
    };
}

export const handler = getSelectValues;
