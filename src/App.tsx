import { Routes, Route } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { RoomListI } from "./types/room.types";
import { SocketListI } from "./types/socket.types";

function App() {
	const { isConnected, socket_list } = useHookstate(globalState);

	isConnected.set(socket.connected);

	// const [isConnected, setIsConnected] = useState(socket.connected);
	const [room_list, set_room_list] = useState<RoomListI>([]);

	useEffect(() => {
		const onConnect = () => {
			// console.log("connected");
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

	return (
		<Routes>
			<Route element={<Layout></Layout>}>
				<Route path="/" element={<Login rooms_list={room_list} />} />
				<Route path="/room" element={<Blackboard />} />
				{/* <Home /> */}
			</Route>
			{/* <Route path="/" element={<Home />} /> */}
			{/* <Route path="/login" component={Login} /> */}
		</Routes>
	);
}

export default App;
