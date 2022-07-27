import bcryptjs from "bcryptjs";

const generate = async (password) => {
    return await bcryptjs.hash(password, await bcryptjs.genSalt());
}

export { generate };