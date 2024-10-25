import React, { useEffect, useState } from "react";

const UserAvatar: React.FC<{ googleCookies?: string }> = () => {
	const [userCookies, setUserCookies] = useState<{ name: string; family_name: string; picture: string } | null>(null);

	const readGoogleUserCookie = () => {
		if (document.cookie !== "") {
			const cookies = decodeURIComponent(document.cookie).slice(7);
			setUserCookies(JSON.parse(cookies));
		}
	};

	useEffect(() => {
		readGoogleUserCookie();
		console.log(userCookies);
	}, []);

	return <div>{userCookies && <img className="w-9 h-9 rounded-full" src={userCookies.picture} alt={userCookies.name} />}</div>;
};

export default UserAvatar;
