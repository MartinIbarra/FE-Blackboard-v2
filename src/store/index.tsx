import { hookstate } from "@hookstate/core";
import { SocketListI } from "../types/socket.types";

interface globalStateI {
	userGoogleCookies: string;
	socket_id: string;
	isConnected: boolean;
	socket_name: string;
	socket_list: SocketListI[];
}

export const globalState = hookstate({
	userGoogleCookies: "",
	socket_id: "",
	isConnected: false,
	socket_name: "",
	socket_list: [],
} as globalStateI);
