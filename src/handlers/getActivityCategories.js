import { getAPI } from "../../api/getApi";

async function getActivityCategories(event, context) {
    const internalId = "neighbourhood-house-categories";
    const url = `/${internalId}/entries`;
    const activityCategories = await getAPI(url, {});

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(activityCategories),
    };
}

export const handler = getActivityCategories;
