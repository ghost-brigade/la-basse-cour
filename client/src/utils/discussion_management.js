import circle from '../assets/images/circle.jpg';
import { request } from './request_management';
import { getUser, getUserTitle, getUserToken, userFormatter } from './user_management';

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
    {'id': 21, 'discussion': 2, 'text': <img src={circle}/>, 'user': 3, 'date': new Date('2022-06-30 10:04')},
    {'id': 21, 'discussion': 2, 'text': 'Waaaah tu clc avec ton délire toi aussi...', 'user': 1, 'date': new Date('2022-06-30 10:05')},
];

const canAccess = (currentUser, discussion) => {
    return discussion.users.map(user => user.id).includes(currentUser.id);
}

export const discussionFormatter = async (discussion) => {
    if (!discussion) {
        return null;
    }

    const token = getUserToken();

    const users = [];
    for (let index in discussion.users) {
        const userLink = discussion.users[index];

        const user = await request((userLink), {
            'method': 'GET',
            'headers': {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        });
        
        if (user) {
            users.push(userFormatter(user));
        }
    }

    discussion.users = users;

    return discussion;
}

export const getDiscussions = async () => {
    const token = getUserToken();
    
    const discussions = await request('/discussion', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });

    const discussionsFilled = [];

    for (let index in discussions) {
        const discussion = await discussionFormatter(discussions[index]);
        if (discussion) {
            discussionsFilled.push(discussion);
        }
    }

    return discussionsFilled;
}

export const getPrivateDiscussion = async (currentUser, userToId) => {
    const token = getUserToken();

    return await request('/discussion/create', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify({
            'users': [currentUser.id, userToId]
        })
    });
}

export const getDiscussionTitle = (discussion, currentUser) => {
    if (
        currentUser 
        && discussion.users.find(user => user.id === currentUser.id)
        && discussion.users.length === 2
    ) {
        const user = discussion.users.find(user => user.id !== currentUser.id);
        return <div className='app_user-preview'>
            <img src={user.img} alt=''/>
            <h3>{getUserTitle(user)}</h3>
        </div>;
    }

    return <h3>{discussion.label ?? 'Discussion sans nom'}</h3>;
}