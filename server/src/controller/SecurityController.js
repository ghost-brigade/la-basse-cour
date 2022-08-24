import * as Response from "../service/Http/Response.js";
import {ValidationError} from "sequelize";
import * as UserRepository from "../repository/UserRepository.js";
import { sendEmail } from "../service/Email/EmailManager.js";
import { env } from "../../config.js";
import { createToken } from "../service/Jwt/JwtGenerator.js";

const login = async (req, res) => {
    if(req.body === undefined || req.body.email === undefined || req.body.password === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        const Authentificator = await import("../service/Security/Authenticator.js");
        let jwtToken = await Authentificator.authentification(req.body.email, req.body.password);

        return Response.ok(req, res, {'token': jwtToken});
    } catch (err) {
        return Response.unauthorized(req, res, err.message);
    }
};

const register = async (req, res) => {
    if(req.body === undefined || req.body.email === undefined || req.body.password === undefined || req.body.firstname === undefined || req.body.lastname === undefined || req.body.technologies === undefined || req.body.schoolBranch === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        const Registrator = await import("../service/Security/Registrator.js");

        let user = await Registrator.registration(req.body.email, req.body.password, req.body.firstname, req.body.lastname, req.body.technologies, req.body.schoolBranch).then(user => {
            user.password = undefined;
            user.deletedAt = undefined;
            return user;
        });

        return Response.created(req, res, user);
    } catch (err) {
        if(err instanceof ValidationError) {
            return Response.unprocessableEntity(req, res, formatError(err));
        } else {
            return Response.error(req, res, err.message);
        }
    }
};

const loginByEmail = async (req, res) => {
    if(req.body === undefined || req.body.email === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        const email = req.body.email;
        const user = await UserRepository.findByEmail(email);

        if (user !== undefined && user !== null) {
            const jwtToken = await createToken(user);
            const loginUrl = `${env.url}/login/email/${jwtToken}`;

            sendEmail(email, '[La Basse Cour] Connexion', `<div>
                <p>Bonjour ${user.firstname} ${user.lastname},</p>
                <p>Vous pouvez vous connecter à votre compte "La Basse Cour" avec le lien ci-dessous :</p>
                <a href="${loginUrl}">
                    Me connecter
                </a>
                <p>Bonne journée,</p>
                <p>L'équipe La Basse Cour</p>
            </div>`, `Votre lien de connexion à La Basse Cour : ${loginUrl}`);
        }

        return Response.ok(req, res, {});
    } catch (err) {
        if(err instanceof ValidationError) {
            return Response.unprocessableEntity(req, res, formatError(err));
        } else {
            return Response.error(req, res, err.message);
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
    loginByEmail,
    register
};