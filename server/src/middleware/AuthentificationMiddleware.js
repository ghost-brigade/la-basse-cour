import * as UserRepository from "../repository/UserRepository.js";
import checkToken from "../service/Jwt/JwtValidator.js";
import * as Response from "../service/Http/Response.js";

const AuthentificationMiddleware = async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return Response.unauthorized(res);
    }

    const [type, token] = header.split(/\s+/);

    if (type !== "Bearer") {
        return Response.unauthorized(res);
    }

    const user = await checkToken(token);

    if (user) {
        try {
            req.user = await UserRepository.find(user.id);
            next();
        } catch (err) {
            Response.forbidden(res);
        }
    } else {
        return Response.unauthorized(res);
    }
}

export default AuthentificationMiddleware;

