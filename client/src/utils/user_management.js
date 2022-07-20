import icon_chicken from '../assets/images/profile/icon_chicken.png';
import icon_cow from '../assets/images/profile/icon_cow.png';
import icon_donkey from '../assets/images/profile/icon_donkey.png';
import icon_pig from '../assets/images/profile/icon_pig.png';
import icon_sheep from '../assets/images/profile/icon_sheep.png';
import icon_turkey from '../assets/images/profile/icon_turkey.png';
import { request } from './request_management';
import jwt_decode from "jwt-decode";

const users = [
    {
        'id': 1, 
        'firstname': 'Louis', 
        'lastname': 'Moulion',
        'img': icon_donkey,
        'roles': ['ROLE_ADMIN']
    },
    {
        'id': 2, 
        'firstname': 'Antho', 
        'lastname': 'ArjonA',
        'img': icon_chicken
    },
    {
        'id': 3, 
        'firstname': 'Max', 
        'lastname': 'Carluer',
        'img': icon_sheep,
        'roles': ['ROLE_ADMIN']
    }
];

export const getAllProfileImages = () => {
    return [
        icon_chicken,
        icon_cow,
        icon_donkey,
        icon_pig,
        icon_sheep,
        icon_turkey,
    ];
}

const userFormatter = (user) => {
    return {
        'roles': [],
        'img': icon_chicken,
        ...user
    }
}

export const login = async (credentials = {email: 'user@test.fr', password: 'myawesomepassword'}) => {
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
        localStorage.setItem('token', token);
        return loginFromToken(token);
    }

    return null;
}

export const loginFromToken = (token) => {
    const decodedToken = jwt_decode(token);
    return userFormatter(decodedToken);
}

export const logout = () => {
    localStorage.clear('token');

    return true;
}

export const getUser = async (token) => {
    if (!token) {
        return null;
    }

    const user = await request('/user', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });

    if (user.length) {
        return userFormatter(user[0]);
    }

    return null;
}

export const updateUser = (user) => {
    // fetch...
    return user;
}

export const deleteUser = (id) => {
    return {};
}

export const getUserTitle = (user) => {
    return <>{user.firstname} {user.lastname}</>;
}