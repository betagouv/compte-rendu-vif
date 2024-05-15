import { type PropsWithChildren, createContext, useContext, useState } from "react";
import { safeParseLocalStorage } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { electric } from "../db";
import { setToken, type RouterOutputs } from "../api";

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

  const electricQuery = useQuery({
    queryKey: ["electric", data?.token!],
    queryFn: async () => {
      console.log(electric);
      if (electric.isConnected) electric.disconnect();
      await electric.connect(data.token!);

      await electric.db.clause.sync();
      await electric.db.user.sync({ where: { udap_id: data?.user?.udap_id } });
      await electric.db.report.sync();
      await electric.db.chip.sync();

      return true;
    },
    enabled: !!data?.token,
    refetchOnWindowFocus: false,
    onError: (e) => console.error(e),
  });

  if (electricQuery.isError) {
    console.error("electricQuery error", electricQuery.error);
  }

  const setDataAndSaveInStorage = (data: Omit<AuthContextProps, "setData" | "electricStatus">) => {
    setData((d) => ({ ...d, ...data }));
    setToken(data?.token);
    if (data) {
      window.localStorage.setItem("crvif/auth", JSON.stringify(data));
    } else {
      window.localStorage.removeItem("crvif/auth");
    }
  };

  const value = {
    ...data,
    setData: setDataAndSaveInStorage,
    electricStatus: electricQuery.status,
  };
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

type AuthContextProps = Partial<RouterOutputs<"/api/login">> & {
  setData: (data: Omit<AuthContextProps, "setData" | "electricStatus">) => void;
  electricStatus: "error" | "pending" | "success" | "idle" | "loading";
};
