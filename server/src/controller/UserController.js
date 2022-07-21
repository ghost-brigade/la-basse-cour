import * as Response from "../service/Http/Response.js";
import * as UserRepository from "../repository/UserRepository.js";

const list = async (req, res) => {
    try {
        const users = (await UserRepository.findAll(req.user.id)).map(user => {
            return {
                user: '/user/' + user.id
            };
        });

        Response.ok(req, res, users);
    } catch (err) {
        Response.error(req, res, err.message);
    }
}

const get = async (req, res) => {
    if(req.params === undefined || req.params.id === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        const user = await UserRepository.find(req.params.id);
        
        return Response.ok(req, res, {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                technologies: user.technologies,
                schoolBranch: user.schoolBranch,
        });
    } catch (err) {
        Response.notFound(req, res, 'User not found');
    }
}

export {
    list,
    get
};