// const { getAPI } = require("./api/getApi");

// export const getRecordEntries = async (event, internalId, filter = []) => {
//     const firstPageEntriesResponse = await getAPI(`/${internalId}/entries`, {
//         ...(event.queryStringParameters && event.queryStringParameters.page ? { page: event.queryStringParameters.page } : {}),
//         ...(event.queryStringParameters && event.queryStringParameters.limit
//             ? {
//                   perPage: event.queryStringParameters.limit,
//               }
//             : {}),
//         filter,
//     });

//     const totalEntries = await fetchAndJoinRemainingDataIfExists(
//         {
//             total: firstPageEntriesResponse.total,
//             internalId,
//             entries: firstPageEntriesResponse.entries,
//         },
//         event.queryStringParameters
//     );

//     return {
//         entries: totalEntries.entries,
//         total: firstPageEntriesResponse.total,
//     };
// };
