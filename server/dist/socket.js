import { io } from './server.js';
import { httpSaveUserToChannel } from './routes/channels/channels.controller.js';
import { httpGetMembers } from './routes/members/members.controller.js';
import { httpSaveMessage } from './routes/messages/messages.controller.js';
function startSocket() {
    io.on('connection', async (socket) => {
        console.log('a user connected with id', socket.id);
        let room = '';
        socket.on('typing', (data) => socket.to(room).emit('typingResponse', data));
        socket.on('message', (msg) => {
            socket.to(room).emit('message', msg);
            // Todo: Save message to db!
            httpSaveMessage(msg);
        });
        socket.on('join_channel', async (channelData) => {
            socket.leave(room);
            room = channelData.name;
            socket.join(room);
            await httpSaveUserToChannel(channelData);
            const membersInChannel = await httpGetMembers(channelData);
            io.to(room).emit('members_in_channel', membersInChannel);
        });
        socket.on('disconnect', () => {
            console.log('user with id', socket.id, 'has disconnected..');
            socket.leave(room);
        });
    });
}
export { startSocket };
