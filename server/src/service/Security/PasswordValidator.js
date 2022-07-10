import bcryptjs from "bcryptjs";

const validate = async (password, passwordToCompare) => {
    return await bcryptjs.compare(password, passwordToCompare);
}

export { validate };