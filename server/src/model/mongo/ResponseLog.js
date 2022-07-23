import MongoFactory from '../../service/Database/MongoFactory.js';

const schema = new MongoFactory.Schema({
    request: Object,
    response: Object
});

const responseLog = new MongoFactory.model("responseLog", schema);

export default responseLog;