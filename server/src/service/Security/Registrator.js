import { create } from "../../repository/UserRepository.js";

const registration = (email, password, firstname, lastname) => {
    create(email, password, firstname, lastname);
}

export { registration };