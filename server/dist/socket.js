import { io } from './server.js';
function startSocket() {
    io.on('connection', (socket) => {
        console.log('a user connected with id', socket.id);
        socket.on('message', (msg) => {
            console.log(msg);
            socket.broadcast.emit('message', msg);
        });
    });
}
export { startSocket };
