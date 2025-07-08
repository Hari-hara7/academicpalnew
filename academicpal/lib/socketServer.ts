import { Server as NetServer } from 'http';
import { Server as IOServer } from 'socket.io';

let io: IOServer;

export function setupSocketServer(server: NetServer) {
  io = new IOServer(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('✅ Socket connected:', socket.id);

    socket.on('join-thread', (threadId) => {
      socket.join(threadId);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected:', socket.id);
    });
  });

  return io;
}

export function getSocketServer() {
  if (!io) throw new Error('Socket server not initialized');
  return io;
}
