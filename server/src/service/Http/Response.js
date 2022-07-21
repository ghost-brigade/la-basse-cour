import * as HttpLogger from "../Log/HttpLogger.js";

const ok = async (req, res, message) => {
    const response = res.status(200).json(message);
    HttpLogger.create(req, res);
    return response;
}

const created = async (req, res, message) => {
    const response = res.status(201).json(message);
    HttpLogger.create(req, res);
    return response;
}

const unprocessableEntity = async (req, res, message) => {
    const response = res.status(422).json({
        messages: message
    })

    HttpLogger.create(req, res);
    return response;
}

const error = async (req, res, message) => {
    const response = res.status(500).json({
        messages: message
    })

    HttpLogger.create(req, res);
    return response;
}

const unauthorized = async (req, res, message) => {
    const response = res.status(401).json({
        messages: message
    })

    HttpLogger.create(req, res);
    return response;
}

const forbidden = async (req, res, message) => {
    const response = res.status(403).json({
        messages: message
    })

    HttpLogger.create(req, res);
    return response;
}

const notFound = async (req, res, message) => {
    const response = res.status(404).json({
        messages: message
    })

    HttpLogger.create(req, res);
    return response;
}

const deleted = async (req, res, message) => {
    const response = res.status(200).json({
        messages: message
    })

    HttpLogger.create(req, res);
    return response;
}

export {
    ok,
    created,
    unprocessableEntity,
    error,
    unauthorized,
    forbidden,
    notFound,
    deleted
}