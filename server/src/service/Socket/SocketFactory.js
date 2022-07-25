import {Server} from "socket.io";

const init = (httpServer) => {
    return new Server(
        httpServer, {
            path: '/socket.io',
            cors: {origin: '*'},
        },
    );
}

export default init;