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

const visitToday = async (req, res) => {
    try {
        const visitToday = await ResponseLogRepository.getVisitToday();
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

export { list, statusCount, visitToday, visitByHour };