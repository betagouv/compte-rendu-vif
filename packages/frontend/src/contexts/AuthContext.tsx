import { type PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { safeParseLocalStorage } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { api, setToken, type RouterOutputs } from "../api";

const initialAuth = safeParseLocalStorage("crvif/auth");
setToken(initialAuth?.token);

const AuthContext = createContext<AuthContextProps>({
  token: initialAuth?.token,
  user: initialAuth?.user,
  setData: null as any,
  electricStatus: "idle",
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Omit<AuthContextProps, "setData">>(initialAuth);

  const logout = useLogout();

  useEffect(() => {
    const version = localStorage.getItem("crvif/version");
    if (!version) {
      return logout();
    }
  }, []);

  const setDataAndSaveInStorage = (data: Omit<AuthContextProps, "setData" | "electricStatus">) => {
    setData((d) => ({ ...d, ...data }));
    setToken(data?.token);
    if (data) {
      window.localStorage.setItem("crvif/auth", JSON.stringify(data));
    } else {
      window.localStorage.removeItem("crvif/auth");
    }
  };

  const refreshTokenQuery = useQuery({
    queryKey: ["refresh-token"],
    queryFn: async () => {
      if (!data?.token) return;

      if (new Date(data.expiresAt!) > new Date()) return null;
      try {
        const resp = await api.get("/api/refresh-token", {
          query: { token: data.token, refreshToken: data.refreshToken! },
        });

        if (resp.token === null) {
          console.log("token expired but couldn't find a refresh token, logging out");
          setDataAndSaveInStorage({ token: undefined, user: undefined });
        } else {
          console.log("token refreshed");
          setDataAndSaveInStorage({ ...data, ...resp });
        }
        return resp;
      } catch (e) {
        console.error("refreshTokenQuery error", e);
      }
    },
    enabled: !!data?.token,
    refetchOnWindowFocus: false,
  });

  const value = {
    ...data,
    setData: setDataAndSaveInStorage,
  };

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
    setData({ ...data, token: undefined, user: undefined, refreshToken: undefined });
  };
};

export const useUser = () => {
  const { user } = useContext(AuthContext);
  return user;
};

type AuthContextProps = Partial<RouterOutputs<"/api/login">> & {
  setData: (data: Omit<AuthContextProps, "setData" | "electricStatus">) => void;
  electricStatus: ElectricStatus;
};

export type ElectricStatus = "error" | "pending" | "success" | "idle" | "loading";

export const useElectricStatus = () => "idle" as ElectricStatus;
