import mongoose from '../service/Database/MongoFactory.js';

const schema = new mongoose.Schema({
    title: String,
    user: Object,
});

const responseLog = new mongoose.model("responseLog", schema);

export default responseLog;