import { io, Socket } from 'socket.io-client';

let socket: Socket;

export function initSocket() {
  if (!socket) {
    socket = io(); // defaults to the same origin
  }
  return socket;
}

export function getSocket(): Socket {
  if (!socket) throw new Error('Socket not initialized');
  return socket;
}
