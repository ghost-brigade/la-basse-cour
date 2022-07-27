import * as Response from "../service/Http/Response.js";

const BannedMiddleware = async (req, res, next) => {
    const { isBanned } = req.user;

    if(isBanned !== undefined) {
        if (isBanned === true) {
            return Response.unauthorized(req, res, "You are banned");
        }
    }

    next();
}

export default BannedMiddleware;

