import { PropsWithChildren, createContext, useContext, useState } from "react";
import { RouterOutputs } from "../api";
import { safeParseLocalStorage } from "../utils";

const initialAuth = safeParseLocalStorage("crvif/auth");

const AuthContext = createContext<AuthContextProps>({
  token: initialAuth?.token,
  user: initialAuth?.user,
  setData: null as any,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Omit<AuthContextProps, "setData">>(initialAuth);

  const setDataAndSaveInStorage = (data: Omit<AuthContextProps, "setData">) => {
    setData(data);
    if (data) {
      window.localStorage.setItem("crvif/auth", JSON.stringify(data));
    } else {
      window.localStorage.removeItem("crvif/auth");
    }
  };

  const value = { ...data, setData: setDataAndSaveInStorage };
  console.log(data);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const { setData, ...data } = useContext(AuthContext);
  return [data, setData] as const;
};

export const useIsLoggedIn = () => {
  const data = useContext(AuthContext);
  return data.token && data.user;
};

export const useLogout = () => {
  const [, setData] = useAuthContext();
  return () => setData({ token: undefined, user: undefined });
};

export const useUser = () => {
  const { user } = useContext(AuthContext);
  return user;
};

type AuthContextProps = Partial<RouterOutputs["login"]> & {
  setData: (data: Omit<AuthContextProps, "setData">) => void;
};
