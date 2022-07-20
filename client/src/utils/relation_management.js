import { request } from "./request_management";
import { getUserToken } from "./user_management";

const relations = [
    {user: 1, relationUser: 2, type: 'friend'},
    {user: 1, relationUser: 3, type: 'friend'},
    {user: 1, relationUser: 3, type: 'signaled'},
    {user: 1, relationUser: 3, type: 'blocked'},
];

export const getFriendsList = async () => {
    const token = getUserToken();
    
    const friends = await request('/friend', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });

    console.log(friends);

    return [];
}