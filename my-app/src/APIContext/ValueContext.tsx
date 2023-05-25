import { createContext } from 'react';
import useLocalStorage from '../hooks/localstorage';

const ValueContext = createContext({}) ;

export function ValueProvider({ children }: any) {
  const [valueData, setValueData] = useLocalStorage('valueData', {});
  
  return (
    <ValueContext.Provider value={{ valueData, setValueData }}>
      {children}
    </ValueContext.Provider>
  );
}

export default ValueContext;