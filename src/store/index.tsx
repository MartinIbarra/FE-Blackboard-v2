import { hookstate } from "@hookstate/core";
import { SocketListI } from "../types/socket.types";

interface globalStateI {
  socket_id: string;
  isConnected: boolean;
  socket_name: string;
  socket_list: SocketListI[];
}

export const globalState = hookstate({
  socket_id: "",
  isConnected: false,
  socket_name: "",
  socket_list: [],
} as globalStateI);
