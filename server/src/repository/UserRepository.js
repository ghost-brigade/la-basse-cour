import { User, UserMongo } from "../model/index.js";

const find = async (id) => {
    let user = await UserMongo.findOne({id: id});

    if(user === null) {
        throw new Error('User not found');
    }
    return user;
}

const findByEmailPg = async (email) => {
    let user = await User.findOne({ where: { email: email } });

    if(user === null) {
        throw new Error('User not found');
    }
    return user;
}

const findByEmail = async (email) => {
    let user = await UserMongo.findOne({ email: email });

    if(user === null) {
        throw new Error('User not found');
    }
    return user;
}

const findAll = async (id) => {

    let users;

    if(id) {
        // find in mongo all users except the one with the id
        users = await UserMongo.find({id: { $ne: id}});
    } else {
        users = await UserMongo.find({});
    }

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
    const findUser = await User.findOne({ where: { email: email } });
    await UserMongo.create(findUser.dataValues);

    return findUser;
}

const update = async (user) => {
    await User.update(user, {where: {id: user.id}});
    const findUser = await User.findByPk(user.id);
    await UserMongo.deleteMany({id: findUser.id});
    await UserMongo.create(findUser.dataValues);

    return findUser;
}

export { create, findAll, find, findByEmail, findByEmailPg, update };