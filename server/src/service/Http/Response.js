const created = async (res, message) => {
    return res.status(201).send(message);
}

const unprocessableEntity = async (res, message) => {
    return res.status(422).send(message);
}

const error = async (res, message) => {
    return res.json({
        messages: message
    })
}

const unauthorized = async (res, message) => {
    return res.status(401).send();
}

const forbidden = async (res, message) => {
    return res.status(403).send();
}

const notFound = async (res, message) => {
    return res.status(404).send();
}

const deleted = async (res, message) => {
    return res.status(200).send();
}

export {
    created,
    unprocessableEntity,
    error,
    unauthorized,
    forbidden,
    notFound,
    deleted
}