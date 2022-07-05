import {sequelize} from "./src/service/Database/SequelizeFactory.js";
import User from "./src/model/User.js";

sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");
    sequelize.close();
});