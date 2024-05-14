import { useContext, createContext } from 'react';

const AreaContext = createContext();

const useAreaPlan = () => useContext(AreaContext);

export { AreaContext, useAreaPlan };
