import {Friend} from "../model/index.js";

const find = async (id) => {
    let friend = await Friend.findOne({ where: { id: id } });

    if(friend === null) {
        throw new Error('Friend with id' + id + ' not found');
    }
    return friend;
}

const findByRequesterOrAddressee = async (requesterId, addresseeId) => {
    let friend = await Friend.findOne({
        $or: [
            {requesterId: requesterId, addresseeId: addresseeId},
            {requesterId: addresseeId, addresseeId: requesterId}
        ]
    });

    if(friend === null) {
        throw new Error('Friend not found');
    }
    return friend;
}

const findAll = async (userId) => {
    let friends = await Friend.findAll({
        $or: [
            {requesterId: userId},
            {addresseeId: userId}
        ]
    });

    if(friends === null) {
        throw new Error('Friends not found');
    }
    return friends;
}

const update = async (requesterId, addresseeId, status) => {
    let friend = await findByRequesterOrAddressee(requesterId, addresseeId);
    friend.status = status;
    await friend.save();
}

const add = async (requesterId, addresseeId) => {
    await Friend.create({
        requesterId: requesterId,
        addresseeId: addresseeId
    });
    return await findByRequesterOrAddressee(requesterId, addresseeId);
}

const remove = async (requesterId, addresseeId) => {
    let friend = await findByRequesterOrAddressee(requesterId, addresseeId)
    await friend.destroy();
}

export { findAll, update, find, add, findByRequesterOrAddressee, remove };