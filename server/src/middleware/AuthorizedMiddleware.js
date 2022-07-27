import {forbidden} from "../service/Http/Response.js";

const hasRolesAdmin = (req, res, next) => {
    let roles = req.user.roles;

    if(roles.includes('admin')) {
        next();
    } else {
        return forbidden(req, res, "You are not authorized to access this resource");
    }
}

export { hasRolesAdmin };