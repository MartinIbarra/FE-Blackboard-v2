import { io, Socket } from "socket.io-client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./types/socket.types";

const URL: string = process.env.BACKEND_ENDPOINT as string;

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  URL,
  {
    // autoConnect: true,
  }
);
