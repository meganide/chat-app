import { io } from './server.js';
import { httpSaveUserToChannel } from './routes/channels/channels.controller.js';
import { httpGetMembers } from './routes/members/members.controller.js';

interface iMsg {
  displayName: string;
  date: string;
  img: string;
  message: string;
}

export interface iChannelData {
  name: string;
  userId: string;
}

function startSocket() {
  io.on('connection', async (socket: any) => {
    console.log('a user connected with id', socket.id);

    let room = ''
    
    socket.on('typing', (data: any) => socket.to(room).emit('typingResponse', data));

    socket.on('message', (msg: iMsg) => {
      console.log(msg);
      socket.to(room).emit('message', msg);
    });

    socket.on('join_channel', async (channelData: iChannelData) => {
      socket.leave(room);
      room = channelData.name;
      socket.join(room);

      httpSaveUserToChannel(channelData);

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
