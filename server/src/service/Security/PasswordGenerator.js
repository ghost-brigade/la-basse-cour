import bcryptjs from "bcryptjs";

export const generate = async (password) => {
    return await bcryptjs.hash(password, await bcryptjs.genSalt());
}