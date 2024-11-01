import { useEffect, useState } from 'react'

export const useLocalstorage = () => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user = window.localStorage.getItem('user') as string;
    setUserData(JSON.parse(user))
    if (userData) {
      setIsUserLoggedIn(true);
    }
  }, [userData])

  return { isUserLoggedIn, userData }
}
