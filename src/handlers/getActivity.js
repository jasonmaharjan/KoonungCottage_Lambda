import { getEntryById } from "../../helper";

async function getActivity(event, context) {
    const internalId = "neighbourhood-house-sessions";
    const { id } = event.pathParameters;
    let entry = await getEntryById(id, internalId);

    let activityTypeId = (entry["class-type"] && entry["class-type"][0] && entry["class-type"][0].id) || null;

    let shortDescription = "";
    let imageURL = "https://kalysys.com/wp-content/uploads/2021/08/NH-Placeholder-2.png";

    if (activityTypeId) {
        let activityType = await getEntryById(activityTypeId, "neighbourhood-house-activities");

        shortDescription = activityType["short-description"];

        imageURL = activityType["image-url"] ? activityType["image-url"] : imageURL;
        console.log("imageURL ", imageURL, activityType);
    }

    entry = { ...entry, websiteImage: imageURL, "short-description": shortDescription };

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
