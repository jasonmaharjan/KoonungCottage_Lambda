import { getRecordEntries } from "../../helper";

async function getCourses(event, context) {
    const internalId = "neighbourhood-house-courses";

    let filter = [];

    const preFilter = [
        { subject: "8492", type: "number", operator: "gt", ignoreCase: true, value: 0 },
        "and",
        { subject: "8502", type: "array", operator: "none_of", ignoreCase: true, value: ["148849"] },
        "and",
        { subject: "8503", type: "date", operator: "on_or_after", ignoreCase: true, value: { relative: true, value: null, type: "TODAY" } },
    ];

    if (event.queryStringParameters) {
        const { activityCategory } = event.queryStringParameters;

        const activityCategoryFilter = [
            {
                operator: "any_of",
                subject: 8490,
                value: activityCategory ? [`${activityCategory}`] : [""],
                type: "array",
            },
        ];

        filter = [[...preFilter, "and", ...activityCategoryFilter]];
    }

    const courses = await getRecordEntries(event, internalId, filter);

    let entries = courses.entries.map((entry) => {
        return {
            id: entry["id"],
            name: entry["name"],
            startTime: entry["start-time"],
            endTime: entry["end-time"],
            duration: entry["duration"],
            cost: entry["activity-fee"],
            room: entry["room"],
            shortDescription: entry["short-description"],
            longDescription: entry["long-description"],
            websiteImage: entry["website-image"],
            instructor: entry["instructor"],
            remainingCapacity: entry["remaining-capacity"],
            activityType: entry["activity-type"],
            statuses: entry["statuses"],
            type: "course",
        };
    });

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ entries, total: courses.total }),
    };
}

export const handler = getCourses;
