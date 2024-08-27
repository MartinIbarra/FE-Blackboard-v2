import { hookstate } from "@hookstate/core";

interface globalStateI {
  socket_id: string;
  isConnected: boolean;
  socket_name: string;
}

export const globalState = hookstate({
  socket_id: "",
  isConnected: false,
  socket_name: "",
} as globalStateI);
