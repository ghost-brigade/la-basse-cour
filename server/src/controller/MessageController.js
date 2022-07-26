import * as Response from "../service/Http/Response.js";
import * as MessageRepository from "../repository/MessageRepository.js";
import * as UserRepository from "../repository/UserRepository.js";
import { ValidationError } from "sequelize";
import {io} from "../../index.js";

const item = async (req, res) => {
    res.send(req.params.id);
}

const list = async (req, res) => {
    res.send('list');
}

const listDiscussion = async (req, res) => {
    if(req.params === undefined || req.params.id === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        const messages = (await MessageRepository.findByDiscussion(req.params.id));

        Response.ok(req, res, messages);
    } catch (err) {
        Response.error(req, res, err.message);
    }
}

const create = async (req, res) => {
    if(req.body === undefined || req.body.discussion === undefined || req.body.user === undefined || req.body.text === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }
    try {
        const message = await MessageRepository.create(req.body.discussion, req.body.user, req.body.text);
        message.user = await UserRepository.find(req.body.user);
        io.to(req.body.discussion).emit('message', message);
        return Response.created(req, res, message);
    } catch (err) {
        if(err instanceof ValidationError) {
            return Response.unprocessableEntity(req, res, formatError(err));
        } else {
            return Response.error(req, res, err.message);
        }
    }
}

const update = async (req, res) => {
    if(req.body === undefined || req.body.message === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        const messageData = req.body.message;

        let message = await MessageRepository.find(req.params.id);

        if (messageData.text) {
            message.text = messageData.text;
        }

        message = await MessageRepository.update(message);
        io.to(message.discussion).emit('message.update', message);

        return Response.ok(req, res, message);
    } catch (err) {
        if(err instanceof ValidationError) {
            return Response.unprocessableEntity(req, res, formatError(err));
        } else {
            return Response.error(req, res, err.message);
        }
    }
}

const remove = async (req, res) => {
    if(req.params === undefined || req.params.id === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        let message = await MessageRepository.find(req.params.id);

        message.deletedAt = message.deletedAt
            ? null
            : new Date();

        message = await MessageRepository.update(message);
        io.to(message.discussion).emit('message.update', message);

        if (message.deletedAt) {
            return Response.deleted(req, res, message);
        }
        return Response.ok(req, res, message);
    } catch (err) {
        if(err instanceof ValidationError) {
            return Response.unprocessableEntity(req, res, formatError(err));
        } else {
            return Response.error(req, res, err.message);
        }
    }
}

export {
    item,
    list,
    listDiscussion,
    create,
    update,
    remove
};