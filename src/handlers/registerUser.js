import axios from "../../api/axios";

async function createOrder(event, context) {
    const internalId = "neighbourhood-house-activities";
    const { firstName, lastName, email, phone } = JSON.parse(event.body);

    const order = {
        entry: {
            datePayment: "",
            name: guestName,
            amount: {
                amount: "",
                currencyTypeCode: "",
            },
            amountPayment: {
                amount: "",
                currencyTypeCode: "",
            },
            reference: "",
            dateOrdered: date,
            amountDue: {
                amount: "",
                currencyTypeCode: "",
            },
            orderedBy: [],
            type: [],
            package: [],
            date: date,
            orderSource: [],
            amountPaid: {
                amount: "",
                currencyTypeCode: "",
            },
        },
        subrecords: {},
    };

    try {
        const resData = await axios.post(url, { order });
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: { resData },
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: error,
            }),
        };
    }
}

export const handler = createOrder;
