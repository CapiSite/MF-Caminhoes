import { createContext } from 'react';
import useLocalStorage from '../hooks/localstorage';

const OptionContext = createContext({}) ;

export function OptionProvider({ children }: any) {
  const [optionData, setOptionData] = useLocalStorage('optionData', {});
  
  return (
    <OptionContext.Provider value={{ optionData, setOptionData }}>
      {children}
    </OptionContext.Provider>
  );
}

export default OptionContext;