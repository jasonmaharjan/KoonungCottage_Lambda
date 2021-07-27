const { getAPI } = require("./api/getApi");

export const fetchAndJoinRemainingDataIfExists = async (record, parameters) => {
    // calculating remaining record entries
    const pagesLength = Math.abs(Math.ceil(record.total / 100 - 1));
    if (pagesLength && !(parameters && parameters.limit)) {
        const remainingEntriesPromise = Array.from({ length: pagesLength }, (_, i) =>
            getAPI(`/${record.internalId}/entries`, {
                filter: record.filter || [],
                page: i + 2,
            })
        );
        const remainingEntries = await Promise.all(remainingEntriesPromise);
        // joining entries of all pages
        let entries = [...record.entries, ...remainingEntries.map(({ entries }) => entries).flat()];
        return { entries };
    } else {
        return {
            entries: record.entries,
        };
    }
};

export const getRecordEntries = async (event, internalId, filter = []) => {
    const firstPageEntriesResponse = await getAPI(`/${internalId}/entries`, {
        ...(event.queryStringParameters && event.queryStringParameters.page ? { page: event.queryStringParameters.page } : {}),
        ...(event.queryStringParameters && event.queryStringParameters.limit
            ? {
                  perPage: event.queryStringParameters.limit,
              }
            : {}),
        filter: filter || [],
    });

    const totalEntries = await fetchAndJoinRemainingDataIfExists(
        {
            total: firstPageEntriesResponse.total,
            internalId,
            entries: firstPageEntriesResponse.entries,
            filter,
        },
        event.queryStringParameters
    );

    return {
        entries: totalEntries.entries,
        total: firstPageEntriesResponse.total,
    };
};

export const getEntryById = async (id, internalId) => {
    const response = await getAPI(`/${internalId}/entries/${id}`, {});
    return response.entry;
};
