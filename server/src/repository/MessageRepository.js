import { Message } from "../model/index.js";
import { Op } from "sequelize";

const find = async (id) => {
    let message = await Message.findOne({ where: { id: id } });

    if(message === null) {
        throw new Error('Message with id' + id + ' not found');
    }
    return message;
}

const findByDiscussion = async (discussion) => {
    let messages = (await Message.findAll({where: {discussion: discussion}}));

    if(messages === null) {
        throw new Error('Messages not found');
    }

    return messages;
}

const findAll = async (id) => {
    let messages;

    if(id) {
        messages = (await Message.findAll({where: {id: {[Op.ne]: id}}}));
    } else {
        messages = (await Message.findAll());
    }

    if(messages === null) {
        throw new Error('Messages not found');
    }
    return messages;
}

const create = async (discussion, user, text) => {
    return await Message.create({
        'discussion': discussion,
        'user': user,
        'text': text,
    });
}

const update = async (message) => {
    await Message.update(message, {where: {id: message.id}});
    await message.save();
    return message;
}

export { create, findAll, findByDiscussion, find, update };

