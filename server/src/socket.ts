import { io } from './server.js';
import { httpSaveUserToChannel } from './routes/channels/channels.controller.js';
import { httpGetMembers } from './routes/members/members.controller.js';
import { httpGetMessages, httpSaveMessage } from './routes/messages/messages.controller.js';

export interface iMsg {
  userId: number;
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
  let onlineUsers: any = {}

  io.on('connection', async (socket: any) => {
    console.log('a user connected with id', socket.id);

    let room = ''

    socket.on('add_online_user', (displayName: string) => {
      console.log(`Socket ${socket.id} added with displayName ${displayName}.`);
      onlineUsers[socket.id] = displayName;

      console.log(onlineUsers)

    })
    
    socket.on('typing', (data: any) => socket.to(room).emit('typingResponse', data));

    socket.on('message', (msg: iMsg) => {
      socket.to(room).emit('message', msg);

      httpSaveMessage(msg)
    });
    
    socket.on('join_channel', async (channelData: iChannelData) => {
      socket.leave(room);
      room = channelData.name;
      socket.join(room);

      await httpSaveUserToChannel(channelData);

      const membersInChannel = await httpGetMembers(channelData);
      io.to(room).emit('members_in_channel', membersInChannel);

      const messages = await httpGetMessages(channelData)
      io.to(room).emit('messages_in_channel', messages)
    });

    socket.on('disconnect', () => {
      console.log('user with id', socket.id, 'has disconnected..');
      delete onlineUsers[socket.id];
      console.log('left', onlineUsers)
      socket.leave(room);
    });
  });
}

export { startSocket };
