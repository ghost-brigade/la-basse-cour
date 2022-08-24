import {sequelize} from "./src/service/Database/SequelizeFactory.js";
import * as Model from "./src/model/index.js";

Model.init();

sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");
    sequelize.close();
});