import { createContext } from 'react';
import useLocalStorage from '../hooks/localstorage';

const AdminContext = createContext({}) ;

export function AdminProvider({ children }: any) {
  const [adminData, setAdminData] = useLocalStorage('adminData', false);
  
  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
}

export default AdminContext;
