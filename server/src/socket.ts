import { io } from './server.js';
import { httpSaveUserToChannel } from './routes/channels/channels.controller.js';

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

    let room = 'Welcome';
    
    socket.join(room);

    // const allMembersInRoom = await io.in(room).fetchSockets();

    // socket.emit('allMembers', allMembersInRoom)

    socket.on('typing', (data: any) => socket.to(room).emit('typingResponse', data));

    socket.on('message', (msg: iMsg) => {
      console.log(msg);
      socket.to(room).emit('message', msg);
    });

    socket.on('join_channel', (channelData: iChannelData) => {
      room = channelData.name;
      socket.join(room);
      
      httpSaveUserToChannel(channelData);
      console.log("succesfully joined", room);
    })


    socket.on('disconnect', () => {
      console.log("user with id", socket.id, "has disconnected..")
      socket.leave(room);
    })
  });
}

export { startSocket };
