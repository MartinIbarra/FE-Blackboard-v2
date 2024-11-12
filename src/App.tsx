import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { socket } from "./socket";
// import { useEffect, useState } from "react";
import { globalState } from "./store";
import { useHookstate } from "@hookstate/core";
// import Blackboard from "./views/Blackboard";
// import { UserContext } from "./UserContext";
// import Layout from "./views/Layout";
// import Home from "./views/Home";
import Layout from "./views/Layout";
import Login from "./views/Login";
import { useEffect, useState } from "react";
import { RoomListI } from "./types/room.types";
import { SocketListI } from "./types/socket.types";
import Home from "./views/Home";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/",
}: {
  isAllowed: boolean;
  redirectPath?: string;
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

const App = () => {
  const { isConnected, socket_list, userCredentials } =
    useHookstate(globalState);
  const [room_list, set_room_list] = useState<RoomListI>([]);
  isConnected.set(socket.connected);

  const user = JSON.parse(window.localStorage.getItem("user") || "[]");
  //  userCredentials.set(JSON.parse(user));

  // Separar en un custom hook
  useEffect(() => {
    if (user !== "[]") {
      userCredentials.set(user);
    }
    const onConnect = () => {
      // console.log("connected");
      isConnected.set(true);
    };
    const onDisconnect = () => {
      // console.log("disconnected");
      // setIsConnected(false);
      isConnected.set(false);
    };

    const onRoomList = (roomList: RoomListI) => {
      set_room_list(roomList);
    };

    socket.on("newSocketList", (new_socket_list: SocketListI[]) => {
      socket_list.set([...new_socket_list]);
    });

    // const onJoinRoom = () => {
    //   console.log("onJoinRoom =>");
    // };

    socket.on("room_list", onRoomList);
    // socket.on("joinRoom", onJoinRoom);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("newSocketList");
      socket.off("room_list", onRoomList);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [isConnected, socket_list, user]);

  return (
    <Routes>
      <Route element={<Layout></Layout>}>
        <Route path="/" element={<Login rooms_list={room_list} />} />
        <Route element={<ProtectedRoute isAllowed={user.loaded} />}>
          <Route path="/room" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
