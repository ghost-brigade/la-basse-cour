import * as Response from "../service/Http/Response.js";
import * as DiscussionManager from "../service/Discussion/DiscussionManager.js";
import * as DiscussionRepository from "../repository/DiscussionRepository.js";
import { ValidationError } from "sequelize";
import Discussion from "../model/Discussion.js";

const list = async (req, res) => {
    try {
        const discussions = (await DiscussionRepository.findAll(req.user.id)).map(discussion => {
            discussion.users = discussion.users.map(user => {
                return '/user/' + user;
            });
            return discussion;
        });

        Response.ok(req, res, discussions);
    } catch (err) {
        Response.error(req, res, err.message);
    }
}

const create = async (req, res) => {
    if(req.body === undefined || req.body.users === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        const users = req.body.users;
        if (users.length === 2) {
            let existingDiscussion = await DiscussionManager.simpleDiscussionExist(users);
            if (existingDiscussion && existingDiscussion.length > 0) {
                return Response.ok(req, res, existingDiscussion[0]);
            }
        }
        let discussion = await DiscussionRepository.create(users, req.body.label ? req.body.label : null);

        discussion.users = discussion.users.map(user => {
            return '/user/' + user;
        });

        return Response.created(req, res, discussion);
    } catch (err) {
        if(err instanceof ValidationError) {
            return Response.unprocessableEntity(req, res, formatError(err));
        } else {
            return Response.error(req, res, err.message);
        }
    }
}

const leave = async (req, res) => {
    if(req.params === undefined || req.params.id === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        let discussion = await DiscussionRepository.find(req.params.id);

        if (discussion === null || !discussion instanceof Discussion) {
            return Response.notFound(req, res, `Discussion ${req.params.id} not found`);
        }

        discussion.users = discussion.users.filter(user => user !== req.user.id);

        if (discussion.users.length > 1) {
            return Response.ok(req, res, await DiscussionRepository.update(discussion));
        }

        return Response.ok(req, res, await DiscussionRepository.remove(discussion));
    } catch (err) {
        if(err instanceof ValidationError) {
            return Response.unprocessableEntity(req, res, formatError(err));
        } else {
            return Response.error(req, res, err.message);
        }
    }
}

export {
    list,
    create,
    leave
};