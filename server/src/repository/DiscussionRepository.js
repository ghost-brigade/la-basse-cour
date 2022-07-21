import { Discussion } from "../model/index.js";
import { Op } from "sequelize";

const find = async (id) => {
    let discussion = await Discussion.findOne({ where: { id: id } });

    if(discussion === null) {
        throw new Error('Discussion with id' + id + ' not found');
    }
    return discussion;
}

const findAll = async (id) => {
    let discussions;

    if(id) {
        discussions = (await Discussion.findAll({where: {id: {[Op.ne]: id}}}));
    } else {
        discussions = (await Discussion.findAll());
    }

    if(discussions === null) {
        throw new Error('Discussions not found');
    }
    return discussions;
}

const create = async (users) => {
    return await Discussion.create({
        'users': users,
    });
}

const update = async (discussion) => {
    await Discussion.update(discussion, {where: {id: discussion.id}});
    return await find(discussion.id);
}

export { create, findAll, find, update };