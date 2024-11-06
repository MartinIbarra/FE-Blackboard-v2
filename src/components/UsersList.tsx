import { useHookstate } from '@hookstate/core';
import { globalState } from '../store';

const UsersList = () => {
  const { socket_list, userCredentials } = useHookstate(globalState)

  if (socket_list.get().length < 0) {
    return null;
  }
  socket_list.get().map((user, i) => {
    if (user.name === userCredentials.get().name) {
      return null;
    }

    return (
      <div className="flex gap-1 items-center" key={i}>
        <span className="flex rounded-full bg-green-500 w-5 h-5"></span> <p className="flex">{user.name}</p>
      </div>
    );
  })
}

export default UsersList;
