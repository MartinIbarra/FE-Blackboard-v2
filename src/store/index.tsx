import { hookstate } from "@hookstate/core";
import { SocketListI } from "../types/socket.types";

interface globalStateI {
  userGoogleCookies: string;
  socket_id: string;
  isConnected: boolean;
  socket_name: string;
  socket_list: SocketListI[];
  userCredentials: { loaded: boolean; email: string; exp: number | undefined; family_name: string; given_name: string; name: string; picture: string; };
}

export const globalState = hookstate({
  userGoogleCookies: "",
  socket_id: "",
  isConnected: false,
  socket_name: "",
  socket_list: [],
  userCredentials: { loaded: false, email: '', exp: 0, family_name: '', given_name: '', name: '', picture: '' },
} as globalStateI);
