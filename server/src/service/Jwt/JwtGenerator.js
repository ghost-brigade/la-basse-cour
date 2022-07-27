import jwt from "jsonwebtoken";
import {env} from "../../../config.js";

const createToken = async (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        roles: user.roles
    };
    return jwt.sign(payload, process.env.JWT_SECRET || env.secret, {
        expiresIn: "1y",
    });
};

export { createToken };