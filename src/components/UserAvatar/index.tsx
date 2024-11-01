import React from "react";
import { useHookstate } from '@hookstate/core'
import { globalState } from '../../store/index';

const UserAvatar: React.FC = () => {

  const { userCredentials } = useHookstate(globalState);

  //useEffect(() => {
  //  if(document.cookie !== ""){
  //    const cookie = decodeURIComponent(document.cookie).slice(7);
  //    setUserCookies(JSON.parse(cookie));
  //  }
  //}, [])

  return <div>{userCredentials.get().name !== '' && <img className="w-9 h-9 rounded-full" src={userCredentials.get().picture} alt={userCredentials.get().name} />}</div>;
};

export default UserAvatar;
