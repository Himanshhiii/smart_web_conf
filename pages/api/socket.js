import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    // If WebSocket server already exists, log message
    console.log('WebSocket server is already running');
  } else {
    // Initialize new WebSocket server instance
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    // Handle socket connection and events
    io.on('connection', (socket) => {
      console.log('A client connected to the WebSocket server');

      socket.on('join-room', (roomId, userId) => {
        console.log(`User ${userId} joined room ${roomId}`);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);
      });

      socket.on('user-toggle-audio', (userId, roomId) => {
        socket.broadcast.to(roomId).emit('user-toggle-audio', userId);
      });

      socket.on('user-toggle-video', (userId, roomId) => {
        socket.broadcast.to(roomId).emit('user-toggle-video', userId);
      });

      socket.on('user-leave', (userId, roomId) => {
        console.log(`User ${userId} left room ${roomId}`);
        socket.broadcast.to(roomId).emit('user-leave', userId);
      });
    });
  }

  res.end(); // End the response
};

export default SocketHandler;
