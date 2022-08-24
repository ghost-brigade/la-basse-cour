import Discussion from "../../model/Discussion.js";
import * as DiscussionRepository from "../../repository/DiscussionRepository.js";
import { Op } from "sequelize";

const simpleDiscussionExist = async (users) => {
    try {
        let discussions = await Discussion.findAll({where: {
            users: {[Op.contains]: users}
        }});

        if (!discussions) {
            return false;
        }

        return discussions.filter(disucssion => 
            disucssion.users.length === 2
        );
    } catch (err) {
        console.log(err);

        return false;
    }
}

export {
    simpleDiscussionExist,
};