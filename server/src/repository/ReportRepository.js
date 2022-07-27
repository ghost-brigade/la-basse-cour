import {Report} from "../model/index.js";

const find = async (id) => {
    let report = await Report.findOne({ where: { id: id } });

    if(report === null) {
        throw new Error('Report with id' + id + ' not found');
    }
    return report;
}

const findAll = async () => {
    let reports = (await Report.findAll());

    if(reports === null) {
        throw new Error('Reports not found');
    }
    return reports;
}

const create = async (report) => {
    return await Report.create(report);
}

const findAlreadyExist = async (requesterId, addresseeId, reason) => {
    let report = await Report.findOne({ where: { requesterId: requesterId, addresseeId: addresseeId, reason: reason } });

    if(report === null) {
        return false;
    }

    return true;
}

const update = async (report) => {
    await Report.update(report, {where: {id: report.id}});
    return await find(report.id);
}

export { create, findAll, find, findAlreadyExist, update };