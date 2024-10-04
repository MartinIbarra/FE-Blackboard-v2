import { Button } from "flowbite-react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useHookstate } from "@hookstate/core";
import { globalState } from "../store";
import GoogleSignInBtn from "../components/GoogleSignInBtn";

// type Props = {
//   children: ReactNode;
// };

const Layout: React.FC<{ isConnected?: boolean }> = () => {
	const navigate = useNavigate();

	const { isConnected, socket_name, socket_list } = useHookstate(globalState);

	isConnected.set(socket.connected);

	return (
		<div className="flex flex-col h-screen w-screen">
			<nav className="flex w-full justify-end bg-[#DC5F00] px-4 py-2">
				{isConnected.get() && (
					<Button
						className="flex items-center"
						onClick={() => {
							socket.disconnect;
							navigate("/");
						}}
					>
						Disconnect
					</Button>
				)}
				<GoogleSignInBtn />
			</nav>
			<div className="flex p-4 w-full gap-2">
				{isConnected.get() && socket_name.get() !== "" ? (
					<div className="flex gap-1 items-center">
						<span className="flex rounded-full bg-green-500 w-5 h-5"></span> <p className="flex">{socket_name.get()}</p>
					</div>
				) : (
					<div className="flex gap-1 items-center">
						<span className="flex rounded-full bg-red-500 w-5 h-5"></span> <p className="flex">{socket_name.get()}</p>
					</div>
				)}
				<div className="flex gap-1">
					{socket_list.get().length > 0 &&
						socket_list.get().map((user, i) => {
							if (user.name !== socket_name.get()) {
								return (
									<div className="flex gap-1 items-center" key={i}>
										<span className="flex rounded-full bg-green-500 w-5 h-5"></span> <p className="flex">{user.name}</p>
									</div>
								);
							}
						})}
				</div>
			</div>

			<Outlet />
		</div>
	);
};

export default Layout;
