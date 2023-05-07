import { createContext } from 'react';
import useLocalStorage from '../hooks/localstorage';

const UserContext = createContext({}) ;

export function UserProvider({ children }: any) {
  const [userData, setUserData] = useLocalStorage('userData', {});
  
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
