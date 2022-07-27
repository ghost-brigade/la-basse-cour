import * as Response from "../service/Http/Response.js";
import * as ResponseLogRepository from "../repository/ResponseLogRepository.js";

const list = async (req, res) => {
    return Response.ok(req, res, [
        "/data/status_count",
        "/data/visit_by_hour"
    ]);
}

const statusCount = async (req, res) => {
    try {
        const status_code = await ResponseLogRepository.getStatusCount();
        return res.json(status_code);
    } catch (err) {
        return Response.error(req, res, err.message);
    }
}

const visitByDate = async (req, res) => {
    try {
        let date = new Date();
        
        if (req.body !== undefined && req.body.date !== undefined) {
            date = new Date(req.body.date);
        }

        const visitToday = await ResponseLogRepository.getVisitByDate(date);
        return res.json(visitToday);
    } catch (err) {
        return Response.error(req, res, err.message);
    }
}

const visitByHour = async (req, res) => {
    try {
        const visitByHour = await ResponseLogRepository.getVisitByHour();
        return res.json(visitByHour);
    } catch (err) {
        return Response.error(req, res, err.message);
    }
}

const usersByDate = async (req, res) => {
    try {
        const usersByDate = await ResponseLogRepository.getUsersByDate();
        return res.json(usersByDate);
    } catch (err) {
        return Response.error(req, res, err.message);
    }
}

export { list, statusCount, visitByDate, visitByHour, usersByDate };