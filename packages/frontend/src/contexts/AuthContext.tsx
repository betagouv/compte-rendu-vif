import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { type RouterOutputs } from "../api";
import { apiStore } from "../ApiStore";
import { db, useDbQuery } from "../db/db";
import { menuActor } from "../features/menu/menuMachine";
import { Center } from "#components/MUIDsfr.tsx";
import { Spinner } from "#components/Spinner.tsx";

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

  const setAuthAndSaveInStorage = (
    dataOrCallback: AuthContextProps["auth"] | ((old: AuthContextProps["auth"]) => AuthContextProps["auth"]),
  ) => {
    const values = typeof dataOrCallback === "function" ? dataOrCallback(auth) : dataOrCallback;
    setAuth(values);
    apiStore.accessToken = values.accessToken;
    apiStore.expiresAt = values.expiresAt;
    apiStore.refreshToken = values.refreshToken;
    apiStore.user = values.user;
    apiStore.save();
  };

  const value = {
    auth,
    setAuth: setAuthAndSaveInStorage,
  };

  if (loadAuthQuery.isLoading || !apiStore.loaded) {
    return (
      <Center height="100%">
        <Spinner />
      </Center>
    );
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

export const useLiveUser = () => {
  const user = useUser();

  const liveUsers = useDbQuery(
    db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", user?.id ?? ""),
  );
  const liveUser = liveUsers.data[0];

  const liveUdaps = useDbQuery(
    db
      .selectFrom("udap")
      .selectAll()
      .where("id", "=", liveUser?.udap_id ?? ""),
  );
  const liveUdap = liveUdaps.data[0];

  if (!liveUser || !liveUdap) return user;
  return { ...liveUser, udap: liveUdap };
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
  setAuth: (
    dataOrCallback: AuthContextProps["auth"] | ((old: AuthContextProps["auth"]) => AuthContextProps["auth"]),
  ) => void;
};
