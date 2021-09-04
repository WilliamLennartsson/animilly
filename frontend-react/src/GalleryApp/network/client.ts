import { User } from './../../store/models';
import socketIOClient, { Manager } from "socket.io-client";

const ENDPOINT = "http://localhost:8080";

export const createSocket = (user: User) => {
  const socket = socketIOClient(ENDPOINT, {
    reconnection: true,
    reconnectionDelay: 10000,
    reconnectionAttempts: 10,
    auth: {
      token: user.token
    },
  });
  return socket
}