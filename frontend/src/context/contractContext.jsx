// MyContext.js
import { createContext, useContext, useState } from "react";
const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const updateSharedData = (newData) => {
    setSharedData(newData);
  };

  return (
    <ContractContext.Provider value={{ sharedData, updateSharedData }}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContext;
export const useContractContext = () => useContext(ContractContext);
