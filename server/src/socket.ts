import { io } from './server.js';

function startSocket() {
  io.on('connection', (socket) => {
    console.log('a user connected with id', socket.id);
  });
}

export { startSocket };
