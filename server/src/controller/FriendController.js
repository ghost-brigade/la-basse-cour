import * as Response from "../service/Http/Response.js";
import * as friendManager from "../service/Friend/FriendManager.js";
import * as friendRepository from "../repository/FriendRepository.js";
import * as reportRepository from "../repository/ReportRepository.js";

/** Todo: add notification when friendship is accepted or rejected */

const list = async (req, res) => {
    try {
        const friends = (await friendRepository.findAll(req.user.id)).map(friend => {
            return {
                id: friend.id,
                friend: '/user/' + (friend.requesterId === req.user.id ? friend.addresseeId : friend.requesterId),
                requester: friend.requesterId === req.user.id,
                addressee: friend.addresseeId === req.user.id,
                createdAt: friend.createdAt,
                updatedAt: friend.updatedAt,
                status: friend.status,
            };
        });
        return Response.ok(res, friends)
    } catch (err) {
        return Response.ok(res, []);
    }
}

const update = async (req, res) => {
    if(req.body === undefined || req.body.addresseeId === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    if(req.body.addresseeId === req.user.id) {
        return Response.unprocessableEntity(res, "You can't add yourself as a friend");
    }

    try {
        let friendshipExist = await friendManager.hasFriend(req.user.id, req.body.addresseeId);
        
        if(friendshipExist) {
            await friendManager.removeFriend(req.user.id, req.body.addresseeId);
            return Response.deleted(res, "Friendship removed");
        }

        let friend = await friendManager.addFriend(req.user.id, req.body.addresseeId).then(friend => {
            friend.deletedAt = undefined;
            return friend;
        });

        return Response.created(res, friend)
    } catch (err) {
        return Response.error(res, err.message);
    }
}

const status = async (req, res) => {
    if(req.body === undefined || req.body.addresseeId === undefined || req.body.status === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    const addresseeId      = req.body.addresseeId;
    const status           = req.body.status;
    const statusEnum       = ["accepted", "rejected"];

    if(addresseeId === req.user.id) {
        return Response.unprocessableEntity(res, "You can't accept yourself as a friend");
    }

    if(statusEnum.includes(status) === false) {
        return Response.unprocessableEntity(res, "Invalid status only accepted or rejected");
    }

    try {
        let friendship = await friendManager.hasFriend(req.user.id, req.body.addresseeId);

        if(friendship) {
            if(friendship.requesterId === req.user.id) {
                return Response.unprocessableEntity(res, "You can't accept your friend request");
            }
            if(statusEnum.includes(friendship.status)) {
                return Response.unprocessableEntity(res, "Friendship already accepted or rejected");
            }
            if(friendship.addresseeId === req.user.id) {
                await friendManager.statusUpdate(req.user.id, addresseeId, status);
                return Response.ok(res, {message: "Status updated"});
            }
        } else {
            return Response.notFound(res, "Friendship doesn't exist");
        }

    } catch (err) {
        return Response.error(res, err.message);
    }
}

const block = async (req, res) => {
    if(req.body === undefined || req.body.addresseeId === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    if(req.body.addresseeId === req.user.id) {
        return Response.unprocessableEntity(res, "You can't block yourself");
    }

    try {
        let friendship = await friendManager.hasFriend(req.user.id, req.body.addresseeId);

        if(friendship) {
            await friendManager.statusUpdate(req.user.id, req.body.addresseeId, "blocked");
            return Response.ok(res, "Friendship blocked");
        }

        return Response.notFound(res, "Friendship doesn't exist");
    } catch (err) {
        return Response.error(res, err.message);
    }
}

const unblock = async (req, res) => {
    if(req.body === undefined || req.body.addresseeId === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    if(req.body.addresseeId === req.user.id) {
        return Response.unprocessableEntity(res, "You can't block yourself");
    }

    try {
        let friendship = await friendManager.hasFriend(req.user.id, req.body.addresseeId);

        if(friendship && friendship.status === "blocked") {
            await friendManager.removeFriend(req.user.id, req.body.addresseeId);
            return Response.ok(res, "Friendship unblocked");
        }

        return Response.notFound(res, "Friendship doesn't exist");
    } catch (err) {
        return Response.error(res, err.message);
    }
}

const report = async (req, res) => {
    if(req.body === undefined || req.body.addresseeId === undefined || req.body.reason === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    if(req.body.addresseeId === req.user.id) {
        return Response.unprocessableEntity(res, "You can't report yourself");
    }

    const addresseeId      = req.body.addresseeId;
    const reason           = req.body.reason;
    const reasonEnum       = ["harassment", "fake_profile", "others"];

    if(reasonEnum.includes(reason) === false) {
        return Response.unprocessableEntity(res, "Invalid reason only harassment, fake_profile or others");
    }

    const report = {};

    report.requesterId = req.user.id;
    report.addresseeId = addresseeId;
    report.reason = reason;

    if(req.body.comment !== undefined) {
        report.comment = req.body.comment;
    }

    try {
        const create = await reportRepository.create(report);
        return Response.created(res, create);
    } catch (err) {
        return Response.error(res, err.message);
    }
}

export {
    list,
    update,
    status,
    block,
    unblock,
    report
};