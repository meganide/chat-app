import { io } from './server.js';

interface iMsg {
  displayName: string;
  date: string;
  img: string;
  message: string;
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

    socket.on('join_channel', (channel: string) => {
      room = channel;
      socket.join(room);
      
      console.log("succesfully joined", room);
    })


    socket.on('disconnect', () => {
      console.log("user with id", socket.id, "has disconnected..")
      socket.leave(room);
    })
  });
}

export { startSocket };
