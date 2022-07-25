import { createServer } from 'http';
import express from "express";
import Router from "./src/routes/index.js";
import {env} from "./config.js";
import SocketFactory from "./src/service/Socket/SocketFactory.js";

const app     = express();
const server  = createServer(app);
const port    = process.env.PORT || env.server.port;
const io      = SocketFactory(server);

io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room);
    });
});

app.use(Router);

server.listen(port, () => console.log(`Server Connected to port ${port}`));

export {io};