import * as Response from "../service/Http/Response.js";
import * as UserRepository from "../repository/UserRepository.js";
import * as ReportRepository from "../repository/ReportRepository.js";

const listReports = async (req, res) => {
    try {
        let allReports = (await ReportRepository.findAll());

        Response.ok(req, res, allReports);
    } catch (err) {
        Response.error(req, res, err.message);
    }
}

const checkReport = async (req, res) => {
    if(req.params === undefined || req.params.id === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        const report = await ReportRepository.find(req.params.id);

        report.resolved = true;
        await ReportRepository.update(report);

        Response.ok(req, res, null);
    } catch (err) {
        Response.error(req, res, err.message);
    }
}

const banReport = async (req, res) => {
    if(req.params === undefined || req.params.id === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        const report = await ReportRepository.find(req.params.id);
        const user = await UserRepository.find(report.addresseeId);

        if (user) {
            await UserRepository.update({
                id: user.id,
                isBanned: true,
            });
        }

        report.resolved = true;
        console.log('here');
        await ReportRepository.update(report);

        console.log('here');

        Response.ok(req, res, null);
        console.log('here');
    } catch (err) {
        Response.error(req, res, err.message);
    }
}

export {
    listReports,
    checkReport,
    banReport,
}