const created = async (res, message) => {
    res.status(201).json({message: message ?? "Resource created",});
}

const unprocessableEntity = async (res, message) => {
    return res.status(422).json({ message: message ?? 'Semantic error in the request' })
}

const error = async (res, message) => {
    return res.json({
        messages: message
    })
}

const unauthorized = async (res, message) => {
    return res.status(401).json({
        message: message ?? "Unauthorized",
    });
}

const forbidden = async (res, message) => {
    return res.status(403).json({
        message: message ?? "Forbidden",
    });
}

const notFound = async (res, message) => {
    return res.status(404).json({
        message: message ?? "Not found",
    });
}

export {
    created,
    unprocessableEntity,
    error,
    unauthorized,
    forbidden,
    notFound,
}