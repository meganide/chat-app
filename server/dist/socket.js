import { io } from './server.js';
function startSocket() {
    io.on('connection', async (socket) => {
        console.log('a user connected with id', socket.id);
        let room = 'Welcome';
        socket.join(room);
        // const allMembersInRoom = await io.in(room).fetchSockets();
        // socket.emit('allMembers', allMembersInRoom)
        socket.on('typing', (data) => socket.to(room).emit('typingResponse', data));
        socket.on('message', (msg) => {
            console.log(msg);
            socket.to(room).emit('message', msg);
        });
        socket.on('join_channel', (channel) => {
            room = channel;
            socket.join(room);
            console.log("succesfully joined", room);
        });
        socket.on('disconnect', () => {
            console.log("user with id", socket.id, "has disconnected..");
            socket.leave(room);
        });
    });
}
export { startSocket };
