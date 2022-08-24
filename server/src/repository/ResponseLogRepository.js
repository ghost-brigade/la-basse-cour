import {ResponseLog, UserMongo} from "../model/index.js";

const getVisitByDate = async (date) => {
    const lteDate = new Date(date);
    const gteDate = new Date(date.setDate(date.getDate() - 1));

    const visitDate = await ResponseLog.countDocuments({
        "createdAt": {
            "$gte": gteDate,
            "$lte": lteDate
        }
    })

    if(visitDate.length > 0) {
        return visitDate;
    }

    return visitDate;
}

const getVisitByHour = async () => {
    const tomorrowDate = new Date(new Date().setDate(new Date().getDate() - 1));
    tomorrowDate.setHours('00', '00', '00', '000');

    const visitByHour = await ResponseLog.aggregate([
        {
            $match: {
                createdAt: {$gte: tomorrowDate}
            }
        },
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
        },
        {
            $group: {
                _id: "$_id.date",
                hours: {
                    $push: {
                        hour: "$_id.hour",
                        count: "$count"
                    }
                }
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

const getUsersByDate = async () => {
    const tomorrowDate = new Date(new Date().setDate(new Date().getDate() - 1));
    tomorrowDate.setHours('00', '00', '00', '000');

    return await UserMongo.aggregate([
        {
            $match: {
                createdAt: {$gte: tomorrowDate}
            }
        },
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
        },
        {
            $group: {
                _id: "$_id.date",
                hours: {
                    $push: {
                        hour: "$_id.hour",
                        count: "$count"
                    }
                }
            }
        }
    ]);
}

export {
    getStatusCount,
    getVisitByDate,
    getVisitByHour,
    getUsersByDate
};