// import { Button } from "flowbite-react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { socket } from "../socket";
import { useHookstate } from "@hookstate/core";
import { globalState } from "../store";
import UserAvatar from "../components/UserAvatar";

// type Props = {
//   children: ReactNode;
// };

const Layout: React.FC = () => {
	// const navigate = useNavigate();
	const {
		isConnected,
		socket_name,
		socket_list,
		// userGoogleCookies
	} = useHookstate(globalState);
	// const [googleCookies, setGoogleCookies] = useState<string>("");
	isConnected.set(socket.connected);

	// useEffect(() => {
	// 	setInterval(() => {
	// 		if (document.cookie !== "") {
	// 			document.location.reload();
	// 		}
	// 	}, 3000);
	// }, []);

	// const userGoogleCookiesState = userGoogleCookies.get();

	// useLayoutEffect(() => {
	// 	if (userGoogleCookiesState !== "") {
	// 		setGoogleCookies(userGoogleCookiesState);
	// 	}
	// }, [userGoogleCookiesState]);

	// useEffect(() => {
	// 	console.log("asdasdasd");
	// }, []);

	return (
		<div className="flex flex-col h-screen w-screen">
			{/* <nav className="flex w-full justify-end bg-[#DC5F00] px-4 py-2">{googleCookies !== "" && <UserAvatar googleCookies={googleCookies} />}</nav> */}
			<UserAvatar />
			<div className="flex p-4 w-full gap-2">
				{/* {isConnected.get() && socket_name.get() !== "" ? (
					<div className="flex gap-1 items-center">
						<span className="flex rounded-full bg-green-500 w-5 h-5"></span> <p className="flex">{socket_name.get()}</p>
					</div>
				) : (
					<div className="flex gap-1 items-center">
						<span className="flex rounded-full bg-red-500 w-5 h-5"></span> <p className="flex">{socket_name.get()}</p>
					</div>
				)} */}
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
