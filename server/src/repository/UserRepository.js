import { User } from "../model/index.js";

const find = async (id) => {
    let user = await User.findOne({ where: { id: id } });

    if(user === null) {
        throw new Error('User with id' + id + ' not found');
    }
    return user;
}

const findByEmail = async (email) => {
    let user = await User.findOne({ where: { email: email } });

    if(user === null) {
        throw new Error('User not found');
    }
    return user;
}

const findAll = async () => {
    let users = (await User.findAll());

    if(users === null) {
        throw new Error('Users not found');
    }
    return users;
}

const create = async (email, password, firstname, lastname, technologie, schoolBranch) => {
    await User.create({
        'email': email,
        'password': password,
        'firstname': firstname,
        'lastname': lastname,
        'technologies': technologie,
        'schoolBranch': schoolBranch,
    });
    return await findByEmail(email);
}

export { create, findAll, find, findByEmail }