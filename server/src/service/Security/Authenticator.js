import * as userRepository from "../../repository/UserRepository.js";

const authentification = async (email, password) => {

    let user = await userRepository.findByEmail(email);

    let passwordCompare = await import("server/src/service/Security/PasswordValidator.js");
    let passwordMatch = await passwordCompare.compare(password, user.password);

    if(passwordMatch === false) {
        throw new Error('Password or email are incorrect');
    }

    let JwtGenerator = await import("../Jwt/JwtGenerator.js");
    return JwtGenerator.createToken(user);
}


export { authentification };