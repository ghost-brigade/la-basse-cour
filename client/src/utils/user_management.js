import icon_chicken from '../assets/images/profile/icon_chicken.png';
import icon_cow from '../assets/images/profile/icon_cow.png';
import icon_donkey from '../assets/images/profile/icon_donkey.png';
import icon_pig from '../assets/images/profile/icon_pig.png';
import icon_sheep from '../assets/images/profile/icon_sheep.png';
import icon_turkey from '../assets/images/profile/icon_turkey.png';

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
]

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

export const getUser = (id) => {
    return users.find(user => user.id === id);
    /*
    let user = await fetch('http://localhost:3000/user')
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
    });

    console.log(user);

    return user;
    */
}

export const updateUser = (user) => {
    // fetch...
    return user;
}

export const deleteUser = (id) => {
    return {};
}