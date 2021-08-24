import { getRecordEntries } from "../../helper";
import { getAPI } from "../../api/getApi";

async function getActivityTypes(event, context) {
    const internalId = "neighbourhood-house-activities";
    const url = `/${internalId}/entries`;

    let activityTypes;

    if (event.queryStringParameters) {
        const { activityCategory } = event.queryStringParameters;

        if (activityCategory) {
            const activityCategoryFilter = [
                {
                    operator: "any_of",
                    subject: 8376,
                    value: [`${activityCategory}`],
                    type: "array",
                },
            ];

            activityTypes = await getRecordEntries(event, "neighbourhood-house-activities", [activityCategoryFilter]);
        }
    } else activityTypes = await getAPI(url, {});

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
