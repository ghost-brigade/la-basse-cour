import * as friendRepository from "../../repository/FriendRepository.js";

const hasFriend = async (requesterId, addresseeId) => {
    try {
        return await friendRepository.findByRequesterOrAddressee(requesterId, addresseeId);
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

const statusUpdate = async (requesterId, addresseeId, status) => {
    try {
        return await friendRepository.update(requesterId, addresseeId, status);
    } catch (err) {
        throw new Error('Error updating friend status');
    }
}

const addFriend = async (requesterId, addresseeId) => {
    try {
        return await friendRepository.add(requesterId, addresseeId);
    } catch (err) {
        throw new Error('Error adding friend');
    }
}

export { hasFriend, removeFriend, addFriend, statusUpdate };