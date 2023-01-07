import { io } from './server.js';
import { httpSaveUserToChannel } from './routes/channels/channels.controller.js';
import { httpGetMembers } from './routes/members/members.controller.js';

interface iMsg {
  id: number;
  displayName: string;
  date: string;
  img: string;
  message: string;
  channelName: string;
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
      socket.to(room).emit('message', msg);

      console.log(msg)

      // Todo: Save message to db!
    });
    
    socket.on('join_channel', async (channelData: iChannelData) => {
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
