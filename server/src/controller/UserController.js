import * as Response from "../service/Http/Response.js";
import * as UserRepository from "../repository/UserRepository.js";

const list = async (req, res) => {
    try {
        let users = (await UserRepository.findAll()).map(user => {
            return {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                technologies: user.technologies,
                schoolBranch: user.schoolBranch,
            };
        });

        res.json(users);
    } catch (err) {
        Response.error(res, err.message());
    }
}

export {
    list
};