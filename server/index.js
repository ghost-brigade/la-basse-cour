import express from "express";
import cors from "cors";
import Router from "./src/routes/index.js";
import {env} from "./config.js";

const app = express();
const port = process.env.PORT || env.server.port;

app.use(Router);

app.listen(port, () => console.log(`Server Connected to port ${port}`));
