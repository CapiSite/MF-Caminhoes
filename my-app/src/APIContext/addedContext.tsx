import { createContext } from 'react';
import useLocalStorage from '../hooks/localstorage';

const AddedContext = createContext({}) ;

export function AddedProvider({ children }: any) {
  const [addedData, setAddedData] = useLocalStorage('addedData', {});
  
  return (
    <AddedContext.Provider value={{ addedData, setAddedData }}>
      {children}
    </AddedContext.Provider>
  );
}

export default AddedContext;