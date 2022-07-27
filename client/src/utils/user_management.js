import icon_chicken from '../assets/images/profile/icon_chicken.png';
import icon_cow from '../assets/images/profile/icon_cow.png';
import icon_donkey from '../assets/images/profile/icon_donkey.png';
import icon_pig from '../assets/images/profile/icon_pig.png';
import icon_sheep from '../assets/images/profile/icon_sheep.png';
import icon_turkey from '../assets/images/profile/icon_turkey.png';
import { request } from './request_management';
import jwt_decode from "jwt-decode";

export const getAllSchoolBranches = () => {
    const schoolBranches = [];
    const branches = ['AL', 'IABD', 'BLOCKCHAIN', 'IW', '3DJV', 'SRCD', 'SI', 'MCSI'];

    for (let index in branches) {
        const branch = branches[index];
        for (let year = 1; year <= 5; year++) {
            for (let group = 1; group < 4; group++) {
                schoolBranches.push(`${year}${branch}${group}`);
            }
        }
    }

    return schoolBranches;
}

export const getAllProfileImages = () => {
    return [
        {'id': 'icon_chicken', 'img': icon_chicken},
        {'id': 'icon_cow', 'img': icon_cow},
        {'id': 'icon_donkey', 'img': icon_donkey},
        {'id': 'icon_pig', 'img': icon_pig},
        {'id': 'icon_sheep', 'img': icon_sheep},
        {'id': 'icon_turkey', 'img': icon_turkey},
    ];
}

export const getImageFromId = (id) => {
    console.log(id);
    return getAllProfileImages().filter(imageData => imageData.id === id)[0].img;
}

export const userFormatter = (user) => {
    if (!user.id) {
        return null;
    }

    const imgId = user.img ? user.img : 'icon_chicken';

    return {
        'roles': [],
        'imgId': imgId,
        'img': icon_chicken, //getImageFromId(imgId),
        'technologies': user.technologies ? user.technologies : [],
        ...user
    }
}

export const getAllUsers = async () => {
    const token = getUserToken();

    const users = await request('/user', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });

    const usersFilled = [];
    for (let index in users) {
        const userData = users[index];
        const user = await getUserFromLink(userData.user);
        usersFilled.push(user);
    }

    return usersFilled;
}

export const getUserFromLink = async (userLink) => {
    const token = getUserToken();

    const user = await request((userLink), {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });

    return userFormatter(user);
}

export const register = async (credentials) => {
    if (!credentials.firstname || !credentials.lastname || !credentials.email || !credentials.password || !credentials.schoolBranch || !credentials.technologies) {
        return null;
    }

    const user = await request('/register', {
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify(credentials)
    });

    if (user) {
        return userFormatter(user);
    }

    return null;
}

export const login = async (credentials) => {
    if (!credentials.email || !credentials.password) {
        return null;
    }
    
    const result = await request('/login', {
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify(credentials)
    });

    const token = result.token;

    if (token) {
        setUserToken(token);
        const decodedToken = jwt_decode(token);
        return userFormatter(decodedToken);
    }

    return null;
}

export const loginByEmail = async (email) => {
    if (!email) {
        return null;
    }

    const result = await request('/login/email', {
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify({
            'email': email
        })
    });
    return result;
}

export const loginFromToken = async (token) => {
    const user = await request('/profile/me', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });

    if (user) {    
        setUserToken(token);
    }

    return userFormatter(user);
}

export const logout = () => {
    localStorage.clear('token');

    return true;
}

export const getUser = async (token) => {
    return null;
}

export const getUserToken = () => {
    return localStorage.getItem('token');
}
export const setUserToken = (token) => {
    localStorage.setItem('token', token);
}

export const updateUser = async (currentUser, editedValues) => {
    const token = getUserToken();

    if (!editedValues) {
        return currentUser;
    }
    
    const user = await request('/profile/update', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        'body': JSON.stringify(editedValues)
    });
    return userFormatter(user);
}

export const deleteUser = (id) => {
    return {};
}

export const getUserTitle = (user) => {
    return <>{user.firstname} {user.lastname}</>;
}