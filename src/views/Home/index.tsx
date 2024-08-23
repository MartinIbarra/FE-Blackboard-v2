import React, { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
import { useGetRooms } from "../../services/get.rooms";
// import { Redirect } from "react-dom";
// import { UserContext } from "../UserContext";
import RoomList from "./RoomList";
import { RoomListI } from "../../types/room.types";
// import {
//   ServerToClientEvents,
//   ClientToServerEvents,
// } from "../../types/socket.types";
import { usePostRoom } from "../../services/post.room";

const Home = () => {
  const { data } = useGetRooms();
  const { postData } = usePostRoom();
  // const ENDPOINT = "localhost:5000";
  // const { user, setUser } = useContext(UserContext);
  const [room, setRoom] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rooms, setRooms] = useState<RoomListI | []>([]);
  const [roomError, setRoomError] = useState("");

  useEffect(() => {
    if (data.length > 0) {
      setRooms(data);
    }
  }, [data]);

  useEffect(() => {
    // socket = io(ENDPOINT);
    // socket.on("roomsList", (rooms: string[]) => {
    //   console.log("rooms => ", rooms);
    //   setRooms(rooms);
    // });
    // return () => {
    //   socket.emit("disconnect");
    //   socket.off();
    // };
  }, []);

  // useEffect(() => {
  //   socket.on("roomsList", (rooms: string[]) => {
  //     console.log("rooms => ", rooms);
  //     setRooms(rooms);
  //   });
  // }, []);
  // useEffect(() => {
  //   socket.on("roomCreated", (room: string) => {
  //     setRooms([...rooms, room]);
  //   });
  // }, [rooms]);

  // useEffect(() => {
  //   socket.on("errorRoomExist", () => {
  //     setRoomError("this room already exist");
  //   });
  // });

  // if (!user) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4 h-screen">
      <div className="room-form-container">
        <p className="saludo-usuario text-center">{`Hola, ASDASD`}</p>
        <form
          className="form-container"
          onSubmit={() => {
            postData(room);
          }}
        >
          <input
            className="room-input"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            onFocus={() => setRoomError("")}
            required
            type="text"
            placeholder="Room name"
            value={room}
          />
          <button className="submit-room" type="submit">
            Create
          </button>
        </form>
        <div className="flex flex-col bg-[#4F4A45] p-2 rounded-md w-72">
          <h1 className="mb-2 text-2xl font-light text-center">Room list</h1>
          <RoomList rooms={rooms} />
        </div>
      </div>
    </div>
  );
};

export default Home;
