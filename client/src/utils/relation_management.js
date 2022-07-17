import { getUser } from "./user_management";

const relations = [
    {user: 1, relationUser: 2, type: 'friend'},
    {user: 1, relationUser: 3, type: 'friend'},
    {user: 1, relationUser: 3, type: 'signaled'},
    {user: 1, relationUser: 3, type: 'blocked'},
];

export const getFriendsList = (user) => {
    return relations.filter(relation => relation.user === user.id && relation.type === 'friend')
    .map(relation => getUser(relation.relationUser));
}