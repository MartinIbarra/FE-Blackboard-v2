import { io, Socket } from "socket.io-client";
// import process from "process";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./types/socket.types";

const URL: string = import.meta.env.VITE_BACKEND_ENDPOINT as string;

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  URL,
  {
    // autoConnect: true,
  }
);
