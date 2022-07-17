import * as Response from "../service/Http/Response.js";
import * as friendManager from "../service/Friend/FriendManager.js";
import * as friendRepository from "../repository/FriendRepository.js";

/** Todo: add notification when friendship is accepted or rejected */

const list = async (req, res) => {
    try {
        let friends = (await friendRepository.findAll(req.user.id)).map(friend => {
            return {
                id: friend.id,
                friendId: friend.requesterId === req.user.id ? friend.addresseeId : friend.requesterId,
                createdAt: friend.createdAt,
                updatedAt: friend.updatedAt,
            };
        });
        res.json(friends);
    } catch (err) {
        Response.error(res);
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
            Response.deleted(res, "Friendship removed");
        } else {
            let friend = await friendManager.addFriend(req.user.id, req.body.addresseeId).then(friend => {
                friend.deletedAt = undefined;
                return friend;
            });
            res.json(friend);
        }

    } catch (err) {
        Response.error(res, err.message());
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
                return Response.ok(res, "Status updated");
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
        } else {
            return Response.notFound(res, "Friendship doesn't exist");
        }

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
            await friendManager.statusUpdate(req.user.id, req.body.addresseeId, "pending");
            return Response.ok(res, "Friendship unblocked");
        } else {
            return Response.notFound(res, "Friendship doesn't exist");
        }

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
};