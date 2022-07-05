import {Sequelize} from "sequelize";
import {env} from "../../../config.js";

export const sequelize = new Sequelize(env.database.postgres, {
    UseNewUrlParser: true
});

sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully with sequelize.");
});
