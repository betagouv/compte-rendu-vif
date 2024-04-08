import { PropsWithChildren, createContext, useContext, useState } from "react";
import { RouterOutputs } from "../api.gen";
import { safeParseLocalStorage } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { electric } from "../db";

const initialAuth = safeParseLocalStorage("crvif/auth");

const AuthContext = createContext<AuthContextProps>({
  token: initialAuth?.token,
  user: initialAuth?.user,
  setData: null as any,
  electricStatus: "idle",
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Omit<AuthContextProps, "setData">>(initialAuth);

  const electricQuery = useQuery({
    queryKey: ["electric", data?.token!],
    queryFn: async () => {
      if (electric.isConnected) electric.disconnect();
      await electric.connect(data.token!);
      return true;
    },
    enabled: !!data?.token,
    refetchOnWindowFocus: false,
  });

  if (electricQuery.isError) {
    console.error("electricQuery error", electricQuery.error);
  }

  const setDataAndSaveInStorage = (data: Omit<AuthContextProps, "setData">) => {
    setData(data);
    if (data) {
      window.localStorage.setItem("crvif/auth", JSON.stringify(data));
    } else {
      window.localStorage.removeItem("crvif/auth");
    }
  };

  const value = { ...data, setData: setDataAndSaveInStorage, electricStatus: electricQuery.status };
  //   [data, electricQuery.status],
  // );

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
  const [data, setData] = useAuthContext();

  return () => {
    setData({ ...data, token: undefined, user: undefined });
  };
};

export const useUser = () => {
  const { user } = useContext(AuthContext);
  return user;
};

type AuthContextProps = Partial<RouterOutputs["login"]> & {
  setData: (data: Omit<AuthContextProps, "setData">) => void;
  electricStatus: "error" | "pending" | "success" | "idle";
};
