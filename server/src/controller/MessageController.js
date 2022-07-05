import * as userRepository from "../repository/UserRepository.js";

const item = async (req, res) => {
    res.send(req.params.id);
}

const list = async (req, res) => {
    res.send(userRepository.create({
        email: 'test@test.fr',
        password: 'dzfeoigfbneroignferg'
    }));
}

const create = async (req, res) => {
    res.send("create");
}

const update = async (req, res) => {
    res.send("update");
}

const remove = async (req, res) => {
    res.send("remove");
}

export {
    item,
    list,
    create,
    update,
    remove
};