import { io, Socket } from "socket.io-client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "./types/socket.types";

const URL: string =
  process.env.NODE_ENV === "production"
    ? (process.env.BACKEND_ENDPOINT as string)
    : "http://localhost:5000";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  URL,
  {
    // autoConnect: true,
  }
);
