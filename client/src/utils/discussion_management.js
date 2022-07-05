import circle from '../assets/images/circle.jpg';
import { getUser } from './user_management';

const messages = [
    {'id': 1, 'discussion': 1, 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt illum culpa, optio, distinctio perspiciatis veritatis nobis dolorum libero, quis reprehenderit ratione? Eligendi suscipit praesentium tempora incidunt facilis ut omnis?', 'user': 1, 'date': new Date('2022-06-28 16:00')},
    {'id': 2, 'discussion': 1, 'text': 'Text 2', 'user': 1, 'date': new Date('2022-06-29 16:02')},
    {'id': 3, 'discussion': 1, 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt illum culpa, optio, distinctio perspiciatis veritatis nobis dolorum libero, quis reprehenderit ratione?', 'user': 2, 'date': new Date('2022-06-29 16:03')},
    {'id': 6, 'discussion': 1, 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt illum culpa, optio, distinctio perspiciatis veritatis nobis dolorum libero.', 'user': 2, 'date': new Date('2022-06-29 16:13')},
    {'id': 4, 'discussion': 1, 'text': 'Mozarella', 'user': 2, 'date': new Date('2022-06-29 16:05')},
    {'id': 8, 'discussion': 1, 'text': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt illum culpa, optio, distinctio perspiciatis veritatis nobis dolorum libero, quis reprehenderit ratione? Eligendi suscipit praesentium tempora incidunt facilis ut omnis?', 'user': 2, 'date': new Date('2022-06-29 17:00')},
    {'id': 5, 'discussion': 1, 'text': 'Mozarella ?', 'user': 1, 'date': new Date('2022-06-29 16:12')},
    {'id': 20, 'discussion': 1, 'text': 'De fou', 'user': 3, 'date': new Date('2022-06-30 7:10')},
    {'id': 19, 'discussion': 1, 'text': 'De fou', 'user': 3, 'date': new Date('2022-06-30 9:10')},
    {'id': 7, 'discussion': 1, 'text': 'Text 7', 'user': 1, 'date': new Date('2022-06-30 10:04')},
    {'id': 21, 'discussion': 2, 'text': <img src={circle}/>, 'user': 1, 'date': new Date('2022-06-30 10:04')},
];

const discs = [
    {'id': 1, 'users': [
        getUser(1),
        getUser(2),
        getUser(3),
    ], 'label': 'Conv 1'},
    {'id': 2, 'users': [
        getUser(1),
        getUser(2),
    ], 'label': 'Conv 2'},
    {'id': 3, 'users': [
        getUser(2),
        getUser(3),
    ], 'label': 'Conv 3'},
    {'id': 4, 'users': [
        getUser(1),
        getUser(2),
        getUser(3),
    ], 'label': 'Conv 4'},
];

const canAccess = (currentUser, discussion) => {
    return discussion.users.map(user => user.id).includes(currentUser.id);
}

export const getDiscussions = (user) => {
    return discs.filter(disc => canAccess(user, disc));
}

export const getDiscussionById = (user, id) => {
    const discussion = getDiscussions(user).find(disc => disc.id === id);
    discussion.messages = messages.filter(message => message.discussion === id);
    return discussion;
}

export const postMessage = (message) => {
    // fetch ...
    return message;
}