import { getRecordEntries } from "../../helper";

async function getActivities(event, context) {
    const internalId = "neighbourhood-house-activities";

    let filter = [];

    const startingDateFilter = [
        {
            subject: "7661",
            type: "datetime",
            operator: "on_or_after",
            ignoreCase: true,
            value: { relative: false, value: `${new Date().toISOString()}` },
        },
    ];

    filter.push(startingDateFilter);

    let activityTypes;
    if (event.queryStringParameters) {
        const { startDate, endDate, activityType, activityCategory } = event.queryStringParameters;

        let activityCategoryFilter = [];

        if (activityCategory && !activityType) {
            activityCategoryFilter = [
                {
                    operator: "any_of",
                    subject: 8376,
                    value: [`${activityCategory}`],
                    type: "array",
                },
            ];

            activityTypes = await getRecordEntries(event, "neighbourhood-house-activity-types", [activityCategoryFilter]);
        }

        const activityTypeFilter = [
            {
                operator: "any_of",
                subject: 7664,
                value: activityCategory
                    ? activityTypes.entries.length
                        ? activityTypes.entries.map((entry) => "" + entry.id)
                        : [""]
                    : activityType
                    ? [`${activityType}`]
                    : null,
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

        if (activityTypeFilter && !startDate && !endDate) {
            filter = [[...filter, "and", ...activityTypeFilter]];
        } else if (activityTypeFilter[0].value && startDate && endDate) {
            filter = [[...dateFilter, "and", ...activityTypeFilter]];
        } else if (startDate && endDate) {
            filter = [dateFilter];
        }
    } else {
        activityTypes = await getRecordEntries(event, "neighbourhood-house-activity-types", []);
    }

    let activityTypeMap = {};

    activityTypes.entries.forEach((activity) => {
        activityTypeMap[activity.id] = activity;
    });

    const activities = await getRecordEntries(event, internalId, filter);

    let entries = activities.entries.map((entry) => {
        let activityTypeId = (entry["class-type"] && entry["class-type"][0] && entry["class-type"][0].id) || null;

        let shortDescription = "";
        let imageURL = "https://kalysys.com/wp-content/uploads/2021/08/NH-Placeholder-2.png";

        if (activityTypeId) {
            let activityType = activityTypeMap[activityTypeId];
            shortDescription = activityType["short-description"];

            imageURL = activityType["image-url"] ? activityType["image-url"] : imageURL;
            console.log("imageURL ", imageURL, activityType);
        }

        return {
            id: entry["id"],
            name: entry["name"],
            startTime: entry["start-time"],
            endTime: entry["end-time"],
            duration: entry["duration"],
            cost: entry["activity-fee"],
            room: entry["room"],
            type: "activity",
            shortDescription,
            websiteImage: imageURL,
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
