import { useContext, createContext } from 'react';

const ApiClientContext = createContext();

const useApiClientContext = () => useContext(ApiClientContext);

export { ApiClientContext, useApiClientContext };
