import {Server} from "socket.io";

const init = (httpServer) => {
    const io = new Server(
        httpServer, {
            path: '/socket.io',
            cors: {origin: '*'},
        },
    );
    registerEvent(io);

    return io;
}

const registerEvent = (io) => {
    io.on('connection', (socket) => {
        socket.on('join', (room) => {
            socket.join(room);
        });
    });
}

export default init;