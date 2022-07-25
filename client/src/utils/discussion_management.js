import circle from '../assets/images/circle.jpg';
import DiscussionImage from '../components/discussion/DiscussionImage';
import { request } from './request_management';
import { getUser, getUserTitle, getUserToken, userFormatter } from './user_management';

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

    return <h3 className='app_user-preview'>
        <DiscussionImage discussion={discussion}/>
        {discussion.label ?? 'Discussion sans nom'}
    </h3>;
}

export const leaveDiscussion = async (discussionId) => {
    const token = getUserToken();

    return await request(`/discussion/leave/${discussionId}`, {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });
}