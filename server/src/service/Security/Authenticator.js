import * as userRepository from "../../repository/UserRepository.js";
import { validate } from "./PasswordValidator.js";
import { createToken } from "../Jwt/JwtGenerator.js";

const authentification = async (email, password) => {

    let user = await userRepository.findByEmailPg(email);
    let match = await validate(password, user.password);

    if(match === false) {
        throw new Error('Password or email are incorrect');
    }

    return await createToken(user);
}

export { authentification };