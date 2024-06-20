import { createContext, useContext } from "react";

export const DisabledContext = createContext<boolean>(false);
export const useIsFormDisabled = () => useContext(DisabledContext);
