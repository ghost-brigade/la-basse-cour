import * as Response from "../service/Http/Response.js";
import * as DiscussionManager from "../service/Discussion/DiscussionManager.js";
import * as DiscussionRepository from "../repository/DiscussionRepository.js";
import { ValidationError } from "sequelize";

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
            let simpleDiscussionExist = await DiscussionManager.simpleDiscussionExist(users);
            console.log(simpleDiscussionExist);
            if (simpleDiscussionExist) {
                return simpleDiscussionExist;
            }
        }
        let discussion = await DiscussionRepository.create(users);

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

export {
    list,
    create
};