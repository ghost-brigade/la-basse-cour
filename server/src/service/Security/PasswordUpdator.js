import {validate} from "./PasswordValidator.js";
import * as UserRepository from "../../repository/UserRepository.js";

const isAuthorizedToUpdatePassword = async (email, password, newPassword, passwordConfirmation) => {
    const user = await UserRepository.findByEmail(email);

    if(!user) { throw new Error("User not found"); }

    const match = await validate(password, user.password);

    if(match === false) { throw new Error('Current Password are incorrect');}

    if(newPassword !== passwordConfirmation) { throw new Error('The two passwords are not the same'); }

    return true;
}

export { isAuthorizedToUpdatePassword };