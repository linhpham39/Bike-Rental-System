import { io } from "socket.io-client";

const URL = "http://localhost:3004";

export const socket = io(URL, {
  autoConnect: false,
});
