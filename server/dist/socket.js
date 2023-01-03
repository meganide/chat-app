import { io } from './server.js';
function startSocket() {
    io.on('connection', async (socket) => {
        console.log('a user connected with id', socket.id);
        let room = 'general';
        socket.join(room);
        // const allMembersInRoom = await io.in(room).fetchSockets();
        // socket.emit('allMembers', allMembersInRoom)
        socket.on('message', (msg) => {
            console.log(msg);
            socket.broadcast.emit('message', msg);
        });
        socket.on('disconnect', () => {
            console.log("user with id", socket.id, "has disconnected..");
            socket.leave(room);
        });
    });
}
export { startSocket };
