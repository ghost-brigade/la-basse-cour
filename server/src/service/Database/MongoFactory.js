import mongoose from "mongoose";
import {env} from "../../../config.js";

mongoose.connect(process.env.MONGO_URL || env.database.mongo, (err) => {
    if (err) console.error(err);
    else console.log("Mongoose connected");
});

export default mongoose;