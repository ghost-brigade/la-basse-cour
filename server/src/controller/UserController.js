import * as Response from "../service/Http/Response.js";
import * as UserRepository from "../repository/UserRepository.js";

const list = async (req, res) => {
    try {
        let users = (await UserRepository.findAll()).map(user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

        await res.json(users);
    } catch (err) {
        Response.error(res, err.message());
    }
}

export {
    list
};