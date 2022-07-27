import MongoFactory from '../../service/Database/MongoFactory.js';

const schema = new MongoFactory.Schema({
    id: String,
    email: String,
    roles: Object,
    firstname: String,
    lastname: String,
    technologies: Object,
    schoolBranch: String,
    img: String,
    settings: Object,
    isBanned: Boolean,
});

const User = new MongoFactory.model("user", schema);

export default User;