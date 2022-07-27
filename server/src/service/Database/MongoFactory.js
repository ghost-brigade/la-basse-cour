import mongoose from "mongoose";
import {env} from "../../../config.js";

mongoose.connect(env.database.mongo, (err) => {
    if (err) console.error(err);
    else console.log("Connection has been established successfully with Mongo");
});


export default mongoose;