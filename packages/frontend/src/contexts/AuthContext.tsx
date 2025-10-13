import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { type RouterOutputs } from "../api";
import { apiStore } from "../ApiStore";
import { db, useDbQuery } from "../db/db";
import { menuActor } from "../features/menu/menuMachine";

const emptyAuth = {
  accessToken: null,
  expiresAt: null,
  refreshToken: null,
  user: null,
};

export const AuthContext = createContext<AuthContextProps>({
  auth: { ...emptyAuth },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthContextProps["auth"]>({ ...emptyAuth });

  const loadAuthQuery = useQuery({
    queryKey: ["load-stored-auth"],
    queryFn: async () => {
      await apiStore.load();

      setAuth((auth) => ({
        ...auth,
        accessToken: apiStore.accessToken,
        expiresAt: apiStore.expiresAt,
        refreshToken: apiStore.refreshToken,
        user: apiStore.user,
      }));

      return apiStore;
    },
  });

  useEffect(() => {
    const version = localStorage.getItem("crvif/version");
    if (!version) {
      localStorage.removeItem("crvif/auth");
      localStorage.setItem("crvif/update-popup", "true");
      localStorage.setItem("crvif/version", "1");
      window.location.reload();
    }
  }, []);

  const setAuthAndSaveInStorage = (data: AuthContextProps["auth"]) => {
    setAuth(data);
    apiStore.accessToken = data.accessToken;
    apiStore.expiresAt = data.expiresAt;
    apiStore.refreshToken = data.refreshToken;
    apiStore.user = data.user;
    apiStore.save();
  };

  const value = {
    auth,
    setAuth: setAuthAndSaveInStorage,
  };

  if (loadAuthQuery.isLoading || !apiStore.loaded) {
    return <div>Chargement...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export const useIsLoggedIn = () => {
  const { auth } = useContext(AuthContext);
  return auth.accessToken && auth.user;
};

export const useLogout = () => {
  const { auth, setAuth } = useAuthContext();

  return () => {
    menuActor.send({ type: "CLOSE" });
    setAuth({ ...auth, accessToken: null, user: null, refreshToken: null, expiresAt: null });
  };
};

export const useUser = () => {
  const { auth } = useAuthContext();
  return auth.user;
};

export const useUdap = () => {
  const user = useUser();

  return user!.udap;
};

export const useRefreshUser = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const user = auth.user;

  const refreshUserMutation = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const newUser = await db.selectFrom("user").selectAll().where("id", "=", user.id).executeTakeFirst();
      if (!newUser) return;
      const newUdap = await db.selectFrom("udap").selectAll().where("id", "=", newUser.udap_id).executeTakeFirst();
      if (newUdap) (newUser as any).udap = newUdap;

      setAuth({ ...auth, user: newUser as any });
    },
  });

  return refreshUserMutation;
};

export const useRefreshUdap = () => {
  return () => {};
};

type AuthContextProps = {
  auth: {
    accessToken: string | null;
    expiresAt: string | null;
    refreshToken: string | null;
    user: RouterOutputs<"/api/authenticate">["user"] | null;
  };
  setAuth: (data: AuthContextProps["auth"]) => void;
};
