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
        discussions = (await Discussion.findAll({where: {users: {[Op.contains]: [id]}}}));
    } else {
        discussions = (await Discussion.findAll());
    }

    if(discussions === null) {
        throw new Error('Discussions not found');
    }
    return discussions;
}

const create = async (users, label) => {
    return await Discussion.create({
        'users': users,
        'label': label,
    });
}

const update = async (discussion) => {
    await Discussion.update(discussion, {where: {id: discussion.id}});
    await discussion.save();
    return await find(discussion.id);
}

const remove = async (discussion) => {
    await discussion.destroy();
    return 'Removed';
}

export { create, findAll, find, update, remove };