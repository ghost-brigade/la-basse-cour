const ok = async (res, message) => {
    return res.status(200).json({
        message
    })
}

const created = async (res, message) => {
    return res.status(201).json({
        messages: message
    })
}

const unprocessableEntity = async (res, message) => {
    return res.status(422).json({
        messages: message
    })
}

const error = async (res, message) => {
    return res.status(500).json({
        messages: message
    })
}

const unauthorized = async (res, message) => {
    return res.status(401).json({
        messages: message
    })
}

const forbidden = async (res, message) => {
    return res.status(403).json({
        messages: message
    })
}

const notFound = async (res, message) => {
    return res.status(404).json({
        messages: message
    })
}

const deleted = async (res, message) => {
    return res.status(200).json({
        messages: message
    })
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