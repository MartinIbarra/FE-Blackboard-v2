import { RoomI } from "./room.types";

export interface CoordenadasTypes {
  x: number;
  y: number;
}

export interface BorradorTypes {
  pos: CoordenadasTypes;
  room_id: string;
}

export interface DibujandoSocketTypes {
  oldCoord: CoordenadasTypes;
  coordenadas: CoordenadasTypes;
  room: string;
  color: string;
  origin: string;
}

export interface RoomNameI {
  room: string;
  socket_cred: SocketCredentialsI;
}

export interface RoomServerToClientI {
  room: string;
  id: string;
}

export interface RoomClientToServerI {
  room: string;
  socket_name: string;
}

export interface SocketListI {
  room: string;
  name: string;
  id: string;
}

export interface SocketCredentialsI {
  loaded: boolean;
  email: string;
  exp?: number;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
}

export interface SocketMsgI {
  room: string;
  msg: string;
  socket_email: string;
}

export interface ServerToClientEvents {
  dibujandoSocket: (data: DibujandoSocketTypes) => void;
  borrando: (data: BorradorTypes) => void;
  changeColor: (data: string) => void;
  room_list: (data: RoomI[]) => void;
  errorRoomExist: () => void;
  joinRoom: () => void;
  newSocketList: (data: SocketListI[]) => void;
  leaveRoom: (data: string) => void;
  socketMsg: (data: SocketMsgI) => void;
  // outcommingMsg: (data: SocketMsgI) => void;
}

export interface ClientToServerEvents {
  joinRoom: (data: { room: string; socket_cred: SocketCredentialsI }) => void;
  userLogin: (data: SocketCredentialsI) => void;
  createRoom: (data: RoomNameI) => void;
  dibujandoSocket: (data: DibujandoSocketTypes) => void;
  borrando: (data: BorradorTypes) => void;
  disconnect: () => void;
  leaveRoom: (data: RoomNameI) => void;
  socketMsg: (data: SocketMsgI) => void;
  // outcommingMsg: (data: SocketMsgI) => void;
}
