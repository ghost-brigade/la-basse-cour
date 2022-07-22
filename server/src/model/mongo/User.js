import MongoFactory from '../../service/Database/MongoFactory.js';

const schema = new MongoFactory.Schema({
    id: String,
    email: String,
    roles: Object,
    firstname: String,
    lastname: String,
    technologies: Object,
    schoolBranch: String
});

const User = new MongoFactory.model("user", schema);

export default User;