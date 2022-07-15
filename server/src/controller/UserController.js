import * as Response from "../service/Http/Response.js";
import * as UserRepository from "../repository/UserRepository.js";

const list = async (req, res) => {
    try {
        let users = (await UserRepository.findAll()).map(user => {
            user.password = undefined;
            user.deletedAt = undefined;
            return user;
        });

        res.json(users);
    } catch (err) {
        Response.error(res, err.message());
    }
}

export {
    list
};