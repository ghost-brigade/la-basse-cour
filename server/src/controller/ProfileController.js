import * as Response from "../service/Http/Response.js";
import * as UserRepository from "../repository/UserRepository.js";

const me = async (req, res) => {
    const user = await UserRepository.find(req.user.id);

    if(user) {
        user.password = undefined;
        user.deletedAt = undefined;

        return Response.ok(res, user);
    }

    return Response.notFound(res, "User not found");
}

const update = async (req, res) => {
    const user = {};

    if(req.body.email) {
        try {
            const findEmail = await UserRepository.findByEmail(req.body.email);

            if(findEmail) {
                return Response.error(res, "Email already used");
            }
        } catch (err) {

            //Todo send confirmation email

            // if throw an error, it's because the email is not used
            user.email = req.body.email;
        }
    }

    if(req.body.firstname) { user.firstname = req.body.firstname; }
    if(req.body.lastname) { user.lastname = req.body.lastname; }

    if(req.body.technologies) {
        if(Array.isArray(req.body.technologies)) {
            user.technologies = req.body.technologies;
        } else {
            return Response.unprocessableEntity(res, "Technologies must be an array");
        }
    }

    if(req.body.password && req.body.newPassword && req.body.passwordConfirmation) {
        const passwordUpdator = await import("../service/Security/PasswordUpdator.js");

        try {
            const update = await passwordUpdator.isAuthorizedToUpdatePassword(req.user.email, req.body.password, req.body.newPassword, req.body.passwordConfirmation);
            if(update) {
                user.password = req.body.newPassword;
            }
        } catch (err) {
            return Response.error(res, err.message);
        }
    }

    if(user.length === 0) {
        return Response.unprocessableEntity(res, "No data to update");
    }

    try {
        user.id = req.user.id;
        return Response.ok(res, await UserRepository.update(user).then((user) => {
            user.password = undefined;
            user.deletedAt = undefined;
            return user;
        }));
    } catch (err) {
        return Response.unprocessableEntity(res, err.message);
    }

}

export {
    me,
    update
};