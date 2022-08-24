import {ResponseLog} from "../../model/index.js";

const requestFormatter = async(req) => {
    const request = {};

    request.ip = req.ip;
    request.method = req.method;
    request.url = req.url;
    request.headers = {
        host: req.headers.host,
        userAgent: req.headers['user-agent'],
        acceptLanguage: req.headers['accept-language'],
        accept: req.headers.accept,
    };
    request.body = req.body;
    request.query = req.query;
    request.params = req.params;

    if(request.body.password) request.body.password = "*****";
    if(request.body.newPassword) request.body.newPassword = "*****";
    if(request.body.passwordConfirmation) request.body.passwordConfirmation = "*****";

    return request;
}

const responseFormatter = async(res) => {
    const response = {};

    response.status = res.statusCode;
    response.statusMessage = res.statusMessage;

    return response;
}

const build = async(req, res) => {
    const request = await requestFormatter(req);
    const response = await responseFormatter(res);

    return {
        request: request,
        response: response,
        createdAt: new Date()
    }
}

const create = async (req, res) => {
    const log = await build(req, res);
    await ResponseLog.create(log);
}

export { create };