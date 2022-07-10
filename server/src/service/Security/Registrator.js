import { create } from "../../repository/UserRepository.js";

const registration = async (email, password, firstname, lastname, technologie, schoolBranch) => {
    return await create(email, password, firstname, lastname, technologie, schoolBranch);
}

export { registration };