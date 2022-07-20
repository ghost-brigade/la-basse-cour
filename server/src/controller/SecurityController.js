import * as Response from "../service/Http/Response.js";
import {ValidationError} from "sequelize";

const login = async (req, res) => {
    if(req.body === undefined || req.body.email === undefined || req.body.password === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    try {
        const Authentificator = await import("../service/Security/Authenticator.js");
        let jwtToken = await Authentificator.authentification(req.body.email, req.body.password);

        return Response.ok(res, {'token': jwtToken});
    } catch (err) {
        return Response.unauthorized(res, err.message);
    }
};

const register = async (req, res) => {
    if(req.body === undefined || req.body.email === undefined || req.body.password === undefined || req.body.firstname === undefined || req.body.lastname === undefined || req.body.technologies === undefined || req.body.schoolBranch === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    try {
        const Registrator = await import("../service/Security/Registrator.js");

        let user = await Registrator.registration(req.body.email, req.body.password, req.body.firstname, req.body.lastname, req.body.technologies, req.body.schoolBranch).then(user => {
            user.password = undefined;
            user.deletedAt = undefined;
            return user;
        });

        return Response.created(res, user);
    } catch (err) {
        if(err instanceof ValidationError) {
            return Response.unprocessableEntity(res, formatError(err));
        } else {
            return Response.error(res, err.message);
        }
    }
};

const formatError = (validationError) => {
    return validationError.errors.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
    }, {});
};

export {
    login,
    register
};