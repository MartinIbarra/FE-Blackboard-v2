import React from "react";
import { useHookstate } from '@hookstate/core'
import { globalState } from '../../store/index';

const UserAvatar: React.FC = () => {

  const { userCredentials } = useHookstate(globalState);

  if (userCredentials.get().name && userCredentials.get().name !== '') {
    return (
      <div>
        <img className="w-9 h-9 rounded-full" src={userCredentials.get().picture} alt={userCredentials.get().name} />
      </div>
    );
  }

  return null;
};

export default UserAvatar;
