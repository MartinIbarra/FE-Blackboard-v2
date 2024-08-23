export interface RoomI {
  id: number;
  room: string;
}

export interface RoomListI extends Array<RoomI> {}
