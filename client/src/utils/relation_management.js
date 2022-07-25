import { request } from "./request_management";
import { getUser, getUserToken, userFormatter } from "./user_management";

const relations = [
    {user: 1, relationUser: 2, type: 'friend'},
    {user: 1, relationUser: 3, type: 'friend'},
    {user: 1, relationUser: 3, type: 'signaled'},
    {user: 1, relationUser: 3, type: 'blocked'},
];

export const getFriendsList = async () => {
    const token = getUserToken();
    
    const relations = await request('/friend', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });
    
    const relationsFilled = [];
    for (let index in relations) {
        const relation = relations[index];

        const userRelation = await request((relation.friend), {
            'method': 'GET',
            'headers': {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
        
        relation.friend = userFormatter(userRelation);
        relationsFilled.push(relation);
    }
    

    return relationsFilled;
}

export const changeStatusFriendship = async (userId, status) => {
    if (!['accepted', 'rejected'].includes(status)) {
        return null;
    }

    const token = getUserToken();

    return await request('/friend/status', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify({
            'status': status,
            'addresseeId': userId,
        })
    });
}

export const toggleFriendship = async (userId) => {
    const token = getUserToken();

    const friendShip = await request('/friend', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify({
            'addresseeId': userId,
        })
    });

    if (friendShip.addresseeId) {
        return await fillFriendship(`/user/${friendShip.addresseeId}`, friendShip);
    }
    
    return friendShip;
}

export const fillFriendship = async (url, relation) => {
    const token = getUserToken();
    
    const userRelation = await request((url), {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    
    relation.friend = userFormatter(userRelation);
    return relation;
}

export const blockUser = async (userId) => {
    const token = getUserToken();

    return await request(`/friend/block`, {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify({
            'addresseeId': userId,
        })
    });
}

export const unblockUser = async (userId) => {
    const token = getUserToken();

    return await request(`/friend/unblock`, {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify({
            'addresseeId': userId,
        })
    });
}