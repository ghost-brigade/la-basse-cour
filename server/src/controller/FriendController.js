import * as Response from "../service/Http/Response.js";
import * as friendManager from "../service/Friend/FriendManager.js";
import * as friendRepository from "../repository/FriendRepository.js";

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
   /* if(req.body === undefined || req.body.addresseeId === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    if(req.body.addresseeId === req.user.id) {
        return Response.unprocessableEntity(res, "You can't accept yourself as a friend");
    }

    try {
        let friendshipExist = await friendManager.hasFriend(req.user.id, req.body.addresseeId);

        if(friendshipExist) {
            Response.ok(res, "Friendship exists");
        } else {
            Response.notFound(res, "Friendship doesn't exist");
        }

    } catch (err) {
        Response.error(res, err.message());
    }*/
}

export {
    list,
    update
};