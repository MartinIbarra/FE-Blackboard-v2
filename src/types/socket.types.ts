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
  socket_name: string;
}

export interface RoomServerToClientI {
  room: string;
  id: string;
}

export interface RoomClientToServerI {
  room: string;
  socket_name: string;
}

// export interface RoomList {
//   name: string;
// }

export interface ServerToClientEvents {
  dibujandoSocket: (data: DibujandoSocketTypes) => void;
  borrando: (data: BorradorTypes) => void;
  changeColor: (data: string) => void;
  roomsList: (rooms: string[]) => void;
  room_list: (data: RoomI[]) => void;
  errorRoomExist: () => void;
  "create-room": (data: RoomServerToClientI) => void;
  "join-room": (data: RoomServerToClientI) => void;
  joinRoom: () => void;
}

export interface ClientToServerEvents {
  join: (obj: {
    name: string;
    room_id: string;
    user_id: string;
    room: string;
  }) => void;

  joinRoom: (data: { room: string; socket_name: string }) => void;

  "create-room": (data: RoomClientToServerI) => void;
  "join-room": (data: RoomClientToServerI) => void;

  createRoom: (data: RoomNameI) => void;

  dibujandoSocket: (data: DibujandoSocketTypes) => void;
  borrando: (data: BorradorTypes) => void;
  disconnect: () => void;
  // createRoom: (room: string) => void;
}
