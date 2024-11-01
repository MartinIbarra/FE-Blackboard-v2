import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { socket } from "./socket";
// import { useEffect, useState } from "react";
import { globalState } from "./store";
import { useHookstate } from "@hookstate/core";
import Blackboard from "./views/Blackboard";
// import { UserContext } from "./UserContext";
// import Layout from "./views/Layout";
// import Home from "./views/Home";
import Layout from "./views/Layout";
// import Signup from "./views/Signup";
import Login from "./views/Login";
import { useEffect, useLayoutEffect, useState } from "react";
import { RoomListI } from "./types/room.types";
import { SocketListI } from "./types/socket.types";

const App = () => {
  const { isConnected, socket_list } = useHookstate(globalState);
  const [room_list, set_room_list] = useState<RoomListI>([]);
  const { userCredentials } = useHookstate(globalState);
  isConnected.set(socket.connected);

  useLayoutEffect(() => {
    const user = window.localStorage.getItem('user')

    if (user) {
      userCredentials.set(JSON.parse(user))
      console.log(`userCredentials => ${userCredentials.get()}`);
    }
  }, [])

  // Separar en un custom hook
  useEffect(() => {
    const onConnect = () => {
      console.log("connected");
      // setIsConnected(true);
      isConnected.set(true);
    };
    const onDisconnect = () => {
      // console.log("disconnected");
      // setIsConnected(false);
      isConnected.set(false);
    };

    const onRoomList = (roomList: RoomListI) => set_room_list(roomList);

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
  }, []);

  const ProtectedRoute = ({ isAllowed, redirectPath = '/' }: { isAllowed: boolean; redirectPath?: string }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };

  return (
    <Routes>
      <Route element={<Layout></Layout>}>
        <Route path="/" element={<Login rooms_list={room_list} />} />
        <Route element={<ProtectedRoute isAllowed={userCredentials.get().loaded} />}>
          <Route path="/room" element={<Blackboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
