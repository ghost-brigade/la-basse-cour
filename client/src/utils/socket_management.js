import io from "socket.io-client";

const init = (url, path) => {
    try {
        return io(url ?? 'http://localhost:3000', {
            path: path ?? '/socket.io',
            rejectUnauthorized: false,
            //transports: ['websocket']
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

const joinRoom = (socket, room) => {
    try {
        socket.join(room);
    } catch (error) {
        console.log(error);
    }
}

export {init, joinRoom};