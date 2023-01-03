import { io } from './server.js';

interface iMsg {
  displayName: string,
  date: string,
  img: string,
  message: string,
}

function startSocket() {
  io.on('connection', (socket) => {
    console.log('a user connected with id', socket.id);


    socket.on('message', (msg: iMsg) => {
      console.log(msg);
      socket.broadcast.emit('message', msg)
    });
  });
}

export { startSocket };
