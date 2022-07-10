import * as friendRepository from "../../repository/FriendRepository.js";

const hasFriend = async (requesterId, addresseeId) => {
    try {
        let match = await friendRepository.findByRequesterOrAddressee(requesterId, addresseeId);
        return true;
    } catch (err) {
        return false;
    }
}

const removeFriend = async (requesterId, addresseeId) => {
    try {
        return await friendRepository.remove(requesterId, addresseeId);
    } catch (err) {
        throw new Error('Error removing friend');
    }
}

const addFriend = async (requesterId, addresseeId) => {
    try {
        return await friendRepository.add(requesterId, addresseeId);
    } catch (err) {
        throw new Error('Error adding friend');
    }
}

export { hasFriend, removeFriend, addFriend };