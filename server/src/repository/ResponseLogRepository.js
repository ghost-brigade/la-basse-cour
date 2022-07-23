import {ResponseLog} from "../model/index.js";

const getStatusCount = async () => {

    const statusCount = await ResponseLog.aggregate([
        {
            $group: {
                _id: "$response.status",
                count: { $sum: 1 }
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
    getStatusCount
};