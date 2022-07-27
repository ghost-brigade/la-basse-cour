import jwt from "jsonwebtoken";
import {env} from "../../../config.js";

const checkToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET || env.secret);
        return {
            id: decoded.id,
            email: decoded.email,
            firstname: decoded.firstname,
            lastname: decoded.lastname,
            roles: decoded.roles,
        };
    } catch (error) {
        return false;
    }
}

export default checkToken;