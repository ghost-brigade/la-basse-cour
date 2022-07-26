import {ResponseLog} from "../model/index.js";

const getVisitToday = async () => {

    const visitToday = await ResponseLog.countDocuments({
        "createdAt": {
            "$gte": new Date(new Date().setDate(new Date().getDate() - 1)),
            "$lte": new Date()
        }
    })

    if(visitToday.length > 0) {
        return visitToday;
    }

    return visitToday;
}

const getVisitByHour = async () => {

    const visitByHour = await ResponseLog.aggregate([
        {
            $addFields: {
                hour: {
                    $dateToString: {
                        format: "%H",
                        date: "$createdAt"
                    }
                },
                date: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt"
                    }
                }
            }
        },
        {
            $group: {
                _id: {hour: "$hour", date: "$date"},
                count: { $sum: 1 },
            }
        }
    ]);

    if(visitByHour.length > 0) {
        return visitByHour;
    }

    return visitByHour;
}

const getStatusCount = async () => {

    const statusCount = await ResponseLog.aggregate([
        {
            $match: {
                "createdAt": {
                    "$gte": new Date(new Date().setDate(new Date().getDate() - 1)),
                    "$lte": new Date()
                }
            },
            $group: {
                _id: "$response.status",
                count: { $sum: 1 },
            }
        },
        {
            $sort: {_id: 1}
        }
    ]);

    if(statusCount.length > 0) {
        return statusCount;
    }

    return statusCount;
}

export {
    getStatusCount,
    getVisitToday,
    getVisitByHour
};