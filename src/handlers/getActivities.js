import { getAPI } from "../../api/getApi";

async function getActivities(event, context) {
    const internalId = "neighbourhood-house-activities";
    const activities = await getAPI(`/${internalId}/entries`);

    let entries = activities.entries.map((entry) => {
        return {
            id: entry["id"],
            name: entry["name"],
            startTime: entry["start-time"],
            endTime: entry["end-time"],
            duration: entry["duration"],
            cost: 0,
            room: entry["class-type"],
        };
    });

    console.log(entries);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ message: entries }),
    };
}

export const handler = getActivities;
