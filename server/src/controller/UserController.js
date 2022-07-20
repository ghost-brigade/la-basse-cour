import * as Response from "../service/Http/Response.js";
import * as UserRepository from "../repository/UserRepository.js";

const list = async (req, res) => {
    try {
        const users = (await UserRepository.findAll(req.user.id)).map(user => {
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
        Response.error(res, err.message);
    }
}

const get = async (req, res) => {
    if(req.params === undefined || req.params.id === undefined) {
        return Response.unprocessableEntity(res, "Missing parameters");
    }

    try {
        const user = await UserRepository.find(req.params.id);

        if (user) {
            return Response.ok(res, {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                technologies: user.technologies,
                schoolBranch: user.schoolBranch,
            });
        }

        Response.notFound(res, 'User not found');
    } catch (err) {
        Response.error(res, err.message);
    }
}

export {
    list,
    get
};