import * as Response from "../service/Http/Response.js";
import * as MessageRepository from "../repository/MessageRepository.js";

const item = async (req, res) => {
    res.send(req.params.id);
}

const list = async (req, res) => {
    res.send('list');
}

const listDiscussion = async (req, res) => {
    if(req.params === undefined || req.params.id === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    try {
        const messages = (await MessageRepository.findByDiscussion(req.params.id));

        Response.ok(res, messages);
    } catch (err) {
        Response.error(res, err.message);
    }
}

const create = async (req, res) => {
    if(req.body === undefined || req.body.discussion === undefined || req.body.user === undefined || req.body.text === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }
    try {
        let message = await MessageRepository.create(req.body.discussion, req.body.user, req.body.text);

        return Response.created(res, message);
    } catch (err) {
        if(err instanceof ValidationError) {
            return Response.unprocessableEntity(res, formatError(err));
        } else {
            return Response.error(res, err.message);
        }
    }
}

const update = async (req, res) => {
    res.send("update");
}

const remove = async (req, res) => {
    res.send("remove");
}

export {
    item,
    list,
    listDiscussion,
    create,
    update,
    remove
};