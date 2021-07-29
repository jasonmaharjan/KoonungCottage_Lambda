import { getRecordEntries } from "../../helper";

async function getActivities(event, context) {
    const internalId = "neighbourhood-house-activities";

    let filter = [];

    if (event.queryStringParameters) {
        const { startDate, endDate, activityType, activityCategory } = event.queryStringParameters;
        const activityTypeFilter = [
            {
                operator: "any_of",
                subject: 7664,
                value: [`${activityType}`],
                type: "array",
            },
        ];

        const activityCategoryFilter = [
            {
                operator: "any_of",
                subject: 8375,
                value: [`${activityCategory}`],
                type: "array",
            },
        ];

        const dateFilter = [
            {
                subject: "7661",
                type: "datetime",
                operator: "on_or_after",
                ignoreCase: true,
                value: { relative: false, value: `${startDate}` },
            },
            "and",
            {
                subject: "7663",
                type: "datetime",
                operator: "on_or_before",
                ignoreCase: true,
                value: { relative: false, value: `${endDate}` },
            },
        ];

        if (activityTypeFilter && activityCategoryFilter && startDate && endDate) {
            filter = [[...activityTypeFilter, ...activityCategoryFilter, "and", ...dateFilter]];
        } else if (activityTypeFilter) filter = [activityTypeFilter];
        else if (activityCategoryFilter) filter = [activityCategoryFilter];
        else if (startDate && endDate) {
            filter = [dateFilter];
        }
    }

    const activities = await getRecordEntries(event, internalId, filter);

    let entries = activities.entries.map((entry) => {
        return {
            id: entry["id"],
            name: entry["name"],
            startTime: entry["start-time"],
            endTime: entry["end-time"],
            duration: entry["duration"],
            cost: entry["activity-fee"],
            room: entry["room"],
        };
    });

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ entries, total: activities.total }),
    };
}

export const handler = getActivities;
