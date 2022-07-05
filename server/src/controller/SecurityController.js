import * as Response from "../service/Http/Response.js";
import {ValidationError} from "sequelize";

const login = async (req, res) => {
    if(req.body === undefined || req.body.email === undefined || req.body.password === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    try {
        let Authentificator = await import("../service/Security/Authenticator.js");
        let jwtToken = await Authentificator.authentification(req.body.email, req.body.password);

        return res.json({
            'token': jwtToken
        });
    } catch (err) {
        return Response.error(res, err.message());
    }
}

const register = async (req, res) => {
    if(req.body === undefined || req.body.email === undefined || req.body.password === undefined || req.body.firstname === undefined || req.body.lastname === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    try {
        let Registrator = await import("../service/Security/Registrator.js");
        Registrator.registration(req.body.email, req.body.password, req.body.firstname, req.body.lastname);

        return Response.created(res, "User created");
    } catch (err) {
        if(err instanceof ValidationError) {
            return Response.unprocessableEntity(res, formatError(err));
        } else {
            return Response.error(res, err.message);
        }
    }

}

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