import { request } from "./request_management";
import { getUserToken } from "./user_management";

const messageFormatter = (message) => {
    if (!message) {
        return null;
    }

    return {
        ...message,
        createdAt: message.createdAt ? new Date(message.createdAt) : null,
        updatedAt: message.updatedAt ? new Date(message.updatedAt) : null,
        deletedAt: message.deletedAt ? new Date(message.deletedAt) : null,
    }
}

export const getMessages = async (discussionId) => {
    const token = getUserToken();

    const messages = await request(`/message/discussion/${discussionId}`, {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });
    
    return messages.map(message => messageFormatter(message));
}

export const updateMessage = async (message) => {
    const token = getUserToken();

    const messageUpdated = await request(`/message/${message.id}`, {
        'method': 'PUT',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify({
            'message': message
        })
    });

    return messageFormatter(messageUpdated);
}

export const sendMessage = async (discussion, user, text) => {
    const token = getUserToken();

    const message = await request(`/message`, {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify({
            'discussion': discussion,
            'user': user,
            'text': text,
        })
    });

    return messageFormatter(message);
}

export const toggleDeleteMessage = async (message) => {
    const token = getUserToken();

    const messageUpdated = await request(`/message/${message.id}`, {
        'method': 'DELETE',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });

    return messageFormatter(messageUpdated);
}