import * as Response from "../service/Http/Response.js";
import * as UserRepository from "../repository/UserRepository.js";
import * as ReportRepository from "../repository/ReportRepository.js";

const me = async (req, res) => {
    const user = await UserRepository.find(req.user.id);

    if(user) {
        user.password = undefined;
        user.deletedAt = undefined;

        return Response.ok(req, res, user);
    }

    return Response.notFound(req, res, "User not found");
}

const update = async (req, res) => {
    const user = {id: req.user.id};

    if(req.body.email) {
        try {
            const findEmail = await UserRepository.findByEmail(req.body.email);
            if(findEmail) {
                return Response.error(req, res, "Email already used");
            }
        } catch (err) {}

        user.email = req.body.email;
        /* TODO: send email to user with new email */
    }

    if(req.body.firstname) { user.firstname = req.body.firstname; }
    if(req.body.lastname) { user.lastname = req.body.lastname; }

    if(req.body.technologies) {
        if(Array.isArray(req.body.technologies)) {
            user.technologies = req.body.technologies;
        } else {
            return Response.unprocessableEntity(req, res, "Technologies must be an array");
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
            return Response.error(req, res, err.message);
        }
    }

    if(user.length === 0) {
        return Response.unprocessableEntity(req, res, "No data to update");
    }

    try {
        return Response.ok(req, res, await UserRepository.update(user).then((user) => {
            user.password = undefined;
            user.deletedAt = undefined;
            return user;
        }));
    } catch (err) {
        return Response.unprocessableEntity(req, res, err.message);
    }

}

const report = async (req, res) => {
    if(req.body === undefined || req.body.addresseeId === undefined || req.body.reason === undefined || req.body.comment === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    if(req.body.addresseeId === req.user.id) {
        return Response.unprocessableEntity(req, res, "You can't report yourself");
    }

    const reportAlreadyExists = await ReportRepository.findAlreadyExist(req.user.id, req.body.addresseeId, req.body.reason);

    if(reportAlreadyExists) {
        return Response.unprocessableEntity(req, res, "You already reported this user for this reason");
    }

    const {addresseeId, reason, comment} = req.body;

    try {
        const report = await ReportRepository.create({
            requesterId: req.user.id,
            addresseeId: addresseeId,
            reason: reason,
            comment: comment,
        });

        return Response.created(req, res, "Report created");
    } catch (err) {
        return Response.unprocessableEntity(req, res, err.message);
    }
}

export {
    me,
    update,
    report,
};